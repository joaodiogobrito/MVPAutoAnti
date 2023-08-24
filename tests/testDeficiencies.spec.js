const { HomePage } = require('../pages/HomePage.js');
import { test, expect, page } from '@playwright/test';

test('test', async ({ page }) => {
  const homepage = new HomePage(page);

    await page.goto('https://ax-nimber.ddns.net/login');
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill(process.env.USERNAME);
    await page.getByLabel('Email').press('Tab');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill(process.env.PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();;

    await page.getByRole('heading', { name: 'Deficiencies' }).getByRole('link').click();
    await page.getByText('Select Object').click();;
    await page.locator('#react-select-3-input').fill('ORT-00300');
    await page.getByRole('button', { name: 'Jütro Tiefkühlkost GmbH & Co.KG#ORT-00300' }).click();
    //Assert elements correct
    await page.getByRole('cell', { name: '16.12.2022' }).click();
    await page.getByLabel('Close').click();
    await page.getByRole('cell', { name: 'Innenbereich' }).click();
    await page.getByLabel('Close').click();
    await page.getByRole('cell', { name: 'siehe Hinweistext' }).click();
    await page.getByLabel('Close').click();
    await page.getByRole('cell', { name: 'Kunde' }).click();
    await page.getByLabel('Close').click();
    await page.getByRole('cell', { name: 'NA' }).click();
    await page.getByLabel('Close').click();
    await page.getByRole('cell', { name: 'Open' }).click();
    await page.getByLabel('Close').click();
    await page.getByRole('cell', { name: 'Open' }).click();
    await page.getByLabel('Close').click();
    await page.getByRole('cell', { name: '16.12.2022' }).click();
    //TODO: Verify details page title
  });

  //TODO: Add a test that verifies details page funcionality
  //TODO: Add a test to verify other filters: Select Action, ...