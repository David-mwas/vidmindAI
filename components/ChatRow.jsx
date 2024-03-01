import useTypingEffect from "../hooks/useTypingEffect";
// import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FaSnapchat, FaTrash } from "react-icons/fa";
import { PiChatsDuotone } from "react-icons/pi";

function ChatRow({ id, text }) {
  const { pathname } = useLocation();
  // console.log(text.title);
  //   const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const textMessage = useTypingEffect(
    text.title || "New chat",
    100
  );
  useEffect(() => {
    if (!pathname) return;

    setActive(pathname.includes(id));
  }, [pathname]);

  const removeChat = async () => {
    try {
      const response = await fetch(`http://localhost:5001/chats/delete/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      window.location.href = "/";
    } catch (error) {
      console.error("Error:", error.message);
      // Handle error appropriately, e.g., display error message to user
    }
  };
  return (
    <a
      href={`/chats/${id}`}
      className={`chatRow justify-center p-2 m-[4px] ${
        active && "bg-[#141e30] text-white"
      }`}
    >
      <PiChatsDuotone
        className={`h-5 w-5 text-[#3b4b67] ${active && "text-[#aaa]"}`}
      />
      <p
        className={`flex-1 inline-flex truncate text-[#141e30] ${
          active && "text-[#aaa]"
        }`}
      >
        {textMessage}
      </p>
      <FaTrash
        onClick={removeChat}
        className={`h-5 w-5 text-gray-800 hover:text-red-700 ${
          active && "text-white/60"
        }`}
      />
    </a>
  );
}

export default ChatRow;
