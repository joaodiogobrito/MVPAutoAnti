const { HomePage } = require('../pages/HomePage.js');
import { test, expect, page } from '@playwright/test';

test('test', async ({ page }) => {
  const homepage = new HomePage(page);

    await homepage.loginUser();
    await page.getByRole('cell', { name: 'Contract Number' }).waitFor({state: "visible"});
    await page.getByRole('button', { name: 'Statistics' }).click();
    
    //Test Target Organisms
    await page.getByRole('link', { name: 'Target Organisms' }).click();
    await homepage.selectObjectFilter('ORT-06034','ADM WILD Europe GmbH & Co. KG#ORT-06034');
    await page.getByText('Select Monitor').click();
    await page.getByRole('button', { name: 'RB' }).click();
    await page.getByText('Rattenbox (RBa) - außen (0000094860)').waitFor({state: "visible"});
    
    await expect.soft(page.getByRole('heading', { name: 'Overview'  })).toBeVisible();
    await expect.soft(page.getByText('30.01.2023')).toBeVisible();
    await expect.soft(page.getByRole('cell', { name: '0 6 59' }).first()).toBeVisible();
    await expect.soft(page.getByRole('heading', { name: 'Organism Breakdown' })).toBeVisible();

  });
