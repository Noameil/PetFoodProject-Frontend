import React, { useContext,useMemo } from "react";
import { Item, Category, OrderItem, SubCategory, OrderItemDTO } from "../../backend/@Types";
import AuthContext from "../../contexts/AuthContext";
import { updateCart } from "../../backend/Network";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type CartItemProps = Pick<OrderItemDTO, "amount">
const ItemCard = ({ item, inCart}: { item: Item ,inCart?: CartItemProps}) => {
  const { user, updateLocalCart } = useContext(AuthContext);

  const onUpdateCart = async () => {
    if (!user) return;
    const amount = inCart ? -1 : 1
    const newCart = await updateCart({ itemId: item.itemId, amount});
    updateLocalCart(newCart);
    // check if item already in cart, if so only update amount
    // else add a new order item with amount = 1
    toast.success(cartItemsProps.buttonText + "!", {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 2000, // Duration for the toast notification in milliseconds (optional)
    })
  };

  const cartItemsProps = useMemo(() => {
    return {
      buttonText: inCart ? "Remove" : "Add",
      buttonColor: inCart ? 'bg-[#bd3333]' : 'bg-blue-500'
    }
  }, [inCart])

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-center mb-4">
        <img
          src={item.imgURL}
          alt={item.itemName}
          className="w-32 h-32 object-cover"
        />
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">{item.itemName}</h3>
        <p className="text-gray-600">
          Category: {item.categories.map((c: Category) => c.categoryName)}
        </p>
        <p className="text-gray-600">
          Sub Category: {item.subCategories.map((sc: SubCategory) => sc.subCategoryName)}
        </p>
        <p className="text-blue-500 font-medium mt-2">{item.cost}₪</p>
        <div>Amount: {inCart?.amount}</div>
        <button className={"mt-4  text-white px-4 py-2 rounded hover:brightness-90 " + cartItemsProps.buttonColor} 
        onClick={onUpdateCart}>
          {cartItemsProps.buttonText}
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
