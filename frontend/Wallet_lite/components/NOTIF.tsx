import { Button, TouchableOpacity } from 'react-native';
import * as Notifications from 'expo-notifications';
import { TextType } from '@/constants/Color';
import React from 'react';

export function Notif(){

  function sendNotifNow() {
  Notifications.scheduleNotificationAsync({
    content: {
      title: "Notification test 🔔",
      body: "Ça marche nickel 🚀",
    },
    trigger: null, // IMMÉDIAT
  });
}

  return (
      <TouchableOpacity style={{backgroundColor:"red",padding:20,margin:16,justifyContent:"center",
                              alignItems:"center"
                            }}  onPress={sendNotifNow}>
        <Text style={TextType.Titre}> </Text>
    </TouchableOpacity>
)
                        }