import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select, WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

@pytest.fixture(scope="module")
def driver():
    driver = webdriver.Edge()
    driver.get("http://localhost:3006")
    yield driver
    driver.quit()

def login(driver, password):
    try:
        password_input = WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Ingrese su contraseña']"))
        )
        password_input.clear()
        password_input.send_keys(password + Keys.RETURN)
        WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Buscar por nombre o rut']"))
        )
        return True
    except:
        return False

def test_recorrer_carreras(driver):
    assert login(driver, "1234"), "Login fallido"

    # Ir a /#/botones-c
    driver.get("http://localhost:3006/#/botones-c")
    time.sleep(1)

    # Ir a /#/certificado-detallado
    driver.get("http://localhost:3006/#/certificado-detallado")
    time.sleep(2)

    # Esperar el <select>
    select_element = WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.XPATH, "//select[contains(@class, 'w-full') and contains(@class, 'bg-gray-100')]"))
    )
    select = Select(select_element)

    for option in select.options:
        if option.get_attribute("disabled"):
            continue

        select.select_by_visible_text(option.text)
        print(f"\n[✔] Seleccionada carrera: {option.text}")
        time.sleep(1.5)  
        try:
            mensaje = driver.find_element(By.XPATH, "//div[contains(text(), 'No hay historial académico disponible')]")
            if mensaje.is_displayed():
                print("[ℹ] No hay historial académico disponible.")
                continue
        except:
            try:
                titulo = driver.find_element(By.XPATH, "//h2[contains(text(), 'Historial Académico')]")
                assert titulo.is_displayed(), "[✘] No se encontró el historial académico ni el mensaje de error."
                print("[✔] Historial académico mostrado correctamente.")
            except:
                pytest.fail("[✘] No se encontró ni historial académico ni mensaje de 'no disponible'.")

