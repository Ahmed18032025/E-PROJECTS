
import { useState } from "react";
import { API_URL } from "../src/services/api.js";

function AdminPanel() {

    const [product, setProduct] = useState({
        productName: "",
        category: "T-Shirts",
        productImg: "",
        price: "",
        discountPrice: "",
        description: "",
        sizes: "S, M, L, XL, XXL",
        sku: "",
        stock: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Input change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setProduct((currentProduct) => ({
            ...currentProduct,
            [name]: value
        }));
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        const productData = {
            ...product,
            productImg: product.productImg.split(",").map(url => url.trim()).filter(Boolean),
            sizes: product.sizes.split(",").map(size => size.trim()).filter(Boolean),
            price: Number(product.price),
            discountPrice: product.discountPrice
                ? Number(product.discountPrice)
                : null,
            stock: Number(product.stock)
        };

        try {
            const response = await fetch(
                `${API_URL}/products/men`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(productData)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Product insertion failed");
            }

            setMessage("Product Added Successfully! ID: " + data.productId);

            // Clear form
            setProduct({
                productName: "",
                category: "T-Shirts",
                productImg: "",
                price: "",
                discountPrice: "",
                description: "",
                sizes: "S, M, L, XL, XXL",
                sku: "",
                stock: ""
            });

        } catch (error) {
            setMessage("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    // Common input styling
    const inputStyle = {
        width: "100%",
        padding: "12px",
        marginTop: "6px",
        marginBottom: "15px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        boxSizing: "border-box",
        fontSize: "15px"
    };

    return (
        <div style={{
            maxWidth: "650px",
            margin: "40px auto",
            padding: "30px",
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 15px #0002"
        }}>

            <h2 style={{
                textAlign: "center",
                marginBottom: "25px"
            }}>
                Admin Panel - Add Product
            </h2>

            <form onSubmit={handleSubmit}>

                <label>Product Name</label>
                <input
                    style={inputStyle}
                    type="text"
                    name="productName"
                    value={product.productName}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    required
                />

                <label>Category</label>
                <select
                    style={inputStyle}
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                >
                    <option>T-Shirts</option>
                    <option>Shirts</option>
                    <option>Jeans</option>
                    <option>Trousers</option>
                    <option>Jackets</option>
                </select>

                <label>Product Image URL</label>
                <input
                    style={inputStyle}
                    type="text"
                    name="productImg"
                    value={product.productImg}
                    onChange={handleChange}
                    placeholder="Enter an image URL"
                />

                <label>Original Price</label>
                <input
                    style={inputStyle}
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    placeholder="Enter original price"
                    min="0"
                    step="0.01"
                    required
                />

                <label>Discount Price</label>
                <input
                    style={inputStyle}
                    type="number"
                    name="discountPrice"
                    value={product.discountPrice}
                    onChange={handleChange}
                    placeholder="Enter discount price"
                    min="0"
                    step="0.01"
                />

                <label>Description</label>
                <textarea
                    style={{ ...inputStyle, height: "100px" }}
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    placeholder="Enter product description"
                />

                <label>Available Sizes</label>
                <input
                    style={inputStyle}
                    type="text"
                    name="sizes"
                    value={product.sizes}
                    onChange={handleChange}
                    placeholder="S, M, L, XL"
                />

                <label>SKU</label>
                <input
                    style={inputStyle}
                    type="text"
                    name="sku"
                    value={product.sku}
                    onChange={handleChange}
                    placeholder="Enter SKU"
                />

                <label>Stock Quantity</label>
                <input
                    style={inputStyle}
                    type="number"
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                    placeholder="Enter stock quantity"
                    min="0"
                />

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "14px",
                        backgroundColor: "#171717",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "16px",
                        cursor: loading ? "not-allowed" : "pointer"
                    }}
                >
                    {loading ? "Adding Product..." : "Add Product"}
                </button>

            </form>

            {message && (
                <p style={{
                    textAlign: "center",
                    marginTop: "20px",
                    color: message.startsWith("Error") ? "red" : "green",
                    fontWeight: "bold"
                }}>
                    {message}
                </p>
            )}

        </div>
    );
}

export default AdminPanel;
