import DetailsBook from "@/module/Book/detailsBook";
import AddBook from "@/pages/AddBook/addBook";
import AllBooks from "@/pages/AllBooks/allBooks";
import BorrowSummary from "@/pages/BorrowSummary/borrowSummary";
import Layout from "@/pages/Layout/layout";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        children: [
            {
                path: '/books',
                Component: AllBooks,
            },
            {
                path: '/create-book',
                Component: AddBook,
            },
            {
                path: '/borrow-summary',
                Component: BorrowSummary,
            },
            {
                path: '/books/:id',
                Component: DetailsBook,
            },
        ]
    }
])

export default router;