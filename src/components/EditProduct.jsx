import { useState } from "react";
import { deleteDoc, updateDoc, doc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import db from "../firebase";

function EditProduct() {
  const products = useSelector((state) => state.products);
  const customers = useSelector((state) => state.customers);
  const purchases = useSelector((state) => state.purchases);
  const navigate = useNavigate();
  const productId = useParams();
  const prod = products.find((product) => {
    return product.id === productId.productId;
  });

  const [product, setProduct] = useState({
    status: "NEW",
    name: prod.name,
    price: prod.price,
    quantity: prod.quantity,
  });

  const Update = () => {
    const obj = {
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    };

    updateDoc(doc(db, "products", productId.productId), obj);

    navigate("/products");
  };

  const Delete = () => {
    deleteDoc(doc(db, "products", productId.productId));

    purchases
      .filter((purchase) => purchase.productID === productId.productId)
      .forEach((purchase) => {
        deleteDoc(doc(db, "purchases", purchase.id));
      });

    navigate("/products");
  };

  return (
    <div>
      <h3>Edit Product</h3>
      Name:{" "}
      <input
        type="text"
        defaultValue={prod.name}
        onInput={(e) => setProduct({ ...product, name: e.target.value })}
      />
      <br />
      Price:{" "}
      <input
        type="namber"
        defaultValue={prod.price}
        onInput={(e) => setProduct({ ...product, price: +e.target.value })}
      />
      <br />
      Quantity: {prod.quantity}
      <br />
      <button onClick={Update}>Update</button>
      <button onClick={Delete}>Delete</button>
      <br />
      <h3>All customers who purchased the product:</h3>
      <ul>
        {purchases
          .filter((purchase) => purchase.productID === prod.id)
          .map((purch) =>
            customers
              .filter((customer) => customer.id === purch.customerID)
              .map((customer) => (
                <li key={customer.id}>
                  <Link to={`/editCustomer/${customer.id}`}>
                    {customer.firstName + " " + customer.lastName}
                  </Link>
                </li>
              ))
          )}
      </ul>
      <br />
      <Link to="/products">Products Page</Link>
    </div>
  );
}

export default EditProduct;
