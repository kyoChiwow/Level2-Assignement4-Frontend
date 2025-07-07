import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteBookMutation,
  useGetAllBooksQuery,
} from "@/redux/baseApi/baseApi";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import BorrowModal from "../BorrowSummary/borrowModal";

const AllBooks = () => {
  const [page, setPage] = useState(1);
  const [bookToDelete, setBookToDelete] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [borrowOpen, setBorrowOpen] = useState(false);
  const [borrowBookId, setBorrowBookId] = useState<string | null>(null);

  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();
  const { data, isLoading, isError } = useGetAllBooksQuery(
    { page, limit: 10, sortBy: "createdAt", sort: "desc" },
    {
      pollingInterval: 5000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  const allBooks = data?.data;
  const totalPages = data?.meta?.totalPages || 1;

  const tableHeader = [
    { id: "title", title: "Title" },
    { id: "author", title: "Author" },
    { id: "genre", title: "Genre" },
    { id: "isbn", title: "ISBN" },
    { id: "copies", title: "Copies" },
    { id: "availability", title: "Availability" },
    { id: "actions", title: "Actions" },
  ];

  const openDialog = (id: string) => {
    setBookToDelete(id);
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
    setBookToDelete(null);
  };

  const confirmDelete = async () => {
    if (!bookToDelete) return;
    try {
      await deleteBook(bookToDelete).unwrap();
      closeDialog();
      toast.success("Book deleted successfully!");
    } catch (error) {
      console.error("Failed to delete book", error);
      toast.error("Failed to delete book!");
    }
  };

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
    <div className="p-6 bg-white rounded-lg shadow-lg">
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
                <Link className="border" to={`/edit-book/${book._id}`}>
                  <Button variant={"outline"}>Edit Book</Button>
                </Link>
                <Button
                  onClick={() => openDialog(book._id)}
                  disabled={isDeleting}
                  variant={"outline"}
                >
                  Delete Book
                </Button>
                <Button
                  onClick={() => {
                    setBorrowBookId(book._id);
                    setBorrowOpen(true);
                  }}
                  variant={"outline"}
                >
                  Borrow Book
                </Button>
                {borrowBookId && (
                  <BorrowModal
                    open={borrowOpen}
                    setOpen={setBorrowOpen}
                    bookId={borrowBookId}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                isActive={page === i + 1}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              className={
                page === totalPages ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this book? This action cannot be
            undone.
          </DialogDescription>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllBooks;
