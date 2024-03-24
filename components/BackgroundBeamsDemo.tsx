"use client";
import React from "react";
import { BackgroundBeams } from "./ui/background-beams";
import Lapi from "./Lapi";
import { GoArrowRight } from "react-icons/go";
import { motion } from "framer-motion";
import useTypingEffect from "../hooks/useTypingEffect";
export function BackgroundBeamsDemo() {
  const title = useTypingEffect("VidMind", 70);
  return (
    <div className="md:h-[40rem] w-full rounded-md bg-slate-800 relative flex flex-col items-center justify-center antialiased p-6 md:gap- pt-8">
      <h1 className="relative z-10 text-5xl  bg-clip-text text-transparent bg-gradient-to-b from-indigo-300 to-[#9ae9e9]  md:text-center font-sans font-bold mb-2  w-full text-left">
        {title}
      </h1>
      <p className="text-2xl md:font-extrabold lg:leading-[2.9rem] font-bold text-white leading-10 md:text-center w-full mb-8 md:mb-6 md:mb-0 text-left">
        <span className="text-[#9ae9e9]"> Your video AI</span>
        <span className="text-indigo-300 mx-2"> companion</span>
      </p>
      <div className="flex md:flex-row items-center justify-center  flex-col md:gap-6">
        <motion.div
          className=" w-full md:w-[45%]  z-20 space-y-4 flex items-center justify-center flex-row"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 0.5,
          }}
        >
          <p
            className="text-neutral-300  text-[22px] relative z-10 text-left md:w-[100%] md:text-[25px]
          md:mb-[30px] "
          >
            <span className="text-indigo-300">Summarize and analyse</span>{" "}
            YouTube video content, providing users with{" "}
            <span className="text-[#9ae9e9]"> concise summaries </span>,
            <span className="text-indigo-300 mx-2">
              key insights and extract key
            </span>{" "}
            information using{" "}
            <span className="text-[#9ae9e9]">text embeddings</span> and{" "}
            <span className="text-indigo-300">natural language processing</span>{" "}
            techniques
          </p>

          {/* <a
              // initial={{ x: "-100%", opacity: 0 }}
              // animate={{ x: 0, opacity: 1 }}
              // transition={{
              //   ease: "easeInOut",
              //   duration: 0.6,
              // }}
              href="/chats"
              className="flex gap-2 items-center  py-2 px-4 bg-gradient-to-l from-indigo-500 to-[#9ae9e9] rounded-full uppercase   hover:gap-5 shadow-sm shadow-[#b2f8f8] transition-all duration-500 ease-in-out hover:bg-gradient hover:from-purple-500 hover:to-[#9ae9e9] w-[280px]  text-[15px] font-bold text-white mt-4 cursor-pointer text-left justify-center"
            >
              Get Started <GoArrowRight className="w-5 h-5" />
            </a> */}
        </motion.div>
        <motion.div
          className="w-full md:w-[40%] mt-4 z-20 "
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 0.5,
          }}
        >
          <Lapi />
        </motion.div>
      </div>
      <BackgroundBeams />
    </div>
  );
}
