const { HomePage } = require('../pages/HomePage.js');
import { test, expect, page } from '@playwright/test';

test('test', async ({ page }) => {
  const homepage = new HomePage(page);

    await homepage.loginUser();
    await page.getByRole('cell', { name: 'Contract Number' }).waitFor({state: "visible"});

    await page.getByRole('button', { name: 'Statistics' }).click();

    //Test Object Overview

    await page.getByRole('link', { name: 'Object Overview' }).click();
    await homepage.selectObjectFilter('ORT-06034','ADM WILD Europe GmbH & Co. KG#ORT-06034');
    await page.getByRole('cell', { name: 'Thomas Ripberger' }).waitFor({state: "visible"});
    
    await expect.soft(page.getByRole('cell', { name: 'Alexandro Gramegna' })).toBeVisible();
    await expect.soft(page.getByRole('cell', { name: 'Bernd Hochhaus' })).toBeVisible();
    await expect.soft(page.getByRole('cell', { name: 'Folie IND 65, doppelseitig' })).toBeVisible();
    await expect.soft(page.getByRole('cell', { name: 'Folie IND 35' })).toBeVisible();


    
  });
