import { ImSearch } from "react-icons/im";
import { FaListUl } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Card from "../components/Card";
import Loader from "../components/Loader";
import { useProducts } from "../context/ProductsContext";
import {
  createQueryObject,
  filterProducts,
  getInitialQuery,
  searchedProduct,
} from "../helpers/helper";

import styles from "./ProductsPage.module.css";

function ProductsPage() {
  const products = useProducts();
  // console.log(products)
  const [displayed, setDisplayed] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({});

  //we need to manipulate the URL for keeping the search and filter after refreshing the page
  const [searchParam, setSearchParam] = useSearchParams();
  
  useEffect(() => {
    setDisplayed(products);
    // to keep searching after we refresh we use this function
    setQuery(getInitialQuery(searchParam));
  }, [products]);

  useEffect(() => {
    setSearchParam(query);
    setSearch(query.search || "")
    let finalProducts = searchedProduct(products, query.search);
    finalProducts = filterProducts(finalProducts, query.category);
    setDisplayed(finalProducts);
  }, [query]);

  const searchHandler = () => {
    // we need to remove the "search=" from URL when search input is empty
    // that's why we use crateQueryObject function
    setQuery((query) => createQueryObject(query, { ...query, search }));
  };

  const categoryHandler = (event) => {
    const { tagName } = event.target;
    const category = event.target.innerText.toLowerCase();

    if (tagName !== "LI") return;
    // we need to get rid of "All", because "all" is not in the product's categories
    // also we need to remove filter from URL when it is "all"
    setQuery((query) => createQueryObject(query, { ...query, category }));
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value.toLowerCase().trim())}
          value={search}
        />
        <button onClick={searchHandler}>
          <ImSearch />
        </button>
      </div>
      <div className={styles.container}>
        <div className={styles.products}>
          {!displayed.length && <Loader />}
          {displayed.map((product) => (
            <Card key={product.id} data={product} />
          ))}
        </div>

        <div>
          <div>
            <FaListUl />
            <p>Categories</p>
          </div>
          <ul onClick={categoryHandler}>
            <li>All</li>
            <li>Electronics</li>
            <li>Jewelery</li>
            <li>Men's Clothing</li>
            <li>Women's Clothing</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default ProductsPage;
