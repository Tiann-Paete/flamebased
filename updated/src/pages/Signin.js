import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function Signin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/signin", {
        email,
        password,
      }, {
        withCredentials: true, // Include credentials (cookies) in the request
      });
      if (response.data.success) {
        // Redirect to homepage on successful login using router.push
        router.push("/Home");
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred during signin");
    }
  };

  return (
    <div className="bg-custom-gradient h-screen bg-cover pt-16">

    <div className="max-w-md mx-auto font-[sans-serif] text-[#333] p-6 backdrop-filter backdrop-blur-lg bg-white border border-green rounded-md mt-6">
      <div className="text-center mb-6">
        <a href="/">
          <img src="/logo/narslogopure.png" alt="logo" className="size-36 w-52 mx-auto" />
        </a>
        <h4 className="text-base text-black font-semibold">Sign in your account</h4>
      </div>
      <form className="space-y-4" onSubmit={handleSignin}>
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="text-black text-sm mb-2 block">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-slate-200 w-full text-sm px-4 py-3.5 rounded-md outline-green-500" placeholder="Enter Email" required />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="password" className="text-black text-sm mb-2 block">Password</label>
          <div className="relative">
            <input type={showPassword ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-slate-200 w-full text-sm px-4 py-3.5 rounded-md outline-green-500" placeholder="Enter Password" required />
            {showPassword ? (
              <HiEyeOff className="absolute top-1/2 transform -translate-y-1/2 right-4 cursor-pointer text-gray-400" onClick={handleTogglePassword} />
            ) : (
              <HiEye className="absolute top-1/2 transform -translate-y-1/2 right-4 cursor-pointer text-gray-400" onClick={handleTogglePassword} />
            )}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <button type="submit" className="mt-6 text-white  bg-green-700 hover:bg-green-800 transition-colors duration-300 ease-in-out py-2 px-8 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out w-full">Sign In</button>
          <span className="mt-8 text-sm text-black">Don't have an account? <a className="font-bold text-m text-green-500 hover:text-amber-400 transition-colors duration-300 ease-in-out" href="/Signup">Sign up</a></span>        
          </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
    </div>
  );
}
