const { test, describe } = require("node:test");
const assert = require("node:assert");

const { dummy } = require("../utils/list_helper");

describe("dummy", () => {
  test("dummy return one", () => {
    assert.strictEqual(dummy([]), 1);
  });
});
