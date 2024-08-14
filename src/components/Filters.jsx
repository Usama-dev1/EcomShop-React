import { Form, Button } from "react-bootstrap";
import Rating from "./Rating";
import { CartState } from "../context/Context";
const Filters = () => {
  const {
    productState: { byStock, sort, byFastDelivery, byRating, searchQuery },
    productDispatch,
  } = CartState();
  console.log(byStock, sort, byFastDelivery, byRating, searchQuery);
  return (
    <div className="d-flex flex-column p-3 border rounded">
      <h3 className="mb-2">Filter Products</h3>

      <div className="mb-3">
        <h6>Sort By</h6>
        <div className="d-flex flex-column">
          <Form.Check
            inline
            name="sortOrder"
            label="Ascending"
            type="radio"
            id="sort-ascending"
            onChange={() =>
              productDispatch({ type: "SORT_BY_PRICE", payload: "lowToHigh" })
            }
            checked={sort === "lowToHigh" ? true : false}
          />
          <Form.Check
            inline
            name="sortOrder"
            label="Descending"
            type="radio"
            id="sort-descending"
            onChange={() =>
              productDispatch({ type: "SORT_BY_PRICE", payload: "highToLow" })
            }
            checked={sort === "highToLow" ? true : false}
          />
        </div>
      </div>

      <div className="mb-3">
        <h6>Filters</h6>
        <div className="d-flex flex-column">
          <Form.Check
            inline
            name="filter"
            label="Fast Delivery Only"
            type="checkbox"
            id="filter-fast-delivery"
            onChange={() => productDispatch({ type: "FILTER_BY_DELIVERY" })}
            checked={byFastDelivery}
          />
          <Form.Check
            inline
            name="filter"
            label="Out of Stock"
            type="checkbox"
            id="filter-out-of-stock"
            onChange={() => productDispatch({ type: "FILTER_BY_STOCK" })}
            checked={byStock}
          />
        </div>
      </div>
      <span className="font-weight-bold my-4">
        <h6>Rating: </h6>
        <Rating
          rate={byRating}
          onClick={(i) =>
            productDispatch({ type: "FILTER_BY_RATING", payload: i + 1 })
          }
          style={{ cursor: "pointer" }}
        />
      </span>
      <Button
        variant="danger"
        onClick={() => productDispatch({ type: "CLEAR_FILTERS" })}>
        Clear Filters
      </Button>
    </div>
  );
};

export default Filters;
