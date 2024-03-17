import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import pic from "../public/vite.svg";
import UserChatitem from "./UserChatitem";
import SystemChatItem from "./SystemChatItem";
import toast, { Toaster } from "react-hot-toast";

function ChatPage() {
  const messageEndRef = useRef(null);
  const [userMessage, setUserMessage] = useState();
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [video, setVideo] = useState();
  const [loading, setLoading] = useState();
  const [prompt, setPrompt] = useState();
  const [url, setUrl] = useState();
  // console.log(video?.transcript);
  var currentData = {
    messages: [
      {
        role: "system",
        content:
          "You are a helpful youtube transcript assistant. You help people find provide information in youtube video based on the captions.You should not answer any questions apart from this youtube transcription context at any circumstance.",
      },
      {
        role: "user",
        content: `The following youtube video transcript:\n\n${video?.transcript}\n\nAnswer the following question or questions based on the transcript.Summarise what this video is about, and point on three key learnings`,
      },
    ],
  };
  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      toast.error("Error fetching chat");
      console.error(`Error chat`,error);
    }
  }, []);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [messages]);
  const fetchData = async () => {
    fetch(`http://localhost:5001/chats/${id}/getchatbyid`)
      .then((res) => res.json())
      .then(({ video, message }) => {
        // console.log("from/getchatbyid", video?.url, message);
        setVideo(video);
        setMessages(message);
        setUrl(video?.url);
        
      });
  };
  // console.log(userMessage?.role, userMessage?.content);
  let notification;
  const checkYoutubeRegex = (urlAddress) => {
    if (!urlAddress) {
      notification = toast.error("Please enter a valid YouTube URL", {
        id: notification,
      });
      return;
    }
    const youtubeUrlRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    const url = urlAddress.trim();
    if (youtubeUrlRegex.test(url)) {
      console.log("Valid YouTube URL");

      return url;
    } else {
      toast.error("Please enter a valid YouTube URL", {
        id: notification,
      });
      return;
    }
  };
  // https://www.youtube.com/watch?v=mr15Xzb1Ook
  const handleSubmitUrl = async () => {
    notification = toast.loading("Generating video transcript...");
    checkYoutubeRegex(url);
    try {
      const response = await fetch(`http://localhost:5001/videos/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          urlAddress: url,
        }),
      });

      if (response.ok) {
        toast.success("Vidmind has responded!", { id: notification });
        // throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const { messages, video } = await response.json();
      console.log("from videos/id", messages, video);
      setVideo(video);
      setMessages(messages);
      // // console.log(messages[messages.length - 1].content);
      messages?.forEach((message) => {
        handleSubmitMessages(message);
      });
    } catch (error) {
      // toast.error(error.message);
      console.error("Error:", error.message);
    }
  };

  const handleSendMessage = async () => {
    const notification = toast.loading("Vidmind is thinking...");
    if (!prompt) {
      toast.error("prompt cannot be empty", {
        id: notification,
      });
      return;
    }
    if (prompt.length <= 2) {
      toast.error("prompt cannot be less than 2 chars", {
        id: notification,
      });
      return;
    }
    let data = messages.map((item) => item);
    console.log(`prev messages ${data}`);
    // setMessages((prev) => [...prev, { content: prompt, role: "user" }]);
    //  console.log(userMessage?.role, userMessage?.content);
    currentData.messages.push({
      content: prompt,
      role: "user",
    });
    // console.log(currentData);
    try {
      const response = await fetch(`http://localhost:5001/videos/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          urlAddress: url,
          messages: currentData.messages,
        }),
      });

      if (!response.ok) {
        toast.error(response.status, { id: notification });
        // throw new Error(`HTTP error! Status: ${response.status}`);
      }
      toast.success("Vidmind has responded!", { id: notification });

      const { messages, video } = await response.json();
      console.log("from videos/id", messages, video);
      setVideo(video);
      setMessages((prev)=>[...prev, ...messages]);
      // // console.log(messages[messages.length - 1].content);
      messages.forEach((message) => {
        handleSubmitMessages(message);
      });
      // await fetchData();
    } catch (error) {
      toast.error(error.message, { id: notification });
      console.error("Error:", error.message);
    }
  };

  const handleSubmitMessages = async (message) => {
    try {
      const response = await fetch(
        `http://localhost:5001/chats/${id}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            role: message.role,
            content: message.content,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const res = await response.json();
      // console.log(res);
    } catch (error) {
      console.error("Error:", error.message);
      // Handle error appropriately, e.g., display error message to user
    }
  };
  return (
    <>
      <Toaster />
      <div className="flex-1 p: sm:p-6 justify-between flex flex-col h-screen  w-screen pt-4 md:pt-0 overflow-x-hidden bg-[#38475d]">
        <div className=" px-4 pt-2 md:pt-0 mb-2 sm:mb-0 w-full">
          <div className="text-2xl mb-2 mt-2 flex items-center w-full">
            <span className="text-gray-300 mr-3 text-[18px]" id="youtubeLabel">
              Please enter a valid Youtube URL
            </span>
          </div>
          <form className="relative flex w-full shadow-black shadow-2xl">
            <input
              // value={url}
              required={true}
              disabled={video}
              onChange={(e) => setUrl(e.target.value)}
              id="urlAddress"
              type="text"
              placeholder={video ? url : "https://youtube.com/?v=123123123"}
              className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-4 bg-gray-200 rounded-md py-3"
            />
            <div className="absolute right-0 items-center inset-y-0 flex">
              <button
                onClick={handleSubmitUrl}
                id="searchYoutubeButton"
                type="button"
                disabled={video}
                className={`inline-flex items-center justify-center rounded-lg px-1 text-sm md:px-9 py-3 transition duration-500 ease-in-out text-[#fff] bg-indigo-400 hover:bg-indigo-500 focus:outline-none font-semibold ${
                  loading && "cursor-not-allowed"
                } ${video && "cursor-not-allowed"} ${
                  !url && "cursor-not-allowed"
                }`}
              >
                <span>Search Yt Video</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6 ml-2 transform rotate-90"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </button>
            </div>
          </form>
          <div className="flex sm:items-center justify-between py-3 border-b-[.1px] border-slate-500 w-full">
            <div className="relative flex items-center space-x-4">
              {/* <img
              src={pic}
              id="youtubeThumbnail"
              alt="hello"
              className="w-32 sm:w-48 h-22 sm:h-28 flex-1 rounded-md bg-red-500"
            /> */}
              <div
                id="youtubeLoading"
                role="status"
                className={`space-y-8 md:space-y-0 md:space-x-8 md:items-center`}
              >
                <div className="w-32 sm:w-48 h-22 sm:h-28 flex items-center justify-center bg-gray-300 rounded dark:bg-gray-300">
                  {video ? (
                    <img
                      src={video?.thumbnail}
                      alt="youtubeThumbnail"
                      className="w-[100%] h-[100%] object-cover"
                    />
                  ) : (
                    <svg
                      className="w-10 h-20 md:h-10 text-gray-200 dark:text-gray-600 animate-pulse"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  )}
                </div>
              </div>
              <div className="flex flex-col leading-tight">
                <div className="text-2xl mt-1 flex items-center">
                  <span className="text-gray-300 mr-3" id="youtubeTitle">
                    {/* Please enter a Youtube URL */}
                    {video?.title}
                  </span>
                </div>
                <span
                  className="text-lg text-gray-400 mr-3 font-semibold"
                  id="youtubeAuthor"
                >
                  {video?.author}
                </span>
                <span
                  className="text-gray-400 truncate w-[20%] sm:w-[35%] md:w-[65%]"
                  id="youtubeDescription"
                >
                  {video?.description.split(" ").slice(0, 22).join(" ")}
                </span>
              </div>
              {/* <!-- </img> --> */}
            </div>
          </div>
        </div>

        {/* <!-- hidden --> */}
        {messages ? (
          <div
            id="messages"
            className="flex-1 flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
          >
            {messages?.map((message, index) => {
              if (
                message.role === "user" &&
                !message.content.startsWith(
                  "The following youtube video transcript:"
                )
              ) {
                return (
                  <UserChatitem
                    content={message.content}
                    key={index}
                    id={index}
                  />
                );
              } else if (message.role === "assistant") {
                return (
                  <SystemChatItem
                    avatar={video?.author_thumbnail}
                    content={message.content}
                    key={index}
                  />
                );
              }
              return null; // Handle other roles if needed
            })}

            <div ref={messageEndRef} />
          </div>
        ) : (
          <p className="text-White">You got no messages</p>
        )}
        {/* <!-- hidden --> */}
        <div className="border-t-[.1px] border-slate-500 px-4 pt-4 mb-2 sm:mb-0 ">
          <div className="relative flex shadow-black shadow-2xl">
            <input
              onChange={(e) => setPrompt(e.target.value)}
              id="userSendMessage"
              disabled={!video}
              type="text"
              placeholder="Write your prompt!"
              className={`w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-4 bg-gray-200 rounded-md py-3 ${
                !video && "cursor-not-allowed"
              }`}
            />
            <div className="absolute right-0 items-center inset-y-0 flex">
              <button
                onClick={handleSendMessage}
                disabled={loading}
                id="userSendButton"
                type="button"
                className={`inline-flex items-center justify-center rounded-lg px-9 py-3 transition duration-500 ease-in-out text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none ${
                  loading && "cursor-not-allowed"
                } ${!video && "cursor-not-allowed"} ${
                  !prompt && "cursor-not-allowed"
                }`}
              >
                <span>Send</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6 ml-2 transform rotate-90"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatPage;
