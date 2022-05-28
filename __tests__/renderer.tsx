import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";

import { store } from "@/states/store";

import type { FC, ReactElement } from "react";
import type { RenderOptions } from "@testing-library/react";

const AllTheProviders: FC = ({ children }) => {
  return (
    <Provider store={store}>
      <ChakraProvider>{children}</ChakraProvider>
    </Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
