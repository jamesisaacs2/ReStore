import { Button, Menu, Fade, MenuItem } from "@mui/material";
import { useState } from "react";
import { signout } from "../../features/account/accountSlice";
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
			<Button color="inherit" onClick={handleClick} sx={{ typography: "h6" }}>
				{user?.email}
			</Button>
			<Menu anchorEl={anchorEl} open={open} onClose={handleClose} TransitionComponent={Fade}>
				<MenuItem onClick={handleClose}>Profile</MenuItem>
				<MenuItem onClick={handleClose}>My orders</MenuItem>
				<MenuItem onClick={() => dispatch(signout())}>Logout</MenuItem>
			</Menu>
		</>
	);
}
