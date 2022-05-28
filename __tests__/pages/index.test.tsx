import React from "react";
import { test } from "uvu";
import * as assert from "uvu/assert";
import { render, screen, cleanup } from "../renderer";

import Homepage from "@/pages";

test.after(() => {
  cleanup();
  setTimeout(() => {
    process.exit(0);
  }, 500);
});

test("Homepage", () => {
  render(<Homepage />);
  screen.debug();
  assert.ok(screen.getByTestId("xx"));
});

test.run();
