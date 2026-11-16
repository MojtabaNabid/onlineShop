import { FaListUl } from "react-icons/fa";

import { createQueryObject } from "../helpers/helper";
import { categories } from "../constants/list";

import styles from "./Sidebar.module.css";
function Sidebar({ query, setQuery }) {
  const categoryHandler = (event) => {
    const { tagName } = event.target;
    const category = event.target.innerText.toLowerCase();

    if (tagName !== "LI") return;
    // we need to get rid of "All", because "all" is not in the product's categories
    // also we need to remove filter from URL when it is "all"
    setQuery((query) => createQueryObject(query, { ...query, category }));
  };

  return (
    <div className={styles.sidebar}>
      <div>
        <FaListUl />
        <p>Categories</p>
      </div>
      <ul onClick={categoryHandler}>
        {categories.map((item) => (
          <li
            key={item.id}
            className={(query.category === item.type.toLowerCase()) ? styles.selected : null}
          >
            {item.type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
