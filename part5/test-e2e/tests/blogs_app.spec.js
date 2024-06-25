const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog, BLOGS } = require("./helpers");

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
    await request.post("http://localhost:3003/api/users", {
      data: {
        username: "hayen1",
        name: "HaYen1",
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
      await page.getByRole("button", { name: "create new note" }).click();
      await createBlog({ page, ...blog });

      const successDiv = await page.locator(".success");
      await expect(successDiv).toContainText(
        `a new blog ${blog.title} by ${blog.author} added`
      );
      await expect(successDiv).toHaveCSS("color", "rgb(0, 128, 0)");
    });

    test("a blog can be liked", async ({ page }) => {
      const blog = {
        title: "title blog test",
        author: "author test",
        url: "urltest.com",
      };
      await page.getByRole("button", { name: "create new note" }).click();
      await createBlog({ page, ...blog });

      await page.getByTestId("view-button").click();
      await page.getByTestId("like-button").click();

      const successDiv = await page.locator(".success");
      await expect(successDiv).toContainText(
        `${blog.title} by ${blog.author} liked`
      );
    });

    test("who added the blog can delete the blog", async ({ page }) => {
      const blog = {
        title: "test title ex:5.21",
        author: "test author ex:5.21",
        url: "testurl.com",
      };
      await page.getByRole("button", { name: "create new note" }).click();
      await createBlog({ page, ...blog });

      await page.getByTestId("view-button").click();
      await page.getByTestId("remove-button").click();
      page.on("dialog", async (dialog) => {
        expect(dialog.message()).toEqual(
          `Remove blog ${blog.title}! by ${blog.author}`
        );
        await dialog.accept();
      });
      await expect(
        page.getByText("test title ex:5.22 by test author ex:5.21")
      ).not.toBeVisible();
    });

    test("only user who added the blog sees the blog's remove button", async ({
      page,
    }) => {
      await page.getByRole("button", { name: "create new note" }).click();
      await createBlog({
        page,
        title: "test title ex:5.22",
        author: "test author ex:5.22",
        url: "testurl.com",
      });
      await page.getByTestId("logout-button").click();
      await loginWith({ page, username: "hayen1", password: "123456a@" });
      await page.getByTestId("view-button").click();
      await expect(page.getByText("remove")).not.toBeVisible();
    });
  });

  describe("Blogs ordered by number of likes", async () => {
    beforeEach(async ({ page }) => {
      await loginWith({ page, username: "hayen", password: "123456a@" });
      await page.getByRole("button", { name: "create new note" }).click();
      await BLOGS.forEach(async (blog) => await createBlog({ page, ...blog }));
    });

    test("Blogs ordered by number of likes", async ({ page }) => {
      await expect(page.getByTestId("blog")).toContainText("test 2");
      await expect(page.getByTestId("blog")).toContainText("test 1");
      await expect(page.getByTestId("blog")).toContainText("test 3");
    });
  });
});
