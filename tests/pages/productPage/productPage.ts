import basePage from "../basePage";

export default class ProductPage extends basePage{
    private readonly saucelabsBackpackAddToCartBtn = this.page.locator('[id="add-to-cart-sauce-labs-backpack"]');
    private readonly cartBtn = this.page.locator('[id="shopping_cart_container"]');

    async clickOnAddtoCartBtn(){
        await this.clickOnElement(this.saucelabsBackpackAddToCartBtn);
    }
     async clickOnCartBtn(){
        await this.clickOnElement(this.cartBtn);
     }
}