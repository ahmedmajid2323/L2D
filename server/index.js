const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
var cron = require('node-cron');
const { format, addMinutes, parse } = require('date-fns');
const app = express()

/* const reminderTime = addMinutes(now, 15);
console.log('Reminder time:', format(reminderTime, 'yyyy-MM-dd HH:mm:ss')); */

// Initialize Firebase Admin SDK with service account credentials
const serviceAccount = require('./service_account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore(); // Access Firestore

const Send_notif = async (user_type, user_token, lesson, time, client_admin) => { 
  try {
    switch (user_type) {
      case 'client':
        const response_client = await admin.messaging().send({
          token: user_token,
          notification: {
            title: 'Reminder!',
            body: `You have '${lesson}' with ${client_admin} at ${time}`,
          },
          data:{
            navigationId: 'client_agenda'
          }
        });
        console.log('Notification sent successfully:', response_client);
        break;
    
      default: //admin
        const response_admin = await admin.messaging().send({
          token: user_token,
          notification: {
            title: 'Reminder !',
            body: lesson == 'code' 
            ? `You have '${lesson}' with ${client_admin.name} at ${time}`
            : `You have '${lesson}' with ${client_admin.name} at ${time} - ${client_admin.address}`
          },
          data:{
            navigationId: 'admin_agenda'
          }
        });
        console.log('Notification sent successfully:', response_admin);
        break;
    }
    
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

const testFunction = async () => {
  const snapshot = await firestore.collection('users').get();
  const today_date = format(new Date(), 'yyyy-MM-dd');
  const current_time = format(new Date(), 'hh:mm a');

  snapshot.forEach((doc) => {

    const data = doc.data();
    const user_type = data.type

    switch (user_type) {
      case 'admin':
        const device_token_admin = data.device_token
        data.agenda.forEach((day) => {
          if (day.title === today_date && data.connected == true) {
            day.data.forEach((task) => {
              const taskTimeDate = parse(task.time, 'hh:mm a', new Date()); 
              const currentTimeDate = parse(current_time, 'hh:mm a', new Date());
              const timeDifference = (taskTimeDate - currentTimeDate) / (1000 * 60);
              if (timeDifference >= 0 && timeDifference <= 15) {
                Send_notif(user_type, device_token_admin, task.lesson, task.time, task.user);
              }
            });
          }
        });
        break;
    
      default:
        const device_token_client = data.device_token
        data.agenda?.forEach((day) => {
          if (day.title === today_date && data.connected == true) {
            day.data.forEach((task) => {
              const taskTimeDate = parse(task.time, 'hh:mm a', new Date()); 
              const currentTimeDate = parse(current_time, 'hh:mm a', new Date());
              const timeDifference = (taskTimeDate - currentTimeDate) / (1000 * 60);
              if (timeDifference >= 0 && timeDifference <= 15) {
                Send_notif(user_type, device_token_client, task.lesson, task.time, task.admin);
              }
            });
          }
        });
        break;
    }

  });
};

/************************************** verify agenda every minute **************************************/
cron.schedule('*/10 * * * * *', () => {
  testFunction();
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});