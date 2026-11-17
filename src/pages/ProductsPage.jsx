import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Card from "../components/Card";
import Loader from "../components/Loader";
import { useProducts } from "../context/ProductsContext";
import {
  filterProducts,
  getInitialQuery,
  searchedProduct,
} from "../helpers/helper";

import styles from "./ProductsPage.module.css";
import SearchBox from "../components/SearchBox";
import Sidebar from "../components/Sidebar";



function ProductsPage() {
  const products = useProducts();
  // console.log(products)
  const [displayed, setDisplayed] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({});

  //manipulte the URL
  const [searchParam, setSearchParam] = useSearchParams();

  useEffect(() => {
    setDisplayed(products);
    // search after refreshing
    setQuery(getInitialQuery(searchParam));
  }, [products]);

  useEffect(() => {
    setSearchParam(query);
    setSearch(query.search || "");
    let finalProducts = searchedProduct(products, query.search);
    finalProducts = filterProducts(finalProducts, query.category);
    setDisplayed(finalProducts);
  }, [query]);

  return (
    <>
      <SearchBox search={search} setSearch={setSearch} setQuery={setQuery} />
      <div className={styles.container}>
        <div className={styles.products}>
          {!displayed.length && <Loader />}
          {displayed.map((product) => (
            <Card key={product.id} data={product} />
          ))}
        </div>
        <Sidebar query={query} setQuery={setQuery} />
      </div>
    </>
  );
}

export default ProductsPage;
