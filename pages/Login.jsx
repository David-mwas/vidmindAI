import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import useTypingEffect from "../hooks/useTypingEffect";
import { FaArrowAltCircleDown, FaGooglePlusG } from "react-icons/fa";
import Model from "../src/assets/brain-artificial-intelligence-ai-video-generator-removebg-preview.png";

export const Auth = () => {
  console.log(auth?.currentUser?.email);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      localStorage.setItem("isAuth", JSON.stringify(auth?.currentUser));
      window.location.href = "/";
      console.log(auth);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="bg-black h-screen flex flex-col items-center justify-center">
      <img
        src={Model}
        width={300}
        height={300}
        alt="logo"
        className="animate-pulse rounded-full z-20"
      />
      <p className="text-white mb-3 uppercase mt-6">
        {useTypingEffect("Wanna join the fun, sign in first!!", 10)}{" "}
      </p>
      <FaArrowAltCircleDown className="h-7 w-7 mx-auto mt-2 text-white animate-bounce" />
      <button
        className="flex align-middle justify-center items-center px-8 gap-2 font-bold text-xl text-white border border-white p-3 rounded-xl mt-4 bg-[#141e30] uppercase"
        onClick={() => signInWithGoogle()}
      >
        <span>
          <FaGooglePlusG className="h-8 w-8 text-white" />
        </span>
        <span>Sign In</span>
      </button>
    </div>
  );
};
