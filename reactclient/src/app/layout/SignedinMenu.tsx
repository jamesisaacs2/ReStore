import { Button, Menu, Fade, MenuItem } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { signout } from "../../features/account/accountSlice";
import { clearBasket } from "../../features/basket/basketSlice";
import { useAppDispatch, useAppSelector } from "../store/configureStore";

export default function SignedinMenu() {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.account);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (e: any) => {
		setAnchorEl(e.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Button
				color="inherit"
				onClick={handleClick}
				sx={{ typography: "h7", bgcolor: "secondary.main", ml: 1 }}
			>
				{user?.email}
			</Button>
			<Menu anchorEl={anchorEl} open={open} onClose={handleClose} TransitionComponent={Fade}>
				<MenuItem onClick={handleClose} sx={{ typography: "body2" }}>
					Profile
				</MenuItem>
				<MenuItem
					component={Link}
					to="/orders"
					onClick={handleClose}
					sx={{ typography: "body2" }}
				>
					My orders
				</MenuItem>
				<MenuItem
					onClick={() => {
						dispatch(signout());
						dispatch(clearBasket());
					}}
					sx={{ typography: "body2" }}
				>
					Logout
				</MenuItem>
			</Menu>
		</>
	);
}
