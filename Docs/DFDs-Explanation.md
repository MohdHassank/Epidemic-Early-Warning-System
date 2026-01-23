# 📘 DFD Explanations - 

This section explains the **Data Flow Diagrams (DFD Level 0 and Level 1)** of the project in **simple and clear language**, suitable for project reports, viva, and hackathon documentation.

## 🟢 DFD Level 0 

### What it Represents
DFD Level 0 shows the system as **one single process** and how it interacts with external entities.

![image](https://github.com/MohdHassank/Epidemic-Early-Warning-System/blob/main/Diagrams/DFD-Level-0.png?raw=true)

It answers:
- Who provides data to the system?
- Who receives output from the system?

---

### Components in Level 0

#### 1. Sensor Devices (Arduino + Sensors)
These are deployed in real locations (drains, parks, streets, etc.).
They collect:
- Temperature  
- Humidity  
- Soil moisture  
- Water presence  

They send:
- **Environmental Data → System**


#### 2. SMBD System (Main Process)
This is the **entire project combined**:
- Receives sensor data  
- Processes data  
- Calculates risk level  
- Generates alerts  
- Displays dashboard  

Shown as **Process 0** in the center of the diagram.



#### 3. Authorities / Admin (Dashboard User)
These are users like:
- Municipal officers  
- Health department staff  
- Monitoring team  

They receive:
- Risk levels  
- Alerts  
- Area safety status  

They use this information to take action (cleaning, spraying, awareness).



#### 4. Public Users (Future Feature)
Citizens who may receive:
- SMS alerts for awareness  
This is part of future enhancement.



## 🟡 DFD Level 1 

Level 1 breaks the system into **actual working processes** and shows how data flows inside the system step-by-step.

![image](https://github.com/MohdHassank/Epidemic-Early-Warning-System/blob/main/Diagrams/DFD-Level-1.png?raw=true)



## External Entities

- **E1 – Sensor Node:** Arduino Nano + Sensors  
- **E2 – Admin / Authority:** Dashboard user  
- **E3 – Public Users:** SMS recipients (future feature)

---

## Data Stores

- **D1 – Device Data Database**  
  Stores device readings, risk levels, timestamps.

- **D2 – Risk Logs / History**  
  Stores historical data for analysis and future prediction.

---

## Processes Explained Simply


### Process 1: Data Collection
- Sensors collect environmental data.
- Example:
  - Temperature = 32°C  
  - Humidity = 78%  
  - Soil = Wet  
  - Water detected  

Output:
- Raw sensor values



### Process 2: Device Processing (Risk Calculation)
Arduino processes sensor values and applies logic.

Example:
- Water detected  
- High humidity  
- Warm temperature  
→ Risk becomes **High**

Output:
- Processed data (values + risk level)



### Process 3: LoRa Transmission (ESP32-C3 Gateway)
ESP32-C3 acts as communication bridge.

It:
- Receives processed data  
- Sends data using LoRa  
- Forwards data to backend using API  

This allows:
- Long-range communication  
- Fully offline operation  



### Process 4: Backend Processing (Node.js Server)
Server receives data and:
- Stores data in database  
- Saves history logs  
- Confirms risk level  
- Prepares data for dashboard  

This is the **brain of the system**.


### Process 5: Dashboard & Alerts
This is the interface used by authorities.

It displays:
- Live sensor values  
- Device status  
- Area risk (Low / Medium / High)  
- Alerts for high-risk areas  

Authorities then:
- Take preventive actions  
- Send field teams  
- Plan cleaning and spraying



