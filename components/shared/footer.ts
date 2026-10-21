import type { Page, Locator } from '@playwright/test';

export class FooterComponent {
    private readonly todoCount: Locator;
    private readonly filterAll: Locator;
    private readonly filterActive: Locator;
    private readonly filterCompleted: Locator;
    private readonly clearCompletedButton: Locator;    

    constructor(public readonly FooterComponent: Page){
        this.todoCount = this.FooterComponent.getByTestId("todo-count");
        this.filterAll = this.FooterComponent.getByRole('link', { name: 'All' });
        this.filterActive = this.FooterComponent.getByRole('link', { name: 'Active' });
        this.filterCompleted = this.FooterComponent.getByRole('link', { name: 'Completed' });
        this.clearCompletedButton = this.FooterComponent.getByLabel('Clear completed');
    }

    async getTodoCount(): Promise<string> {
        const text = await this.todoCount.textContent();
        return text ?? "";
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