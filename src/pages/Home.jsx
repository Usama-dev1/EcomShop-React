import { CartState } from "../context/Context";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";

const Home = () => {
   const {
    state:{products},
     productState: { byStock, sort, byFastDelivery, byRating, searchQuery }
   } = CartState();

  const transformProducts = () => {
    let filteredProducts = products;

    // Filter by stock
    if (byStock) {
      filteredProducts = filteredProducts.filter(
        (product) => product.inStock > 0
      );
    }

    // Filter by fast delivery
    if (byFastDelivery) {
      filteredProducts = filteredProducts.filter(
        (product) => product.fastDelivery
      );
    }

    // Filter by rating
    if (byRating) {
      filteredProducts = filteredProducts.filter(
        (product) => product.ratings >= byRating
      );
    }

    // Filter by search query turn to lower case
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort by price
    if (sort) {
      filteredProducts = filteredProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    return filteredProducts;
  };
  return (
    <div className="container my-4">
      <div className="row">
        {/* Filters Section */}
        <div className="col-md-3 mb-4">
          <Filters />
        </div>

        {/* Product Cards Section */}
        <div className="col-md-9">
          <div className="row">
            {transformProducts().length > 0 ? (
              transformProducts().map((item) => (
                <div className="col-sm-6 col-md-4 col-lg-4" key={item.id}>
                  <ProductCard
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    inStock={item.inStock}
                    fastDelivery={item.fastDelivery}
                    ratings={item.ratings}
                  />
                </div>
              ))
            ) : (
              <div>No Products Found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
