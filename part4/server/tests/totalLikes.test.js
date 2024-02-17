const { test, describe } = require("node:test");
const assert = require("node:assert");

const { totalLikes, blogs } = require("../utils/list_helper");

describe("total likes", () => {
  test("of blogs equals 34", () => {
    assert.strictEqual(totalLikes(blogs), 34);
  });
});
