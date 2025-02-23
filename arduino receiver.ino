#include <SPI.h>
#include <LoRa.h>

#define SS 10
#define RST 9
#define DIO0 2

void setup() {
    Serial.begin(9600);
    while (!Serial);

    // Initialize LoRa
    LoRa.setPins(SS, RST, DIO0);
    if (!LoRa.begin(433E6)) {
        Serial.println("LoRa init failed. Check connections.");
        while (1);
    }
    Serial.println("LoRa Receiver initialized.");
}

void loop() {
    int packetSize = LoRa.parsePacket();
    if (packetSize) {
        String receivedData = "";
        while (LoRa.available()) {
            receivedData += (char)LoRa.read();
        }

        Serial.println(receivedData); // Send data to Node.js backend
    }
}
