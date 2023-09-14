const { HomePage } = require('../pages/HomePage.js');
import { test, expect, page } from '@playwright/test';

test('test', async ({ page }) => {
  const homepage = new HomePage(page);

    await homepage.loginUser();
    await page.getByRole('heading', { name: 'Deficiencies' }).getByRole('link').click();

    //Test Select Object
    await homepage.selectLanguage();
    await homepage.selectObjectFilter('ORT-00300','Jütro Tiefkühlkost GmbH & Co.KG#ORT-00300');

    //Test Select Area - no results
    await page.getByText('Select Area').click();
    await page.getByRole('button', { name: 'Sozialraum' }).click();
    await expect.soft(page.getByText('No Results to Show'),'Assert no results are displayed').toBeVisible();

    //Test Select Area - with results
    await page.getByLabel('Remove Sozialraum').click();
    await page.getByText('Select Area').click();
    await page.getByRole('button', { name: 'Innenbereich' }).click();
    await expect.soft(page.getByRole('cell', { name: '16.12.2022' })).toBeVisible();
    await expect.soft(page.getByRole('cell', { name: 'Innenbereich' })).toBeVisible();
    await expect.soft(page.getByRole('cell', { name: 'siehe Hinweistext' })).toBeVisible();
    await expect.soft(page.getByRole('cell', { name: 'Kunde' })).toBeVisible();
    await expect.soft(page.getByRole('cell', { name: 'NA' })).toBeVisible();

    //Test details page
    await page.getByRole('cell', { name: 'Innenbereich' }).click();
    await expect.soft(page.getByText('Update deficiencies')).toBeVisible();
    await expect.soft(page.getByText('offen stehendes Lagertor')).toBeVisible();

    //Test Update Deficiency textbox
    await page.getByRole('textbox').click();
    await page.getByRole('textbox').fill('test123');
    await page.getByLabel('Update deficiencies').locator('span').first().click();
    await page.getByRole('button', { name: 'Update Deficiency' }).click();
    await expect.soft(page.getByText('test123')).toHaveText('test123');
    
    //Test Close a deficiency
    await page.locator('div').filter({ hasText: /^OpenSelect Category$/ }).getByLabel('Clear selected options').click(); 
    await page.getByRole('cell', { name: 'Innenbereich' }).click();
    await page.getByText('test123').fill('');
    await page.locator('label div').click();
    await page.getByRole('button', { name: 'Update Deficiency' }).click();
    await expect.soft(page.getByRole('cell', { name: '16.12.2022' })).toBeVisible();
    await expect.soft(page.getByRole('cell', { name: 'Innenbereich' })).toBeVisible();
    await expect.soft(page.getByRole('cell', { name: 'siehe Hinweistext' })).toBeVisible();
    await expect.soft(page.getByRole('cell', { name: 'Kunde' })).toBeVisible();
    await expect.soft(page.getByRole('cell', { name: 'NA' })).toBeVisible();

    //Reset changed data
    await page.getByRole('cell', { name: 'Innenbereich' }).click();
    await expect.soft(page.getByRole('textbox')).toHaveText('');
    await expect.soft(page.getByRole('textbox')).not.toHaveText('test123');
  });

  //TODO: Add a test that verifies details page funcionality
  //TODO: Add a test to verify other filters: Select Action, ...