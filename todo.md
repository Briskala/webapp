remove that navbar in login pages

Terug naar Home
B
Nederlands

and

add Choose login method

Google login use firebase

create an Mijn account pages

Create “Mijn account” page

Create a new page:

/account/{UID} user id number

If the user is logged in, show:

Welkom, {user_name}
Klantnr: {customer_number}
E-mail: {user_email}
Profiel: Particulier

Also show:

Mijn gegevens
Mijn aanvragen
Mijn diensten
Berichten
Uitloggen
and

and If the user is not logged in, redirect to:

/login

Payload CMS

Make the account labels editable in Payload CMS:

Mijn account title
Welcome text
Customer number label
Profile label
Mijn gegevens
Mijn aanvragen
Mijn diensten
Berichten
Uitloggen

User photo

If user is not logged in:

Welkom, Gast | Klantnr: You are not logged in | Mijn account
Particulier

🏠 R$ 0,00
✉️ 0
Profiel:

and

If user is logged in:

Welkom, {user_name} | Klantnr: {customer_number} | Mijn account
🏠 Saldo: R$ {balance}
✉️ Berichten: {message_count}
Profiel: {profile_name}


add user also in the database turso db 

Project name
bpag
Project ID 
bpagid
Project number 
787053187434
Parent org/folder in GCP
ericksonholding-org

Environment type
Production

npm install firebase
Then, initialize Firebase and begin using the SDKs for the products you'd like to use.

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxp1R5hsDLS2qSw41gxiLgzEA6HiU9a6s",
  authDomain: "bpagid.firebaseapp.com",
  projectId: "bpagid",
  storageBucket: "bpagid.firebasestorage.app",
  messagingSenderId: "787053187434",
  appId: "1:787053187434:web:cff43831f7b85ddf48d513",
  measurementId: "G-HDHJBJLSDM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

npm install -g firebase-tools

firebase login
Initiate your project
Run this command from your app's root directory:

firebase init
When you're ready, deploy your web app
Put your static files (e.g., HTML, CSS, JS) in your app's deploy directory (the default is "public"). Then, run this command from your app's root directory:

firebase deploy
