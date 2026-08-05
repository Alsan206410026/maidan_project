import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import {
    FaPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaTags,
    FaArrowLeft,
} from "react-icons/fa";

function SuperAdminManageCategory() {
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5001/api/venuecategory",
                { withCredentials: true }
            );
            setCategories(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const filteredCategories = categories.filter((cat) => {
        const searchText = search.toLowerCase().trim();
        return (
            cat.name?.toLowerCase().includes(searchText) ||
            cat.slug?.toLowerCase().includes(searchText)
        );
    });

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if (!confirmDelete) return;

        try {
            await axios.delete(
                `http://localhost:5001/api/venuecategory/${id}`,
                { withCredentials: true }
            );
            fetchCategories();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="space-y-6 p-4 md:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">Category Management</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage all venue categories from one place.</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                    <NavLink to="/super-admin/venues">
                        <button className="flex items-center justify-center gap-2 rounded-xl border border-green-600 px-5 py-3 font-semibold text-green-700 transition hover:bg-green-600 hover:text-white">
                            <FaArrowLeft /> Back to Venues
                        </button>
                    </NavLink>
                    <NavLink to="/super-admin/venue-category/add">
                        <button className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700">
                            <FaPlus /> Add Category
                        </button>
                    </NavLink>
                </div>
            </div>

            {/* Search */}
            <div className="flex items-center rounded-xl border bg-white px-4 py-3 shadow-sm">
                <FaSearch className="text-gray-400" />
                <input
                    type="text"
                    placeholder="Search category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="ml-3 w-full bg-transparent outline-none"
                />
            </div>

            {/* Mobile Cards */}
            <div className="space-y-4 lg:hidden">
                {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                        <div key={category._id} className="rounded-2xl border bg-white p-4 shadow-sm">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-xl bg-green-100 p-3">
                                        <FaTags className="text-xl text-green-600" />
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-gray-800">{category.name}</h2>
                                        <p className="text-sm text-gray-500">{category.slug}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 flex gap-3">
                                <NavLink to={`/super-admin/venue-category/edit/${category._id}`} className="flex-1">
                                    <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600">
                                        <FaEdit /> Edit
                                    </button>
                                </NavLink>
                                <button
                                    onClick={() => handleDelete(category._id)}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-500 py-2 text-white hover:bg-red-600"
                                >
                                    <FaTrash /> Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="rounded-xl bg-white p-8 text-center text-gray-500 shadow">
                        No categories found.
                    </div>
                )}
            </div>

            {/* Desktop Table */}
            <div className="hidden overflow-x-auto rounded-2xl bg-white shadow-md lg:block">
                <table className="min-w-full">
                    <thead className="bg-green-600 text-white">
                        <tr>
                            <th className="px-6 py-4 text-left">SN</th>
                            <th className="px-6 py-4 text-left">Category Name</th>
                            <th className="px-6 py-4 text-left">Slug</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategories.length > 0 ? (
                            filteredCategories.map((category, index) => (
                                <tr key={category._id} className="border-b transition hover:bg-green-50">
                                    <td className="px-6 py-4">{index + 1}</td>
                                    <td className="px-6 py-4 font-semibold text-gray-800">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-lg bg-green-100 p-2">
                                                <FaTags className="text-green-600" />
                                            </div>
                                            {category.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{category.slug}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-3">
                                            <NavLink to={`/super-admin/venue-category/edit/${category._id}`}>
                                                <button className="rounded-lg bg-blue-500 p-2.5 text-white transition hover:bg-blue-600">
                                                    <FaEdit />
                                                </button>
                                            </NavLink>
                                            <button
                                                onClick={() => handleDelete(category._id)}
                                                className="rounded-lg bg-red-500 p-2.5 text-white transition hover:bg-red-600"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="py-8 text-center text-gray-500">
                                    No categories found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SuperAdminManageCategory;