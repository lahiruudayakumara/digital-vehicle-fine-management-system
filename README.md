# 🚗 Digital Vehicle Fine Payment System

A cross platform mobile and web based solution for managing, tracking, and paying vehicle fines seamlessly integrated with secure QR code verification, real time alerts, and blacklist management.

---

## 📱 React Native Mobile Apps

### 🧑‍💼 Rider App (React Native)
The **Rider App** is a user-friendly mobile application designed for citizens to:
- Register and securely manage their profiles
- View issued fines and payment history
- Receive real-time alerts and fine notifications
- Make payments via credit/debit card or upload bank slip proof
- Request and display a unique QR code linked to their License ID
- Submit appeals and check blacklist status

🔐 **Security Focus**:
- Secure login & profile access
- QR code generation tied to license
- Alert emails for payment status and violations

---

### 👮 Police Officer App (React Native)
The **Officer App** enables Motor Traffic Officers to:
- Scan QR codes to instantly verify rider identity and fine history
- Issue fines on the go
- View assigned patrol areas
- Update or revoke fines (limited by time for fraud prevention)
- Report violation activity to central system

📲 **Key Features**:
- Mobile-first fine issuance
- Geo-tagged patrol area access
- Fraud prevention with time-bound update/delete actions

---

## 💻 Web Dashboards (Admin & Division)

| Dashboard            | Key Features                                                                 |
|----------------------|-------------------------------------------------------------------------------|
| Rider Dashboard      | Full fine history, QR management, blacklist check, appeals, and payments     |
| Officer Dashboard    | Fine issuance, QR scanning, profile viewing, and patrol assignment           |
| Admin Dashboard      | Officer management, KPI monitoring, division-based fine stats, and reports   |
| Payment Gateway      | Real-time transactions, blacklist automation, and secure alert system        |

---

## 📦 Technology Stack

- **Frontend**: React Native (Rider & Officer Apps), React.js (Admin/Web)
- **Backend**: Spring Boot
- **Database**: PostgreSQL
- **Authentication**: JWT / OAuth
- **Payments**: Integrated payment gateway + bank slip upload
- **QR Code**: Unique QR code generator tied to rider license
---

## 🛠️ Features Summary

- 🧾 Digital Fine Issuance
- 📲 Real-Time Rider Verification via QR Code
- 💳 Secure Payment System
- 🛡️ Automated Blacklisting
- 📊 Role-Based Dashboards with Reports
- 🔔 Email & In App Notifications

---
