import React from "react";
import UserContextProvider from "./context/UserContext";
import Routes from "./routes/Routes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <UserContextProvider>
      <Routes/>
      <ToastContainer />
    </UserContextProvider>
  );
}
