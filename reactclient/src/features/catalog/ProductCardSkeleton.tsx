import { Card, CardContent, CardHeader, Grid, Skeleton } from "@mui/material";

export default function ProductCardSkeleton() {
	return (
		<Grid item xs component={Card}>
			<CardHeader
				avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
				title={
					<Skeleton animation="wave" height={15} width="70%" style={{ marginBottom: 6 }} />
				}
			/>
			<Skeleton sx={{ height: 140 }} animation="wave" variant="rectangular" />
			<CardContent>
				<>
					<Skeleton animation="wave" height={25} width="35%" style={{ marginBottom: 9 }} />
					<Skeleton animation="wave" height={15} width="45%" />
				</>
			</CardContent>
			<CardContent>
				<>
					<Skeleton animation="wave" height={15} width="60%" />
				</>
			</CardContent>
		</Grid>
	);
}
