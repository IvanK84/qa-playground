import type { Page, Locator } from "@playwright/test";

export class FooterComponent {
  public readonly todoCount: Locator;
  private readonly filterAll: Locator;
  private readonly filterActive: Locator;
  private readonly filterCompleted: Locator;
  private readonly clearCompletedButton: Locator;

  constructor(public readonly page: Page) {
    this.todoCount = this.page.getByTestId("todo-count");
    this.filterAll = this.page.getByRole("link", { name: "All" });
    this.filterActive = this.page.getByRole("link", { name: "Active" });
    this.filterCompleted = this.page.getByRole("link", { name: "Completed" });
    this.clearCompletedButton = this.page.getByRole("button", {
      name: "Clear completed",
    });
  }

  async showAll() {
    await this.filterAll.click();
  }

  async showActive() {
    await this.filterActive.click();
  }

  async showCompleted() {
    await this.filterCompleted.click();
  }

  async clearCompleted() {
    await this.clearCompletedButton.click();
  }
}
