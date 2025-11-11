import basePage from "../basePage";

export default class LoginPage extends basePage{
    private readonly usernameField = this.page.locator('[id="user-name"]');
    private readonly passwordField = this.page.locator('[id="password"]');
    private readonly loginBtn = this.page.locator('[id="login-button"]');

    async enterUsername(username : string){
        await this.enterTextElement(this.usernameField , "standard_user");
    }
    async enterPassword(password : string){
        await this.enterTextElement(this.passwordField , "secret_sauce");
    }
    async clickOnLoginButton(){
        await this.clickOnElement(this.loginBtn);
    }

}