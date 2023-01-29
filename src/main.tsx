import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { makeServer } from "./mock-server/server";
import { Provider } from "react-redux";
import { sagaMiddleware, setupStore } from "./store/store";
import { watcherFetchUsers } from "./store/reducers/ActionCreators";
makeServer();

const store = setupStore()

sagaMiddleware.run(watcherFetchUsers);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Provider store={store}>
        <ChakraProvider>
            <App />
        </ChakraProvider>
    </Provider>
);
