import React, { Children, useEffect, useRef, useState } from "react";
import {
  Category,
  Item,
  ItemAddDTO,
  ItemDTO,
  ItemUpdateDTO,
  SubCategory,
} from "../backend/@Types";
import { useNavigate, useParams } from "react-router-dom";
import useCategories from "../hooks/Category/useCategories";
import { createItem, getItemById } from "../backend/Network";
import { MdAddCircleOutline } from "react-icons/md";
import useSubCategories from "../hooks/SubCategory/useSubCategories";
import Page from "./Page";

const inputTailwindCSS = `p-2 border-2 border-black rounded-md w-full`;
const AddItemForm = ({
  allCategories,
  allSubCategories,
}: {
  allCategories: Category[];
  allSubCategories: SubCategory[];
}) => {
  const nav = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  const selectCategoryRef = useRef<HTMLSelectElement | null>(null);
  const selectSubCategoryRef = useRef<HTMLSelectElement | null>(null);
  const submitUpdate = async (e: any) => {
    e.preventDefault();
    const itemName = e.target[0].value;
    const cost = parseFloat(e.target[1].value) as number;
    const imgURL = e.target[2].value;
    const newItem = {
      itemName,
      cost,
      imgURL,
      categories: categories.map((category) => parseFloat(category.categoryId)),
      subCategories: subCategories.map((subCategory) =>
        parseFloat(subCategory.subCategoryId)
      ),
    } as ItemAddDTO;
    try {
      const updateResponse = await createItem(newItem);
      nav("/admin");
    } catch (e) {
      console.log(e);
    }
  };

  const addCategory = () => {
    const categoryId = selectCategoryRef.current?.value;
    const category = allCategories.find((c) => c.categoryId == categoryId);
    const alreadyInCategories = categories.find(
      (c) => c.categoryId == categoryId
    );
    console.log(alreadyInCategories);
    if (category && !alreadyInCategories) {
      console.log("add category");
      setCategories([...categories, category]);
      console.log(categories);
    }
  };

  const deleteCategory = (category: Category) => {
    setCategories(
      categories.filter((c) => c.categoryId !== category.categoryId)
    );
  };

  const addSubCategory = () => {
    const subCategoryId = selectSubCategoryRef.current?.value;
    const subCategory = allSubCategories.find(
      (sc) => sc.subCategoryId == subCategoryId
    );
    const alreadyInSubCategories = subCategories.find(
      (sc) => sc.subCategoryId == subCategoryId
    );
    if (subCategory && !alreadyInSubCategories) {
      setSubCategories([...subCategories, subCategory]);
    }
  };

  const deleteSubCategory = (subCategory: SubCategory) => {
    setSubCategories(
      subCategories.filter(
        (sc) => sc.subCategoryId !== subCategory.subCategoryId
      )
    );
  };

  return (
    <Page>
      <form className="flex flex-col gap-y-2 mt-12" onSubmit={submitUpdate}>
        <input className={inputTailwindCSS} placeholder="Enter Item name" />
        <input
          className={inputTailwindCSS}
          placeholder="Enter Item cost"
          type="number"
        />
        <input className={inputTailwindCSS} placeholder="Enter Image URL" />

        <div className="flex flex-row gap-x-3 items-center justify-center">
          <select className={inputTailwindCSS} ref={selectCategoryRef}>
            {Children.toArray(
              allCategories.map((category) => (
                <option value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))
            )}
          </select>
          <MdAddCircleOutline
            className="cursor-pointer"
            onClick={addCategory}
          />
        </div>
        <div>Categories:</div>
        <ul>
          {Children.toArray(
            categories.map((category) => (
              <li className="bg-[lightgray] p-1 rounded-sm">
                {category.categoryName}
                <br />{" "}
                <button
                  className="text-[10px]"
                  type="button"
                  onClick={() => deleteCategory(category)}
                >
                  Delete category
                </button>
              </li>
            ))
          )}
        </ul>

        <div className="flex flex-row gap-x-3 items-center justify-center">
          <select className={inputTailwindCSS} ref={selectSubCategoryRef}>
            {Children.toArray(
              allSubCategories.map((subCategory) => (
                <option value={subCategory.subCategoryId}>
                  {subCategory.subCategoryName}
                </option>
              ))
            )}
          </select>
          <MdAddCircleOutline
            className="cursor-pointer"
            onClick={addSubCategory}
          />
        </div>
        <div>Sub Categories:</div>
        <ul>
          {Children.toArray(
            subCategories.map((subCategory) => (
              <li className="bg-[lightgray] p-1 rounded-sm">
                {subCategory.subCategoryName}
                <br />{" "}
                <button
                  className="text-[10px]"
                  type="button"
                  onClick={() => deleteSubCategory(subCategory)}
                >
                  Delete category
                </button>
              </li>
            ))
          )}
        </ul>

        <button type="submit">Submit</button>
      </form>
    </Page>
  );
};

const AddItem = () => {
  const { categories } = useCategories();
  const { subCategories } = useSubCategories();
  return (
    <Page>
      <div className="flex flex-col w-fit min-w-[400px] mx-auto my-[32px]">
        <AddItemForm
          allCategories={categories}
          allSubCategories={subCategories}
        />
      </div>
    </Page>
  );
};

export default AddItem;
