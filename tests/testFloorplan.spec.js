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
    await page.getByRole('link', { name: 'Floorplans' }).click();
    await page.getByText('Select Object').click();
    await page.locator('#react-select-3-input').fill('ORT-00300');
    await page.getByRole('button', { name: 'Jütro Tiefkühlkost GmbH & Co.KG#ORT-00300' }).click();
    await page.getByText('Select Area').click();
    await page.getByRole('button', { name: 'Innenbereich' }).click();
    await page.getByRole('button', { name: 'Ok' }).click();

    //Assert element presence and correctness
    await expect.soft(page.getByLabel('Floorplan').getByText('Jütro Tiefkühlkost GmbH & Co.KG#ORT-00300')).toBeVisible();
    
    //Assert element presence and correctness
    await expect.soft(page.getByLabel('Floorplan').getByText('Innenbereich')).toBeVisible();

  });

  //TODO: Add a test to verify edit page functionality