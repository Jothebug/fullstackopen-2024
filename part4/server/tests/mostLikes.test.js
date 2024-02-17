const { test, describe } = require("node:test");
const assert = require("node:assert");

const { blogs, mostLikes } = require("../utils/list_helper");

describe("most likes by author", () => {
  test("when list has multiple posts, return object of most liked author", () => {
    assert.deepEqual(mostLikes(blogs), {
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });

  test("when list has no authors returns null", () => {
    assert.strictEqual(mostLikes([]), null);
  });
});
