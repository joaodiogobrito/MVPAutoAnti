
export const HomePage = class Homepage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page)
    {this.page = page;
    this.getUsernameField = page.getByLabel('Email');
    this.getPasswordField = page.getByLabel('Password');
    this.getLoginButton = page.getByRole('button', { name: 'Sign In' });
    this.getAddToCartButton = page.getByRole('link', { name: 'Add to cart' });

    }

    //Homepage
    async loginUser()
    {
    await this.page.goto('https://ax-nimber.ddns.net/login');
    await this.getUsernameField.click();
    await this.getUsernameField.fill(process.env.USERNAME);
    await this.getUsernameField.press('Tab');
    await this.getPasswordField.fill(process.env.PASSWORD);
    await this.getLoginButton.click();
    
    }

    async selectObjectFilter(object, option)
    {
    await this.page.getByText('Select Object').click();
    await this.page.locator('#react-select-3-input').fill(`${object}`);
    await this.page.getByRole('button', { name: `${option}` }).click(); 
    }
    
    async selectFilter(filter, option, optional)
    {
      if(optional=null){
      await this.page.getByText('Select '+`${filter}`).click();
      await this.page.getByRole('button', { name: `${option}` }).click();
      } else {
      await this.page.getByText('Select '+`${filter}`).click();
      await this.page.getByRole('button', { name: `${option}` , exact: `${optional}`}).click();
      }
    }

    //Top Tabs Navigation
    async navigateToArea(area)
    {  await this.page.getByRole('link', { name: `${area}`}).click();
    }

    //Alerts
    async closeAlert()
    {   this.page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => {});
      });
    }   
    
    async addToCart()
    {   await this.getAddToCartButton.click();  }

    async tapNextButton()
    {   await this.page.locator('#next2').click();  }


};


