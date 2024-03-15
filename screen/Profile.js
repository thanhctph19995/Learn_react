import React from 'react';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, Route } from '@react-navigation/native';



const Profile = ({ navigation }) => {


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: '8%', width: '100%', flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          style={{ height: '100%', aspectRatio: 1.3, alignItems: 'center', justifyContent: 'center' }}
          onPress={() => navigation.goBack()}
        >
          <Image source={require('../assets/icon.png')} style={{ height: '70%', width: '60%' }} resizeMode='stretch' />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 30, color: 'black' }}>Cài đặt</Text>
        <TouchableOpacity
          style={{ width: '50%', height: '10%', borderWidth: 1, borderColor: 'white', borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}
          onPress={() => navigation.popToTop()}
        >
          <Text style={{ fontSize: 20, color: 'pink' }}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
