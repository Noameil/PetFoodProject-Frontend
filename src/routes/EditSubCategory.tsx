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
  getSubCategoryById,
  updateCategory,
  updateItem,
  updateSubCategory,
} from "../backend/Network";
import {
  Category,
  CategoryUpdateDTO,
  Item,
  ItemDTO,
  ItemUpdateDTO,
  SubCategory,
  SubCategoryUpdateDTO,
} from "../backend/@Types";
import { MdAddCircleOutline } from "react-icons/md";
import useSubCategories from "../hooks/SubCategory/useSubCategories";
import useCategories from "../hooks/Category/useCategories";
import Page from "./Page";

const inputTailwindCSS = `p-2 border-2 border-black rounded-md w-full`;
const EditSubCategoryForm = ({
  subCategory,
  allItems,
  allCategories,
}: {
  subCategory: SubCategory;
  allItems: Item[];
  allCategories: Category[];
}) => {
  const [items, setItems] = useState(subCategory.items);
  const [category, setCategory] = useState(subCategory.category);

  const nav = useNavigate();

  const selectItemRef = useRef<HTMLSelectElement | null>(null);
  const selectCategoryRef = useRef<HTMLSelectElement | null>(null);
  const submitUpdate = async (e: any) => {
    e.preventDefault();
    const subCategoryName = e.target[0].value;
    const newSubCategory = {
      ...subCategory,
      subCategoryName,
      category: category.categoryId,
      items: items.map((item) => parseInt(item.itemId)),
    } as SubCategoryUpdateDTO;
    console.log(newSubCategory);
    try {
      const updateResponse = await updateSubCategory(newSubCategory);
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
          defaultValue={subCategory.subCategoryName}
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

export default function EditSubCategory() {
  const { id } = useParams();
  const [subCategory, setSubCategory] = useState<
    SubCategory | undefined | null
  >(undefined);
  const { items } = useItems();
  const { categories } = useCategories();
  useEffect(() => {
    if (!id) return;
    const fetchCategory = async () => {
      try {
        const response = await getSubCategoryById(id);
        if (!response) {
          return setSubCategory(null);
        }
        setSubCategory(response);
      } catch (e) {
        setSubCategory(null);
      }
    };
    fetchCategory();
  }, [id]);

  if (subCategory === undefined) {
    return <div>Loading...</div>;
  }

  if (subCategory === null) {
    return <div>Not found...</div>;
  }

  return (
    <Page>
      <div className="flex flex-col w-fit min-w-[400px] mx-auto my-[32px]">
        <EditSubCategoryForm
          allItems={items}
          subCategory={subCategory}
          allCategories={categories}
        />
      </div>
    </Page>
  );
}
