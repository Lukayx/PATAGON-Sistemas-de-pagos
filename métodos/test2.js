const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');

async function runTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Abrir login
        await driver.get('http://localhost:4003/');
        await driver.wait(until.elementLocated(By.id('email')), 10000); 

        // Ingresar email de usuario
        await driver.sleep(1000); 
        let emailField = await driver.findElement(By.id('email'));
        await emailField.sendKeys('userpatagon2024@uach.cl');

        await driver.sleep(1000);
        // Ingresar contraseña
        let passwordField = await driver.findElement(By.id('password'));
        await passwordField.sendKeys('patagon1234');

        await driver.sleep(1000);
        // Click en botón Ingresar
        let loginButton = await driver.findElement(By.xpath('//button[text()="Ingresar"]'));
        await loginButton.click();


        // Esperar unos segundos tras login
        await driver.sleep(3000); 

        // Ir al perfil del usuario
        await driver.get('http://localhost:4003/account/profile');

        // Confirmar URL
        await driver.sleep(3000);
        let currentUrl = await driver.getCurrentUrl();
        console.log('URL actual después de redirigir:', currentUrl);

    } catch (error) {
        console.error('Error en la prueba:', error);
    } finally {
        await driver.quit();
    }
}

runTest().catch(console.error);
