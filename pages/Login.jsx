import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import useTypingEffect from "../hooks/useTypingEffect";
import { FaArrowAltCircleDown, FaGooglePlusG } from "react-icons/fa";
import Model from "../src/assets/brain-artificial-intelligence-ai-video-generator-removebg-preview.png";
import useAuthToken from "../hooks/useAuth";
export const Auth = () => {
   const title = useTypingEffect("VidMind", 70);
  const { getItem } = useAuthToken();
  const { token } = getItem();
  useEffect(() => {
    if (token) {
      window.location.href = "/";
    }
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      localStorage.setItem("isAuth", JSON.stringify(auth?.currentUser));
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="bg-slate-800 h-screen flex flex-col items-center justify-center gap-4 space-y-4">
     
      <img
        src={Model}
        width={300}
        height={300}
        alt="logo"
        className="animate-pulse rounded-full z-20 md:w-[600px] w-[80%]"
      />
      <p className="text-white mb-3 uppercase mt-6 text-center">
        {useTypingEffect("Wanna join the fun, sign in to vidMind first!!", 2)}{" "}
      </p>
      <FaArrowAltCircleDown className="h-7 w-7 mx-auto mt-2 text-white animate-bounce" />
      <button
        className="flex align-middle justify-center items-center px-8 gap-2 font-semibold text-lg text-white border border-white p-3 rounded-xl mt-4 bg-[#141e30] capitalize"
        onClick={() => signInWithGoogle()}
      >
        <span>
          <FaGooglePlusG className="h-8 w-8 text-white" />
        </span>
        <span>Sign In With Google</span>
      </button>
    </div>
  );
};
