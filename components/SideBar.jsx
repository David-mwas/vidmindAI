// import { useSession, signOut } from "next-auth/react";
import React, { useEffect } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import ChatRow from "./ChatRow";
import NewChat from "./NewChat";
import { FaArrowCircleLeft, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

function SideBar() {
  const [closed, setClosed] = useState(false);
  const [chats, setChats] = useState();
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    setIsAuth(JSON.parse(localStorage.getItem("isAuth")));
  }, []);
  console.log(isAuth);
  useEffect(() => {
    const Unsubscribe = fetchChats();

    return () => Unsubscribe;
  }, []);
  const fetchChats = async () => {
    try {
      const response = await fetch("http://localhost:5001/chats/getall", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

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
      localStorage.removeItem("isAuth");
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
    }
  };
  // console.log(chats);
  return (
    <div
      className={`fixed transition-all duration-1000 ease-in-out ${
        closed ? "left-0" : "left-[-100%] "
      }  md:relative z-[9999] md:left-0  bg-indigo-300 min-w-[15rem] md:max-w-[15rem]`}
    >
      <button
        onClick={() => {
          setClosed(!closed);
        }}
        className="md:hidden outline-none shadow-lg text-white hover:opacity-50  top-3 right-4 fixed z-50 transition-all duration-1000 ease-in-out animate-pulse bg-[#141e30]"
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
                <p>Loading please...</p>
              </div>
            )}
            {/* map via chat rows*/}
            {chats?.map((chat) => (
              <ChatRow key={chat._id} id={chat._id} text={chat} />
            ))}
          </div>
        </div>
        {isAuth && (
          //https://lh3.googleusercontent.com/a/AGNmyxbQYWTSHXntFKiflGvMlZzlPx0b9jH3A9nob1-ccQ=s96-c
          <div className="flex flex-col space-y-5 pb-10 items-center">
            <img
              src={isAuth?.photoURL}
              alt={`${isAuth?.displayName} google pic`}
              className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50 shadow-lg shadow-black"
            />
            <p className="text-gray-200 text-sm">{isAuth?.displayName}</p>
            <button
              className="flex gap-1 border border-[#141e30] bg-[#141e30] chatRow p-4 mb-4 hover:opacity-75 px-5"
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
