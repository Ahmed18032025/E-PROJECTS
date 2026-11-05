
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
// require("dotenv").config();

const app = express();

// =====================================
// MIDDLEWARE
// =====================================

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================================
// MYSQL DATABASE CONNECTION
// =====================================

const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "12345678",
    database: process.env.DB_NAME || "2026",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Allowed collection tables
const collections = ["men", "women", "kids", "boys"];

// =====================================
// HOME ROUTE
// =====================================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to 2026 Store API",
        version: "1.0.0"
    });
});

// =====================================
// DATABASE HEALTH CHECK
// =====================================

app.get("/api/health", async (req, res) => {
    try {
        await pool.query("SELECT 1");

        res.json({
            success: true,
            message: "MySQL connected successfully"

        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Database connection failed"
        });
    }
});

// =====================================
// GET ALL PRODUCTS
// =====================================

app.get("/api/products/:collection", async (req, res) => {
    try {
        const { collection } = req.params;

        if (!collections.includes(collection)) {
            return res.status(404).json({
                success: false,
                message: "Collection not found"
            });
        }

        const {
            category,
            search,
            sort = "newest",
            page = 1,
            limit = 12
        } = req.query;

        const currentPage = Math.max(1, parseInt(page, 10) || 1);
        const perPage = Math.min(
            100,
            Math.max(1, parseInt(limit, 10) || 12)
        );

        const offset = (currentPage - 1) * perPage;

        // Sorting options
        const sortOptions = {
            newest: "id DESC",
            oldest: "id ASC",
            price_low: "price ASC",
            price_high: "price DESC",
            discount: "discountPrice ASC"
        };

        const orderBy = sortOptions[sort] || sortOptions.newest;

        let sql = `SELECT * FROM \`${collection}\` WHERE 1=1`;
        let countSql = `SELECT COUNT(*) AS total FROM \`${collection}\` WHERE 1=1`;

        const params = [];
        const countParams = [];

        if (category) {
            sql += " AND category = ?";
            countSql += " AND category = ?";

            params.push(category);
            countParams.push(category);
        }

        if (search) {
            sql += " AND productName LIKE ?";
            countSql += " AND productName LIKE ?";

            params.push(`%${search}%`);
            countParams.push(`%${search}%`);
        }

        sql += ` ORDER BY ${orderBy} LIMIT ? OFFSET ?`;

        params.push(perPage, offset);

        const [products] = await pool.execute(sql, params);
        const [countResult] = await pool.execute(countSql, countParams);

        res.json({
            success: true,
            collection,
            pagination: {
                currentPage,
                limit: perPage,
                totalProducts: countResult[0].total,
                totalPages: Math.ceil(countResult[0].total / perPage)
            },
            products
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch products"
        });
    }
});

// =====================================
// GET SINGLE PRODUCT BY ID
// =====================================

app.get("/api/products/:collection/:id", async (req, res) => {
    try {
        const { collection, id } = req.params;

        if (!collections.includes(collection)) {
            return res.status(404).json({
                success: false,
                message: "Collection not found"
            });
        }

        if (!/^[1-9]\d*$/.test(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID"
            });
        }

        const [products] = await pool.execute(
            `SELECT * FROM \`${collection}\` WHERE id = ?`,
            [id]
        );

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.json({
            success: true,
            product: products[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch product"
        });
    }
});

// =====================================
// 404 ROUTE
// =====================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found"
    });
});

// =====================================
// START SERVER
// =====================================

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await pool.query("SELECT 1");

        app.listen(PORT, () => {
            console.log("==============================");
            console.log("    2026 STORE API");
            console.log("==============================");
            console.log(`Server: http://localhost:${PORT}`);
            console.log("Database: 2026");
            console.log("Collections: Men, Women, Kids, Boys");
            console.log("==============================");
        });

    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
}

startServer();
