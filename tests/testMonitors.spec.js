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
    await expect.soft(page.getByRole('cell', { name: 'Contract Number' }),'Assert page is loaded correctly').toBeVisible();

    //Test Select Object
    await page.getByRole('link', { name: 'Monitors' }).click();
    await page.getByText('Select Object').click();
    await page.locator('#react-select-3-input').fill('ORT-00300');
    await page.getByRole('button', { name: 'Jütro Tiefkühlkost GmbH & Co.KG#ORT-00300' }).click();    
    await expect.soft(page.locator('//tbody/tr[10]/td[5]'),'Assert a full table is present').toBeVisible();
    await expect.soft(page.getByText('1 of 11'),'Assert number of pages is correct').toBeVisible();    

    //Test Select Area
    await page.getByText('Select Area').click();
    await page.getByRole('button', { name: 'Sozialraum' }).click();
    await expect.soft(page.getByRole('row', { name: 'MB92 Sozialraum Umkleide Herren Feuerlöscher' }).getByRole('cell').first(),'Assert option is present').toBeVisible();
    await expect.soft(page.getByRole('row', { name: 'SF89 Sozialraum Umkleide Damen Waschbecken Schabeneinleger kurz, FV' }).getByRole('cell').first(),'Assert option is present').toBeVisible();
    await expect.soft(page.getByRole('row', { name: 'SF91 Sozialraum Waschbecken Umkleide Herren Schabeneinleger kurz, FV' }).getByRole('cell').first(),'Assert option is present').toBeVisible();
    await expect.soft(page.getByRole('row', { name: 'MB90 Sozialraum Umkleide Damen Feuerlöscher' }).getByRole('cell').first(),'Assert option is present').toBeVisible();

    //Test Select Monitor Type - no results
    await page.getByText('Select Monitor Type').click();
    await page.getByRole('button', { name: 'RB' }).click();
    await expect.soft(page.getByText('No Results to Show'),'Assert no results are displayed').toBeVisible();

    //Test Select Monitor Type - with results
    await page.getByLabel('Remove RB').click();
    await page.getByText('Select Monitor Type').click();
    await page.getByRole('button', { name: 'MB', exact: true }).click();
    await expect.soft(page.getByRole('row', { name: 'MB92 Sozialraum Umkleide Herren Feuerlöscher' }).getByRole('cell').first(),'Assert option is present').toBeVisible();
    await expect.soft(page.getByRole('row', { name: 'MB90 Sozialraum Umkleide Damen Feuerlöscher' }).getByRole('cell').first(),'Assert option is present').toBeVisible();

    //Test Select Checkpoint
    await page.getByText('Select Checkpoint').click();
    await page.getByRole('button', { name: 'MB 92' }).click();
    await expect.soft(page.getByRole('row', { name: 'MB92 Sozialraum Umkleide Herren Feuerlöscher' }).getByRole('cell').first(),'Assert option is present').toBeVisible();
  
    //Test clear options
    await page.getByLabel('Clear selected options').nth(3).click();
    await page.getByLabel('Clear selected options').nth(2).click();
    await page.getByLabel('Clear selected options').nth(1).click();
    await page.getByLabel('Clear selected options').first().click();
    await expect.soft(page.getByText('Select filters first please'),'Assert options were cleared').toBeVisible();
      
    //Test Select Object - specific option
    await page.getByText('Select Object').click();
    await page.locator('#react-select-3-input').fill('ORT-13351');
    await page.getByRole('button', { name: 'Reformhaus Bacher, Filiale 83#ORT-13351' }).click();
    await expect.soft(page.getByRole('row', { name: 'SF103 Reformhaus Bacher, Filiale 83 Büro Spühle Schabeneinleger kurz, FV' }).getByRole('cell').first(),'Assert expected element is present').toBeVisible();
    
  });

  //TODO Add a test that verifies the filters for more than one object