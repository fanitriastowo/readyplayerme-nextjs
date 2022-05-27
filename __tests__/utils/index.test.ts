import { test } from "uvu";
import * as assert from "uvu/assert";

import { getAccessToken } from "@/utils";

test("getAccessToken()", () => {
  assert.is(getAccessToken(), "", "returns string");
});

test.run();
