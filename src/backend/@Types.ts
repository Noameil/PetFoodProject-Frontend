
export interface Category {
  categoryId: string;
  categoryName: string;
  items: Item[];
  subCategories: SubCategory[];
}

export interface SubCategory {
  subCategoryId: string;
  subCategoryName: string;
  category: Category;
  items: Item[];
}

export interface Item {
  itemId: string;
  itemName: string;
  cost: number;
  imgURL: string;
  categories: Category[];
  subCategories: SubCategory[];
}

export interface Order {
  orderId: string;
  user: User;
  cart: Cart;
  shippingAddress: string;
  total: Number;
}

export interface OrderItem {
  orderItemId: string;
  order: Order;
  item: Item;
  amount: number;
}

export interface Cart {
  cartId: string
  cartItems: OrderItemDTO[];
}

export interface User {
  userId: string;
  username: string;
  email: string;
  password: string;
  orders: Order[];
  roles: Role[];
  cart: Cart;
}

export interface Role {
  roleId: number;
  roleName: string;
  users: User[];
}

//DTOS:

//ITEM:

export type ItemDTO = Omit<Item, "itemId" | "categories" | "subCategories"> & {
  categories: number[];
  subCategories: number[];
};
export type ItemUpdateDTO = Omit<Item,"categories" | "subCategories"> & {
  categories : number[];
  subCategories: number[];
}

export type CartUpdateDTO =  {
  itemId: string
  amount: number
}

export type ItemDeleteDTO = Pick<Item, "itemId">
export type ItemAddDTO = Omit<ItemUpdateDTO, "itemId">

//ORDERITEM

export interface OrderItemDTO {
  item:Item
  amount:number
}

// ORDER

export type OrderDTO = Pick<Order, "shippingAddress" | "total">


//CATEGORY

export type CategoryDTO = Omit<Category,"categoryId" | "items" | "subCategories"> & {
  items : number[];
  subCategories: number[];
}
export type CategoryUpdateDTO = Omit<Category,"items" | "subCategories"> & {
  items : number[];
  subCategories: number[];
}

export type CategoryDeleteDTO = Pick<Category, "categoryId">
export type CategoryAddDTO = Omit<CategoryUpdateDTO, "categoryId">

//SUBCATEGORY

export type SubCategoryDTO = Omit<SubCategory, "subCategoryId" | "items" | "category"> & {items : number[]}
export type SubCategoryUpdateDTO = Omit<SubCategoryStringDTO,"items"> & {items : number[]}

export type SubCategoryDeleteDTO = Omit<SubCategory, "subCategoryName">
export type SubCategoryAddDTO = Omit<SubCategoryUpdateDTO, "subCategoryId">

export interface SubCategoryStringDTO {
  subCategoryId: string;
  subCategoryName: string;
  category: string;
  items: number[];
}
