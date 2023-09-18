const { HomePage } = require('../pages/HomePage.js');
import { test, expect, page } from '@playwright/test';

test('test', async ({ page, context }) => {
  const SF91 = 'SF91 Sozialraum Waschbecken Umkleide Herren 1 STÜCK Schabeneinleger kurz, FV';
  const SF89 = 'SF89 Sozialraum Umkleide Damen Waschbecken 1 STÜCK Schabeneinleger kurz, FV';
  const homepage = new HomePage(page);
  
    await page.goto('http://ax-nimber2.ddns.net:3001/');
    await homepage.loginUser(process.env.USERNAME, process.env.PASSWORD);
    await page.getByRole('link', { name: 'Monitors' }).click();

    //Test Select Object
    await homepage.selectObjectFilter('ORT-00300','Jütro Tiefkühlkost GmbH & Co.KG#ORT-00300');   
    await expect.soft(page.locator('//tbody/tr[10]/td[5]'),'Assert a full table is present').toBeVisible();
    await expect.soft(page.getByText('1 of 8'),'Assert number of pages is correct').toBeVisible(); 
    
    //Test Select Two Objects   
    await page.locator('div').filter({ hasText: /^Jütro Tiefkühlkost GmbH & Co\.KG#ORT-00300$/ }).nth(1).click();
    await page.locator('#react-select-3-input').fill('ORT-13351');
    await page.getByRole('button', { name: 'Reformhaus Bacher, Filiale 83#ORT-13351' }).click();
    await expect.soft(page.getByText('1 of 9'),'Assert number of pages is correct').toBeVisible();
    await page.getByLabel('Remove Reformhaus Bacher, Filiale 83#ORT-13351').click(); 

    //Test Select Area
    await homepage.selectFilter('Area','Sozialraum');
    await expect.soft(page.getByRole('row', { name: SF89 }).getByRole('cell').first(),'Assert option is present').toBeVisible();
    await expect.soft(page.getByRole('row', { name: SF91 }).getByRole('cell').first(),'Assert option is present').toBeVisible();

    //Test Select Status - no results
    await homepage.selectFilter('Status','Not reachable');
    await expect.soft(page.getByText('No Results to Show'),'Assert no results are displayed').toBeVisible();
    await page.getByLabel('Clear selected options').nth(2).click();

    //Test Select Status - with results
    await homepage.selectFilter('Status','No Infestation');  
    await expect.soft(page.getByRole('row', { name: SF89 }).getByRole('cell').first(),'Assert option is present').toBeVisible();
    await expect.soft(page.getByRole('row', { name: SF91 }).getByRole('cell').first(),'Assert option is present').toBeVisible();

    //Test Select Monitor Type - no results
    //await homepage.selectFilter('Monitor Type','RB');
    //await expect.soft(page.getByText('No Results to Show'),'Assert no results are displayed').toBeVisible();
    //await page.getByLabel('Remove RB').click();

    //Test Select Monitor Type - with results
    //await homepage.selectFilter('Monitor Type','MB');
    //await expect.soft(page.getByRole('row', { name: 'MB92 Sozialraum Umkleide Herren Feuerlöscher' }).getByRole('cell').first(),'Assert option is present').toBeVisible();
    //await expect.soft(page.getByRole('row', { name: 'MB90 Sozialraum Umkleide Damen Feuerlöscher' }).getByRole('cell').first(),'Assert option is present').toBeVisible();

    //Test Select Checkpoint
    await page.getByText('Select Checkpoint').click();
    await page.getByRole('button', { name: 'SF 89' }).click();
    await expect.soft(page.getByRole('row', { name: SF89 }).getByRole('cell').first(),'Assert option is present').toBeVisible();
  
    //Test clear options
    await page.getByLabel('Clear selected options').nth(3).click();
    await page.getByLabel('Clear selected options').nth(2).click();
    await page.getByLabel('Clear selected options').nth(1).click();
    await page.getByLabel('Clear selected options').first().click();
    await expect.soft(page.getByText('Select filters first please'),'Assert options were cleared').toBeVisible();
      
    //Test Monitor History
    await page.getByText('Select Object').click();
    await page.locator('#react-select-3-input').fill('ORT-13351');
    await page.getByRole('button', { name: 'Reformhaus Bacher, Filiale 83#ORT-13351' }).click();
    await page.getByRole('cell', { name: 'SF103' }).click();
    //  await expect.soft(page.getByRole('row', { name: '2023-01-06 Reformhaus Bacher, Filiale 83 Monitor/System gereinigt/gepflegt 2 0 Kein Befall - Pflege durchgeführt 1 x Schabeneinleger kurz, FV' }).locator('div'),'Assert expected element is present').toBeVisible();

    //Test Monitor element details page
    await page.getByRole('cell', { name: 'Reformhaus Bacher, Filiale 83' }).click();
    await expect.soft(page.getByText('0000709905', { exact: true }),'Assert expected element is present').toBeVisible();
    await expect.soft(page.getByLabel('Monitor history').getByText('Reformhaus Bacher, Filiale 83'),'Assert expected element is present').toBeVisible();
    await expect.soft(page.getByText('103', { exact: true }),'Assert expected element is present').toBeVisible();
    await expect.soft(page.getByLabel('Monitor history').getByText('2', { exact: true }),'Assert expected element is present').toBeVisible();
    await expect.soft(page.getByLabel('Monitor history').getByText('Kein Befall - Pflege durchgeführt'),'Assert expected element is present').toBeVisible();
    await expect.soft(page.getByText('1343115'),'Assert expected element is present').toBeVisible();
    await expect.soft(page.getByLabel('Monitor history').getByText('2023-01-06'),'Assert expected element is present').toBeVisible();
    await expect.soft(page.getByText('SF', { exact: true }),'Assert expected element is present').toBeVisible();
    await expect.soft(page.getByLabel('Monitor history').getByText('Monitor/System gereinigt/gepflegt'),'Assert expected element is present').toBeVisible();
    await expect.soft(page.getByText('Nicht Zutreffend'),'Assert expected element is present').toBeVisible();
    await expect.soft(page.getByLabel('Monitor history').getByText('Büro Spühle'),'Assert expected element is present').toBeVisible();

    //Test Floorplan redirection
    const page1Promise = context.waitForEvent('page');
    await page.getByRole('button', { name: 'Open Floorplan' }).click();
    const page1 = await page1Promise;

    await expect.soft(page1.getByText('Reformhaus Bacher GmbH & Co. KG')).toBeVisible();
    await expect.soft(page1.getByText('Reformhaus Bacher, Filiale 83').nth(1)).toBeVisible();
    await expect.soft(page1.getByText('Reformhaus Bacher, Filiale 83').first()).toBeVisible();

    //Test Floorplan redirection from details page
    await page1.getByRole('link', { name: 'Monitors' }).click();
    await page1.getByText('Select Object').click();
    await page1.locator('#react-select-3-input').fill('ORT-13351');
    await page1.getByRole('button', { name: 'Reformhaus Bacher, Filiale 83#ORT-13351' }).click();
    await page1.getByRole('cell', { name: 'SF103' }).click();
 
    const page2Promise = context.waitForEvent('page');
    await page1.getByRole('button', { name: 'Open Floorplan' }).click();
    const page2 = await page2Promise;
 
    await expect.soft(page2.getByText('Reformhaus Bacher GmbH & Co. KG')).toBeVisible();
    await expect.soft(page2.getByText('Reformhaus Bacher, Filiale 83').nth(1)).toBeVisible();
    await expect.soft(page2.getByText('Reformhaus Bacher, Filiale 83').first()).toBeVisible();

  });

  //TODO Add a test that verifies the filters for more than one object