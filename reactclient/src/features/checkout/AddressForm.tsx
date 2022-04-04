import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AppTextInput from "../../app/components/AppTextInput";
import { useFormContext } from "react-hook-form";
import AppCheckbox from "../../app/components/AppCheckbox";

export default function AddressForm() {
	const { control, formState } = useFormContext();
	return (
		<>
			<Typography variant="h6">Shipping address</Typography>
			<Typography
				variant="body2"
				align="right"
				display="block"
				sx={{ fontWeight: "light", fontStyle: "italic" }}
				mb={2}
			>
				* indicates a required field
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={12}>
					<AppTextInput control={control} name="fullName" label="* Full name" />
				</Grid>
				<Grid item xs={12} sm={6}>
					<AppTextInput control={control} name="address1" label="* Address line 1" />
				</Grid>
				<Grid item xs={12} sm={6}>
					<AppTextInput control={control} name="address2" label="Address line 2" />
				</Grid>
				<Grid item xs={12} sm={6}>
					<AppTextInput control={control} name="city" label="* City" />
				</Grid>
				<Grid item xs={12} sm={6}>
					<AppTextInput
						control={control}
						name="state"
						label="* State / Province or region"
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<AppTextInput control={control} name="zip" label="* Zip / Postal code" />
				</Grid>
				<Grid item xs={12} sm={6}>
					<AppTextInput control={control} name="country" label="* Country" />
				</Grid>
				<Grid item xs={12}>
					<AppCheckbox
						disabled={!formState.isDirty}
						name="saveAddresss"
						label="Save this address as the default for payment"
						control={control}
					/>
				</Grid>
			</Grid>
		</>
	);
}

/*

----- AppCheckbox replaces: -----

					<FormControlLabel
						control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
						label="Use this address for payment details"
					/>
					
*/
