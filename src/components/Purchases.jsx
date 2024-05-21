import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Purchases() {
  const products = useSelector((state) => state.products);
  const customers = useSelector((state) => state.customers);
  const purchases = useSelector((state) => state.purchases);

  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState("");
  const [productName, setProductName] = useState("");

  const [purchase, setPurchase] = useState({
    customerName: "",
    date: "",
    productName: "",
  });

  return (
    <div>
      <h1>Purchases</h1>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3>Customer:</h3>
          <select onChange={(e) => setCustomerName(e.target.value)}>
            <option></option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.firstName}>
                {customer.firstName + " " + customer.lastName}
              </option>
            ))}
          </select>
          <br />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3>Product:</h3>
          <select onChange={(e) => setProductName(e.target.value)}>
            <option></option>
            {products.map((product) => (
              <option key={product.id}>{product.name}</option>
            ))}
          </select>
          <br />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3>Date:</h3>
          <input
            type="datetime-local"
            onChange={(e) =>
              setDate(
                e.target.value.substring(0, 10) +
                  " " +
                  e.target.value.substring(11)
              )
            }
          ></input>

          <br />
          <br />
        </div>
      </div>

      <button
        onClick={() =>
          setPurchase({
            customerName: customerName,
            date: date,
            productName: productName,
          })
        }
      >
        Serach
      </button>
      <br />
      <br />

      <div>
        <h1>Customers</h1>
        <table border={1}>
          <thead>
            <tr>
              <td>
                <b>Full name</b>
              </td>
              <td>
                <b>Products</b>
              </td>
              <td>
                <b>The dates the products were purchased</b>
              </td>
            </tr>
          </thead>
          <tbody>
            {customers
              .filter((customer) =>
                customer.firstName.includes(purchase.customerName)
              )
              .map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.firstName + " " + customer.lastName}</td>
                  <td>
                    <ol key={customer.id}>
                      {purchases
                        .filter(
                          (purch) =>
                            purch.customerID === customer.id &&
                            purch.date.includes(purchase.date)
                        )
                        .map((purch) =>
                          products
                            .filter(
                              (product) =>
                                purch.productID === product.id &&
                                product.name.includes(purchase.productName)
                            )
                            .map((product) => (
                              <li key={product.id}>
                                <Link to={`/editProduct/${product.id}`}>
                                  {product.name}
                                </Link>
                              </li>
                            ))
                        )}
                    </ol>
                  </td>
                  <td>
                    <ol key={customer.id}>
                      {purchases
                        .filter(
                          (purch) =>
                            purch.customerID === customer.id &&
                            purch.date.includes(purchase.date)
                        )
                        .map((purch) =>
                          products
                            .filter(
                              (product) =>
                                purch.productID === product.id &&
                                product.name.includes(purchase.productName)
                            )
                            .map((product) => (
                              <li key={product.id}>{purch.date}</li>
                            ))
                        )}
                    </ol>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <br />

      <Link to="/">Homepage</Link>
    </div>
  );
}

export default Purchases;
