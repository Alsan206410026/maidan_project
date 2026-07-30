import React from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";

function SuperAdminDeleteUser({ userId, onDelete }) {

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:5001/api/users/${userId}`, { withCredentials: true });
            onDelete();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <button onClick={handleDelete} className="text-red-600 text-lg">
            <FaTrash />
        </button>
    );
}

export default SuperAdminDeleteUser;