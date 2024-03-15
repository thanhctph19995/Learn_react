import { View, Text, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Button, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CheckBox } from 'react-native-elements';
import CustomButton from '../component/CustomButton';

const AddProduct = (navigation) => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [email, setEmail] = useState('');
    const [selectedIndex, setIndex] = useState(0);


  
    const navigateToHome = () => {
        navigation.navigate('Home');
    };
    
    const SaveList = async () => {
        // tạo đối tượng dữ liệu
        let objSV = { 
            userName: user, password: password,
            fullName: fullName, role:"STAFF", 
            gender:selectedIndex===0?'Male':'Female',
            email:email, dateOfBirth: dateOfBirth
         };
        const API_URL = 'http://192.168.0.105:3000/users';

        fetch(API_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objSV)

        })
            .then((res) => {
                if (res.status == 201) // 201 là mã tạo đối tượng thành công   
                alert("Thêm thành công")[
                        { text: 'OK', onPress: () => navigateToHome() }
                    ];
                    getListUser(); 
            })
            .catch((ex) => {
                console.log(ex);
            });

    };
    return (
        <View style ={styles.container}>

            <Text style= {styles.txtHeader}>Form thêm thông tin</Text>
            <TextInput style={styles.TextInput} placeholder="UserName" onChangeText={(txt) => { setUser(txt) }} />
            <TextInput style={styles.TextInput} placeholder="PassWord" onChangeText={(txt) => { setPassword(txt) }} />
            <TextInput style={styles.TextInput} placeholder="FullName" onChangeText={(txt) => { setFullName(txt) }} />
            <TextInput style={styles.TextInput} placeholder="Date" onChangeText={(txt) => { setDateOfBirth(txt) }} />
            <View style={{ flexDirection: 'row' }}>
                <CheckBox title='Male' checked={selectedIndex === 0} onPress={() => setIndex(0)} checkedIcon='dot-circle-o' uncheckedIcon='circle-o' />
                <CheckBox title='Female' checked={selectedIndex === 1} onPress={() => {setIndex(1)}} checkedIcon='dot-circle-o' uncheckedIcon='circle-o' />
            </View>
            <TextInput style={styles.TextInput} placeholder="Email" type="email" onChangeText={(txt) => { setEmail(txt) }} />
            <CustomButton btnLabel={"Thêm"} onPress={SaveList}></CustomButton>
        
        </View>


    );

}
export default AddProduct;
const styles=StyleSheet.create(
    {
        container: {
            flex: 1,
            marginTop: 40
        },
        TextInput:{
            height:48,
            borderWidth:1,
            borderRadius:10,
            marginTop:4
        },
        txtHeader: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        Button:{
            height:48,
            borderWidth:1,
            borderRadius:10,
            marginTop:10
        }
    });