import Home from "../pages/Home"
import AddBook from "../pages/AddBook"
import BookDetail from "../pages/BookDetail"



const routes=[
    {
        name:"/",
        element: ()=><Home />
    },
    {
        name: "/add-book",
        element: ()=><AddBook />
    }
]

export default routes