import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";
import ProductList from "./ProductList";

export default function Catalog() {
	const products = useAppSelector(productSelectors.selectAll);
	const { productsLoaded, status } = useAppSelector((state) => state.catalog);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!productsLoaded) dispatch(fetchProductsAsync());
	}, [productsLoaded, dispatch]);

	if (status.includes("pending")) return <LoadingComponent message="Loading products..." />;

	return (
		<>
			<ProductList products={products} />
		</>
	);
}

/* the dependency at end of State ( [] ) is ESSENTIAL!! Without it, useEffect runs  
	everytime the component renders/rerenders, or enters into data call loop.  Empty 
	array dependency ensures it is only called once.

	v2:
	const [products, setProducts] = useState<Product[]>([]);
	
	v1:
	
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
