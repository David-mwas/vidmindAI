import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import useAuthToken from "../hooks/useAuth";

function NewChat() {
  const { getItem } = useAuthToken();
  const { userId } = getItem();
  const createNewChat = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/chats/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const chat = await response.json();
      console.log(chat);
      window.location.href = `/chats/${chat._id}`;
    } catch (error) {
      console.error("Error:", error.message);
      // Handle error appropriately, e.g., display error message to user
    }
  };
  return (
    <div
      onClick={createNewChat}
      className="flex border-2 border-slate-500 hover:bg-[#141e30] chatRow p-4 mb-4 text- hover:text-white"
    >
      <FaPlus className="h-4 w-4 " />
      <p>New Chat</p>
    </div>
  );
}

export default NewChat;
