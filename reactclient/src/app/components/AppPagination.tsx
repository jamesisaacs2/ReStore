import { Box, Typography, Pagination } from "@mui/material";
import { MetaData } from "../models/pagination";

interface Props {
	metaData: MetaData;
	onPageChange: (page: number) => void;
}

export default function AppPagination({ metaData, onPageChange }: Props) {
	const { currentPage, totalCount, totalPages, pageSize } = metaData;
	const currentItem = (currentPage - 1) * pageSize + 1;
	const currentCount =
		currentPage * pageSize > totalCount ? totalCount : currentPage * pageSize;
	return (
		<Box display="flex" justifyContent="space-between" alignItems="center">
			<Typography>
				Displaying {currentItem} - {currentCount} of {totalCount} items
			</Typography>
			<Pagination
				color="secondary"
				size="large"
				count={totalPages}
				page={currentPage}
				onChange={(e, page) => onPageChange(page)}
			/>
		</Box>
	);
}
