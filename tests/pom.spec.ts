import {expect , test} from "../fixtures/fixture";
//import LoginPage from "./pages/loginPage/loginPage";
//import ProductPage from "./pages/productPage/productPage";
import * as testData from "./testData/testData.json"

test('E2E', async({page , loginPage ,productPage})=>{
    //const loginPage = new LoginPage(page);
    //const productPage = new ProductPage(page);

    await page.goto('https://www.saucedemo.com/');
    await loginPage.enterUsername(testData.username);
    await loginPage.enterPassword(testData.password);
    await loginPage.takeScreenshot('./tests/screenshots/loginpage.png');
    await loginPage.clickOnLoginButton();
    await productPage.clickOnAddtoCartBtn();
    await productPage.takeScreenshot('./tests/screenshots/productpage.png');
    await productPage.clickOnCartBtn();
     await productPage.takeScreenshot('./tests/screenshots/cartpage.png');
  //  await page.waitForTimeout(3000);
    
    page.close();
})