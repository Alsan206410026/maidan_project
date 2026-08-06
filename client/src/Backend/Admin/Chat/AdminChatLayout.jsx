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
            <div className="flex h-full items-center justify-center rounded-2xl bg-white shadow-lg">
              <div className="text-center text-gray-500">
                <p className="text-lg font-semibold text-gray-700">
                  Select a chat
                </p>

                <p className="mt-2 text-sm">
                  Choose a user from the list to start messaging.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="h-full lg:hidden">
        {userId ? <Outlet /> : <AdminChatList />}
      </div>
    </div>
  );
}

export default AdminChatLayout;