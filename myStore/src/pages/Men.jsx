
import { useState, useEffect } from "react";

export const Men = () => {
    const [menData, setMenData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/men")
            .then((response) => {
                if (!response.ok) throw new Error("Failed to fetch data");
                return response.json();
            })
            .then((data) => setMenData(data))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <h2>Loading products...</h2>;

    return (
        <div style={{ }}>
           <div style={{marginLeft: "30px", marginTop:"10px" }} >
             <h1>Men's Collection</h1>
            <p>Welcome to the Men's Collection!</p>
           </div>
           

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "20px",
                padding: "20px"
            }}>

                {menData.map((item) => (
                    <div
                        key={item.id}
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            overflow: "hidden",
                            backgroundColor: "#fff",
                            display: "flex",
                            flexDirection: "column",
                            transition: "0.3s"
                        }}
                    >

                        <img
                            src={item.productImg}
                            alt={item.productName}
                            style={{
                                width: "100%",
                                height: "250px",
                                objectFit: "cover"
                            }}
                        />

                        <div style={{
                            padding: "15px",
                            display: "flex",
                            flexDirection: "column",
                            flex: 1
                        }}>

                            <h2 style={{
                                fontSize: "18px",
                                margin: "0 0 10px"
                            }}>
                                {item.productName}
                            </h2>

                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                marginBottom: "10px"
                            }}>
                                <span style={{
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    color: "#e63946"
                                }}>
                                    ₹{item.discountPrice ?? item.price}
                                </span>

                                {item.discountPrice != null && (
                                    <span style={{
                                        textDecoration: "line-through",
                                        color: "#888"
                                    }}>
                                        ₹{item.price}
                                    </span>
                                )}
                            </div>

                            <p style={{ color: "#555" }}>
                                {item.description}
                            </p>

                            <div style={{
                                display: "flex",
                                gap: "8px",
                                flexWrap: "wrap",
                                margin: "15px 0"
                            }}>
                                {item.sizes?.map((size) => (
                                    <button className="btn-sizes"
                                        key={size}
                                        style={{
                                            padding: "7px 12px",
                                            border: "1px solid #ccc",
                                            backgroundColor: "#fff",
                                            cursor: "pointer",
                                            borderRadius: "4px"
                                        }}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>

                            <button style={{
                                marginTop: "auto",
                                padding: "12px",
                                backgroundColor: "#111",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                fontSize: "15px"
                            }}>
                                Add to Cart
                            </button>

                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};
