const { HomePage } = require('../pages/HomePage.js');
import { test, expect, page } from '@playwright/test';

test('test', async ({ page }) => {
  const homepage = new HomePage(page);

    await page.goto('http://ax-nimber2.ddns.net:3001/');  
    await homepage.loginUser(process.env.USERNAME, process.env.PASSWORD);
    await page.getByRole('link', { name: 'Smart' }).click();
    await homepage.selectLanguage(process.env.USERNAME, process.env.PASSWORD);

    //Test Select Object
    await homepage.selectObjectFilter('ORT-05313','Aldi SE & Co. KG-VST.28 KST DE820116#ORT-05313');   
    await expect.soft(page.getByRole('cell', { name: 'Aldi GmbH & Co. KG - VST.28' }).first()).toBeVisible();
    await expect.soft(page.getByRole('cell', { name: 'WBS-504' })).toBeVisible();
    await expect.soft(page.getByRole('cell', { name: 'Aldi GmbH & Co. KG - VST.28' }).nth(1)).toBeVisible();
    await expect.soft(page.getByRole('cell', { name: 'WBS-505' })).toBeVisible();

    //TODO: Add the verification of table details and presence and correctness
    
  });

  //TODO: Add a test to verify other filters: Select Action, ...