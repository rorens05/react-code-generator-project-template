import React from "react";
import UserContextProvider from "./context/UserContext";
import Routes from "./routes/Routes";
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <UserContextProvider>
      <Routes/>
      <ToastContainer />
    </UserContextProvider>
  );
}
