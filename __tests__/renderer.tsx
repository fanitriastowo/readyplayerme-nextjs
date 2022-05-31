import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";

import { store } from "@/states/store";

import type { FC, ReactElement } from "react";
import type { RenderOptions } from "@testing-library/react";
import type { Context } from "uvu";

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

export function setup(jsx: ReactElement) {
  return {
    user: userEvent.setup(),
    ...customRender(jsx),
  };
}

const queue: Map<string, Context> = new Map();

// Use it with the 'before' hook.
export const registerSuite = (ctx: Context) => {
  queue.set(ctx.__suite__, ctx);
};

// Use it with the 'after' hook.
export const cleanupSuite = (ctx: Context) => {
  setTimeout(() => {
    queue.delete(ctx.__suite__);
    if (queue.size === 0) {
      process.exit();
    }
  }, 500);
};

export * from "@testing-library/react";
export { customRender as render };
