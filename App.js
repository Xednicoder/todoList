import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Modal,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import ToDoCard from './ToDoCard';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function App() {
  const [myToDo, setMyToDo] = useState('');
  const [myToDoList, setMyToDoList] = useState(['코드카데미 완강하기']);
  const [modalVisible, setModalVisible] = useState(false);

  const pushToDoItem = () => {
    const getMyToDoList = [...myToDoList];
    getMyToDoList.push(myToDo);
    setMyToDoList(getMyToDoList);
    setMyToDo('');
  };

  return (
    <>
      <LinearGradient colors={['#ad7ec7', '#ecb3c2']} style={styles.container}>
        <StatusBar barStyle='light-content' />
        <View style={styles.cardBox}>
          <View style={styles.flexIconBox}>
            <View style={styles.leftIconBox}>
              <View style={styles.iconBox}>
                <Image source={require('./menu.png')} style={styles.icon} />
              </View>
            </View>
            <View style={styles.rightIconBox}>
              <View style={styles.iconBox}>
                <Image source={require('./check.png')} style={styles.icon} />
              </View>
            </View>
          </View>
          <ScrollView contentContainerStyle={styles.toDos}>
            {myToDoList.map((toDoItem, toDoIndex) => (
              <ToDoCard key={toDoIndex} text={toDoItem} />
            ))}
          </ScrollView>
        </View>
        <TouchableHighlight onPress={() => setModalVisible(true)}>
          <View style={styles.buttonBox}>
            <Text style={styles.addButton}>+</Text>
          </View>
        </TouchableHighlight>
      </LinearGradient>
      <Modal animationType='fade' transparent={true} visible={modalVisible}>
        <View style={styles.modalView}>
          <TextInput
            style={styles.textInput}
            placeholder={'할 일을 입력하세요'}
            value={myToDo}
            onChangeText={(text) => setMyToDo(text)}
            autoCorrect={false}
            onSubmitEditing={() => {
              setModalVisible(!modalVisible);
              pushToDoItem();
            }}
          />
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
            onPress={() => {
              setModalVisible(!modalVisible);
              pushToDoItem();
            }}>
            <Text style={styles.textStyle}>입력</Text>
          </TouchableHighlight>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBox: {
    flex: 0.7,
    width: width - 30,
    height: '100%',
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  flexIconBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 70,
    marginBottom: 10,
  },
  leftIconBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: '100%',
  },
  rightIconBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
    borderLeftWidth: 1,
    borderLeftColor: '#dbdbdb',
  },
  iconBox: {
    width: 25,
    height: 25,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  textInput: {
    fontSize: 15,
    color: 'gray',
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
  },
  toDos: {
    alignItems: 'center',
    margin: 10,
  },
  buttonBox: {
    position: 'absolute',
    top: -40,
    right: -40,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    backgroundColor: '#ffb974',
    borderRadius: 50,
  },
  addButton: {
    color: 'white',
    fontSize: 50,
  },
  modalView: {
    position: 'absolute',
    top: 300,
    left: 50,
    width: 300,
    height: 130,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
