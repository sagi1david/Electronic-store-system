import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { query, collection, onSnapshot } from "firebase/firestore";
import { Routes, Route } from "react-router-dom";
import db from "./firebase";
import Customers from "./components/Customers";
import Products from "./components/Products";
import Purchases from "./components/Purchases";
import Homepage from "./components/Homepage";
import EditCustomers from "./components/EditCustomer";
import EditProduct from "./components/EditProduct";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "products"));

      onSnapshot(q, (snapshot) => {
        const products = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        dispatch({ type: "Laod_Products", payload: products });
      });

      const q1 = query(collection(db, "customers"));

      onSnapshot(q1, (snapshot) => {
        const customers = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        dispatch({ type: "Laod_Customers", payload: customers });
      });

      const q2 = query(collection(db, "purchases"));

      onSnapshot(q2, (snapshot) => {
        const purchases = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        dispatch({ type: "Laod_Purchases", payload: purchases });
      });
    };
    fetchData();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/editProduct/:productId" element={<EditProduct />} />
        <Route path="/editCustomer/:customerId" element={<EditCustomers />} />
      </Routes>
    </>
  );
};

export default App;
