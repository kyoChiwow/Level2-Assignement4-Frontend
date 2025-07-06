import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  useGetSingleBookQuery,
  useUpdateBookMutation,
} from "@/redux/baseApi/baseApi";
import { useEffect } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetSingleBookQuery(id, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const book = data?.book;

  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const form = useForm();

  useEffect(() => {
    if (book) {
      form.reset({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        copies: book.copies,
      });
    }
  }, [book, form]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await updateBook({ id, body: data }).unwrap();
      toast.success("Book Updated Successfully!");
      navigate("/books");
    } catch (error) {
      console.error("Update Failed!", error);
      toast.error("Failed to update book!");
    }
  };

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
    <div className="bg-white p-6 rounded-lg">
      <div className="mb-4">
        <h1 className="text-center font-semibold text-xl">Edit Book</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Book Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Book Author</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Book Genre</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isbn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Book ISBN</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="copies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Book Copies</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update Book"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditBook;
