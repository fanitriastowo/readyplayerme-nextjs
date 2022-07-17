import { Provider } from "react-redux";
import { PersistGate as PersistGateClient } from "redux-persist/integration/react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";

import { store, persistor } from "@/states/store";
import { getAccessToken } from "@/utils";

import type { ReactNode } from "react";
import type { AppProps } from "next/app";

import "@/styles/globals.css";

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

const PersistGateServer = ({ children }: { children: ReactNode }) => {
  return children;
};

function MyApp({ Component, pageProps }: AppProps) {
  let runtime = process.env.RUNTIME;
  let PersistGate = PersistGateServer as unknown as typeof PersistGateClient;
  if (runtime === "browser") {
    PersistGate = PersistGateClient;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}
export default MyApp;
