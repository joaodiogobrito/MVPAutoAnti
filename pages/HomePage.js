
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
    this.getLanguageButton = page.locator('[id="menu-button-\\:r1\\:"]');
    this.selectEnglish = page.getByRole('menuitem', { name: 'en flag' });  
 

    }

    //Homepage
    async loginUser(user, pass)
    {
    await this.getLanguageButton.click();
    await this.selectEnglish.click();
    await this.page.waitForTimeout(1000); 
    await this.getUsernameField.click();
    await this.getUsernameField.fill(`${user}`);
    await this.getUsernameField.press('Tab');
    await this.getPasswordField.fill(`${pass}`);
    await this.getLoginButton.click();
    }

    async logoutUser(user)
    {
      await this.page.getByRole('link', { name: 'Logo' }).click();
      await this.page.getByText(`${user}`+'ProfileLog Out').click();
      await this.page.getByRole('button', { name: `${user}` }).click();
      await this.page.getByRole('menuitem', { name: 'Log Out' }).click();
      await this.page.getByRole('button', { name: 'Log Out' }).click();
    }

    async selectLanguage()
    {
    await this.page.waitForTimeout(1000); 
    await this.getLanguageButton.click();
    await this.selectEnglish.click();
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


};


