import React from "react";
import { Outlet, useParams } from "react-router-dom";
import ChatList from "./ChatList";

function ChatLayout() {
  const { userId } = useParams();

  return (
    <div className="h-[calc(100vh-110px)]">
      {/* Desktop */}
      <div className="hidden h-full lg:grid lg:grid-cols-12 lg:gap-5">
        <div className="col-span-4 xl:col-span-3">
          <ChatList />
        </div>

        <div className="col-span-8 xl:col-span-9">
          {userId ? (
            <Outlet />
          ) : (
            <div className="flex h-full items-center justify-center rounded-2xl bg-white shadow-lg">
              <div className="text-center text-gray-500">
                <p className="text-lg font-semibold text-gray-700">
                  Select a chat
                </p>
                <p className="mt-2 text-sm">
                  Choose a conversation from the list to start messaging.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden h-full">
        {userId ? (
          <Outlet />
        ) : (
          <ChatList />
        )}
      </div>
    </div>
  );
}

export default ChatLayout;