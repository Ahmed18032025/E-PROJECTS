function ProductAdd(){
    return(
        <>
          <form action="/apiAddProduct" method="POST">
            <input type="text" name="name" placeholder="Product Name" />
            <input type="number" name="price" placeholder="Price" />
            <button type="submit">Add Product</button>
          </form>
        </>
    )
}

export default ProductAdd;