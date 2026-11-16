import { ImSearch } from "react-icons/im";
import { createQueryObject } from "../helpers/helper";

import styles from "./SearchBox.module.css"

function SearchBox({search, setSearch, setQuery}) {

  const searchHandler = () => {
    // we need to remove the "search=" from URL when search input is empty
    // that's why we use crateQueryObject function
    setQuery((query) => createQueryObject(query, { ...query, search }));
  };

  return (
    <div className={styles.search}>
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
  );
}

export default SearchBox;
