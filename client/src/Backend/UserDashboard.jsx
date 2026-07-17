import React from "react";

function UserDashboard() {
	return (
		<div className="min-h-screen bg-gray-100 px-4 py-10">
			<div className="mx-auto w-full max-w-4xl rounded-2xl bg-white p-8 shadow-xl">
				<h1 className="text-3xl font-bold text-gray-800">User Dashboard</h1>
				<p className="mt-3 text-gray-600">You are signed in as a regular user.</p>
			</div>
		</div>
	);
}

export default UserDashboard;
