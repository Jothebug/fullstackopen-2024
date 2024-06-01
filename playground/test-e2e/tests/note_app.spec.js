const { test, expect, describe, beforeEach } = require("@playwright/test");
const { loginWith, createNote } = require("./helper");

describe("Note app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http:localhost:3001/api/testing/reset");
    await request.post("http://localhost:3001/api/users", {
      data: {
        username: "admin",
        password: "123456a@",
      },
    });
    await page.goto("http://localhost:5173");
  });

  test("front page can be opened", async ({ page }) => {
    const locator = await page.getByText("Notes");
    await expect(locator).toBeVisible();
    await expect(
      page.getByText(
        "Note app, Department of Computer Science, University of Helsinki 2024"
      )
    ).toBeVisible();
  });

  test("user can login with correct credentials", async ({ page }) => {
    await loginWith(page, "admin", "123456a@");
    await expect(page.getByText("admin logged in")).toBeVisible();
  });

  test("login fails with wrong password", async ({ page }) => {
    await loginWith(page, "admin", "123456");

    const errorDiv = await page.locator(".error");
    await expect(errorDiv).toContainText("Request failed with status code 401");
    await expect(errorDiv).toHaveCSS("border-style", "solid");
    await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");

    await expect(page.getByText("admin logged in")).not.toBeVisible();
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "admin", "123456a@");
    });

    test("a new note can be created", async ({ page }) => {
      await createNote(page, "a note created by playwright123", true);
      await expect(
        page.getByText("a note created by playwright123")
      ).toBeVisible();
    });

    describe("and a note exists", () => {
      beforeEach(async ({ page }) => {
        await createNote(page, "first note test12345678", true);
      });

      test("importance can be changed", async ({ page }) => {
        const noteElement = await page.getByText("first note test12345678");
        await noteElement
          .getByRole("button", { name: "make not important" })
          .click();
        await expect(noteElement.getByText("make important")).toBeVisible();
      });
    });
  });
});
