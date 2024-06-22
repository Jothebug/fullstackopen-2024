const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helpers");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http:localhost:3001/api/testing/reset");
    await request.post("http://localhost:3003/api/login", {
      data: {
        username: "HaYen",
        password: "123456a@",
      },
    });
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("Log in to application")).toBeVisible();
    await expect(page.getByText("username")).toBeVisible();
    await expect(page.getByText("password")).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "HaYen", "123456a@");
      await expect(page.getByText("jo logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "HaYen", "123456a@");
      await expect(page.getByText("jo logged in")).not.toBeVisible();
    });
  });

  // describe("when logged in", () => {
  //   beforeEach(async ({ page }) => {
  //     await loginWith(page, "HaYen", "123456a@");
  //   });

  //   test("a new blog can be created", async ({ page }) => {
  //     const newBlog = {
  //       title: "title blog test",
  //       author: "author test",
  //       url: "urltest.com",
  //     };

  //     await createBlog({ page, ...newBlog });
  //     await expect(page.getByText(newBlog.title)).toBeVisible();
  //     await expect(page.getByText(`author: ${newBlog.author}`)).toBeVisible();
  //   });
  // });
});
