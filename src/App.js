import React from "react";
import UserContextProvider from "./context/UserContext";
import Routes from "./routes/Routes";

export default function App() {
  return (
    <UserContextProvider>
      <Routes/>
    </UserContextProvider>
  );
}
