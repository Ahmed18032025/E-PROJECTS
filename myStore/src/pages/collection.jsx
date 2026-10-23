import products from "../../public/Api";

function Collection() {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "20px",
                backgroundColor: "#f0f0f0",
                padding: "20px",
                width: "100%"
            }}
        >
            {products.map((product) => (
                <div
                    key={product.id}
                    className="product-card"
                    style={{
                        backgroundColor: "#ffffff",
                        margin: "0",
                        padding: "15px",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                        textAlign: "center",
                        overflow: "hidden"
                    }}
                >
                    <img
                        src={product.image}
                        alt={product.name}
                        style={{
                            width: "100%",
                            height: "220px",
                            objectFit: "contain",
                            borderRadius: "8px"
                        }}
                    />

                    <h3 style={{ margin: "12px 0", color: "#222" }}>
                        {product.name}
                    </h3>

                    <p style={{ color: "#666", margin: "8px 0" }}>
                        Category: {product.category}
                    </p>

                    <p style={{ color: "#d11818", fontWeight: "bold" }}>
                        Price: ₹{product.price}
                    </p>

                    <p style={{ color: "#666" }}>
                        Collection: {product.collection}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default Collection;