import { NavLink, useNavigate } from "react-router-dom";
import { Item, Category } from "../../backend/@Types";
import React, { useState } from "react";
import ItemCard from "../ItemCard/ItemCard";

const ShopByCategories =({
  category
}: {
  category: Category;
}) => {
  return (
    <div className="flex">
    <div className="w-10/12 mt-24 mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
     {category.items.map(item => <ItemCard key={item.itemId} item={item}/>)}
    </div>  
  </div>
    );
}



type CategoryWithDropdownProps = {
  category: Category;
};

const CategoryWithDropdown: React.FC<CategoryWithDropdownProps> = ({
  category,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <NavLink to={`/shop-by-category/${category.categoryId}`}>
      <button
        className="bg-gray-400 hover:bg-gray-300 text-black text-3xl font-bold py-16 px-24 rounded"
        value={category.categoryId}
      >
        {category.categoryName}
      </button>
      </NavLink>
      
      {isHovered && (
        <div className="absolute w-full left-0 mt-2">
          <ul className="bg-gray-300 border border-gray-200 py-2 shadow-lg text-2xl font-semibold">
            {category.subCategories.map((subCategory, index) => (
              <li
                key={subCategory.subCategoryId}
                className={`cursor-pointer py-2 ${
                  index < category.subCategories.length - 1 ? 'border-b border-black' : ''
                }`}
              >
                {subCategory.subCategoryName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryWithDropdown;

