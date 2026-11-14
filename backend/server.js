const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
const collections = ["men", "women", "kids", "boys"];
let db;

app.use(cors());
app.use(express.json());

// MySQL Connection
async function connectToDatabase() {
    try {
        const db = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "12345678",
            database: "2026"
        });

        console.log("Connected Successfully to MySQL Database");

        return db;

    } catch (error) {
        console.error("MySQL Connection Failed:", error.message);
        process.exit(1);
    }
}

async function startServer() {
    db = await connectToDatabase();

    app.listen(5000, () => {
        console.log("Server running at http://localhost:5000");
    });
}

function parseList(value) {
    if (Array.isArray(value)) {
        return value.map((item) => String(item).trim()).filter(Boolean);
    }

    if (typeof value !== "string" || !value.trim()) {
        return [];
    }

    try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) {
            return parsed.map((item) => String(item).trim()).filter(Boolean);
        }
    } catch {
        // Existing rows may store comma-separated values instead of JSON.
    }

    return value.split(",").map((item) => item.trim()).filter(Boolean);
}

function formatProduct(product) {
    return {
        ...product,
        productImg: parseList(product.productImg)[0] || "",
        sizes: parseList(product.sizes)
    };
}

async function fetchProducts(collection, res, raw = false) {
    if (!collections.includes(collection)) {
        return res.status(404).json({ success: false, message: "Collection not found" });
    }

    try {
        const [rows] = await db.query(`SELECT * FROM \`${collection}\` ORDER BY id DESC`);
        const products = rows.map(formatProduct);
        return res.json(raw ? products : { success: true, collection, products });
    } catch (error) {
        console.error(`Failed to fetch products from ${collection}:`, error.message);
        return res.status(500).json({ success: false, message: "Failed to fetch products" });
    }
}

app.get("/men", (req, res) => fetchProducts("men", res, true));

app.get("/api/products/:collection", (req, res) =>
    fetchProducts(req.params.collection.toLowerCase(), res)
);

app.post("/api/products/:collection", async (req, res) => {
    const collection = req.params.collection.toLowerCase();
    if (!collections.includes(collection)) {
        return res.status(404).json({ success: false, message: "Collection not found" });
    }

    const {
        productName,
        category,
        productImg,
        price,
        discountPrice,
        description,
        sizes,
        sku,
        stock
    } = req.body;

    const parsedPrice = Number(price);
    const parsedDiscountPrice = discountPrice === undefined || discountPrice === null || discountPrice === ""
        ? null
        : Number(discountPrice);
    const parsedStock = stock === undefined || stock === "" ? 0 : Number(stock);

    if (
        typeof productName !== "string" || !productName.trim() ||
        !Number.isFinite(parsedPrice) || parsedPrice < 0 ||
        (parsedDiscountPrice !== null &&
            (!Number.isFinite(parsedDiscountPrice) || parsedDiscountPrice < 0)) ||
        !Number.isInteger(parsedStock) || parsedStock < 0
    ) {
        return res.status(400).json({
            success: false,
            message: "Enter a product name, valid prices, and a non-negative whole-number stock quantity"
        });
    }

    const images = parseList(productImg);
    const availableSizes = parseList(sizes);

    try {
        const [result] = await db.execute(
            `INSERT INTO \`${collection}\` (productName, category, productImg, price, discountPrice, description, sizes, sku, stock)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                productName.trim(),
                typeof category === "string" ? category.trim() : "",
                images[0] || "",
                parsedPrice,
                parsedDiscountPrice,
                typeof description === "string" ? description.trim() : "",
                JSON.stringify(availableSizes),
                typeof sku === "string" ? sku.trim() : "",
                parsedStock
            ]
        );

        return res.status(201).json({
            success: true,
            productId: result.insertId
        });
    } catch (error) {
        console.error(`Failed to add product to ${collection}:`, error.message);
        return res.status(500).json({ success: false, message: "Failed to add product" });
    }
});

startServer();