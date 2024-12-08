


import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../store/store.js";



export function Providers({ children }) {


  return (
    <Provider store={store}>
     
      

    </Provider>
  );
}
