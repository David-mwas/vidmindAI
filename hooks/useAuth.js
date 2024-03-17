import { useState } from "react";

const useAuthToken = () => {
  const getItem = () => {
    const data = JSON.parse(localStorage.getItem("isAuth"));
    const token = data?.currentUser;
    return { token };
  };

  const clearAuthToken = () => {
    // Remove the token from local storage
    localStorage.removeItem("isAuth");
  };

  // Return the token and functions to update and clear it
  return { clearAuthToken, getItem };
};

export default useAuthToken;
