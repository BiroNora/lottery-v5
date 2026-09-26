import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/test/smoke');
});

// 1.
test('Főoldal betöltése - H1 címsor ellenőrzése', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible();
});

// 2.
test('Navigáció - Ötös lottó menüpont működik', async ({ page }) => {
    await page.getByRole('link', { name: 'Pick 5' }).click();
    await expect(page).toHaveURL(/.*five/);
});

// 3.
test('Navigáció - Hatos lottó menüpont működik', async ({ page }) => {
    await page.getByRole('link', { name: 'Pick 6' }).click();
    await expect(page).toHaveURL(/.*six/);
});

// 4.
test('Navigáció - Skandi lottó menüpont működik', async ({ page }) => {
    await page.getByRole('link', { name: 'Skandi' }).click();
    await expect(page).toHaveURL(/.*skandi/);
});

// 5.
test('Navigáció - Eurojackpot lottó menüpont működik', async ({ page }) => {
    await page.getByRole('link', { name: 'Eurojackpot' }).click();
    await expect(page).toHaveURL(/.*euro/);
});

// 6.
test('Navigáció - Home menüpont működik', async ({ page }) => {
    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page).toHaveURL(/.*/);
});

// 7. Külső GitHub link ellenőrzése
test('Navigáció - GitHub link attribútumai megfelelőek', async ({ page }) => {
    const githubLink = page.getByRole('link', { name: 'See You on Git' });

    await expect(githubLink).toBeVisible();

    // Ellenőrizzük, hogy a megfelelő URL-re mutat-e
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/BiroNora/lottery-v5');

    // Ellenőrizzük, hogy új lapon nyílik-e meg
    await expect(githubLink).toHaveAttribute('target', '_blank');
});

// 8. Mobil nézet és Hamburger menü tesztelése
test('Mobil nézet - Hamburger menü nyitása és zárása', async ({ page }) => {
    // Átállítjuk a böngésző ablakát mobil méretre (pl. iPhone 12 szélességre)
    await page.setViewportSize({ width: 390, height: 844 });

    // Biztonsági ellenőrzés: a PC-s navbar most el kell, hogy tűnjön (hidden)
    const desktopNavbar = page.locator('#navbar-default');
    await expect(desktopNavbar).toBeHidden();

    // Megkeressük a hamburger gombot és rákattintunk
    const hamburgerButton = page.locator('#hamburger-button');
    await expect(hamburgerButton).toBeVisible();
    await hamburgerButton.click();

    // Ellenőrizzük, hogy a mobilmenü (aria-label="mobile") sikeresen megjelent-e
    const mobileMenu = page.getByLabel('mobile');
    await expect(mobileMenu).toBeVisible();

    // Ellenőrizzük, hogy a mobilmenüben benne van-e pl. a 'Pick 5' felirat
    await expect(mobileMenu.getByText('Pick 5')).toBeVisible();

    // Opcionális: Ha még egyszer rákattintunk a hamburger gombra, a menü eltűnik
    await hamburgerButton.click();
    await expect(mobileMenu).toBeHidden();
});

// 9. Hover stílus és színváltozás ellenőrzése
test('Stílus teszt - Pick 6 menüpont színe megváltozik hover esetén', async ({ page }) => {
    const pick6Link = page.getByRole('link', { name: 'Pick 6' });

    await pick6Link.hover();

    await expect(pick6Link).toHaveCSS('color', 'oklch(0.667 0.295 322.15)');
});
