#include <DHT.h>
#include <SoftwareSerial.h>

// -------------------- Sensor Pins --------------------
#define DHTPIN 5           // DHT11 sensor connected to digital pin 5
#define DHTTYPE DHT11      // Using DHT11 sensor

#define SOIL_PIN A0        // Soil moisture sensor connected to analog pin A0
#define WATER_PIN 4        // Water sensor connected to digital pin 4

// -------------------- LoRa UART Pins (Arduino Nano) --------------------
#define LORA_RX 2          // LoRa TX → Arduino RX (Pin 2)
#define LORA_TX 3          // LoRa RX → Arduino TX (Pin 3)

// -------------------- LoRa Configuration --------------------
#define DEVICE_ADDRESS 2
#define TARGET_ADDRESS 1
#define LORA_NETWORK_ID 5
#define LORA_BAND 915000000UL   // Must be same on both sender and receiver

// Create sensor and serial objects
DHT dht(DHTPIN, DHTTYPE);
SoftwareSerial lora(LORA_RX, LORA_TX);

// Node ID (for identifying device)
String NODE_ID = "N01";

// -------------------- Function to send AT command to LoRa --------------------
void loraCmd(String cmd, int waitMs = 200) {
  lora.println(cmd);          // Send command to LoRa module
  delay(waitMs);              // Wait for response

  // Print LoRa response on Serial Monitor
  while (lora.available()) {
    Serial.write(lora.read());
  }
}

void setup() {
  Serial.begin(9600);         // Serial monitor

  // Start LoRa communication
  // If 115200 doesn't work, try 9600
  lora.begin(115200);

  // Start DHT sensor
  dht.begin();

  // Set water sensor pin as input
  pinMode(WATER_PIN, INPUT);

  delay(1000);
  Serial.println("Sender starting...");

  // -------------------- Configure LoRa Module --------------------
  loraCmd("AT");   // Test command
  loraCmd("AT+BAND=" + String(LORA_BAND));
  loraCmd("AT+NETWORKID=" + String(LORA_NETWORK_ID));
  loraCmd("AT+ADDRESS=" + String(DEVICE_ADDRESS));

  Serial.println("Sender Ready");
}

void loop() {
  // -------------------- Read Sensor Values --------------------
  int soil = analogRead(SOIL_PIN);      // Soil moisture value
  int water = digitalRead(WATER_PIN);   // Water detected or not
  float temp = dht.readTemperature();   // Temperature
  float hum  = dht.readHumidity();      // Humidity

  // If DHT fails, skip this loop
  if (isnan(temp) || isnan(hum)) {
    Serial.println("DHT error, skipping");
    delay(3000);
    return;
  }

  // -------------------- Risk Calculation --------------------
  int risk = 0;

  if (water == HIGH) risk += 40;   // Water presence increases risk
  if (soil < 400)    risk += 25;   // High moisture increases risk
  if (temp > 28)     risk += 20;   // Warm temperature increases risk
  if (hum > 70)      risk += 15;   // High humidity increases risk

  if (risk > 100) risk = 100;     // Limit max risk to 100

  // -------------------- Create Payload --------------------
  // Format: NodeID,Temp,Humidity,Soil,Water,Risk
  String payload = NODE_ID + "," + String(temp,1) + "," + String(hum,0) + "," +
                   String(soil) + "," + String(water) + "," + String(risk);

  Serial.print("Sending: ");
  Serial.println(payload);

  // -------------------- Send Data via LoRa --------------------
  String cmd = "AT+SEND=" + String(TARGET_ADDRESS) + "," +
               String(payload.length()) + "," + payload;

  loraCmd(cmd, 500);

  // Delay between transmissions
  delay(5000);   // For testing (later you can make it 30 minutes)
}
