import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const Home = () => {
  const [budget, setBudget] = useState(0);
  const [months] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [inputName, setInputName] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [inputType, setInputType] = useState("expense");
  const [editIndex, setEditIndex] = useState(null);
  const [currency, setCurrency] = useState("INR"); // Default currency is INR (Indian Rupees)
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = months[currentDate.getMonth()];
    setSelectedMonth(currentMonth);
    fetchExchangeRates(); // Fetch exchange rates on component mount
  }, []);

  // Function to fetch exchange rates from the API
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

  // Function to convert amount to INR
  const convertToINR = (amount, fromCurrency) => {
    if (fromCurrency === "INR") {
      return amount; // No conversion needed if already in INR
    } else {
      const rate = exchangeRates[fromCurrency];
      return amount / rate; // Convert amount to INR using the exchange rate
    }
  };

  const totalExpenses = expenses
    .filter((expense) => expense.type === "expense")
    .reduce((total, expense) => total + expense.amount, 0);

  const totalEarnings = expenses
    .filter((expense) => expense.type === "earning")
    .reduce((total, expense) => total + expense.amount, 0);

  const remainingBudget = budget + totalEarnings - totalExpenses;

  const handleAddOrUpdate = () => {
    if (inputName && inputAmount) {
      const amountInINR = convertToINR(parseFloat(inputAmount), currency);
      const newRecord = { name: inputName, amount: amountInINR, type: inputType };

      if (editIndex !== null) {
        const updatedExpenses = expenses.map((expense, index) =>
          index === editIndex ? newRecord : expense
        );
        setExpenses(updatedExpenses);
        setEditIndex(null);
        toast.success("Expense updated successfully!");
      } else {
        setExpenses([...expenses, newRecord]);
        toast.success("Expense added successfully!");
      }

      setInputName("");
      setInputAmount("");
    } else {
      toast.error("Please fill in all fields!");
    }
  };

  const handleEdit = (index) => {
    setInputName(expenses[index].name);
    setInputAmount(expenses[index].amount.toString());
    setInputType(expenses[index].type);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
    toast.success("Expense deleted successfully!");
  };

  const handleReset = () => {
    setBudget(0);
    setExpenses([]);
    setInputName("");
    setInputAmount("");
    setInputType("expense");
    setEditIndex(null);
    toast.success("Data reset successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
      <Navbar
        months={months}
        selectedMonth={selectedMonth}
        onSelectMonth={setSelectedMonth}
        onReset={handleReset}
        currency={currency}
        onCurrencyChange={setCurrency}
      />

      <div className="bg-gray-800 p-6 rounded shadow-md w-full max-w-md mb-6">
        <h2 className="text-2xl mb-4">Set Budget</h2>
        <input
          type="number"
          className="w-full p-2 border rounded mb-4 bg-gray-700 text-white"
          placeholder="Enter total budget"
          value={budget}
          onChange={(e) => setBudget(parseFloat(e.target.value))}
        />

        <h2 className="text-2xl mb-4">
          {editIndex !== null ? "Edit" : "Add"} Record
        </h2>
        <input
          type="text"
          className="w-full p-2 border rounded mb-2 bg-gray-700 text-white"
          placeholder="Name"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        <input
          type="number"
          className="w-full p-2 border rounded mb-2 bg-gray-700 text-white"
          placeholder="Amount"
          value={inputAmount}
          onChange={(e) => setInputAmount(e.target.value)}
        />
        <select
          className="w-full p-2 border rounded mb-4 bg-gray-700 text-white"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="INR">INR</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="JPY">JPY</option>
        </select>

        <select
          className="w-full p-2 border rounded mb-4 bg-gray-700 text-white"
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
        >
          <option value="expense">Expense</option>
          <option value="earning">Earning</option>
        </select>
        <button
          className="bg-green-500 text-white p-2 rounded w-full"
          onClick={handleAddOrUpdate}
        >
          {editIndex !== null ? "Update" : "Add"} Record
        </button>
      </div>

      <div className="bg-gray-800 p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4">Records</h2>
        <ul className="mb-4">
          {expenses.map((expense, index) => (
            <li
              key={index}
              className={`mb-2 p-2 rounded ${
                expense.type === "earning" ? "bg-green-400" : "bg-red-500"
              } flex justify-between items-center`}
            >
              <span>
                {expense.name}: ₹{expense.amount.toFixed(2)} INR
              </span>
              <span>
                <button
                  className="text-blue-500 mr-2"
                  onClick={() => handleEdit(index)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-white"
                  onClick={() => handleDelete(index)}
                >
                  <FaTrashAlt />
                </button>
              </span>
            </li>
          ))}
        </ul>
        <div className="text-xl">
          <p>
            Total Expenses: ₹{totalExpenses.toFixed(2)} INR
          </p>
          <p>
            Total Earnings: ₹{totalEarnings.toFixed(2)} INR
          </p>
          <p>
            Remaining Budget: ₹{remainingBudget.toFixed(2)} INR
          </p>
        </div>
      </div>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Home;
