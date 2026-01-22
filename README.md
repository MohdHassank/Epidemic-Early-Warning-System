# Epidemic-Early-Warning-System

## 📌 Problem Statement

Mosquito-borne diseases like **dengue and malaria** increase because there is **no real-time system** to detect risky areas early.  
Current methods depend on **manual checking**, which is slow and often too late.

### Key Challenges
- **Manual and inefficient methods** – Field surveys are slow and costly  
- **No real-time monitoring** – Authorities do not get live environmental data  
- **Delayed response** – Action happens after cases increase instead of prevention  

---

## 💡 Proposed Solution

We developed an **IoT-based smart monitoring system** using:
- DHT22 (temperature & humidity sensor)  
- Soil moisture sensor  
- Water detection sensor  
- Power monitoring  
- TP4056 power management  

The system continuously collects environmental data and processes it to generate **risk levels**:
- Low  
- Medium  
- High  

A **real-time web dashboard** displays:
- Current risk level  
- Area-wise safety status  
- Device status  
- Alerts for high-risk areas  

---

## 🔁 End-to-End System Flow

1. **Data Sensing**  
   Sensors (DHT22, soil, water, power monitoring) collect environmental data.

2. **Device Processing**  
   Arduino Nano reads sensor data and sends it to ESP32-C3.

3. **LoRa Transmission**  
   ESP32-C3 transmits data using long-range LoRa communication (offline).

4. **Server Reception**  
   Gateway sends data to Node.js backend using REST API.

5. **Data Processing**  
   Backend processes data and calculates risk level (Low / Medium / High).

6. **Dashboard Display**  
   Web dashboard (HTML, CSS, JavaScript) shows live data, device status, and alerts.

7. **Action Taken**  
   Authorities take preventive action based on displayed risk.

---

## 🧰 Tech Stack

### Hardware
- Arduino Nano  
- ESP32-C3  
- LoRa Module (RYLR998)  
- DHT22 Sensor  
- Soil Moisture Sensor  
- Water Sensor  
- TP4056 Power Module  
- Battery & Power Supply  

### Backend
- Node.js  
- JavaScript Backend Logic  
- REST API  

### Frontend (Dashboard)
- HTML  
- CSS  
- JavaScript  

---

## 🌐 USP (Unique Selling Point)

- Works **fully offline**  
- No internet, Wi-Fi, or Bluetooth required  
- Uses **long-range LoRa communication**  
- Reliable transmission up to **15 km**  
- Ideal for **remote and low-connectivity areas**  

---

## 💰 Cost & Revenue Model

- Manufacturing cost per device: **₹1,800**  
- Proposed selling price: **₹3,499**  
- Profit margin: **₹1,700 per device**

### Budget Allocation (Approx.)
- LoRa Module: 55%  
- Microcontroller: 19%  
- ESP32-C3: 13%  
- Sensors, power, wires: Remaining  

---

## 🚀 Future Enhancements

1. **Predictive Risk Alerts (Early Warning)**  
   Analyze last 24–72 hours of data to predict future high-risk zones.

2. **Public SMS Alerts for Awareness**  
   Send SMS alerts to both authorities and residents of affected areas.

3. **Real Device Location Mapping**  
   - GPS or admin-defined device locations  
   - Real-world mapping of devices  
   - Area-wise and ward-wise monitoring  

---

## ✅ Conclusion

This project demonstrates a **practical IoT-based early warning system** using:
- Low-cost sensor devices  
- Long-range offline LoRa communication  
- Live web dashboard  

It supports **early detection, faster response, scalability**, and is suitable for **government deployment** in both urban and rural environments.

> **Early Detection. Faster Action. Safer Communities.**
