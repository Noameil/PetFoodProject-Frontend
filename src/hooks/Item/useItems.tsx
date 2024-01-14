import { useCallback, useEffect, useState } from "react";
import { deleteItem, getItems } from "../../backend/Network";
import { Category, Item, SubCategory } from "../../backend/@Types";

const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);

  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  const deleteItemLocal = (item:Item) => {
      setCategories(item.categories)
      categories.map(c => c.items.map(i => {
          if(i.itemId == item.itemId)
              deleteItem(i);
      }))
      setSubCategories(item.subCategories)
      subCategories.map(sc => sc.items.map(i => {
          if(i.itemId == item.itemId)
              deleteItem(i);
      }))
      deleteItem(item)
      setItems(items.filter(i => i.itemId !== item.itemId))
  }

//   const deleteItemLocal = (itemToDelete: Item) => {
//     setItems((prevItems) =>
//       prevItems.filter((item) => item.itemId !== itemToDelete.itemId)
//     );

//     setCategories((prevCategories) => {
//       return prevCategories.map((category) => ({
//         ...category,
//         items: category.items.filter(
//           (item) => item.itemId !== itemToDelete.itemId
//         ),
//       }));
//     });

//     setSubCategories((prevSubCategories) => {
//       return prevSubCategories.map((subCategory) => ({
//         ...subCategory,
//         items: subCategory.items.filter(
//           (item) => item.itemId !== itemToDelete.itemId
//         ),
//       }));
//     });
//   };

  const fetchItems = useCallback(async () => {
    try {
      const itemsArray = (await getItems()) as Item[];
      setItems(itemsArray);
      return itemsArray;
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, []);

  return { items, fetchItems, deleteItemLocal };
};

export default useItems;
