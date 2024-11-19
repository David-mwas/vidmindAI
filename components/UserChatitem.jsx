import React from "react";
import useAuthToken from "../hooks/useAuth";
function UserChatitem({ content }) {
  const { getItem } = useAuthToken();
  const { token } = getItem();
  return (
    <div className="chat-message">
      <div className="flex items-end justify-end">
        <div className="flex flex-col space-y-2 mx-2 order-1 items-end">
          <div>
            <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
              {content.slice(0, 22)}
            </span>
          </div>
        </div>
        {token && (
          <img
            src={token?.photoURL}
            alt={`${token?.displayName} google pic`}
            className="w-8 h-8 rounded-full order-2 md:w-12 md:h-12"
          />
        )}
      </div>
    </div>
  );
}

export default UserChatitem;
