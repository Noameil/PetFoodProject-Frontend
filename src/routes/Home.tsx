import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard/ItemCard";
import { getItems } from "../backend/Network";
import { Item } from "../backend/@Types";
import useItems from "../hooks/Item/useItems";
import Page from "./Page";

const Home = () => {
  const { items } = useItems();

  return (
    <Page>
        <div className="w-10/12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {items.map((item) => (
            <ItemCard key={item.itemId} item={item} />
          ))}
        </div>
    </Page>
  );
};

export default Home;
