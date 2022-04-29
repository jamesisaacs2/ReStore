import { LoadingButton } from "@mui/lab";
import { Typography, Grid, Paper, Box, Button } from "@mui/material";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import agent from "../../app/api/agent";
import AppDropzone from "../../app/components/AppDropzone";
import AppSelectList from "../../app/components/AppSelectList";
import AppTextInput from "../../app/components/AppTextInput";
import useProducts from "../../app/hooks/useProducts";
import { Product } from "../../app/models/product";
import { useAppDispatch } from "../../app/store/configureStore";
import { setProduct } from "../catalog/catalogSlice";

interface Props {
	product?: Product;
	cancelEdit: () => void;
}

export default function ProductForm({ product, cancelEdit }: Props) {
	const {
		control,
		reset,
		handleSubmit,
		watch,
		formState: { isDirty, isSubmitting },
	} = useForm();
	const { brands, types } = useProducts();
	const dispatch = useAppDispatch();
	const watchFile = watch("file", null);

	useEffect(() => {
		if (product && !watchFile && !isDirty) reset(product);
		return () => {
			if (watchFile) URL.revokeObjectURL(watchFile.preview);
		};
	}, [product, reset, watchFile, isDirty]);

	async function handleSubmitFormData(data: FieldValues) {
		try {
			let response: Product;
			if (product) {
				response = await agent.Admin.updateProduct(data);
			} else {
				response = await agent.Admin.createProduct(data);
			}
			dispatch(setProduct(response));
			cancelEdit();
		} catch (error) {
			console.log("f-handleSubmitFormData ", error);
		}
	}

	return (
		<Box component={Paper} sx={{ p: 4 }}>
			<Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
				Product Details
			</Typography>
			<form onSubmit={handleSubmit(handleSubmitFormData)}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={12}>
						<AppTextInput control={control} name="name" label="Product name" />
					</Grid>
					<Grid item xs={12} sm={6}>
						<AppSelectList
							control={control}
							items={brands}
							name="brand"
							label="Brand"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<AppSelectList
							control={control}
							items={types}
							name="type"
							label="Type"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<AppTextInput
							type="number"
							control={control}
							name="price"
							label="Price"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<AppTextInput
							type="number"
							control={control}
							name="quantityInStock"
							label="Quantity in Stock"
						/>
					</Grid>
					<Grid item xs={12}>
						<AppTextInput
							multiline={true}
							rows={4}
							control={control}
							name="description"
							label="Description"
						/>
					</Grid>
					<Grid item xs={12}>
						<Box
							display="flex"
							justifyContent="space-between"
							alignItems="center"
						>
							<AppDropzone control={control} name="file" />
							{watchFile ? (
								<img
									src={watchFile.preview}
									alt="preview"
									style={{ maxHeight: 150 }}
								/>
							) : (
								<img
									src={product?.pictureUrl}
									alt={product?.name}
									style={{ maxHeight: 150 }}
								/>
							)}
						</Box>
					</Grid>
				</Grid>
				<Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
					<Button onClick={cancelEdit} variant="contained" color="inherit">
						Cancel Edits
					</Button>
					<LoadingButton
						loading={isSubmitting}
						type="submit"
						variant="contained"
						color="success"
					>
						Submit Changes
					</LoadingButton>
				</Box>
			</form>
		</Box>
	);
}
