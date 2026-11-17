const shortenText = (text) => {
  return text.split(" ").slice(0, 3).join(" ");
};

const searchedProduct = (products, search) => {
  if (!search) return products;
  const finalSearch = products.filter((p) =>
    p.title.toLowerCase().includes(search),
  );
  return finalSearch;
};

const filterProducts = (products, filter) => {
  if (!filter) return products;
  const filteredProducts = products.filter((p) => p.category === filter);
  return filteredProducts;
};

// to avoid the "All" and empty search input in URL's query and
// also removing the "All" category from filtering
const createQueryObject = (currentQuery, newQuery) => {
  if (newQuery.category === "all") {
    const { category, ...rest } = currentQuery;
    return rest;
  }
  if (newQuery.search === "") {
    const { search, ...rest } = currentQuery;
    return rest;
  }
  return { ...currentQuery, ...newQuery };
};

const getInitialQuery = (searchParam) => {
  const query = {};
  const search = searchParam.get("search");
  const category = searchParam.get("category");
  if (search) query.search = search;
  if (category) query.category = category;
  return query;
};

const sumProducts = (products) => {
  const itemsCounter = products.reduce(
    (counter, product) => counter + product.quantity,
    0,
  );
  const total = products
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2);

  return { itemsCounter, total };
};

const productQuantity = (state, id) => {
  //finding the id in state
  const index = state.selectedItems.findIndex((item) => item.id === id);
  if (index === -1) {
    //if there was nothing of that product
    return 0;
  } else {
    return state.selectedItems[index].quantity; //if there is, return the quantity
  }
};

export {
  shortenText,
  searchedProduct,
  filterProducts,
  createQueryObject,
  getInitialQuery,
  sumProducts,
  productQuantity,
};
