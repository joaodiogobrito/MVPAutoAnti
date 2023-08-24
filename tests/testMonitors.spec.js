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
    //Assert page is loaded
    await expect.soft(page.getByRole('cell', { name: 'Contract Number' })).toBeVisible();
    await page.getByRole('link', { name: 'Monitors' }).click();

    await page.getByText('Select Object').click();
    await page.locator('#react-select-3-input').fill('ORT-00300');
    await page.getByRole('button', { name: 'Jütro Tiefkühlkost GmbH & Co.KG#ORT-00300' }).click();
    //Assert a full table is present and number of pages is correct
    await expect.soft(page.locator('//tbody/tr[10]/td[5]')).toBeVisible();
    await expect.soft(page.getByText('1 of 11')).toBeVisible();    
    await page.getByLabel('Clear selected options').click();
    //TODO: Assert options were cleared
    await page.getByText('Select Object').click();
    await page.locator('#react-select-3-input').fill('ORT-13351');
    await page.getByRole('button', { name: 'Reformhaus Bacher, Filiale 83#ORT-13351' }).click();

    //Assert an expected element is present

    await expect.soft(page.getByRole('row', { name: 'SF103 Reformhaus Bacher, Filiale 83 Büro Spühle Schabeneinleger kurz, FV' }).getByRole('cell').first()).toBeVisible();
  });

  //TODO Add a test that verifies the filters for more than one object