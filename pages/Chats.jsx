import { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import ChatPage from "../components/ChatPage";
import { BackgroundBeams } from "../components/ui/background-beams";
function Chats() {
 
  // console.log({...chats,title:"hey"});
  return (
    <div className="flex w-full bg-[aliceblue]">
      <div className="z-[10000] flex w-full">
        <SideBar />
        <ChatPage />
      </div>
      {/* <BackgroundBeams /> */}
    </div>
  );
}

export default Chats;
