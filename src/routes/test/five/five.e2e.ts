import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/five');
});

test('Ötös lottó aloldal közvetlen ellenőrzése', async ({ page }) => {

	await expect(page.getByText('Search on Pick-5 Lottery')).toBeVisible();
});
