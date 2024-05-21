import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import db from "../firebase";
import Combobox from "./Combobox";

function Products() {
  const products = useSelector((state) => state.products);
  const customers = useSelector((state) => state.customers);
  const purchases = useSelector((state) => state.purchases);
  const [visibleBuyProduct, setVisibleBuyProduct] = useState(true);
  const [visibleAddProduct, setVisibleAddProduct] = useState(true);

  const [product, setProduct] = useState({
    name: "",
    price: 0,
    quantity: 0,
  });

  const Add = () => {
    setVisibleAddProduct(!visibleAddProduct);

    if (
      product.name !== "" &&
      product.price !== "" &&
      product.quantity !== ""
    ) {
      const obj = {
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      };

      addDoc(collection(db, "products"), obj);
    }
  };

  return (
    <div>
      <h1>Products</h1>

      <h4>
        Total Price:{" "}
        {products.reduce((acc, prod) => acc + prod.price * prod.quantity, 0)}
      </h4>

      <button
        hidden={!visibleAddProduct}
        onClick={() => setVisibleAddProduct(!visibleAddProduct)}
      >
        Add Product
      </button>

      <br />

      <div
        hidden={visibleAddProduct}
        style={{
          border: "2px solid black",
          width: 350,
          borderRadius: "20px",
          textAlign: "center",
        }}
      >
        <h3>Add Product</h3>
        Name:{" "}
        <input
          type="text"
          onInput={(e) => setProduct({ ...product, name: e.target.value })}
        />
        <br />
        Price:{" "}
        <input
          type="text"
          onInput={(e) => setProduct({ ...product, price: +e.target.value })}
        />
        <br />
        <button onClick={Add}>Add</button>
      </div>

      <br />

      <table border={1}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Price</td>
            <td>Quantity</td>
            <td>
              <h3>All customers that bought the product:</h3>
            </td>
            <td>
              <h3>Buy this product</h3>
            </td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <Link to={`/editProduct/${product.id}`}>{product.name}</Link>
              </td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <table border={1}>
                  <thead>
                    <tr>
                      <td>Name</td>
                      <td>Date</td>
                    </tr>
                  </thead>
                  <tbody>
                    {purchases
                      .filter((purchase) => purchase.productID === product.id)
                      .map((purchase) =>
                        customers
                          .filter(
                            (customer) => purchase.customerID === customer.id
                          )
                          .map((customer) => (
                            <tr key={purchase.id}>
                              <td>
                                <Link to={`/editCustomer/${customer.id}`}>
                                  {customer.firstName + " " + customer.lastName}
                                </Link>
                              </td>
                              <td>{purchase.date.toString()}</td>
                            </tr>
                          ))
                      )}
                  </tbody>
                </table>
              </td>
              <td
                style={{ textAlign: "center" }}
                onClick={() => setVisibleBuyProduct(false)}
              >
                <button>Add</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <div
        hidden={visibleBuyProduct}
        style={{
          border: "2px solid black",
          width: 150,
          borderRadius: "20px",
          textAlign: "center",
        }}
      >
        <Combobox
          setVisibleBuyProduct={setVisibleBuyProduct}
          visibleBuyProduct={visibleBuyProduct}
        />
      </div>

      <br />

      <Link to="/">Homepage</Link>
    </div>
  );
}

export default Products;
