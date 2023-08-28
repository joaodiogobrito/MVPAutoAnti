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
    await page.getByRole('link', { name: 'Smart' }).click();

    //Test Select Object
    await page.getByText('Select Object').click();
    await page.locator('#react-select-3-input').fill('ORT-05313');
    await page.getByRole('button', { name: 'Aldi SE & Co. KG-VST.28 KST DE820116#ORT-05313' }).click();
    await expect.soft(page.getByRole('cell', { name: 'Aldi GmbH & Co. KG - VST.28' }).first()).toBeVisible();
    await expect.soft(page.getByRole('cell', { name: 'WBS-504' })).toBeVisible();
    await expect.soft(page.getByRole('cell', { name: 'Aldi GmbH & Co. KG - VST.28' }).nth(1)).toBeVisible();
    await expect.soft(page.getByRole('cell', { name: 'WBS-505' })).toBeVisible();

    //TODO: Add the verification of table details and presence and correctness
    
  });

  //TODO: Add a test to verify other filters: Select Action, ...