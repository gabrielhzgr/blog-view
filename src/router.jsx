import { createBrowserRouter } from "react-router";
import App from "./App.jsx";
import ErrorPage from "./routes/ErrorPage/ErrorPage.jsx";
import Home from "./routes/Home/Home.jsx";
import Blogs from "./routes/Blogs/Blogs.jsx";
import Blog from "./routes/Blog/Blog.jsx";
import Comments from "./Components/Comments/Comments.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "blogs",
        children: [
          { index: true, element: <Blogs /> },
          {
            path: ":id",
            element: <Blog />,
            children: [{ index: true, element: <Comments /> }],
          },
        ],
      },
    ],
  },
]);

export default router;
