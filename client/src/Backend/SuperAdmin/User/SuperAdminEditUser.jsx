import React,{useEffect,useState} from "react";
import {useNavigate,useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {FaArrowLeft,FaUserEdit} from "react-icons/fa";
import axios from "axios";

function SuperAdminEditUser(){

    const {id}=useParams();
    const navigate=useNavigate();
    const [changed,setChanged]=useState(false);

    const {register,handleSubmit,reset,watch}=useForm();


    useEffect(()=>{

        const fetchUser=async()=>{

            try{

                const res=await axios.get(`http://localhost:5001/api/user/${id}`);
                console.log("API response:", res.data);

                const user = res.data.user || res.data.data || res.data;

                reset({
                    fullName: user.fullName ?? user.full_name ?? "",
                    username: user.username ?? "",
                    email: user.email ?? "",
                    phoneNumber: user.phoneNumber ?? user.phone_number ?? "",
                    role: user.role ?? "user",
                    status: user.status ?? "inactive",
                });

            }catch(error){
                console.log(error);
            }

        };

        fetchUser();

    },[id,reset]);


    useEffect(()=>{

        const subscription=watch(()=>{
            setChanged(true);
        });

        return()=>subscription.unsubscribe();

    },[watch]);


    const handleUpdate=async(data)=>{

        try{

            await axios.put(`http://localhost:5001/api/user/${id}`,data);

            alert("User updated successfully");

            navigate("/super-admin/users");

        }catch(error){
            console.log(error);
        }

    };


    return(

        <div className="p-6">

            <div className="flex items-center gap-3 mb-6">
                <button onClick={()=>navigate(-1)} className="text-xl">
                    <FaArrowLeft/>
                </button>

                <FaUserEdit className="text-2xl"/>

                <h1 className="text-2xl font-bold">Edit User</h1>
            </div>


            <form onSubmit={handleSubmit(handleUpdate)} className="bg-white rounded-lg shadow p-6 space-y-5">

                <div>
                    <label className="block mb-1 font-medium">Full Name</label>
                    <input {...register("fullName")} className="w-full border rounded-lg p-2"/>
                </div>


                <div>
                    <label className="block mb-1 font-medium">Username</label>
                    <input {...register("username")} className="w-full border rounded-lg p-2"/>
                </div>


                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input {...register("email")} className="w-full border rounded-lg p-2"/>
                </div>


                <div>
                    <label className="block mb-1 font-medium">Phone Number</label>
                    <input {...register("phoneNumber")} className="w-full border rounded-lg p-2"/>
                </div>


                <div>
                    <label className="block mb-1 font-medium">Role</label>
                    <select {...register("role")} className="w-full border rounded-lg p-2">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="super_admin">Super Admin</option>
                    </select>
                </div>


                <div>
                    <label className="block mb-1 font-medium">Status</label>
                    <select {...register("status")} className="w-full border rounded-lg p-2">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                    </select>
                </div>


                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">
                    {changed?"Update":"Submit"}
                </button>


            </form>

        </div>

    );

}

export default SuperAdminEditUser;