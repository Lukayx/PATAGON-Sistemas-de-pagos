import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
import time

@pytest.fixture(scope="module")
def driver():
    driver = webdriver.Edge()
    driver.get("http://localhost:3006")  # Asegúrate de que el frontend esté corriendo ahí
    time.sleep(2)  # Espera a que cargue el frontend
    yield driver
    driver.quit()

def login(driver, email, password):
    try:
        email_input = driver.find_element(By.ID, "email")
        password_input = driver.find_element(By.ID, "password")

        email_input.clear()
        password_input.clear()

        email_input.send_keys(email)
        password_input.send_keys(password)

        # Click en el botón con texto "Ingresar"
        login_btn = driver.find_element(By.XPATH, "//button[contains(., 'Ingresar')]")
        login_btn.click()

        time.sleep(1.5)  # Da tiempo a la respuesta del servidor

        # Verifica login exitoso buscando el campo de búsqueda tras el login
        driver.find_element(By.XPATH, "//input[@placeholder='Buscar por nombre o rut']")
        return True

    except NoSuchElementException:
        return False
    except Exception as e:
        print("Error en login:", e)
        return False

def aparece_mensaje_credenciales_invalidas(driver):
    try:
        error_msg = driver.find_element(By.XPATH, "//p[contains(@class, 'errorMessage')]")
        return error_msg.is_displayed()
    except NoSuchElementException:
        return False

def test_intentos_de_login(driver):
    contraseñas = ["1111", "abcd", "0000", "contraseña_incorrecta", "1234"]  # Cambia "1234" por la correcta
    login_exitoso = False

    for i, pwd in enumerate(contraseñas):
        print(f"[i] Intento #{i+1} con contraseña: {pwd}")

        if login(driver, "test@gmail.com", pwd):
            login_exitoso = True
            print("[✔] Login exitoso")
            break
        else:
            if aparece_mensaje_credenciales_invalidas(driver):
                print("[✘] Login fallido: mensaje de credenciales inválidas mostrado")
            else:
                print("[✘] Login fallido: sin mensaje de error")

    assert login_exitoso, "No se pudo iniciar sesión con ninguna de las contraseñas"
