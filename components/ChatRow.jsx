import useTypingEffect from "../hooks/useTypingEffect";
// import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FaSnapchat, FaTrash } from "react-icons/fa";
import { PiChatsDuotone } from "react-icons/pi";

function ChatRow({ id, text }) {
  const { pathname } = useLocation();
  console.log(pathname);
  //   const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const textMessage = useTypingEffect(text.title || "New chat", 100);
  useEffect(() => {
    setActive(pathname.includes(id));
    if (!pathname) return;
  }, [pathname]);

  const removeChat = async () => {
    try {
      const response = await fetch(
        `https://vidmind-backened.vercel.app/chats/delete/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      window.location.href = "/";
      // if (response.ok) {

      // }
    } catch (error) {
      console.error("Error:", error.message);
      // Handle error appropriately, e.g., display error message to user
    }
  };
  return (
    <div className="flex gap-4 w-full justify-between items-center relative">
      <a
        href={`/chats/${id}`}
        className={`w-[73%] chatRow justify-center p-2 m-[4px] px-4 ${
          active && "bg-slate-500 text-white"
        }`}
      >
        <PiChatsDuotone
          className={`h-5 w-5 text-white ${active && "text-[#aaa]"}`}
        />
        <p
          className={`flex-1 inline-flex truncate text-[#eee] ${
            active && "text-[#eee]"
          }`}
        >
          {textMessage}
        </p>
      </a>

      <div
        className={` absolute right-0 " w-[20%] chatrow px-6 py-2`}
        onClick={removeChat}
      >
        <FaTrash className="text-red-300 cursor-pointer px-2 w-8 h-5 hover:text-red-600 " />
      </div>
    </div>
  );
}

export default ChatRow;
