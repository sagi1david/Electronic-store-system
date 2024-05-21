import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import db from "../firebase";
import Combobox from "./Combobox";

function Customers() {
  const products = useSelector((state) => state.products);
  const customers = useSelector((state) => state.customers);
  const purchases = useSelector((state) => state.purchases);
  const [visibleBuyProduct, setVisibleBuyProduct] = useState(true);
  const [visibleAddCustomer, setVisibleAddCustomer] = useState(true);

  const [customer, setcustomer] = useState({
    firstName: "",
    lastName: "",
    city: "",
  });

  const Add = () => {
    setVisibleAddCustomer(!visibleAddCustomer);

    if (
      customer.firstName !== "" &&
      customer.lastName !== "" &&
      customer.city !== ""
    ) {
      const obj = {
        firstName: customer.firstName,
        lastName: customer.lastName,
        city: customer.city,
      };

      addDoc(collection(db, "customers"), obj);
    }
  };

  return (
    <div>
      <h1>Customers</h1>

      <button
        hidden={!visibleAddCustomer}
        onClick={() => setVisibleAddCustomer(!visibleAddCustomer)}
      >
        Add Customer
      </button>

      <br />

      <div
        hidden={visibleAddCustomer}
        style={{
          border: "2px solid black",
          width: 350,
          borderRadius: "20px",
          textAlign: "center",
        }}
      >
        <h3>Add Customer</h3>
        First name:{" "}
        <input
          type="text"
          onInput={(e) =>
            setcustomer({ ...customer, firstName: e.target.value })
          }
        />
        <br />
        Last name:{" "}
        <input
          type="text"
          onInput={(e) =>
            setcustomer({ ...customer, lastName: e.target.value })
          }
        />
        <br />
        City:{" "}
        <input
          type="text"
          onInput={(e) => setcustomer({ ...customer, city: e.target.value })}
        />
        <br />
        <button onClick={Add}>Add</button>
      </div>

      <br />
      <table border={1}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Products</td>
            <td>Date</td>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.firstName + " " + customer.lastName}</td>
              <td>
                <ul>
                  {purchases
                    .filter((purchase) => purchase.customerID === customer.id)
                    .map((purchase) =>
                      products
                        .filter((product) => purchase.productID === product.id)
                        .map((product) => (
                          <li key={product.id}>
                            <Link to={`/editProduct/${product.id}`}>
                              {product.name}
                            </Link>
                          </li>
                        ))
                    )}
                </ul>
              </td>
              <td>
                <ul>
                  {purchases
                    .filter((purchase) => purchase.customerID === customer.id)
                    .map((purchase) =>
                      products
                        .filter((product) => purchase.productID === product.id)
                        .map((product) => (
                          <li key={product.id}>{purchase.date}</li>
                        ))
                    )}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <div hidden={!visibleBuyProduct}>
        <button onClick={() => setVisibleBuyProduct(!visibleBuyProduct)}>
          Buy Product
        </button>
      </div>

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

export default Customers;
