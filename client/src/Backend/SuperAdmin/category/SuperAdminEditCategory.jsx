import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaTags, FaArrowLeft } from "react-icons/fa";

function SuperAdminEditCategory() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        fetchCategory();
    }, []);

    const fetchCategory = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5001/api/venuecategory/${id}`,
                { withCredentials: true }
            );
            reset({
                name: response.data.name,
                slug: response.data.slug,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            await axios.put(
                `http://localhost:5001/api/venuecategory/${id}`,
                data,
                { withCredentials: true }
            );
            alert("Category updated successfully.");
            navigate("/super-admin/venue-category");
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Failed to update category.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 p-4 md:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">Edit Category</h1>
                    <p className="mt-1 text-sm text-gray-500">Update category details.</p>
                </div>
                <NavLink to="/super-admin/venue-category">
                    <button className="flex items-center justify-center gap-2 rounded-xl border border-green-600 px-5 py-3 font-semibold text-green-700 transition hover:bg-green-600 hover:text-white">
                        <FaArrowLeft /> Back
                    </button>
                </NavLink>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl bg-white p-5 shadow-md md:p-8">
                {/* Category Name */}
                <div className="mb-5">
                    <label className="mb-2 block font-semibold text-gray-700">Category Name</label>
                    <div className="flex items-center rounded-xl border px-4 py-3">
                        <FaTags className="text-green-600" />
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            className="ml-3 w-full outline-none"
                        />
                    </div>
                </div>

                {/* Slug */}
                <div className="mb-5">
                    <label className="mb-2 block font-semibold text-gray-700">Slug</label>
                    <input
                        type="text"
                        {...register("slug", { required: true })}
                        className="w-full rounded-xl border px-4 py-3 outline-none"
                    />
                </div>

                {/* Buttons */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:bg-gray-400"
                    >
                        {loading ? <span className="loading loading-spinner"></span> : "Update Category"}
                    </button>
                    <NavLink to="/super-admin/venue-category" className="flex-1">
                        <button
                            type="button"
                            className="w-full rounded-xl border border-gray-300 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                    </NavLink>
                </div>
            </form>
        </div>
    );
}

export default SuperAdminEditCategory;