import React, { Children } from "react";
import useItems from "../hooks/Item/useItems";
import "react-toastify/dist/ReactToastify.css";
import useCategories from "../hooks/Category/useCategories";
import { NavLink, useNavigate } from "react-router-dom";
import { MdAddCircleOutline } from "react-icons/md";
import useSubCategories from "../hooks/SubCategory/useSubCategories";
import useData from "../hooks/useData";
import Page from "./Page";

const Admin = () => {
  const {
    items,
    fetchItems,
    deleteItemLocal,
    categories,
    fetchCategories,
    deleteCategoryLocal,
    subCategories,
    fetchSubCategories,
    deleteSubCategoryLocal,
  } = useData();

  const nav = useNavigate();

  return (
    <Page className="dark:text-white flex flex-col items-center justify-center mx-auto space-y-8">
      {/* <div className="flex flex-col item-center mx-auto justify-center w-7/8"> */}
      {/* Items Table */}
      <div className="items-table mx-auto w-10/12 space-y-8">
        <h1 className="text-2xl font-bold">Items</h1>
        <table className="table-fixed border-collapse border border-black w-full h-full">
          <thead className="border-collapse border border-black">
            <tr>
              <th>Item ID</th>
              <th className="py-3">Item Name</th>
              <th>Item Cost</th>
              <th>Categories</th>
              <th>Sub Categories</th>
              <th></th>
              <th>
                <button>
                  <MdAddCircleOutline
                    className="curser-pointer"
                    onClick={() => nav("/add-item")}
                  ></MdAddCircleOutline>
                </button>
              </th>
            </tr>
          </thead>
          {Children.toArray(
            items.map((item) => (
              <tbody className="border-collapse border border-black">
                <tr>
                  <td>{item.itemId}</td>
                  <td className="py-3">{item.itemName}</td>
                  <td>{item.cost}₪</td>
                  <td>
                    <select className="dark:bg-gray-900">
                      {Children.toArray(
                        item.categories.map((category) => (
                          <option
                            value={category.categoryId}
                            key={category.categoryId}
                          >
                            {category.categoryName}
                          </option>
                        ))
                      )}
                    </select>
                  </td>
                  <td>
                    <select className="dark:bg-gray-900">
                      {Children.toArray(
                        item.subCategories.map((subCategory) => (
                          <option
                            value={subCategory.subCategoryId}
                            key={subCategory.subCategoryId}
                          >
                            {subCategory.subCategoryName}
                          </option>
                        ))
                      )}
                    </select>
                  </td>
                  <td>
                    <NavLink to={`/edit-item/${item.itemId}`}>Edit</NavLink>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        deleteItemLocal(item);
                        fetchItems();
                        fetchCategories();
                        fetchSubCategories();
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))
          )}
        </table>
      </div>

      {/* Categories Table */}
      <div className="categories-table mx-auto w-10/12 space-y-8">
        <h1 className="text-2xl font-bold">Categories</h1>
        <table className="table-fixed border-collapse border border-black w-full h-full">
          <thead className="border-collapse border border-black">
            <tr>
              <th>Category ID</th>
              <th className="py-3">Category Name</th>
              <th>Items</th>
              <th>Sub Categories</th>
              <th></th>
              <th>
                <button>
                  <MdAddCircleOutline
                    className="curser-pointer"
                    onClick={() => nav("/add-category")}
                  ></MdAddCircleOutline>
                </button>
              </th>
            </tr>
          </thead>
          {Children.toArray(
            categories.map((category) => (
              <tbody className="border-collapse border border-black">
                <tr>
                  <td>{category.categoryId}</td>
                  <td className="py-3">{category.categoryName}</td>
                  <td>
                    <select className="dark:bg-gray-900">
                      {Children.toArray(
                        category.items.map((item) => (
                          <option value={item.itemId} key={item.itemId}>
                            {item.itemName}
                          </option>
                        ))
                      )}
                    </select>
                  </td>
                  <td>
                    <select className="text-start dark:bg-gray-900">
                      {Children.toArray(
                        category.subCategories.map((subCategory) => (
                          <option
                            value={subCategory.subCategoryId}
                            key={subCategory.subCategoryId}
                          >
                            {subCategory.subCategoryName}
                          </option>
                        ))
                      )}
                    </select>
                  </td>
                  <td>
                    <NavLink to={`/edit-category/${category.categoryId}`}>
                      Edit
                    </NavLink>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        deleteCategoryLocal(category);
                        fetchItems();
                        fetchCategories();
                        fetchSubCategories();
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))
          )}
        </table>
      </div>

      {/* SubCategories Table */}
      <div className="sub-categories-table mx-auto w-10/12 space-y-8">
        <h1 className="text-2xl font-bold">Sub Categories</h1>
        <table className="table-fixed border-collapse border border-black w-full h-full">
          <thead className="border-collapse border border-black">
            <tr>
              <th>Sub Category ID</th>
              <th className="py-3">Sub Category Name</th>
              <th>Items</th>
              <th>Category</th>
              <th></th>
              <th>
                <button>
                  <MdAddCircleOutline
                    className="curser-pointer"
                    onClick={() => nav("/add-sub-category")}
                  ></MdAddCircleOutline>
                </button>
              </th>
            </tr>
          </thead>
          {Children.toArray(
            subCategories.map((subCategory) => (
              <tbody className="border-collapse border border-black">
                <tr>
                  <td>{subCategory.subCategoryId}</td>
                  <td className="py-3">{subCategory.subCategoryName}</td>
                  <td>
                    <select className="dark:bg-gray-900">
                      {Children.toArray(
                        subCategory.items.map((item) => (
                          <option value={item.itemId} key={item.itemId}>
                            {item.itemName}
                          </option>
                        ))
                      )}
                    </select>
                  </td>
                  <td>{subCategory.category.categoryName}</td>
                  <td>
                    <NavLink
                      to={`/edit-sub-category/${subCategory.subCategoryId}`}
                    >
                      Edit
                    </NavLink>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        deleteSubCategoryLocal(subCategory);
                        fetchItems();
                        fetchCategories();
                        fetchSubCategories();
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))
          )}
        </table>
      </div>
      {/* </div> */}
    </Page>
  );
};

export default Admin;
