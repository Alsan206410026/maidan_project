import React from "react";
import { Outlet, useParams } from "react-router-dom";
import AdminChatList from "./AdminChatList";

function AdminChatLayout() {
  const { userId } = useParams();

  return (
    <div className="h-[calc(100vh-110px)]">

      {/* Desktop */}

      <div className="hidden h-full lg:grid lg:grid-cols-12 lg:gap-5">

        <div className="col-span-4 xl:col-span-3">
          <AdminChatList />
        </div>

        <div className="col-span-8 xl:col-span-9">
          {userId ? (
            <Outlet />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl font-semibold">Select a chat</h2>
                <p className="text-sm text-gray-500">Choose a conversation from the list to start chatting.</p>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Mobile */}

      <div className="h-full lg:hidden">

        {userId ? (
          <Outlet />
        ) : (
          <AdminChatList />
        )}

      </div>

    </div>
  );
}

export default AdminChatLayout;