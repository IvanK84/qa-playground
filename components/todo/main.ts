import type { Page, Locator } from "@playwright/test";

export class MainComponent {
  public readonly todoItems: Locator;

  constructor(public readonly page: Page) {
    this.todoItems = this.page.getByTestId("todo-item");
  }

  async markAsDone(text: string) {
    await this.todoItems
      .filter({ hasText: text })
      .getByLabel("Toggle Todo")
      .check();
  }

  async remove(text: string) {
    const todo = this.todoItems.filter({ hasText: text });
    await todo.hover();
    await todo.getByLabel("Delete").click();
  }
}
