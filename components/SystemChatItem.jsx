import React from "react";

import Markdown from "react-markdown";
function SystemChatItem({ avatar, content }) {
  return (
    <div
      className="chat-message w-full md:max-w-[700px]"
      style={{ whiteSpace: "pre-line" }}
    >
      <div className="flex items-end">
        <div className="flex flex-col space-y-2 	mx-2 order-2 items-start">
          <div>
            <Markdown className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
              {content}
            </Markdown>
          </div>
        </div>
        <img
          src={avatar}
          alt="My profile"
          className="w-8 h-8 rounded-full order-1 md:w-12 md:h-12"
        />
      </div>
    </div>
  );
}

export default SystemChatItem;
