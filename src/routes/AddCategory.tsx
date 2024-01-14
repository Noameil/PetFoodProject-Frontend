import React, { Children, useEffect, useRef, useState } from "react";
import {
  Category,
  CategoryAddDTO,
  Item,
  ItemAddDTO,
  ItemDTO,
  ItemUpdateDTO,
  SubCategory,
} from "../backend/@Types";
import { useNavigate, useParams } from "react-router-dom";
import { createCategory, createItem, getItemById } from "../backend/Network";
import { MdAddCircleOutline } from "react-icons/md";
import useItems from "../hooks/Item/useItems";
import useSubCategories from "../hooks/SubCategory/useSubCategories";
import Page from "./Page";

const inputTailwindCSS = `p-2 border-2 border-black rounded-md w-full`;
const AddCategoryForm = ({
  allItems,
  allSubCategories,
}: {
  allItems: Item[];
  allSubCategories: SubCategory[];
}) => {
  const nav = useNavigate();

  const [items, setItems] = useState<Item[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  const selectItemRef = useRef<HTMLSelectElement | null>(null);
  const selectSubCategoryRef = useRef<HTMLSelectElement | null>(null);
  const submitUpdate = async (e: any) => {
    e.preventDefault();
    const categoryName = e.target[0].value;
    const newCategory = {
      categoryName,
      items: items.map((item) => parseInt(item.itemId)),
      subCategories: subCategories.map((subCategory) =>
        parseInt(subCategory.subCategoryId)
      ),
    } as CategoryAddDTO;
    try {
      const updateResponse = await createCategory(newCategory);
      nav("/admin");
    } catch (e) {
      console.log(e);
    }
  };

  const addItem = () => {
    const itemId = selectItemRef.current?.value;
    const item = allItems.find((i) => i.itemId == itemId);
    const alreadyInItems = items.find((i) => i.itemId == itemId);
    if (item && !alreadyInItems) {
      setItems([...items, item]);
    }
  };

  const deleteItem = (item: Item) => {
    setItems(items.filter((i) => i.itemId !== item.itemId));
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
        <input className={inputTailwindCSS} placeholder="Enter Category Name" />
        <div className="flex flex-row gap-x-3 items-center justify-center">
          <select className={inputTailwindCSS} ref={selectItemRef}>
            {Children.toArray(
              allItems.map((item) => (
                <option value={item.itemId}>{item.itemName}</option>
              ))
            )}
          </select>
          <MdAddCircleOutline className="cursor-pointer" onClick={addItem} />
        </div>
        <div>Items:</div>
        <ul>
          {Children.toArray(
            items.map((item) => (
              <li className="bg-[lightgray] p-1 rounded-sm">
                {item.itemName}
                <br />{" "}
                <button
                  className="text-[10px]"
                  type="button"
                  onClick={() => deleteItem(item)}
                >
                  Delete Item
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
                  Delete Sub Category
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

const AddCategory = () => {
  const { items } = useItems();
  const { subCategories } = useSubCategories();
  return (
    <Page>
    <div className="flex flex-col w-fit min-w-[400px] mx-auto my-[32px]">
      <AddCategoryForm allItems={items} allSubCategories={subCategories} />
    </div>
    </Page>
  );
};

export default AddCategory;
