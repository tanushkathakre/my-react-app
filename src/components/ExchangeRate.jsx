import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ExchangeRate = () => {
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const fetchExchangeRates = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("apikey", "49xJMlTdcjVFg3y3nsI3Sh5Ik38uCkul");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(
        "https://api.apilayer.com/exchangerates_data/latest?base=INR",
        requestOptions
      );
      const result = await response.json();

      console.log("API Response:", result); // Logging the API response for verification

      if (result.success) {
        setExchangeRates(result.rates); // Set exchange rates from API response
      } else {
        toast.error("Failed to fetch exchange rates.");
      }
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      toast.error("Failed to fetch exchange rates.");
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
      <h1 className="text-3xl mb-4">Exchange Rates</h1>
      <div className="bg-gray-800 p-6 rounded shadow-md w-full max-w-md">
        <table className="w-full table-auto border-collapse border border-gray-700">
          <thead>
            <tr>
              <th className="border border-gray-700 px-4 py-2">Currency</th>
              <th className="border border-gray-700 px-4 py-2">Exchange Rate</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(exchangeRates).map((currency) => (
              <tr key={currency}>
                <td className="border border-gray-700 px-4 py-2">{currency}</td>
                <td className="border border-gray-700 px-4 py-2">
                  ₹{exchangeRates[currency].toFixed(2)} INR
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
    <Footer/>
    </>
    
  );
};

export default ExchangeRate;
