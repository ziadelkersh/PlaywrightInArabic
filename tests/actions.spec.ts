import { test, expect } from '@playwright/test';

test('textbox', async({page})=> {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.locator('[id="username"]').fill('tomsmith');
  await page.locator('[id="password"]').pressSequentially('SuperSecretPassword!',{delay:200});
  await page.locator('[id="password"]').press('Enter');

  await page.close();
})

test('click', async({page})=> {
    await page.goto('https://play1.automationcamp.ir/mouse_events.html');
    await page.locator('[id="click_area"]').click();
    await expect (page.locator('[id="click_type"]')).toHaveText('Click')
    await page.locator('[id="click_area"]').dblclick();
    await expect (page.locator('[id="click_type"]')).toHaveText('Double-Click')
    await page.locator('[id="click_area"]').click({button : 'right'});
    await expect (page.locator('[id="click_type"]')).toHaveText('Right-Click')
    await page.close();
  })

  test('radio', async({page})=> {
    await page.goto('http://test.rubywatir.com/radios.php');
    await page.locator('[class="radioclass"]').check();
    await expect (page.locator('[id="radioId"]')).not.toBeChecked();
    await page.locator('[id="radioId"]').check();
    await expect (page.locator('[id="radioId"]')).toBeChecked();
    await page.close();
  })


  test('checkbox', async({page})=> {
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    await page.locator('(//input[@type="checkbox"])[1]').uncheck();
    await expect (page.locator('(//input[@type="checkbox"])[1]')).not.toBeChecked();
    await page.locator('(//input[@type="checkbox"])[1]').check();
    await expect (page.locator('(//input[@type="checkbox"])[1]').isChecked).toBeTruthy();
  
    await page.close();
  })

  test('dropdown', async({page})=> {
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    await page.selectOption('[id="dropdown"]' , {
        value:"1"
    });
    await page.pause();
    await page.selectOption('[id="dropdown"]' , {
        label:"Option 2"
    });
    await page.pause();
    await page.selectOption('[id="dropdown"]' , {
        index:2
    });
    await page.pause();
  
    await page.close();
  })

  test('multiselect', async({page})=> {
    await page.goto('https://www.lambdatest.com/selenium-playground/select-dropdown-demo');
    await page.selectOption('[id="multi-select"]' , [
        {value:"California"},
        {value:"Florida"},
        {value:"New Jersey"}
    ]);
    
    await page.pause();
    await page.close();
  })
  test('dynamic', async({page})=> {
    await page.goto('https://demo.automationtesting.in/Register.html');
    await page.locator('//span[@role="combobox"]').click();
    await page.locator('//li[text()="India"]').click();
    await page.pause();
    await page.close();
  })

  test('alert', async({page})=> {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    
    page.on("dialog", async(alert)=>{
      const alertMessage = alert.message();
      expect (alertMessage).toEqual('I am a JS Alert');
      await alert.accept();
      await expect (page.locator('[id="result"]')).toHaveText('You successfully clicked an alert');
    })
    await page.locator('//button[@onclick="jsAlert()"]').click();
    
   // await page.pause();
    await page.close();
  })

  test('confirmation ok', async({page})=> {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    
    page.on("dialog", async(alert)=>{
      const alertMessage = alert.message();
      expect (alertMessage).toEqual('I am a JS Confirm');
      await alert.accept();
      await expect (page.locator('[id="result"]')).toHaveText('You clicked: Ok');
    })
    await page.locator('[onclick="jsConfirm()"]').click();
    
   // await page.pause();
    await page.close();
  })

  test('cancel', async({page})=> {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    
    page.on("dialog", async(alert)=>{
      const alertMessage = alert.message();
      expect (alertMessage).toEqual('I am a JS Confirm');
      await alert.dismiss();
      await expect (page.locator('[id="result"]')).toHaveText('You clicked: Cancel');
    })
    await page.locator('[onclick="jsConfirm()"]').click();
    
   // await page.pause();
    await page.close();
  })
  test('okpromptalert', async({page})=> {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    
    page.on("dialog", async(alert)=>{
      const alertMessage = alert.message();
      expect (alertMessage).toEqual('I am a JS prompt');
      await alert.accept("Ziad");
      await expect (page.locator('[id="result"]')).toHaveText('You entered: Ziad');
    })
    await page.locator('[onclick="jsPrompt()"]').click();
    
   // await page.pause();
    await page.close();
  })
  test('cancelpromptalert', async({page})=> {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    
    page.on("dialog", async(alert)=>{
      const alertMessage = alert.message();
      expect (alertMessage).toEqual('I am a JS prompt');
      await alert.dismiss();
      await expect (page.locator('[id="result"]')).toHaveText('You entered: null');
    })
    await page.locator('[onclick="jsPrompt()"]').click();
    
   // await page.pause();
    await page.close();
  })

  test('frames', async({page})=> {
    await page.goto('https://the-internet.herokuapp.com/nested_frames');
    let framescount = page.frames().length;
    console.log('The frame count is '  + framescount);
    let bottomframe = page.frameLocator('[src="/frame_bottom"]').locator('//body[contains(text(),"BOTTOM")]');
    await expect (bottomframe).toHaveText('BOTTOM');
    let topframe = page.frame('frame-top')
    let topframechilds = topframe?.childFrames() || [];
    let middleframe= topframechilds[1];
    await expect (middleframe.locator('[id="content"]')).toHaveText('MIDDLE');
   
    await page.close();
  })

  test('tabs', async({page})=> {
    await page.goto('https://the-internet.herokuapp.com/windows');
    const [browzerTabs] = await Promise.all([
      page.waitForEvent('popup'),await page.locator('[href="/windows/new"]').click()
    ])
    await browzerTabs.waitForLoadState();
    const pages = browzerTabs.context().pages();
    const defaultTab = pages[0];
    await expect(defaultTab.locator('//h3')).toContainText('Opening a new window');
    const latestTab = pages[pages.length-1]
    await expect(latestTab.locator('//h3')).toContainText('New Window');
    defaultTab.close();
    latestTab.close();
   
    await page.close();
  })

  test('windows', async({page})=> {
    await page.goto('https://demo.automationtesting.in/Windows.html');
    await page.locator('[href="#Seperate"]').click();
    const [newTab] = await Promise.all([
      page.context().waitForEvent('page'),await page.locator('[onclick="newwindow()"]').click()
    ])
    await newTab.waitForLoadState();
    await newTab.locator('href="/downloads"').click();
    await expect(newTab.locator('[class="d-1"]')).toContainText('Downloads');
    await page.locator('[href="Index.html"]').click();
    await expect (page.locator('[id="btn1"]')).toHaveText('Sign In');
    
   
    await page.close();
    await newTab.close();
  })

  test('dragAndDrop', async({page})=> {
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
   const boxA = page.locator('[id="column-a"]');
   const boxB = page.locator('[id="column-b"]');

   await boxA.hover();
   await page.mouse.down();
   await boxB.hover();
   await page.mouse.up();

   await page.waitForTimeout(2000);
   await boxB.dragTo(boxA);
   await page.waitForTimeout(2000);

    await page.close();
  })
  

  test('download', async({page})=> {
    await page.goto('https://the-internet.herokuapp.com/download');
   const download = await Promise.all([
    page.waitForEvent('download'), await page.locator('[href="download/random_data.txt"]').click()

   ])
   const downloadfile = download[0];
   const downloadfilepath = await downloadfile.path();
   const downloadfilename = downloadfile.suggestedFilename();
   await downloadfile.saveAs(downloadfilename)
   // saveas("Ziad")
   console.log('the downloaded path is ' + downloadfilepath);
    await page.close();
  })
  
  test('upload', async({page})=> {
    await page.goto('https://the-internet.herokuapp.com/upload');
   const uploadfile = await Promise.all([
    page.waitForEvent('filechooser'), await page.locator('[id="file-upload"]').click()

   ])
   await uploadfile[0].setFiles('./random_data.txt');
   await page.locator('[id="file-submit"]').click();
   await page.waitForTimeout(2000);
   
    await page.close();
  })