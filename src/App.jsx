import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import Home from "../src/components/Home";
import ExchangeRate from "../src/components/ExchangeRate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/exchangerate",
    element: <ExchangeRate />,
  },
]);

const App = () => {
  return (
    <RouterProvider router={router}>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
        
        <Route path="/" element={<Home />} />
        <Route path="/exchangerate" element={<ExchangeRate />} />
      </div>
    </RouterProvider>
  );
};
export default App;
