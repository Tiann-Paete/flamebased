import React from "react";
import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import axios from "axios";
import Swal from "sweetalert2";
import styles from "../styles/styles.module.css"; 
 

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    address: "",
    contact: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleTogglePassword = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    // Check if all required fields are filled
    if (
      !values.firstName ||
      !values.lastName ||
      !values.address ||
      !values.contact ||
      !values.email ||
      !values.password ||
      !values.confirmPassword
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sorry, you cannot sign up yet. Please fill in all the required fields.",
        showConfirmButton: true,
        confirmButtonColor: "#3085d6",
      });
      return;
    }
  
    if (values.password !== values.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match!",
        showConfirmButton: true,
        confirmButtonColor: "#3085d6",
      });
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:8000/signup", {
        ...values,
      });
      console.log(response.data);
  
      // Use SweetAlert2 for success message
      Swal.fire({
        icon: "success",
        title: "Signup Successful!",
        text: "Your account has been created.",
        showConfirmButton: true,
        confirmButtonColor: "#3085d6",
      }).then(() => {
        // Reset form and close alert after confirmation
        setValues({
          firstName: "",
          lastName: "",
          address: "",
          contact: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      });
    } catch (error) {
      console.error("Error:", error); // Handle error if request fails
    }
  };
  
  return (
    <div className={`${styles.signupContainer} pt-4 pb-4`}>
    <div className="max-w-3xl mx-auto font-[sans-serif] text-[#333] p-8 mt-4 mb-4 pl-8 backdrop-filter backdrop-blur-lg bg-white border border-green mx-auto rounded-md ">
      <div className="text-center mb-4">
        <a href="/">
        <img src="/logo/narslogopure.png" alt="logo" className="size-36 w-52 mx-auto" />
        </a>
        <h4 className="text-base text-black font-semibold mb-8">Sign up into your account</h4>
      </div>
      <form>
        <div className="grid sm:grid-cols-2 gap-y-4 gap-x-12">
          <div>
            <label className="text-sm text-black mb-2 block">First Name</label>
            <input name="firstName" type="text" value={values.firstName} onChange={handleInputChange} className="bg-slate-200 w-full text-sm px-4 py-3.5 rounded-md outline-green-500" placeholder="Enter Name" />
          </div>
          <div>
            <label className="text-sm text-black mb-2 block">Last Name</label>
            <input name="lastName" type="text" value={values.lastName} onChange={handleInputChange} className="bg-slate-200 w-full text-sm px-4 py-3.5 rounded-md outline-green-500" placeholder="Enter Lastname"  />
          </div>
          <div>
            <label className="text-sm text-black mb-2 block">Address</label>
            <input name="address" type="text" value={values.address} onChange={handleInputChange} className="bg-slate-200 w-full text-sm px-4 py-3.5 rounded-md outline-green-500" placeholder="City/Brgy/Street/Block/Lot" />
          </div>
          <div>
            <label className="text-sm text-black mb-2 block">Mobile No.</label>
            <input name="contact" type="number" value={values.contact} onChange={handleInputChange} className="bg-slate-200 w-full text-sm px-4 py-3.5 rounded-md outline-green-500" placeholder="+63" />
          </div>
          <div>
            <label className="text-sm text-black mb-2 block">Email</label>
            <input name="email" type="text" value={values.email} onChange={handleInputChange} className="bg-slate-200 w-full text-sm px-4 py-3.5 rounded-md outline-green-500" placeholder="Name@gmail.com" />
          </div>
          <div>
            <label className="text-sm text-black mb-2 block">Password</label>
            <div className="relative">
              <input name="password" type={showPassword ? "text" : "password"} value={values.password} onChange={handleInputChange} className="bg-slate-200 w-full text-sm px-4 py-3.5 rounded-md outline-green-500" placeholder="********" />
              {showPassword ? (
                <HiEyeOff className="absolute top-1/2 transform -translate-y-1/2 right-4 cursor-pointer text-gray-400" onClick={() => handleTogglePassword("password")} />
              ) : (
                <HiEye className="absolute top-1/2 transform -translate-y-1/2 right-4 cursor-pointer text-gray-400" onClick={() => handleTogglePassword("password")} />
              )}
            </div>
          </div>
          <div>
            <label className="text-sm text-black mb-2 block">Confirm Password</label>
            <div className="relative">
              <input name="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={values.confirmPassword} onChange={handleInputChange} className="bg-slate-200 w-full text-sm px-4 py-3.5 rounded-md outline-green-500" placeholder="********" />
              {showConfirmPassword ? (
                <HiEyeOff className="absolute top-1/2 transform -translate-y-1/2 right-4 cursor-pointer text-gray-400" onClick={() => handleTogglePassword("confirmPassword")} />
              ) : (
                <HiEye className="absolute top-1/2 transform -translate-y-1/2 right-4 cursor-pointer text-gray-400" onClick={() => handleTogglePassword("confirmPassword")} />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-8">
  <button type="button" onClick={handleSignup} className="min-w-[320px] mb-4 py-3 px-4 rounded-md text-white bg-green-700 hover:bg-green-800 transition-colors duration-300 ease-in-out focus:outline-none mb-2">
    Sign up
  </button>
  <span className="mt-2 text-sm text-black">Already have an account? <a className="font-bold text-m text-amber-400 hover:text-green-500 transition-colors duration-300 ease-in-out" href="/Signin">Sign in</a></span>
</div>
      </form>
    </div>
    </div>
  );
}
