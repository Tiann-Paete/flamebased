import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md flex flex-col justify-between">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-32 object-contain mb-4"
      />
      <div>
        <h3 className="text-lg font-medium text-blue-gray-700 mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-blue-gray-500 mb-4">{product.description}</p>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
