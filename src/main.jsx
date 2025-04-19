import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import './index.css'

import Navbar from "./components/navbar";
import Footer from "./components/footer";

import Home from "./pages/home";
import Read from "./pages/read";
import Write from "./pages/write";
import Post from "./pages/post";
import Notfound from "./pages/notfound";

import ScrollToTop from "./ScrollToTop";



const Layout = ({ children }) => (
	<>
    <Navbar/>
		<ScrollToTop />
		{children}
    <Footer/>
	</>
);

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<Layout>
				<Home />
			</Layout>
		),
	},
  {
    path: '/home',
    element: <Navigate to="/" replace />,
  },
	{
		path: "/write",
		element: (
			<Layout>
				<Write />
			</Layout>
		),
	},
	{
		path: "/read",
		element: (
			<Layout>
				<Read />
			</Layout>
		),
	},
	{
		path: "/post",
		element: (
			<Layout>
				<Post />
			</Layout>
		),
	},
	{
		path: "*",
		element: (
			<Layout>
				<Notfound />
			</Layout>
		),
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
