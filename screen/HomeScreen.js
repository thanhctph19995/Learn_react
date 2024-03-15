
import { getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button ,StyleSheet, View,Text,Image, ScrollView, TextInput, Alert} from 'react-native';

import React, { useEffect, useState } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';

import moment from 'moment/moment';

import { CheckBox } from 'react-native-elements';

import CustomButton from '../component/CustomButton';
import CustomInput from '../component/CustomInput';
import Student from '../component/Student';
const HomeScreen = () => {
    const navigation=useNavigation();

    const[users, setUser]= useState([]);
    const[authInfo, setAuthInfo]= useState();
    const [selectedIndex, setIndex] = useState(0);

    // Hàm điều hướng
    const navigateToAdd = () => {
        navigation.navigate('Add');
    };


    const retrieveData =async()=>{
        const authInfo = await AsyncStorage.getItem('authInfo', authInfo);
        
            if (authInfo !== null) {
                console.log('====> authInfo from AsyncStorage', authInfo);
                setAuthInfo(JSON.parse(authInfo));
                
            }
    };


    const doLogout=()=>{
        AsyncStorage.removeItem('authInfo');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
        });
    };
    async function getListStudent() {
        try {
            const API_URL="http://192.168.0.105:3000/students";
            const response= await fetch(API_URL);
            const data= await response.json();
            setUser(data);
            return data;
        } catch (error) {
            console.log('Fetch data fail '+ error);
            return null;
        }
    }
    const [userName1,setUsername]=useState('');
    const [password1,setPassword]=useState('');
    const [fullName1,setFullName]=useState('');
    const [dateOfBrith1,setDateOfBrith]=useState('');
    const [email1,setEmail]=useState('');
   
    

    
    const userData={
        userName:userName1,
        password:password1,
        fullName:fullName1,
        email:email1,
        gender:selectedIndex===0?'Male':'Female',
        role:'STAFF',
        dateOfBrith:dateOfBrith1
       
    }

   
   const SaveData =() => {

    let API_URL='http://192.168.0.105:3000/users/'+authInfo.id;

    fetch(API_URL,{
    method:'PUT',
    headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
    },
    body:JSON.stringify(userData)
    })
    .then((response)=>{
    response=> response.json();    
    console.log(response.status);
    if (response.status==200) {
        alert("Thay doi thanh cong");
    }
    })
    .catch((err)=>{
        console.log(err);
    });

   };

   const validateFormStaff=()=>{
    if (userName1 === '') {
        Alert.alert('Notification', 'khong de trong username');
        return false;
    }

    if (password1 ==='') {
        Alert.alert('Notification', 'khong de trong password');
        return false;
    }
    if (fullName1 ==='') {
        Alert.alert('Notification', 'khong de trong firstname');
        return false;
    }
    if (email1 ==='') {
        Alert.alert('Notification', 'khong de trong email');
        return false;
    }
    if (dateOfBrith1 ==='') {
        Alert.alert('Notification', 'khong de trong lastname');
        return false;
    }

    SaveData();
    return true;
};
const deleteStudent = async (item) => {
    try {
        const studentId = item.id;
        const API_URL = 'http://192.168.0.105:3000/students/' + studentId;
        const response = await fetch(API_URL, { method: 'DELETE' });
        if (response && response.status === 200) {
            getListStudent();
        }
    } catch (error) {
        log.error('Delete data failed ' + error);
    }
};
    
    useEffect(() => {
        retrieveData();
        getListStudent();

        const currentUser = authInfo;


    }, []);

    const renderStudents = () => {
        return (
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View>
                    <Text style={styles.txtHeader}>List Student</Text>
                </View>
                <View style={styles.studentContainer}>
                    {users.map((item, index) => {
                        return <Student user={item} key={index} onDelete={deleteStudent}></Student>;
                    })}
                </View>
               
            </ScrollView>
        );
    };
   
    const formStaff=()=>{
        return(
            <View style={[styles.container,styles.staffView]}>
                <Text style={styles.txtHeader}>Information staff</Text>
                <CustomInput placeholder={authInfo.userName} value={userName1} setValue={setUsername}  secureTextEntry={false} ></CustomInput>
                <CustomInput placeholder={authInfo.password} value={password1} setValue={setPassword} secureTextEntry={true}></CustomInput>
                <CustomInput placeholder={authInfo.fullName} value={fullName1} setValue={setFullName} secureTextEntry={false}></CustomInput>
                <CustomInput placeholder={authInfo.dateOfBrith} value={dateOfBrith1} setValue={setDateOfBrith} secureTextEntry={false}></CustomInput>
                <CustomInput placeholder={authInfo.email} value={email1} setValue={setEmail} secureTextEntry={false}></CustomInput>
                <View style={{ flexDirection: 'row' }}>
                    <CheckBox title='Male' checked={selectedIndex === 0} onPress={() => setIndex(0)} checkedIcon='dot-circle-o' uncheckedIcon='circle-o' />
                    <CheckBox title='Female' checked={selectedIndex === 1} onPress={() => {setIndex(1)}} checkedIcon='dot-circle-o' uncheckedIcon='circle-o' />
                </View>
        
                <CustomButton btnLabel={"Update"} onPress={validateFormStaff}></CustomButton>

             </View>
            
        );
    };

    return( <SafeAreaView style={styles.container}>
        {authInfo?.role === 'ADMIN' ? renderStudents() : null}
        {authInfo?.role === 'STAFF' ? formStaff(authInfo) : null}
    </SafeAreaView>);
};

export default HomeScreen;

const styles=StyleSheet.create(
    {
        container: {
            flex: 1,
            marginTop: -20
        },
        txtHeader: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        item: {
            paddingVertical: 15,
            borderBottomColor: '#E2E2E2',
            borderBottomWidth: 0.5,
            flexDirection: 'row'
        },
        itemImageContainer: {
            width: 100,
            height: 100,
            borderRadius: 1009
        },
        itemImage: {
            flex: 1,
            width: undefined,
            height: undefined
        },
        scrollView: {
            flexGrow: 1,
            marginTop:30,

        },
        staffView:{
            width: '90%',
            height: 50,
            paddingLeft:20,
            marginTop: 10
        }
    }
);