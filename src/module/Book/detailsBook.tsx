import { Button } from "@/components/ui/button";
import { useGetSingleBookQuery } from "@/redux/baseApi/baseApi";
import { Link, useParams } from "react-router";

const DetailsBook = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetSingleBookQuery(id, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const book = data?.book;

  if (isLoading) {
    return (
      <p className="p-6 text-center text-gray-500">Loading book details...</p>
    );
  }

  if (isError || !book) {
    return (
      <div className="flex flex-col justify-center items-center">
        <p className="p-6 text-center text-red-500">Book not found.</p>
        <Link to={"/books"}>
          <Button>Go Back!</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg text-center flex flex-col gap-2 shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">{book.title}</h1>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Genre:</strong> {book.genre}
      </p>
      <p>
        <strong>ISBN:</strong> {book.isbn}
      </p>
      <p>
        <strong>Copies:</strong> {book.copies}
      </p>
      <p>
        <strong>Status:</strong> {book.copies > 0 ? "Available" : "Unavailable"}
      </p>
      <p>
        <strong>Description:</strong> {book.description}
      </p>

      <Link to={"/books"}>
        <Button>Go Back!</Button>
      </Link>
    </div>
  );
};

export default DetailsBook;
