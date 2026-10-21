import type { Page, Locator } from '@playwright/test';

export class HeaderComponent {
    private readonly inputTextBox: Locator;

    constructor(public readonly headerComponent: Page) {
        this.inputTextBox = this.headerComponent.getByRole('textbox', { name: 'What needs to be done?' })
    }
    
    async addToDo(text: string) {
        await this.inputTextBox.fill(text);
        await this.inputTextBox.press('Enter');
    }
}