import { useState } from "react";
import { HiMenu, HiSearch, HiShoppingCart } from "react-icons/hi";
import Drawer from "./drawer";
import styles from "../styles/styles.module.css"; // Import your CSS file

// Custom Link component for menu items
const CustomLink = ({ href, children }) => (
  <a href={href} className="hover:text-green-300 dark:hover:text-emerald-400">{children}</a>
);

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between ${styles.homeContainer} ${styles.blurEffect}`}>
      {/* Header */}
      <header className="bg-amber-800 w-full h-24 flex justify-between items-center mb-22">
        {/* Logo */}
        <div className="flex items-center ml-8">
          <img src="/logo/purenars.png" alt="Logo" className="h-20 w-auto" /> {/* Replace 'your-logo-image.jpg' with your actual logo image */}
        </div>
        {/* Burger Menu Icon */}
        <div className="md:hidden">
          <HiMenu
            className="w-8 h-8 text-gray-600 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>
        {/* Menu Items */}
        <div className={`mr-36 font-semibold text-gray-200 text-xl flex-row space-x-8 md:flex hidden ${isMenuOpen ? "flex" : "hidden"}`}>
          <CustomLink href="/categories">Categories</CustomLink>
          <CustomLink href="/supplies">Supplies</CustomLink>
          <CustomLink href="/about">About</CustomLink>
          <CustomLink href="/contact">Contact</CustomLink>
        </div>
        <div className="mr-24 text-white text-xl font-semibold gap-4 flex items-center space-x-6">
          <CustomLink href="/Signin">Sign In</CustomLink>
          <a href="/Signup" className="bg-orange-500 hover:bg-slate-300 text-white px-4 py-2 rounded-md transition-colors duration-300 ease-in-out">Sign Up</a>
        </div>
      </header>

       {/* Main Content */}
       <div className="flex flex-col items-center text-black space-x-16">
        <div className="flex flex-row items-center justify-center w-full">
          {/* Welcome Message */}
          <div className="flex flex-col items-center text-center max-w-lg">
          <h1 className="text-3xl font-bold mb-4">
          Welcome to <span className="text-orange-400" style={{ textShadow: "1px 1px 1px black" }}>Nar's</span> <span className="text-zinc-200" style={{ textShadow: "2px 2px 2px black" }}>School Supplies</span>
            </h1>
            <p className="text-lg mb-6">
            Your top spot for school supplies. We offer quality, affordable items with lots of choices to make learning better for you. Check out our big selection to find what helps you succeed in school. Let's make learning fun!           </p>
            <div className="flex space-x-4 mt-4">
              <a href="/Signin" className="flex items-center bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-md transition-colors duration-300 ease-in-out">
                <HiShoppingCart className="w-6 h-6 mr-2" />
                Shop Now
              </a>
            </div>
          </div>
          {/* Image */}
          <img src="/logo/bag.png" alt="School Supplies Image" className="h-46 w-auto ml-8 mt-4"  style={{ marginLeft: "12rem" }} /> {/* Replace 'your-image.jpg' with your actual image filename */}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-6 mb-4 text-sm text-center text-gray-500 dark:text-gray-400">
        &copy; 2024 Nars School Supplies. All rights reserved.
      </footer>

      {/* Drawer */}
      <Drawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </main>
  );
}
