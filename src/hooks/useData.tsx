import { useCallback, useEffect, useState } from "react";
import { Category, Item, SubCategory } from "../backend/@Types";
import {
  deleteCategory,
  deleteItem,
  deleteSubCategory,
  getCategories,
  getItems,
  getSubCategories,
} from "../backend/Network";

const useData = () => {
  const [items, setItems] = useState<Item[]>([]);

  const [categories, setCategories] = useState<Category[]>([]);

  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  const [category, setCategory] = useState<Category>();

  const deleteItemLocal = async (item: Item) => {
    setCategories(item.categories);
    categories.map((c) =>
      c.items.map((i) => {
        if (i.itemId == item.itemId) deleteItem(i);
      })
    );
    setSubCategories(item.subCategories);
    subCategories.map((sc) =>
      sc.items.map((i) => {
        if (i.itemId == item.itemId) deleteItem(i);
      })
    );
    deleteItem(item);
    setItems(items.filter((i) => i.itemId !== item.itemId));

    await fetchItems();
    await fetchCategories();
    await fetchSubCategories();
  };

  const deleteCategoryLocal = async (category: Category) => {
    setItems(category.items);
    items.map((i) =>
      i.categories.map((c) => {
        if (c.categoryId == category.categoryId) deleteCategory(c);
      })
    );
    setSubCategories(category.subCategories);
    subCategories.map((sc) => {
      if (sc.category.categoryId == category.categoryId)
        deleteCategory(sc.category);
    });
    deleteCategory(category);
    setCategories(
      categories.filter((c) => c.categoryId !== category.categoryId)
    );

    await fetchCategories();
    await fetchItems();
    await fetchSubCategories();
  };

  const deleteSubCategoryLocal = async (subCategory: SubCategory) => {
    setItems(subCategory.items);
    items.map((i) =>
      i.subCategories.map((sc) => {
        if (sc.subCategoryId == subCategory.subCategoryId)
          deleteSubCategory(sc);
      })
    );
    subCategories.map((sc1) => {
      setCategory(sc1.category);
      category?.subCategories.map((sc2) => {
        if (sc2.subCategoryId == subCategory.subCategoryId)
          deleteSubCategory(sc2);
      });
    });
    deleteSubCategory(subCategory);
    setSubCategories(
      subCategories.filter(
        (sc) => sc.subCategoryId !== subCategory.subCategoryId
      )
    );

    await fetchSubCategories();
    await fetchItems();
    await fetchCategories();
  };

  const fetchItems = useCallback(async () => {
    try {
      const itemsArray = (await getItems()) as Item[];
      setItems(itemsArray);
      return itemsArray;
    } catch (e) {
      console.log(e);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const categoriesArray = (await getCategories()) as Category[];
      setCategories(categoriesArray);
      return categoriesArray;
    } catch (e) {
      console.log(e);
    }
  }, []);

  const fetchSubCategories = useCallback(async () => {
    try {
      const subCategoriesArray = (await getSubCategories()) as SubCategory[];
      setSubCategories(subCategoriesArray);
      return subCategoriesArray;
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchItems();
    fetchCategories();
    fetchSubCategories();
  }, []);

  return {
    items,
    fetchItems,
    deleteItemLocal,
    categories,
    fetchCategories,
    deleteCategoryLocal,
    subCategories,
    fetchSubCategories,
    deleteSubCategoryLocal,
  };
};

export default useData;
