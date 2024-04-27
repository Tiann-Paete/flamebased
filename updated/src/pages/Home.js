import { useEffect, useState } from "react";
import { HiUser, HiSearch } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";

const CustomLink = ({ href, children }) => (
  <a href={href} className="hover:text-green-300 dark:hover:text-green-200 px-3 py-2">{children}</a>
);

const products = [
  {
    id: 1,
    name: "Ariel Bag",
    description: "Become close with the ocean with this",
    price: 1200,
    rating: 5,
    image: "Bag.png",
  },
  
  {
    id: 2,
    name: "Cute Black T-shirt for kids",
    description: "Description for Product 1",
    price: 129,
    rating: 5,
    image: "Tshirt.png",
  },

  {
    id: 3,
    name: "Cool Black T-shirt for kids",
    description: "Description for Product 1",
    price: 139,
    rating: 5,
    image: "jeff.png",
  },

  {
    id: 1,
    name: "Colorpencil",
    description: "Description for Product 1",
    price: 34,
    rating: 5,
    image: "colorpencil.png",
  },

  {
    id: 2,
    name: "Crayola",
    description: "Description for Product 1",
    price: 24,
    rating: 5,
    image: "crayola.png",
  },

  {
    id: 3,
    name: "KawaiiPen",
    description: "Description for Product 1",
    price: 40,
    rating: 5,
    image: "kawaiipen.png",
  },
  // Add more products as needed
];

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Fetch user data from the server (using API)
    fetch("http://localhost:8000/user", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setEmail(data.email);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleLogout = () => {
    // Perform logout action here, such as clearing session or cookies
    // Redirect to the signin page after logout
    fetch("http://localhost:8000/logout", { credentials: "include" })
      .then(() => {
        window.location.href = "/Signin";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      {/* Header Navbar */}
      <header className="bg-emerald-800 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo with Margin */}
          <div className="ml-10">
            <Link href="/">
              <Image
                src="/logo/narslogo1.jpg"
                alt="Logo"
                width={115}
                height={40}
                className="rounded-lg border border-emerald-700"
              />
            </Link>
          </div>
          {/* Navigation Links */}
          <nav className="justify-between space-x-4 mr-12 font-semibold text-l">
            <CustomLink href="/categories">Special Items</CustomLink>
            <CustomLink href="/supplies">Categories</CustomLink>
            <CustomLink href="/about">Supplies</CustomLink>
          </nav>
           {/* Search Bar */}
           <div className="flex items-center bg-white px-3 py-1 rounded-lg">
            {/* Add Search Icon */}
            <HiSearch className="text-gray-400" />
            {/* Your Search Bar */}
            <input
              type="text"
              placeholder="Search..."
              className="text-black border-none focus:outline-none mx-2 bg-transparent w-64"
            />
          </div>
         {/* User Icon with Dropdown */}
         <div className="relative mr-16">
            <HiUser
              className="text-4xl cursor-pointer hover:text-green-300 dark:hover:text-green-200"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow">
                <div className="px-4 py-2 text-gray-800">{firstName} {lastName}</div>
                <div className="px-4 py-2 text-gray-500 text-sm">{email}</div>
                <hr />
                <div
                  className="px-4 py-2 text-gray-800 cursor-pointer hover:bg-red-300"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Product Cards */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-12 ml-12">
        {products.map((product) => (
          <div key={product.id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow p-4 mb-6">
            <a href="#">
              <Image
                src={`/images/${product.image}`}
                alt={product.name}
                width={150}
                height={150}
                className="rounded-t-lg mx-auto"
              />
            </a>
            <div className="px-5 pb-5">
              <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              </a>
              <div className="flex items-center mt-2.5 mb-5">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  {[...Array(product.rating)].map((_, index) => (
                    <svg key={index} className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                  ))}
                  {[...Array(5 - product.rating)].map((_, index) => (
                    <svg key={index} className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                  ))}
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ms-3">5.0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-semibold text-gray-900 dark:text-white">₱{product.price}</span>
                <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add to cart</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
