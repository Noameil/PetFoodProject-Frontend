import ItemCard from "../components/ItemCard/ItemCard";
import AuthContext from "../contexts/AuthContext";
import React, { useContext, useMemo, useState } from "react";
import Page from "./Page";
import { createOrder } from "../backend/Network";
import { OrderDTO } from "../backend/@Types";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { user } = useContext(AuthContext);
  const [shippingAddress, setShippingAddress] = useState('');
  const nav = useNavigate();

  const submitUpdate = async (e:any) => {
    e.preventDefault();
    const total = totalPrice;
    const newOrder = {
      shippingAddress,
      total
    } as OrderDTO;
    try {
      console.log(newOrder.shippingAddress)
      const updateResponse = await createOrder(newOrder);
      const orderId = updateResponse.orderId;
      nav("/checkout");
    } catch (e) {
      console.log(e);
    }
  }

  const totalItemsInCart = useMemo(() => {
    if (!user) return 0;
    return user.cart.cartItems.reduce(
      (total, cartItem) => total + cartItem.amount,
      0
    );
  }, [user]);
  const totalPrice = useMemo(() => {
    if (!user) return 0;
    return user.cart.cartItems.reduce(
      (total, cartItem) => total + cartItem.item.cost * cartItem.amount,
      0
    );
  }, [user]);

  if (user?.cart === undefined) {
    return <div>No Items in the Cart :/</div>;
  }

  if (user?.cart === null) {
    return <div>Not found...</div>;
  }

  return (
    <Page className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full max-w-[500px] px-4">
        {/* Content section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 my-6">
          {user.cart.cartItems?.map((cartItem) => (
            <ItemCard
              inCart={{ amount: cartItem.amount }}
              key={cartItem.item.itemId}
              item={cartItem.item}
            />
          ))}
        </div>

        {/* Summary section */}
        <div className="flex flex-col w-full items-center justify-center mb-4 p-4 bg-gray-100 rounded-md">
          <div className="flex justify-around w-full mb-4">
            <span className="text-lg">Items in cart: {totalItemsInCart}</span>
            <span className="text-lg">Total Price: {totalPrice}₪</span>
          </div>
          <input
            type="text"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            placeholder="Enter Shipping Address"
          />

          {/* Checkout button */}
          <button 
          onClick={submitUpdate}
          className="w-full p-4 bg-blue-700 rounded-md text-white font-bold hover:bg-blue-800 transition duration-300 ease-in-out">
            Checkout
          </button>
        </div>
      </div>
    </Page>
  );
};

export default Cart;
