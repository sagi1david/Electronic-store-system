const initialState = {
  products: [],
  customers: [],
  purchases: [],
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "Laod_Products": {
      return { ...state, products: action.payload };
    }

    case "Laod_Customers": {
      return { ...state, customers: action.payload };
    }

    case "Laod_Purchases": {
      return { ...state, purchases: action.payload };
    }

    default:
      return state;
  }
};

export default Reducer;
