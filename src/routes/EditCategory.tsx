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
import {
  getCategoryById,
  getItemById,
  updateCategory,
  updateItem,
} from "../backend/Network";
import {
  Category,
  CategoryUpdateDTO,
  Item,
  ItemDTO,
  ItemUpdateDTO,
  SubCategory,
} from "../backend/@Types";
import { MdAddCircleOutline } from "react-icons/md";
import useSubCategories from "../hooks/SubCategory/useSubCategories";
import Page from "./Page";

const inputTailwindCSS = `p-2 border-2 border-black rounded-md w-full`;
const EditCategoryForm = ({
  category,
  allItems,
  allSubCategories,
}: {
  category: Category;
  allItems: Item[];
  allSubCategories: SubCategory[];
}) => {
  const [items, setItems] = useState(category.items);
  const [subCategories, setSubCategories] = useState(category.subCategories);

  const nav = useNavigate();

  const selectItemRef = useRef<HTMLSelectElement | null>(null);
  const selectSubCategoryRef = useRef<HTMLSelectElement | null>(null);
  const submitUpdate = async (e: any) => {
    e.preventDefault();
    const categoryName = e.target[0].value;
    const newCategory = {
      ...category,
      categoryName,
      items: items.map((item) => parseInt(item.itemId)),
      subCategories: subCategories.map((subCategory) =>
        parseInt(subCategory.subCategoryId)
      ),
    } as CategoryUpdateDTO;
    console.log(newCategory);
    try {
      const updateResponse = await updateCategory(newCategory);
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
        <input
          className={inputTailwindCSS}
          placeholder="enter item name"
          defaultValue={category.categoryName}
        />
        <div className="flex flex-row gap-x-3 items-center justify-center">
          <select className={inputTailwindCSS} ref={selectItemRef}>
            {Children.toArray(
              allItems.map((item) => (
                <option value={item.itemId}>{item.itemName}</option>
              ))
            )}
          </select>{" "}
          <MdAddCircleOutline className="cursor-pointer" onClick={addItem} />{" "}
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

export default function EditCategory() {
  const { id } = useParams();
  const [category, setCategory] = useState<Category | undefined | null>(
    undefined
  );
  const { items } = useItems();
  const { subCategories } = useSubCategories();
  useEffect(() => {
    if (!id) return;
    const fetchCategory = async () => {
      try {
        const response = await getCategoryById(id);
        if (!response) {
          return setCategory(null);
        }
        setCategory(response);
      } catch (e) {
        setCategory(null);
      }
    };
    fetchCategory();
  }, [id]);

  if (category === undefined) {
    return <div>Loading...</div>;
  }

  if (category === null) {
    return <div>Not found...</div>;
  }

  return (
    <Page>
      <div className="flex flex-col w-fit min-w-[400px] mx-auto my-[32px]">
        <EditCategoryForm
          allItems={items}
          category={category}
          allSubCategories={subCategories}
        />
      </div>
    </Page>
  );
}
