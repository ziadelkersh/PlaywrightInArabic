import { test, expect } from '@playwright/test';

test('Heroku', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('heading', { name: 'Welcome to the-internet' }).click();
  await expect(page.locator('h1')).toContainText('Welcome to the-internet');
  await page.getByRole('link', { name: 'Form Authentication' }).click();
  await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
  await expect(page.getByRole('button', { name: ' Login' })).toBeVisible();
  await page.getByRole('button', { name: ' Login' }).click();
  await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
  await page.getByRole('link', { name: 'Logout' }).click();
});