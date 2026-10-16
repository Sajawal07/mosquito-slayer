const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  await page.goto('http://localhost:3000/');
  
  // Wait for canvas to be created by Phaser
  await page.waitForSelector('canvas');
  console.log('Game loaded');

  // Wait a bit for game menu to render
  await new Promise(r => setTimeout(r, 2000));
  
  // Click START HUNTING
  // Screen is 800x600, centered on page. "START HUNTING" is at (400, 400) in game coords.
  // We can just click the center-ish area.
  const canvas = await page.$('canvas');
  const box = await canvas.boundingBox();
  
  console.log('Canvas at:', box);
  // MenuScene play button at x: 400, y: 400 in game coords (800x600)
  const clickX = box.x + box.width / 2;
  const clickY = box.y + (box.height * (400/600));
  await page.mouse.click(clickX, clickY);
  console.log('Clicked START HUNTING');

  // Wait for GameScene to load
  await new Promise(r => setTimeout(r, 1000));

  // Click SHOP button in UIScene
  // UIScene shop button at x: 300, y: 560
  const shopX = box.x + (box.width * (300/800));
  const shopY = box.y + (box.height * (560/600));
  await page.mouse.click(shopX, shopY);
  console.log('Clicked SHOP');

  // Wait for ShopScene to render
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({path: 'shop_screenshot.png'});
  console.log('Saved screenshot to shop_screenshot.png');
  
  await browser.close();
})();
