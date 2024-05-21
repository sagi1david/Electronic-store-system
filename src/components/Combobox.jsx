import { useState, useEffect } from "react";
import { addDoc, updateDoc, collection, doc } from "firebase/firestore";
import { useSelector } from "react-redux";
import db from "../firebase";

function Combobox(props) {
  const products = useSelector((state) => state.products);
  const customers = useSelector((state) => state.customers);

  const [date, setDate] = useState(new Date().toISOString());

  const [purchase, setPurchase] = useState({
    customerID: "",
    date: "",
    productID: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setInterval(() => {
        setDate(new Date().toISOString());
      }, 1000);

      setPurchase({
        ...purchase,
        date: date.substring(0, 10) + " " + date.substring(11, 16),
      });
    };
    fetchData();
  }, []);

  const Buy = async () => {
    setPurchase({
      ...purchase,
      date: date.substring(0, 10) + " " + date.substring(11, 16),
    });

    if (purchase.customerID !== "" && purchase.productID !== "") {
      const obj = {
        customerID: purchase.customerID,
        date: purchase.date,
        productID: purchase.productID,
      };

      addDoc(collection(db, "purchases"), obj);

      products
        .filter((product) => product.id === purchase.productID)
        .forEach((prod) => {
          const obj1 = {
            name: prod.name,
            price: prod.price,
            quantity: ++prod.quantity,
          };
          console.log(obj1);
          updateDoc(doc(db, "products", purchase.productID), obj1);
        });
    }

    props.setVisibleBuyProduct(!props.visibleBuyProduct);
  };

  return (
    <div>
      <h3>Buy Product</h3>

      <select
        onChange={(e) =>
          setPurchase({ ...purchase, productID: e.target.value })
        }
      >
        <option></option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>

      <br />
      <br />

      <select
        onChange={(e) =>
          setPurchase({ ...purchase, customerID: e.target.value })
        }
      >
        <option></option>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.firstName + " " + customer.lastName}{" "}
          </option>
        ))}
      </select>

      <br />
      <br />

      <button onClick={Buy}>Buy</button>

      <br />
      <br />
    </div>
  );
}

export default Combobox;
