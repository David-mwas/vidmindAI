// import { useSession, signOut } from "next-auth/react";
import React, { useEffect } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import ChatRow from "./ChatRow";
import NewChat from "./NewChat";
import { FaArrowCircleLeft, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import useAuthToken from "../hooks/useAuth";
function SideBar() {
  const [closed, setClosed] = useState(false);
  const [chats, setChats] = useState();
  const [loading, setLoading] = useState(true);
  const { clearAuthToken, getItem } = useAuthToken();
  const { token, userId } = getItem();
  console.log(token?.displayName);
  console.log(userId);
  // console.log(token.displayName);
  useEffect(() => {
    const Unsubscribe = fetchChats();

    return () => Unsubscribe;
  }, []);
  const fetchChats = async () => {
    // const userId = "65d87db52853191a62afaf43";
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/chats/${userId}/getall`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const chat = await response.json();
      setChats(chat);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  const signOut = async () => {
    try {
      await signOut(auth);
      clearAuthToken();
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`fixed transition-all duration-1000 ease-in-out ${
        closed ? "left-0" : "left-[-100%] "
      }  md:relative z-[9999] md:left-0  bg-slate-700 min-w-[15rem] md:max-w-[15rem]`}
    >
      <button
        onClick={() => {
          setClosed(!closed);
        }}
        className="md:hidden outline-none shadow-lg text-white hover:opacity-50  top-4 right-4 fixed z-50 transition-all duration-1000 ease-in-out animate-pulse border-2 border-slate-500 rounded-md px-1 py-1"
      >
        {!closed ? (
          <FaBars className="w-[40px] h-[40px] transition-all duration-1000 ease-in-out" />
        ) : (
          <FaTimes className="w-[40px] h-[40px] transition-all duration-1000 ease-in-out" />
        )}
      </button>
      <div className="flex flex-col  h-[100vh] p-2">
        <div className="flex-1">
          <div>
            {/* newchat */}

            <NewChat />

            {loading && (
              <div className="animate-pulse text-center text-white">
                <p className="text-[25px]">Loading please...</p>
              </div>
            )}
            {/* map via chat rows*/}
            {chats?.map((chat) => (
              <ChatRow key={chat._id} id={chat._id} text={chat} />
            ))}
          </div>
        </div>
        {token && (
          //https://lh3.googleusercontent.com/a/AGNmyxbQYWTSHXntFKiflGvMlZzlPx0b9jH3A9nob1-ccQ=s96-c
          <div className="flex flex-col space-y-5 pb-10 items-center">
            <img
              src={token?.photoURL}
              alt={`${token?.displayName} google pic`}
              className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50 shadow-lg shadow-black"
            />
            <p className="text-gray-200 text-sm">{token?.displayName}</p>
            <button
              className="flex gap-1 bg-blue-500 chatRow p-4 mb-4 hover:opacity-75 px-5"
              onClick={() => signOut()}
            >
              <FaArrowCircleLeft />
              <span className="uppercase "> Log Out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBar;
