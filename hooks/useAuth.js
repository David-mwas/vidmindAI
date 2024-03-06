import { useState } from "react";

const useAuthToken = () => {
  // Use state to store the authentication token
  const [authToken, setAuthToken] = useState(null);

  // Use useEffect to persist the token in local storage

  const getItem = () => {
    const token = localStorage.getItem("isAuth");

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
