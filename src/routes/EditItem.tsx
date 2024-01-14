import { useNavigate, useParams } from "react-router-dom";
import useItems from "../hooks/Item/useItems";
import {
  Children,
  FormEvent,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { getCategoryById, getItemById, updateItem } from "../backend/Network";
import {
  Category,
  Item,
  ItemDTO,
  ItemUpdateDTO,
  SubCategory,
} from "../backend/@Types";
import useCategories from "../hooks/Category/useCategories";
import { MdAddCircleOutline } from "react-icons/md";
import useSubCategories from "../hooks/SubCategory/useSubCategories";
import Page from "./Page";

const inputTailwindCSS = `p-2 border-2 border-black rounded-md w-full`;
const EditItemForm = ({
  item,
  allCategories,
  allSubCategories,
}: {
  item: Item;
  allCategories: Category[];
  allSubCategories: SubCategory[];
}) => {
  const [categories, setCategories] = useState(item.categories);
  const [subCategories, setSubCategories] = useState(item.subCategories);

  const nav = useNavigate();

  const selectCategoryRef = useRef<HTMLSelectElement | null>(null);
  const selectSubCategoryRef = useRef<HTMLSelectElement | null>(null);
  const submitUpdate = async (e: any) => {
    e.preventDefault();
    const itemName = e.target[0].value;
    const cost = parseFloat(e.target[1].value) as number;
    const imgURL = e.target[2].value;
    const newItem = {
      ...item,
      itemName,
      cost,
      imgURL,
      categories: categories.map((category) => parseFloat(category.categoryId)),
      subCategories: subCategories.map((subCategory) =>
        parseInt(subCategory.subCategoryId)
      ),
    } as ItemUpdateDTO;
    try {
      const updateResponse = await updateItem(newItem);
      nav("/admin");
    } catch (e) {
      console.log(e);
    }
  };

  const addCategory = () => {
    const categoryId = selectCategoryRef.current?.value;
    const category = allCategories.find((c) => c.categoryId == categoryId);
    const alreadyInCateogories = categories.find(
      (c) => c.categoryId == categoryId
    );
    if (category && !alreadyInCateogories) {
      setCategories([...categories, category]);
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
        <input
          className={inputTailwindCSS}
          placeholder="Enter Item Name"
          defaultValue={item.itemName}
        />
        <input
          className={inputTailwindCSS}
          placeholder="Enter Item Cost"
          type="number"
          defaultValue={item.cost}
        />
        <input
          className={inputTailwindCSS}
          placeholder="Enter Image URL"
          defaultValue={item.imgURL}
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
          </select>{" "}
          <MdAddCircleOutline
            className="cursor-pointer"
            onClick={addCategory}
          />{" "}
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
                  Delete cateogry
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
                  Delete Item
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

export default function EditItem() {
  const { id } = useParams();
  const [item, setItem] = useState<Item | undefined | null>(undefined);
  const { categories } = useCategories();
  const { subCategories } = useSubCategories();
  useEffect(() => {
    if (!id) return;
    const fetchItem = async () => {
      try {
        const response = await getItemById(id);
        if (!response) {
          return setItem(null);
        }
        setItem(response);
      } catch (e) {
        setItem(null);
      }
    };
    fetchItem();
  }, [id]);

  if (item === undefined) {
    return <div>Loading...</div>;
  }

  if (item === null) {
    return <div>Not found...</div>;
  }

  return (
    <Page>
      <div className="flex flex-col w-fit min-w-[400px] mx-auto my-[32px]">
        <EditItemForm
          allCategories={categories}
          item={item}
          allSubCategories={subCategories}
        />
      </div>
    </Page>
  );
}
