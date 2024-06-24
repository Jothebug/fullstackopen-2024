const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helpers");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        username: "hayen",
        name: "HaYen",
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
      await loginWith({ page, username: "hayen", password: "123456a@" });
      await expect(page.getByText("HaYen logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith({ page, username: "hayenhaha", password: "123456" });

      const errorDiv = await page.locator(".error");

      await expect(errorDiv).toContainText("invalid username or password");
      await expect(errorDiv).toHaveCSS("border-style", "solid");
      await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");
      await expect(page.getByText("HaYen logged in")).not.toBeVisible();
    });
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith({ page, username: "hayen", password: "123456a@" });
    });

    test("a new blog can be created", async ({ page }) => {
      const blog = {
        title: "title blog test",
        author: "author test",
        url: "urltest.com",
      };
      await createBlog({ page, ...blog });

      const successDiv = await page.locator(".success");
      await expect(successDiv).toContainText(
        `a new blog ${blog.title} by ${blog.author} added`
      );
      await expect(successDiv).toHaveCSS("color", "rgb(0, 128, 0)");
    });
  });
});
