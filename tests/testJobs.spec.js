const { HomePage } = require('../pages/HomePage.js');
import { test, expect, page} from '@playwright/test';

test('test', async ({ page, context }) => {
  const homepage = new HomePage(page);

    await page.goto('https://ax-nimber.ddns.net/login');
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill(process.env.USERNAME);
    await page.getByLabel('Email').press('Tab');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill(process.env.PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();;
    await page.getByRole('list').getByRole('link', { name: 'Jobs' }).click();
    await page.getByText('Select Object').click();

    //Test Select Object
    await page.locator('#react-select-3-input').fill('ORT-00300');
    await page.getByRole('button', { name: 'Jütro Tiefkühlkost GmbH & Co.KG#ORT-00300' }).click();
    await expect.soft(page.getByRole('cell', { name: 'Systemeinrichtung' })).toBeVisible();
    await expect.soft(page.getByRole('cell', { name: 'Schädlingsprophylaxe außen/innen' })).toBeVisible();
    await expect.soft(page.getByRole('cell', { name: 'UV-Lichtfallen - Wartung und Miete' })).toBeVisible();

    //Test Select Action
    await page.getByText('Select Action').click();
    await page.getByRole('button', { name: 'Systemeinrichtung' }).click();
    await expect.soft(page.getByRole('cell', { name: 'Systemeinrichtung' })).toBeVisible();
    await expect.soft(page.getByRole('cell', { name: 'Schädlingsprophylaxe außen/innen' })).not.toBeVisible();

    //Test Contract Type - no results    
    await page.getByText('Select Contract Type').click();
    await page.getByRole('button', { name: 'Monitors' }).click();
    await expect.soft(page.getByText('No Results to Show'),'Assert no results are displayed').toBeVisible();
    await expect.soft(page.getByRole('cell', { name: 'Systemeinrichtung' })).not.toBeVisible();

    //Test Contract Type - with results
    await page.getByLabel('Clear selected options').nth(2).click();
    await page.getByText('Select Contract Type').click();
    await page.getByRole('button', { name: 'Jobs' }).click();
    await expect.soft(page.getByRole('cell', { name: 'Systemeinrichtung' })).toBeVisible();
    await expect.soft(page.getByRole('cell', { name: 'Schädlingsprophylaxe außen/innen' })).not.toBeVisible();

    //Test Jobs details page
    await page.getByRole('cell', { name: 'Systemeinrichtung' }).click();
    await expect.soft(page.getByLabel('Auftragsdetails').getByText('Systemeinrichtung')).toBeVisible();
    await expect.soft(page.getByText('Nicht Zutreffend').first()).toBeVisible();
    await expect.soft(page.getByLabel('Auftragsdetails').getByText('Systemeinrichtung', { exact: true })).toBeVisible();
    await expect.soft(page.getByText('Ralf Zeller;')).toBeVisible();
    await expect.soft(page.getByText('Nicht Zutreffend').nth(1)).toBeVisible();

    //Test redirection to Monitors page
    const page1Promise = context.waitForEvent('page');
    await page.getByRole('link', { name: '5' }).click();
    const page1 = await page1Promise;

    await expect.soft(page1.getByText('MB105')).toBeVisible();
    await expect.soft(page1.getByText('LF104')).toBeVisible();
    await expect.soft(page1.getByText('LF102')).toBeVisible();
    await expect.soft(page1.getByText('SF106')).toBeVisible();
    await expect.soft(page1.getByText('LF103')).toBeVisible();
 
    //Test Donwload Proof of Work
    await page1.getByRole('list').getByRole('link', { name: 'Jobs' }).click();
    await page1.getByText('Select Object').click();
    await page1.locator('#react-select-15-input').fill('ORT-00300');
    await page1.getByRole('button', { name: 'Jütro Tiefkühlkost GmbH & Co.KG#ORT-00300' }).click();
    await page1.getByRole('cell', { name: 'Systemeinrichtung' }).click();
  
    const download1Promise = page1.waitForEvent('download');
    await page1.getByRole('button', { name: 'Download Proof of Work' }).click();
    const download = await download1Promise;
    await download.path();
    expect.soft(download.failure()).toBeTruthy();

    //Test Download Documents
    const page2Promise = context.waitForEvent('page');
    await page1.getByRole('button', { name: 'Download Documents' }).click();
    const page2 = await page2Promise;
    expect.soft(page2).toHaveURL('https://ax-nimber.ddns.net/documents/136_Trinkwasserprobenehmer_J.Frank-1.pdf');
    
  });

  //TODO: Add a test to verify other filters: Performed Action - needs data
  