import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';

const EditModal = ({ modalVisible, user, onSave, onClose }) => {
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth);

  const handleSave = () => {
    const editedUser = { ...user, fullName, email, dateOfBirth };
    onSave(editedUser);
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Sửa thông tin sinh viên</Text>
        <TextInput
          style={styles.modalInput}
          placeholder="Họ và tên"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput style={styles.modalInput} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput
          style={styles.modalInput}
          placeholder="Ngày sinh"
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
        />
        <Button title="Lưu" onPress={handleSave} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalInput: {
    marginBottom: 10,
  },
});

export default EditModal;
