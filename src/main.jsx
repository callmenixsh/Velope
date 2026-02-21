import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import './index.css';

import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer";

import Home from "./pages/home";
import Read from "./pages/read";
import Write from "./pages/write";
import Post from "./pages/post";
import Notfound from "./pages/notfound";

import ScrollToTop from "./ScrollToTop";

const Layout = ({ children }) => (
<div className="min-h-screen flex flex-col">
  <Navbar />
  <ScrollToTop />
  <main className="flex-grow min-h-full w-full">
    {children}
  </main>
  <Footer />
</div>

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
    path: "/write/:name",
    element: (
      <Layout>
        <Write />
      </Layout>
    ),
  },
  {
    path: "/read/:name",
    element: (
      <Layout>
        <Read />
      </Layout>
    ),
  },
  {
    path: "/post/:messageId",
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
