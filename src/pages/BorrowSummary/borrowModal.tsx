import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useBorrowMutation } from "@/redux/baseApi/baseApi";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface BorrowModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  bookId: string | null;
}

const BorrowModal = ({ open, setOpen, bookId }: BorrowModalProps) => {
  const [borrow, { isLoading }] = useBorrowMutation();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      quantity: 1,
      dueDate: undefined,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    if (!bookId) return toast.error("No book selected.");

    const payload = {
      quantity: Number(values.quantity),
      dueDate: values.dueDate,
    };

    try {
      await borrow({ id: bookId, body: payload }).unwrap();
      toast.success("Book borrowed successfully!");
      setOpen(false);
      navigate("/borrow-summary");
    } catch (error) {
      console.error("Failed to borrow book", error);
      toast.error("Failed to borrow book!");
    }
  };

  useEffect(() => {
    if (open) {
      form.reset({
        quantity: 1,
        dueDate: undefined,
      });
    }
  }, [open, form]);

  if (isLoading) {
    return <p className="p-6 text-center text-gray-500">Loading...</p>;
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Borrow Book</DialogTitle>
            <DialogDescription>
              Fill in the quantity and due date to borrow this book.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Due Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Borrowing..." : "Confirm Borrow"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BorrowModal;
