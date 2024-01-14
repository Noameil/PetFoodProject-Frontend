import React, { Children, useEffect, useRef, useState } from "react";
import {
  Category,
  CategoryAddDTO,
  Item,
  ItemAddDTO,
  ItemDTO,
  ItemUpdateDTO,
  SubCategory,
  SubCategoryAddDTO,
  SubCategoryStringDTO,
} from "../backend/@Types";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCategory,
  createItem,
  createSubCategory,
  getCategoryById,
  getItemById,
} from "../backend/Network";
import { MdAddCircleOutline } from "react-icons/md";
import useItems from "../hooks/Item/useItems";
import useSubCategories from "../hooks/SubCategory/useSubCategories";
import useCategories from "../hooks/Category/useCategories";
import Page from "./Page";

const inputTailwindCSS = `p-2 border-2 border-black rounded-md w-full`;
const AddSubCategoryForm = ({
  allItems,
  allCategories,
}: {
  allItems: Item[];
  allCategories: Category[];
}) => {
  const nav = useNavigate();

  const [items, setItems] = useState<Item[]>([]);
  const [category, setCategory] = useState<Category | undefined | null>(
    undefined
  );

  const selectItemRef = useRef<HTMLSelectElement | null>(null);
  const selectCategoryRef = useRef<HTMLSelectElement | null>(null);
  const submitUpdate = async (e: any) => {
    e.preventDefault();
    const subCategoryName = e.target[0].value;
    const newSubCategory = {
      subCategoryName,
      category: category?.categoryId,
      items: items.map((item) => parseInt(item.itemId)),
    } as SubCategoryAddDTO;

    try {
      const updateResponse = await createSubCategory(newSubCategory);
      nav("/admin");
    } catch (e) {
      console.log(e);
    }
  };

  const addItem = () => {
    const itemId = selectItemRef.current?.value;
    console.log("Item Id: " + itemId);
    const item = allItems.find((i) => i.itemId == itemId);
    const alreadyInItems = items.find((i) => i.itemId == itemId);
    console.log(alreadyInItems?.itemName);
    if (item && !alreadyInItems) {
      setItems([...items, item]);
    }
  };

  const deleteItem = (item: Item) => {
    setItems(items.filter((i) => i.itemId !== item.itemId));
  };

  const selectCategory = () => {
    const categoryId = selectCategoryRef.current?.value;
    const selectedCategory = allCategories.find(
      (c) => c.categoryId == categoryId
    );
    if (selectedCategory) {
      setCategory(selectedCategory);
    }
  };

  return (
    <Page>
      <form className="flex flex-col gap-y-2 mt-12" onSubmit={submitUpdate}>
        <input
          className={inputTailwindCSS}
          placeholder="Enter Sub Category Name"
        />
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
            onClick={selectCategory}
          />
        </div>
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
        <div>
          Items:
          <ul>
            {Children.toArray(
              items.map((item) => (
                <li className="bg-[lightgray] p-1 rounded-sm">
                  {item.itemName}
                  <br />
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
        </div>
        <div>
          Category: <br />
          {category ? category.categoryName : "No Category Selected"}
        </div>

        <button type="submit">Submit</button>
      </form>
    </Page>
  );
};

const AddSubCategory = () => {
  const { items } = useItems();
  const { categories } = useCategories();
  return (
    <Page>
      <div className="flex flex-col w-fit min-w-[400px] mx-auto my-[32px]">
        <AddSubCategoryForm allItems={items} allCategories={categories} />
      </div>
    </Page>
  );
};

export default AddSubCategory;
