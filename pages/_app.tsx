import { Provider } from "react-redux";
import { PersistGate as PersistGateClient } from "redux-persist/integration/react";
import { ChakraProvider } from "@chakra-ui/react";

import { store, persistor } from "@/states/store";

import type { ReactNode } from "react";
import type { AppProps } from "next/app";

import "@/styles/globals.css";

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
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
}
export default MyApp;
