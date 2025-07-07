import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IBorrow } from "@/interface/borrow.interface";
import { useBorrowSummaryQuery } from "@/redux/baseApi/baseApi";
import { Link } from "react-router";

const BorrowSummary = () => {
  const { data, isLoading, isError } = useBorrowSummaryQuery(undefined);
  const allSummary = data?.summary;

  if (isLoading) {
    return <p className="p-6 text-center text-gray-500">Loading summary...</p>;
  }

  if (isError || !allSummary?.length) {
    return (
      <p className="p-6 text-center text-red-500">
        Failed to load summary or no data.
      </p>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">Borrow Summary</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Total Borrowed</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allSummary.map((entry: IBorrow, index: number) => (
            <TableRow key={index}>
              <TableCell>{entry.book.title}</TableCell>
              <TableCell>{entry.book.isbn}</TableCell>
              <TableCell>{entry.totalQuantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4">
        <Link to={"/books"}>
        <Button>All Books!</Button>
      </Link>
      </div>
    </div>
  );
};

export default BorrowSummary;
