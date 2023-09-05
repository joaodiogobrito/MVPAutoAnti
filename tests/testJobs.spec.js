const { HomePage } = require('../pages/HomePage.js');
import { test, expect, page} from '@playwright/test';

test('test', async ({ page, context }) => {
  const homepage = new HomePage(page);

    await homepage.loginUser();
    await page.getByRole('list').getByRole('link', { name: 'Jobs' }).click();
    
    //Test Select Object
    await homepage.selectObjectFilter('ORT-00300','Jütro Tiefkühlkost GmbH & Co.KG#ORT-00300');
    await expect.soft(page.getByRole('cell', { name: 'Systemeinrichtung' })).toBeVisible();
    await expect.soft(page.getByRole('cell', { name: 'Schädlingsprophylaxe außen/innen' }).first()).toBeVisible();
    await expect.soft(page.getByRole('cell', { name: 'UV-Lichtfallen - Wartung und Miete' }).first()).toBeVisible();

    //Test Select Action
    await homepage.selectFilter('Action', 'Systemeinrichtung');
    await expect.soft(page.getByRole('cell', { name: 'Systemeinrichtung' })).toBeVisible();
    await expect.soft(page.getByRole('cell', { name: 'Schädlingsprophylaxe außen/innen' })).not.toBeVisible();

    //Test Contract Type - no results
    await homepage.selectFilter('Contract Type', 'Monitors');       
    await expect.soft(page.getByText('No Results to Show'),'Assert no results are displayed').toBeVisible();
    await expect.soft(page.getByRole('cell', { name: 'Systemeinrichtung' })).not.toBeVisible();

    //Test Contract Type - with results
    await page.getByLabel('Clear selected options').nth(2).click();
    await homepage.selectFilter('Contract Type', 'Jobs');     
    await expect.soft(page.getByRole('cell', { name: 'Systemeinrichtung' })).toBeVisible();
    await expect.soft(page.getByRole('cell', { name: 'Schädlingsprophylaxe außen/innen' })).not.toBeVisible();

    //Test Jobs details page
    await page.getByLabel('Clear selected options').nth(2).click();
    await page.getByLabel('Remove Systemeinrichtung').click();
    await page.getByText('UV-Lichtfallen - Wartung und Miete').first().click();
    await page.waitForTimeout(5000);
    await page.getByLabel('Close').click();
    await page.getByText('Systemeinrichtung', { exact: true }).click();
    await expect.soft(page.getByText('Nicht Zutreffend').first()).toBeVisible();
    await expect.soft(page.getByText('Schädlingsprophylaxe außen/innen, UV-Lichtfallen - Wartung und Miete')).toBeVisible();
    await expect.soft(page.getByText('Nicht Zutreffend').nth(1)).toBeVisible();

    //Test Download page
    await page.locator('//*[text()[contains(.,"Ralf")]]').first().click();
    await page.getByText('82_210329_Zeller,_Ralf_Folgebelehrung_IfSG.pdf').click();

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download Selected documents' }).click();
    const download = await downloadPromise;
    await download.path();
    expect.soft(download.failure()).toBeTruthy();
    

    //Test redirection to Monitors page
    await page.getByRole('button', { name: 'Close' }).click();
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
    const download1 = await download1Promise;
    await download1.path();
    expect.soft(download1.failure()).toBeTruthy();

    //Test Download Documents
//    const page2Promise = context.waitForEvent('page');
//    await page1.getByRole('button', { name: 'Download Documents' }).click();
//    const page2 = await page2Promise;
//    expect.soft(page2).toHaveURL('https://ax-nimber.ddns.net/documents/136_Trinkwasserprobenehmer_J.Frank-1.pdf');
    
  });

  //TODO: Add a test to verify other filters: Performed Action - needs data
  