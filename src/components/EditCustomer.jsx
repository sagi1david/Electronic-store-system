import { useState } from "react";
import { deleteDoc, updateDoc, doc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import db from "../firebase";

function EditCustomer() {
  const products = useSelector((state) => state.products);
  const customers = useSelector((state) => state.customers);
  const purchases = useSelector((state) => state.purchases);
  const navigate = useNavigate();
  const customerId = useParams();
  const cust = customers.find((customer) => {
    return customer.id === customerId.customerId;
  });

  const [customer, setcustomer] = useState({
    firstName: cust.firstName,
    lastName: cust.lastName,
    city: cust.city,
  });

  const Update = () => {
    const obj = {
      city: customer.city,
      firstName: customer.firstName,
      lastName: customer.lastName,
    };

    updateDoc(doc(db, "customers", customerId.customerId), obj);

    navigate("/customers");
  };

  const Delete = () => {
    deleteDoc(doc(db, "customers", customerId.customerId));

    purchases
      .filter((purchase) => purchase.customerID === customerId.customerId)
      .forEach((purchase) => {
        const prod = products.find((product) => {
          return product.id === purchase.productID;
        });

        const obj = {
          name: prod.name,
          price: prod.price,
          quantity: --prod.quantity,
        };

        updateDoc(doc(db, "products", purchase.productID), obj);

        deleteDoc(doc(db, "purchases", purchase.id));
      });

    navigate("/customers");
  };

  return (
    <div>
      <h3>Edit Customer</h3>
      First name:{" "}
      <input
        type="text"
        defaultValue={customer.firstName}
        onInput={(e) => setcustomer({ ...customer, firstName: e.target.value })}
      />
      <br />
      Last name:{" "}
      <input
        type="text"
        defaultValue={customer.lastName}
        onInput={(e) => setcustomer({ ...customer, lastName: e.target.value })}
      />
      <br />
      City:{" "}
      <input
        type="text"
        defaultValue={customer.city}
        onInput={(e) => setcustomer({ ...customer, city: e.target.value })}
      />
      <br />
      <button onClick={Update}>Update</button>
      <button onClick={Delete}>Delete</button>
      <br />
      <h3>All products purchased by the customer:</h3>
      <ul>
        {purchases
          .filter((purchase) => purchase.customerID === cust.id)
          .map((purch) =>
            products
              .filter((product) => product.id === purch.productID)
              .map((products) => (
                <li key={products.id}>
                  <Link to={`/editProduct/${products.id}`}>
                    {products.name}
                  </Link>
                </li>
              ))
          )}
      </ul>
      <br />
      <Link to="/customers">Customers Page</Link>
    </div>
  );
}

export default EditCustomer;
