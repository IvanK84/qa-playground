import { test, expect } from "../fixtures/testBase";

test.describe("Todo Test Suite", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test(
    "Completing a todo updates the item count",
    { tag: "@smoke" },
    async ({ headerComponent, mainComponent, footerComponent }) => {
      await test.step("Add some todos", async () => {
        await headerComponent.addToDo("Buy bread");
        await headerComponent.addToDo("Do dishes");
        await headerComponent.addToDo("Call Cal");
        await headerComponent.addToDo("Educate Eaton");
      });

      await test.step("Verify todo count", async () => {
        await expect(footerComponent.todoCount).toHaveText("4 items left");
      });

      await test.step("Mark 'Do dishes' entry as done", async () => {
        await mainComponent.markAsDone("Do dishes");
      });

      await test.step("Verify todo count again", async () => {
        await expect(footerComponent.todoCount).toHaveText("3 items left");
      });
    },
  );

  test(
    "Deletes a todo",
    { tag: "@smoke" },
    async ({ headerComponent, mainComponent, footerComponent }) => {
      await test.step("Add some todos", async () => {
        await headerComponent.addToDo("Buy bread");
        await headerComponent.addToDo("Do dishes");
        await headerComponent.addToDo("Call Cal");
      });

      await test.step("Verify todo count", async () => {
        await expect(footerComponent.todoCount).toHaveText("3 items left");
      });

      await test.step("Delete 'Call Cal' todo", async () => {
        await mainComponent.remove("Call Cal");
      });

      await test.step("Verify todo count again", async () => {
        await expect(footerComponent.todoCount).toHaveText("2 items left");
      });
    },
  );

  test(
    "Verifies filters",
    { tag: "@smoke" },
    async ({ headerComponent, mainComponent, footerComponent }) => {
      await test.step("Add some todos", async () => {
        await headerComponent.addToDo("Buy bread");
        await headerComponent.addToDo("Do dishes");
        await headerComponent.addToDo("Call Cal");
      });

      await test.step("Mark 'Call Cal' todo as done", async () => {
        await mainComponent.markAsDone("Call Cal");
      });

      await test.step("Filter Completed todos", async () => {
        await footerComponent.showCompleted();
      });

      await test.step("Verify Completed todo count", async () => {
        await expect(mainComponent.todoItems).toHaveCount(1);
        await expect(mainComponent.todoItems).toHaveText(["Call Cal"]);
      });

      await test.step("Filter Active todos", async () => {
        await footerComponent.showActive();
      });

      await test.step("Verify Active todo count", async () => {
        await expect(mainComponent.todoItems).toHaveCount(2);
      });

      await test.step("Show All todos", async () => {
        await footerComponent.showAll();
        await expect(mainComponent.todoItems).toHaveCount(3);
      });
    },
  );
});
