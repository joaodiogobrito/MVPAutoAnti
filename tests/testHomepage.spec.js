const { HomePage } = require('../pages/HomePage.js');
import { test, expect, page } from '@playwright/test';

test('test', async ({ page, context }) => {
  const homepage = new HomePage(page);
     
    await homepage.loginUser();

    //Assert data is loaded
    await expect.soft(page.getByRole('cell', { name: 'Contract Number' }),'Assert page is loaded correctly').toBeVisible();

    //Test if user is logged in through buttons presence assertion
    await expect(page.getByRole('link', { name: 'Monitors' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Floorplans' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Jobs' }).getByRole('link')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Deficiencies' }).getByRole('link')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Statistics' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Smart' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Users' })).toBeVisible();

    //TODO: Add navigation loading and performance testing
  });
