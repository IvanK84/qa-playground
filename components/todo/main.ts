import type { Page, Locator } from '@playwright/test';

export class MainComponent {
    private readonly todoItems: Locator;

    constructor(public readonly mainComponent: Page) {
        this.todoItems = this.mainComponent.getByTestId('todo-item');
    }

    async markAsDone(text: string) {
        await this.mainComponent.getByRole('listitem').filter({ hasText: text }).getByLabel('Toggle Todo').check();
    }

    async remove(text: string) {
        const todo = this.todoItems.filter({ hasText: text });
        await todo.hover();
        await todo.getByLabel('Delete').click();
    }

    async removeAll() {
        while ((await this.todoItems.count()) > 0) {
        await this.todoItems.first().hover();
        await this.todoItems.getByLabel('Delete').first().click();
        }
    }
}