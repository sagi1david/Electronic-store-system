import { Link } from "react-router-dom";


function Homepage() {

  return (
    <div>
        <h1>Homepage</h1>
        <Link to='/products'>Products Page</Link>
        <br />
        <Link to='/customers'>Customers Page</Link>
        <br />
        <Link to='/purchases'>Purchases Page</Link>
        <br />
    </div>
  );
};

export default Homepage;