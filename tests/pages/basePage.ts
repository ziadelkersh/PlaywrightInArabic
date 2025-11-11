import{Locator , Page}  from '@playwright/test';

export default class basePage {
  protected readonly page:Page
  constructor(page:Page){
    this.page = page;
  } 
  protected async clickOnElement(element:Locator)
  {
    await element.click();
  }
  protected async enterTextElement(element:Locator , text:string) {
    await element.fill(text);
  }
  public async takeScreenshot(filePath : string){
    await this.page.screenshot({path:filePath});
  }
  
}