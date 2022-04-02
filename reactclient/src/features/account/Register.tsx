import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Grid, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { Link, useHistory } from "react-router-dom";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";

export default function Register() {
	const history = useHistory();
	const {
		register,
		handleSubmit,
		setError,
		formState: { isSubmitting, errors, isValid },
	} = useForm({
		mode: "all",
	});

	function handleApiErrors(errors: any) {
		console.log("handleApiErrors: ", errors);
		if (errors) {
			errors.forEach((error: string) => {
				if (error.includes("Password")) {
					setError("password", { message: error });
				}
				if (error.includes("Email")) {
					setError("email", { message: error });
				}
				if (error.includes("Username")) {
					setError("username", { message: error });
				}
			});
		}
	}

	return (
		<Container
			component={Paper}
			maxWidth="sm"
			sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 4 }}
		>
			<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Register a new account
			</Typography>
			<Box
				component="form"
				onSubmit={handleSubmit((data) =>
					agent.Account.register(data)
						.then(() => {
							toast.success("Registration successful!  You can now log in");
							history.push("/login");
						})
						.catch((error) => handleApiErrors(error))
				)}
				noValidate
				sx={{ mt: 1 }}
			>
				<TextField
					margin="normal"
					fullWidth
					label="Email address"
					autoFocus
					{...register("email", {
						required: "A unique email is required",
						pattern: {
							value: /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
							message: "Not a valid email address",
						},
					})}
					error={!!errors.email}
					helperText={errors?.email?.message}
				/>
				<TextField
					margin="normal"
					fullWidth
					label="Username"
					{...register("username", {
						required: "Username is required",
						pattern: {
							value: /^([a-zA-Z0-9]{3,21})$/,
							message: "Username must be alphanumeric and 3-15 characters in length",
						},
					})}
					error={!!errors.username}
					helperText={errors?.username?.message}
				/>
				<TextField
					margin="normal"
					fullWidth
					label="Password"
					type="password"
					{...register("password", {
						required: "Password is required.",
						pattern: {
							value: /(?=^.{13,50}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_-}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
							message:
								"Password must be 13 characters or more, with at least 2 lowercase, 2 UPPERCASE, 2 numbers, and 2 special characters",
						},
					})}
					error={!!errors.password}
					helperText={errors?.password?.message}
				/>
				<LoadingButton
					loading={isSubmitting}
					disabled={!isValid}
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
				>
					Register
				</LoadingButton>
				<Grid container>
					<Grid item>
						<Link to="/login">{"Already have an account? Sign in here"}</Link>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}

/* Old code (versioning)

----- Typography over form fields (breaks width) ----

<Box>
	<Typography mt={2} sx={{ fontWeight: "light" }}>
		Enter your email:
	</Typography>
</Box>

<Box>
	<Typography mt={2} sx={{ fontWeight: "light" }}>
		Choose your username:
	</Typography>
</Box>

<Box>
	<Typography mt={2} sx={{ fontWeight: "light" }}>
		Enter a strong password:
	</Typography>
</Box>

----- Validation v1, under button -----

	const [validationErrors, setValidationErrors] = useState([]);

AND:
	
				{validationErrors.length > 0 && (
					<Alert severity="error">
						<AlertTitle>We have a small problem, Houston...</AlertTitle>
						<List>
							{validationErrors.map((error) => (
								<ListItem key={error}>
									<ListItemText>{error}</ListItemText>
								</ListItem>
							))}
						</List>
					</Alert>
				)}
*/
