import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllBooksQuery } from "@/redux/baseApi/baseApi";
import { Link } from "react-router";

const AllBooks = () => {
  const { data, isLoading, isError } = useGetAllBooksQuery(undefined, {
    pollingInterval: 5000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const allBooks = data?.data;

  const tableHeader = [
    { id: "title", title: "Title" },
    { id: "author", title: "Author" },
    { id: "genre", title: "Genre" },
    { id: "isbn", title: "ISBN" },
    { id: "copies", title: "Copies" },
    { id: "availability", title: "Availability" },
    { id: "actions", title: "Actions" },
  ];

  console.log({ data, isLoading, isError });

  if (isLoading) {
    return <p className="p-6 text-center text-gray-500">Loading books...</p>;
  }

  if (isError) {
    return (
      <p className="p-6 text-center text-red-500">Failed to load books.</p>
    );
  }

  if (!Array.isArray(allBooks) || allBooks.length === 0) {
    return <p className="p-6 text-center text-gray-500">No books available.</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">All Books</h1>

      <Table>
        <TableHeader>
          {tableHeader.map((column) => (
            <TableHead key={column.id}>{column.title}</TableHead>
          ))}
        </TableHeader>

        <TableBody>
          {allBooks.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.copies}</TableCell>
              <TableCell>
                {book.copies > 0 ? "Available" : "Unavailable"}
              </TableCell>
              <TableCell className="space-x-2">
                <Link className="border" to={`/books/${book._id}`}>
                  <Button variant={"outline"}>Details</Button>
                </Link>
                <Button variant={"outline"}>Edit Book</Button>
                <Button variant={"outline"}>Delete Book</Button>
                <Button variant={"outline"}>Borrow Book</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllBooks;
