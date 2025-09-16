const { test, expect } = require('@playwright/test');

import type { Page } from '@playwright/test';

test('can add an item', async ({ page }: { page: Page }) => {
	await page.goto('/');
	const input = page.locator('#item-input');
	const submit = page.locator('#item-submit');
	await input.fill('Test Item');
	await submit.click();
	const items = await page.locator('.item-text').allTextContents();
	expect(items).toContain('Test Item');
});
