
const API_URL = "http://localhost:3000/api";

// Fetch all products from a collection
export const fetchProducts = async (collection) => {
    try {
        const response = await fetch(
            `${API_URL}/products/${collection}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        return data.products;

    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
};
