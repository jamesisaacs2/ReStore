//import React from "react";
//import "./App.css";
//import { textChangeRangeIsUnchanged } from "typescript";

import { useEffect, useState } from "react";
import { Product } from "./models/product";
import Catalog from "../features/catalog/Catalog";
import { Typography } from "@mui/material";

function App() {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		//js method... not best
		fetch("http://localhost:5000/api/Products")
			.then((response) => response.json())
			.then((data) => setProducts(data));
	}, []);
	/* the dependency is ESSENTIAL ( [] ), without it, useEffect runs everytime 
	the component renders/rerenders, or enters into data call loop.  Empty array
	dependency ensures it is only called once */

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

	return (
		<>
			<Typography>Re-Store</Typography>
			<Catalog products={products} addProduct={addProduct} />
		</>
	);
}

export default App;
