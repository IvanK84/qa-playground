import { test, expect } from '../fixtures/testBase';

test.describe('TODO Test', () => {

  test('Full Scenario 4 items', async ({
    page,
    headerComponent,
    mainComponent,
    footerComponent
  }) => {

    await page.goto('https://demo.playwright.dev/todomvc/');


    // Add some todos
    await headerComponent.addToDo('Buy bread');
    await headerComponent.addToDo('Do dishes');
    await headerComponent.addToDo('Call Cal');
    await headerComponent.addToDo('Educate Eaton');

    // Check todo count
    const todoCount = await footerComponent.getTodoCount();
    expect(todoCount).toBe("4 items left");

    // Mark one entry as done
    await mainComponent.markAsDone('Do dishes');

    // Check todo count again
    const todoCountAfterCheck = await footerComponent.getTodoCount();
    expect(todoCountAfterCheck).toBe("3 items left");
  });

  test('Full Scenario 3 items', async ({
    page,
    headerComponent,
    mainComponent,
    footerComponent
  }) => {

    await page.goto('https://demo.playwright.dev/todomvc/');


    // Add some todos
    await headerComponent.addToDo('Buy bread');
    await headerComponent.addToDo('Do dishes');
    await headerComponent.addToDo('Call Cal');

    // Check todo count
    const todoCount = await footerComponent.getTodoCount();
    expect(todoCount).toBe("3 items left");

    // Mark one entry as done
    await mainComponent.markAsDone('Do dishes');

    // Check todo count again
    const todoCountAfterCheck = await footerComponent.getTodoCount();
    expect(todoCountAfterCheck).toBe("2 items left");
  });

  test('Full Scenario 3 items, 2 checked', async ({
    page,
    headerComponent,
    mainComponent,
    footerComponent
  }) => {

    await page.goto('https://demo.playwright.dev/todomvc/');


    // Add some todos
    await headerComponent.addToDo('Buy bread');
    await headerComponent.addToDo('Do dishes');
    await headerComponent.addToDo('Call Cal');

    // Check todo count
    const todoCount = await footerComponent.getTodoCount();
    expect(todoCount).toBe("3 items left");

    // Mark one entry as done
    await mainComponent.markAsDone('Do dishes');
    await mainComponent.markAsDone('Buy bread');

    // Check todo count again
    const todoCountAfterCheck = await footerComponent.getTodoCount();
    expect(todoCountAfterCheck).toBe("1 items left");
  });

});