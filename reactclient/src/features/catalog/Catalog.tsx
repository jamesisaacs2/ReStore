import { useState, useEffect } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

export default function Catalog() {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		//js fethc method, not best...
		fetch("http://localhost:5000/api/Products")
			.then((response) => response.json())
			.then((data) => setProducts(data));
	}, []);

	return (
		<>
			<ProductList products={products} />
		</>
	);
}

/* the dependency at end of State ( [] ) is ESSENTIAL!! Without it, useEffect runs  
	everytime the component renders/rerenders, or enters into data call loop.  Empty 
	array dependency ensures it is only called once.

	function addProduct() {
		//setProducts([...products, { name: "product3", price: 300.0 }]);
		setProducts((prevState) => [
			...prevState,
			{
				id: prevState.length + 101,
				name: "product" + (prevState.length + 1),
				price: prevState.length * 100 + 100,
				brand: "some brand",
				description: "a description",
				pictureUrl: "https://www.picsum.photos/200",
			},
		]);
	}
	
		<Button variant="contained" onClick={addProduct}>
			Add product
		</Button> 

	*/
