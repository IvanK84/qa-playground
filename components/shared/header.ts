import type { Page, Locator } from "@playwright/test";

export class HeaderComponent {
  private readonly inputTextBox: Locator;

  constructor(public readonly page: Page) {
    this.inputTextBox = this.page.getByRole("textbox", {
      name: "What needs to be done?",
    });
  }

  async addToDo(text: string) {
    await this.inputTextBox.fill(text);
    await this.inputTextBox.press("Enter");
  }
}
