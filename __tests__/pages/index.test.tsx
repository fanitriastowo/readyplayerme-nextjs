import "global-jsdom/register";
import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { test } from "uvu";
import * as assert from "uvu/assert";

import Homepage from "@/pages";

test.after(() => {
  cleanup();
  setTimeout(() => {
    process.exit(0);
  }, 500);
});

test("Homepage", () => {
  render(<Homepage />);
  assert.ok(screen.getByTestId("xx"));
});

test.run();
