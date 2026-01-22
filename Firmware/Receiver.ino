#include <WiFi.h>
#include <HTTPClient.h>

// -------------------- LoRa Settings --------------------
#define DEVICE_ADDRESS 1
#define LORA_NETWORK_ID 5
#define TARGET_ADDRESS 2
#define LORA_BAND 915000000UL     // Must match sender LoRa band

#define RXD_PIN 20   // ESP32 RX pin connected to LoRa TX
#define TXD_PIN 21   // ESP32 TX pin connected to LoRa RX

// -------------------- Wi-Fi Settings --------------------
const char* WIFI_SSID = "Good1";
const char* WIFI_PASS = "amaan1234";

// Backend server API endpoint
const char* SERVER_URL = "http://172.21.26.97:3000/api/data";

// -------------------- Extract payload from LoRa response --------------------
// Example received line:
// +RCV=2,22,N01,31.5,78,320,1,85,-45,40
// We extract only: N01,31.5,78,320,1,85
String extractPayload(String line) {

  int comma1 = line.indexOf(',');
  if (comma1 < 0) return "";

  int comma2 = line.indexOf(',', comma1 + 1);
  if (comma2 < 0) return "";

  int lastComma = line.lastIndexOf(',');
  if (lastComma < 0) return "";

  int secondLastComma = line.lastIndexOf(',', lastComma - 1);
  if (secondLastComma < 0) return "";

  String payload = line.substring(comma2 + 1, secondLastComma);
  payload.trim();
  return payload;
}

// -------------------- Convert CSV payload to JSON --------------------
// Input:  N01,31.5,78,320,1,85
// Output: {"id":"N01","t":31.5,"h":78,"s":320,"w":1,"r":85,"gateway":"esp32c3"}
String payloadToJSON(String payload) {

  int p1 = payload.indexOf(',');
  int p2 = payload.indexOf(',', p1 + 1);
  int p3 = payload.indexOf(',', p2 + 1);
  int p4 = payload.indexOf(',', p3 + 1);
  int p5 = payload.indexOf(',', p4 + 1);

  if (p1<0 || p2<0 || p3<0 || p4<0 || p5<0) return "";

  String id    = payload.substring(0, p1);
  String temp  = payload.substring(p1 + 1, p2);
  String hum   = payload.substring(p2 + 1, p3);
  Strin
