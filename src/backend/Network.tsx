import axios from "axios";
import {
  Item,
  Category,
  User,
  ItemDTO,
  ItemDeleteDTO,
  CategoryDTO,
  CategoryDeleteDTO,
  ItemUpdateDTO,
  CategoryUpdateDTO,
  Cart,
  SubCategory,
  SubCategoryDTO,
  SubCategoryDeleteDTO,
  SubCategoryUpdateDTO,
  CartUpdateDTO,
  OrderDTO,
  Order,
} from "../backend/@Types";

const service = new axios.Axios({
  baseURL: "http://localhost:8080/api/v1/",
});

service.interceptors.request.use((config) => {
  const userString = localStorage.getItem("user");
  if (userString) {
    const user = JSON.parse(userString) as { token: string };
    config.headers["Authorization"] = "Bearer " + user.token;
  }
  return config;
});

function getAsObject<T>(data: any) {
  if (typeof data === "string") return JSON.parse(data) as T;
  return data as T;
}

//ITEMS

const getItems = async (): Promise<Item[]> => {
  const response = await service.get("items");
  const data = getAsObject<Item[]>(response.data);
  return data;
};

const getItemById = async (id: string): Promise<Item> => {
  const response = await service.get("items/" + id);
  if (isError(response.status)) {
    throw JSON.parse(response.data);
  }
  const itemGot = getAsObject<Item>(response.data);
  return itemGot;
};

const createItem = async (newItem: ItemDTO): Promise<Item> => {
  const response = await service.post("items", JSON.stringify(newItem), {
    headers: { "Content-Type": "application/json" },
  });
  if (isError(response.status)) {
    throw JSON.parse(response.data);
  }
  const createdItem = getAsObject<Item>(response.data);
  return createdItem;
};

const deleteItem = async (itemToDelete: ItemDeleteDTO): Promise<Item> => {
  const response = await service.delete("items/" + itemToDelete.itemId);
  if (isError(response.status)) {
    throw JSON.parse(response.data);
  }
  const deletedItem = getAsObject<Item>(response.data);
  return deletedItem;
};

const updateItem = async (itemToUpdate: ItemUpdateDTO): Promise<Item> => {
  const response = await service.put(
    "items/" + itemToUpdate.itemId,
    JSON.stringify(itemToUpdate),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  if (isError(response.status)) {
    throw JSON.parse(response.data);
  }
  const updatedItem = getAsObject<Item>(response.data);
  return updatedItem;
};


//CATEGORIES

const getCategories = async (): Promise<Category[]> => {
  const response = await service.get("categories");
  const data = getAsObject<Category[]>(response.data);
  return data;
};

const getCategoryById = async (id: string): Promise<Category> => {
  const response = await service.get("categories/" + id);
  if (isError(response.status)) {
    throw JSON.parse(response.data);
  }
  const categoryGot = getAsObject<Category>(response.data);
  return categoryGot;
};

const getCategoryByCategoryName = async (categoryName: string): Promise<Category> => {
  const response = await service.get("categories/" + categoryName);
  if (isError(response.status)) {
    throw JSON.parse(response.data);
  }
  const categoryGot = getAsObject<Category>(response.data);
  return categoryGot;
};

const createCategory = async (newCategory: CategoryDTO): Promise<Category> => {
  const response = await service.post(
    "categories",
    JSON.stringify(newCategory),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  if (isError(response.status)) {
    throw JSON.parse(response.data);
  }
  const createdCategory = getAsObject<Category>(response.data);
  return createdCategory;
};

const deleteCategory = async (
  categoryToDelete: CategoryDeleteDTO
): Promise<Category> => {
  const response = await service.delete(
    "categories/" + categoryToDelete.categoryId
  );
  if (isError(response.status)) {
    throw JSON.parse(response.data);
  }
  const deletedCategory = getAsObject<Category>(response.data);
  return deletedCategory;
};

const updateCategory = async (
  categoryToUpdate: CategoryUpdateDTO
): Promise<Category> => {
  const response = await service.put(
    "categories/" + categoryToUpdate.categoryId,
    JSON.stringify(categoryToUpdate),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  if (isError(response.status)) {
    throw JSON.parse(response.data);
  }
  const updatedCategory = getAsObject<Category>(response.data);
  return updatedCategory;
};

//SUBCTEGORIES

const getSubCategories = async (): Promise<SubCategory[]> => {
  const response = await service.get("subcategories");
  const data = getAsObject<SubCategory[]>(response.data);
  return data;
};

const getSubCategoryById = async (id: string): Promise<SubCategory> => {
  const response = await service.get("subcategories/" + id);
  if (isError(response.status)) {
    throw JSON.parse(response.data);
  }
  const subCategoryGot = getAsObject<SubCategory>(response.data);
  return subCategoryGot;
};

const createSubCategory = async (
  newSubCategory: SubCategoryDTO
): Promise<SubCategory> => {
  const response = await service.post(
    "subcategories",
    JSON.stringify(newSubCategory),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  if (isError(response.status)) {
    throw JSON.parse(response.data);
  }
  const createdSubCategory = getAsObject<SubCategory>(response.data);
  return createdSubCategory;
};

const deleteSubCategory = async (
  subCategoryToDelete: SubCategoryDeleteDTO
): Promise<SubCategory> => {
  const response = await service.delete(
    "subcategories/" + subCategoryToDelete.subCategoryId
  );
  if (isError(response.status)) {
    throw JSON.parse(response.data);
  }
  const deletedSubCategory = getAsObject<SubCategory>(response.data);
  return deletedSubCategory;
};

const updateSubCategory = async (
  subCategoryToUpdate: SubCategoryUpdateDTO
): Promise<SubCategory> => {
  const response = await service.put(
    "subcategories/" + subCategoryToUpdate.subCategoryId,
    JSON.stringify(subCategoryToUpdate),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  if (isError(response.status)) {
    throw JSON.parse(response.data);
  }
  const updatedSubCategory = getAsObject<SubCategory>(response.data);
  return updatedSubCategory;
};

// CART
const updateCart = async (cart: CartUpdateDTO) => {
  const response = await service.put("carts", JSON.stringify(cart), {
    headers: { "Content-Type": "application/json" },
  });
  if (isError(response.status)) {
    throw JSON.parse(response.data);
  }
  const updatedCart = getAsObject<Cart>(response.data);
  return updatedCart;
};

// USER

const getUser = async (): Promise<User> => {
  const response = await service.get("user");
  const data = getAsObject<User>(response.data);
  return data;
};

const isError = (status: number) => {
  return status >= 300 && status <= 600;
};

// ORDER

const createOrder = async (newOrder: OrderDTO): Promise<Order> => {
  const response = await service.post("orders", JSON.stringify(newOrder), {
    headers: { "Content-Type": "application/json" },
  });
  if (isError(response.status)) {
    throw JSON.parse(response.data);
  }
  const createdOrder = getAsObject<Order>(response.data);
  return createdOrder;
}

export {
  getItems,
  createItem,
  deleteItem,
  updateItem,
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
  getSubCategories,
  createSubCategory,
  deleteSubCategory,
  updateSubCategory,
  getUser,
  getItemById,
  getCategoryById,
  getCategoryByCategoryName,
  getSubCategoryById,
  updateCart,
  createOrder
};
