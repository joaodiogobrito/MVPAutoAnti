const { HomePage } = require('../pages/HomePage.js');
import { test, expect, page } from '@playwright/test';

test('test', async ({ page, context }) => {
  const homepage = new HomePage(page);
     
    await page.goto('https://ax-nimber.ddns.net/');
    await homepage.loginUser(process.env.USERNAME, process.env.PASSWORD);
    await homepage.selectLanguage();
    await page.getByRole('link', { name: 'Users' }).click();

    //Test Admin User presence and details
    await expect.soft(page.getByRole('row', { name: 'Alisson Wisentainer a.wisentainer@nimber.pt KeyUser Active' }).locator('span')).toBeVisible();
    await expect.soft(page.getByRole('row', { name: 'Florian Podewils florian.podewils@anticimex.de Admin Active' }).locator('span')).toBeVisible();
    await expect.soft(page.getByRole('row', { name: 'Ralf Test smart.pcs@anticimex.de User Active' }).locator('span')).toBeVisible();

    await homepage.logoutUser('Ana Catarino');

    await homepage.loginUser(process.env.USERNAME1, process.env.PASSWORD1);
    await homepage.selectLanguage();
    await page.getByRole('link', { name: 'Users' }).click();

    //Test Key User presence and details
    await expect.soft(page.getByRole('row', { name: 'Alisson Wisentainer a.wisentainer@nimber.pt KeyUser Active' }).locator('span')).toBeVisible();
    await expect.soft(page.getByRole('row', { name: 'Florian Podewils florian.podewils@anticimex.de Admin Active' }).locator('span')).toBeVisible();
    await expect.soft(page.getByRole('row', { name: 'Ralf Test smart.pcs@anticimex.de User Active' }).locator('span')).toBeVisible();

    await homepage.logoutUser('Joao KeyUser');  

    await homepage.loginUser(process.env.USERNAME2, process.env.PASSWORD2);
    await homepage.selectLanguage();
    await expect.soft(page.getByRole('link', { name: 'Users' })).not.toBeVisible();

    await homepage.logoutUser('Joao User');
  });
