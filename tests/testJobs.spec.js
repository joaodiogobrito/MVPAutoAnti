const { HomePage } = require('../pages/HomePage.js');
import { test, expect, page} from '@playwright/test';

test('test', async ({ page }) => {
  const homepage = new HomePage(page);

    await page.goto('https://ax-nimber.ddns.net/login');
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill(process.env.USERNAME);
    await page.getByLabel('Email').press('Tab');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill(process.env.PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();;
    await page.getByRole('list').getByRole('link', { name: 'Jobs' }).click();
    await page.getByText('Select Object').click();

    await page.locator('#react-select-3-input').fill('ORT-00300');
    await page.getByRole('button', { name: 'Jütro Tiefkühlkost GmbH & Co.KG#ORT-00300' }).click();
    await page.getByText('Systemeinrichtung').click();

    //Assert element presence and correctness
    await expect.soft(page.getByLabel('Auftragsdetails').getByText('Systemeinrichtung')).toBeVisible();

    //TODO: Assert details page is loaded
    //const [newPage] = await Promise.all([
    //    context.waitForEvent("page"),
    //    await page.getByRole('link', { name: '5' }).click()

    //]);

    //Assert button redirects correctly
    //expect.soft(page1.getByRole('cell', { name: 'Innenbereich' }).nth(4)).toBeVisible();
  });

  //TODO: Add a test to verify Download Proof of Work and Download Documents
  //TODO: Add a test to verify details page element correctness
  //TODO: Add a test to verify other filters: Select Action, ...
  