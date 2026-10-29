import { mergeTests } from "@playwright/test";
import { test as apiTest } from "./apiBase";
import { test as dbTest } from "./dbBase";

export const test = mergeTests(apiTest, dbTest);
export { expect } from "@playwright/test";
