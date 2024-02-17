const { test, describe } = require("node:test");
const assert = require("node:assert");

const { blogs, favoriteBlog } = require("../utils/list_helper");

describe("favorite blog", () => {
  test("is Canonical string reduction", () => {
    assert.deepEqual(favoriteBlog(blogs), {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});
