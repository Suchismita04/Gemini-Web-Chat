"use client";

import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { useState } from "react";

export default function LoginPage() {

    const [email,setEmail]=useState("suchismita@gmail.com")
    const [password,setPassword]=useState("suchis2123")


 const handleSubmit= async (e: { preventDefault: () => void; })=>{
      e.preventDefault();
  const res= await signIn("credentials",{
        email,
        password,
        redirect:false,
        // callbackUrl: "/dashboard"
    })
    console.log("data from login page :",res)
 }

  return (
    <div className="flex min-h-full flex-col justify-center bg-black px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          alt="Your Company"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-100">
              Email address
            </label>
            <input
              type="email"
              required
              className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-100">
              Password
            </label>
            <input
              type="password"
              required
              className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="w-full rounded-md bg-indigo-500 px-3 py-1.5 text-white font-semibold hover:bg-indigo-400">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
