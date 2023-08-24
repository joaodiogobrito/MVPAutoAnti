
export const HomePage = class Homepage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page)
    {this.page = page;
    this.getLoginLink = page.getByRole('link', { name: 'Log in' });
    this.getUsernameField = page.locator('#loginusername');
    this.getPasswordField = page.locator('#loginpassword');
    this.getLoginButton = page.getByRole('button', { name: 'Log in' });
    this.getAddToCartButton = page.getByRole('link', { name: 'Add to cart' });
    }

    //Homepage
    async loginUser()
    { await this.getLoginLink.click();
    await this.getUsernameField.click();
    await this.getUsernameField.fill(process.env.USERNAME);
    await this.getUsernameField.press('Tab');
    await this.getPasswordField.fill(process.env.PASSWORD);
    await this.getLoginButton.click()
    }

    async selectProductByText(product)
    { await this.page.getByRole('link', { name: `${product}`}).click();
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

    async isUserLoggedIn()
    {   if((await this.page.$('#login2')) !== null){
            this.loginUser();}
    ;}

};


