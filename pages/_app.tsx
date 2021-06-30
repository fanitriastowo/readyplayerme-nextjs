import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import ReduxToastr from "react-redux-toastr";
import { PersistGate } from "redux-persist/integration/react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { store, persistor } from "../states/store";
import { getAccessToken } from "../utils";

import "../styles/globals.css";

const backEndUrl =
  typeof process.env.NEXT_PUBLIC_BACKEND_URL === "string"
    ? process.env.NEXT_PUBLIC_BACKEND_URL
    : "";

const client = new ApolloClient({
  uri: `${backEndUrl}/graphql`,
  cache: new InMemoryCache(),
  // credentials: 'include',
  headers: {
    authorization: `Bearer ${getAccessToken()}`,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
          <ReduxToastr />
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}
export default MyApp;
