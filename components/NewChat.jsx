import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa";

function NewChat() {
  const createNewChat = async () => {
    try {
      const response = await fetch("http://localhost:5001/chats/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "65d87db52853191a62afaf43",
        }),
      });

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
      className="flex border border-[#141e30] hover:bg-[#141e30] chatRow p-4 mb-4 text-black hover:text-white"
    >
      <FaPlus className="h-4 w-4 " />
      <p>New Chat</p>
    </div>
  );
}

export default NewChat;
