import { FontAwesome5 } from '@expo/vector-icons';

import { StyleSheet, View, Text, Image, Button } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import React from 'react';


const Student =({user,onDelete})=>{
    return(
        <View style={styles.item}>
            <View style={styles.itemImageContainer}>
                {user.gender === 'Male' ? (
                <Image style={styles.itemImage} source={require('../assets/images/male.png')} resizeMode='contain' />
                ) : (
                <Image style={styles.itemImage} source={require('../assets/images/female.png')} resizeMode='contain' />
                )}
                </View>
                <View style={{ paddingLeft: 15 }}>
                    <Text>{user.userName}</Text>
                    <Text>{user.fullName}</Text>
                    <Text>{user.gender}</Text>
                    <Text>{user.email}</Text>
                    <Text>{user.dateOfBirth}</Text>
                    
                </View>
            <TouchableOpacity style={styles.deleteButton} onFocus={()=>onDelete(user)}>
                <FontAwesome5 name="trash" size={24} color="#333"  onPress={()=>onDelete(user)}/>
            </TouchableOpacity>
            
        </View>
            
      
    );
};

export default Student;

const styles = StyleSheet.create({
    editInput: {
        marginBottom: 5,
        borderBottomWidth: 1,
        borderColor: '#ccc',
      },
      actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomColor: '#E2E2E2',
        borderBottomWidth: 0.5,
        width:'90%'
    },
    itemImageContainer: {
        width: 100,
        height: 100,
        borderRadius: 100
    },
    itemImage: {
        flex: 1,
        width: undefined,
        height: undefined
    },
    deleteButton: {
        flex: 1,
        marginLeft:5,
        flexDirection: 'row',
        alignItems: 'center'
    }
});