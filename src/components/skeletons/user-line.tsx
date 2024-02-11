import { Skeleton } from "../ui/skeleton";
import { TableCell, TableRow } from "../ui/table";

interface UserLineProps {
	uniqueKey: number;
}

const getRandomLength = (min: number, max: number) => {
	const random = Math.random();
	return min + Math.floor(random * (max - min));
};

export const UserLineSkeleton = ({ uniqueKey }: UserLineProps) => {
	const length1 = getRandomLength(100, 200);
	const length2 = getRandomLength(50, 200);
	const length3 = getRandomLength(50, 80);

	return (
		<TableRow key={uniqueKey}>
			<TableCell>
				<Skeleton className="h-4 my-1" style={{ width: `${length1}px` }} />
			</TableCell>
			<TableCell>
				<Skeleton className="h-5 w-5" />
			</TableCell>
			<TableCell>
				<Skeleton className="h-4" style={{ width: `${length2}px` }} />
			</TableCell>
			<TableCell>
				<Skeleton className="h-4" style={{ width: `${length3}px` }} />
			</TableCell>
			<TableCell>
				<Skeleton className="h-5 w-5" />
			</TableCell>
		</TableRow>
	);
};
