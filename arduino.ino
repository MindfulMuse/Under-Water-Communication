#include <SPI.h>
#include <LoRa.h>

#define SS 10
#define RST 9
#define DIO0 2

// Replace with your sensor pins
#define TEMP_SENSOR A0  
#define PRESSURE_SENSOR A1  

void setup() {
    Serial.begin(9600);
    while (!Serial);
    
    // Initialize LoRa
    LoRa.setPins(SS, RST, DIO0);
    if (!LoRa.begin(433E6)) {  // Set frequency (433MHz, 868MHz, or 915MHz)
        Serial.println("LoRa init failed. Check connections.");
        while (1);
    }
    Serial.println("LoRa initialized.");
}

void loop() {
    // Read temperature and pressure values
    float temperature = analogRead(TEMP_SENSOR) * (5.0 / 1023.0) * 100.0; // Example conversion
    float pressure = analogRead(PRESSURE_SENSOR) * (5.0 / 1023.0) * 50.0; // Example conversion

    // Send data via LoRa
    LoRa.beginPacket();
    LoRa.print(temperature);
    LoRa.print(",");
    LoRa.print(pressure);
    LoRa.endPacket();

    Serial.print("Sent: Temperature = ");
    Serial.print(temperature);
    Serial.print(" °C, Pressure = ");
    Serial.print(pressure);
    Serial.println(" hPa");

    delay(2000); // Send data every 2 seconds
}
