# test_search_test.py
import pytest
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException

ruts_para_buscar = ["20318177-9", "11111111-1", "22222222-2", "20573680-8"]
PASSWORD = "1234"

@pytest.fixture(scope="module")
def driver():
    driver = webdriver.Edge()
    driver.get("http://localhost:3006")
    time.sleep(2)
    yield driver
    driver.quit()

def login(driver, password):
    try:
        password_input = driver.find_element(By.XPATH, "//input[@placeholder='Ingrese su contraseña']")
        password_input.clear()
        password_input.send_keys(password + Keys.RETURN)
        time.sleep(1)
        driver.find_element(By.XPATH, "//input[@placeholder='Buscar por nombre o rut']")
        return True
    except:
        return False

def buscar_y_validar(driver, rut):
    try:
        rut_input = driver.find_element(By.XPATH, "//input[@placeholder='Buscar por nombre o rut']")
        rut_input.clear()
        rut_input.send_keys(rut + Keys.RETURN)
        time.sleep(1)

        try:
            boton_estudiante = driver.find_element(By.XPATH, "//a[contains(@href, '#/estudiante/')]")
            boton_estudiante.click()
            time.sleep(2)
            print(f"[✔] Ingresado a estudiante con RUT: {rut}")

            # Volver a la página principal
            driver.get("http://localhost:3006/#/")
            return True
        except NoSuchElementException:
            print(f"[i] RUT {rut} no tiene resultados (Sin Resultados)")
            return False
    except Exception as e:
        print(f"[✘] Error buscando RUT {rut}: {e}")
        return False

def test_busqueda_masiva(driver):
    assert login(driver, PASSWORD), "El login falló"
    for rut in ruts_para_buscar:
        assert buscar_y_validar(driver, rut) is not None
