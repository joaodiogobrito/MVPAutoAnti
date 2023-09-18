const { HomePage } = require('../pages/HomePage.js');
import { test, expect, page } from '@playwright/test';

test('test', async ({ page }) => {
  const homepage = new HomePage(page);

    await page.goto('http://ax-nimber2.ddns.net:3001/');
    await homepage.loginUser(process.env.USERNAME, process.env.PASSWORD);
    await page.getByRole('link', { name: 'Floorplans' }).click();
    await homepage.selectObjectFilter('ORT-00300','Jütro Tiefkühlkost GmbH & Co.KG#ORT-00300');

    //Test Select Area
    await homepage.selectFilter('Area','Innenbereich');
    await page.getByRole('button', { name: 'Ok' }).click();
    await expect.soft(page.getByLabel('Floorplan').getByText('Jütro Tiefkühlkost GmbH & Co.KG#ORT-00300')).toBeVisible();
    await expect.soft(page.getByLabel('Floorplan').getByText('Innenbereich')).toBeVisible();

  });

  //TODO: Add a test to verify Open Floorplan in details page