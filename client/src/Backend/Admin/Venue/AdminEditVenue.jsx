import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaSave, FaArrowLeft, FaCloudUploadAlt } from "react-icons/fa";

function AdminEditVenue() {
  const navigate = useNavigate();

  const [venueImagePreview, setVenueImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchAdminVenue = async () => {
      try {
        setLoading(true);

        const response = await axios.get("http://localhost:5001/api/venue/my-venue", {
          withCredentials: true,
        });

        const venueData = response.data?.data || response.data;

        if (!venueData || !venueData._id) {
          setError("No venue found for this admin user.");
          return;
        }

        reset({
          venueId: venueData._id,
          name: venueData.name || "",
          slug: venueData.slug || "",
          description: venueData.description || "",
          price: venueData.price || "",
          status: venueData.status || "Open",
          location: venueData.location || "",
        });

        if (venueData.images) {
          setVenueImagePreview(venueData.images);
        }
      } catch (err) {
        console.error("Error fetching venue details:", err);
        setError(
          err.response?.data?.message || "Failed to fetch venue details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAdminVenue();
  }, [reset]);

  const onSubmit = async (formDataValues) => {
    if (!formDataValues.venueId) {
      setError("Venue ID is missing. Cannot proceed with update.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await axios.put(
        `http://localhost:5001/api/venue/admin/${formDataValues.venueId}`,
        (() => {
          const body = new FormData();
          body.append("name", formDataValues.name);
          body.append("slug", formDataValues.slug);
          body.append("description", formDataValues.description);
          body.append("price", formDataValues.price);
          body.append("status", formDataValues.status);
          body.append("location", formDataValues.location);

          if (formDataValues.image && formDataValues.image[0]) {
            body.append("image", formDataValues.image[0]);
          }
          return body;
        })(),
        {
          withCredentials: true,
        }
      );

      navigate("/admin/venue");
    } catch (err) {
      console.error("Error updating venue:", err);
      setError(err.response?.data?.message || "Failed to update venue.");
    } finally {
      setSubmitting(false);
    }
  };

  const imageRegister = register("image");

  if (loading) {
    return (
      <div className="p-6 text-gray-500 font-medium">
        Loading venue details...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition text-sm font-medium"
        >
          <FaArrowLeft /> Back
        </button>
        <h1 className="text-xl font-bold text-gray-800">Edit Venue Details</h1>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Edit Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-5"
      >
        <input type="hidden" {...register("venueId")} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Venue Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Venue Name
            </label>
            <input
              type="text"
              {...register("name")}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
              placeholder="e.g. Royal Futsal Arena"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Slug
            </label>
            <input
              type="text"
              {...register("slug")}
              className="w-full px-3 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Price */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Price (NRs / hr)
            </label>
            <input
              type="number"
              {...register("price")}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Status
            </label>
            <select
              {...register("status")}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm font-semibold text-gray-800"
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
            Location
          </label>
          <input
            type="text"
            {...register("location")}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
            placeholder="e.g. Chabahil, Kathmandu"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
            Description
          </label>
          <textarea
            {...register("description")}
            rows="3"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
            placeholder="Describe features, turf quality, lighting, parking..."
          />
        </div>

        {/* Image Preview & File Input */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
            Venue Image
          </label>

          {venueImagePreview && (
            <img
              src={venueImagePreview}
              alt="Venue Preview"
              className="w-full h-48 object-cover rounded-lg mb-2 border"
            />
          )}

          <label className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg p-3 text-sm text-gray-600 hover:border-emerald-500 cursor-pointer transition">
            <FaCloudUploadAlt className="text-xl text-emerald-600" />
            <span>Click to upload new image</span>
            <input
              type="file"
              accept="image/*"
              name={imageRegister.name}
              ref={imageRegister.ref}
              onBlur={imageRegister.onBlur}
              onChange={(e) => {
                imageRegister.onChange(e);
                if (e.target.files && e.target.files[0]) {
                  setVenueImagePreview(URL.createObjectURL(e.target.files[0]));
                }
              }}
              className="hidden"
            />
          </label>
        </div>

        {/* Action Button */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg font-semibold text-sm transition shadow disabled:opacity-50"
          >
            <FaSave /> {submitting ? "Saving changes..." : "Update Venue"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminEditVenue;