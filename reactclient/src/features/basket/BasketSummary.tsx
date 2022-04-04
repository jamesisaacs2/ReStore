import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";

interface Props {
	subtotal?: number;
}

export default function BasketSummary({ subtotal }: Props) {
	const { basket } = useAppSelector((state) => state.basket);

	if (subtotal === undefined)
		subtotal = basket?.items.reduce((sum, item) => sum + item.quantity * item.price, 0) ?? 0;

	const deliveryFee = subtotal > 10000 ? 0 : 700;

	return (
		<>
			<TableContainer component={Paper} variant={"outlined"} sx={{ mt: 4 }}>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell colSpan={2}>Subtotal *</TableCell>
							<TableCell align="right">
								<span>{currencyFormat(subtotal)}</span>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell colSpan={2}>Delivery Fee *</TableCell>
							<TableCell align="right">
								<span style={{ fontStyle: "italic" }}>
									{currencyFormat(deliveryFee)}
								</span>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell colSpan={2}>Total</TableCell>
							<TableCell align="right">
								<span style={{ fontWeight: "bold", fontSize: "h6.fontSize" }}>
									{currencyFormat(subtotal + deliveryFee)}
								</span>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<span style={{ fontStyle: "italic" }}>
									* Orders over $100 qualify for free shipping
								</span>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
