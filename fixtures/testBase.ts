import {test as base } from '@playwright/test';
import { HeaderComponent } from '../components/shared/header';
import { MainComponent } from '../components/todo/main';
import { FooterComponent } from '../components/shared/footer';

type TodoFixtures = {
    headerComponent: HeaderComponent;
    mainComponent: MainComponent;
    footerComponent: FooterComponent;
};

export const test = base.extend<TodoFixtures>({
    headerComponent: async ({page}, use) => {
        await use(new HeaderComponent(page));
    },

    mainComponent: async ({page}, use) => {
        await use(new MainComponent(page));
    },
    
    footerComponent: async ({page}, use) => {
        await use(new FooterComponent(page));
    }

});

export { expect } from '@playwright/test';