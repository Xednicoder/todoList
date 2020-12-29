import React, { useEffect, useState } from 'react';
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
  AsyncStorage,
} from 'react-native';
import ToDoCard from './ToDoCard';
import { LinearGradient } from 'expo-linear-gradient';
import AppLoading from 'expo-app-loading';
import uuid from 'react-native-uuid';

const { width } = Dimensions.get('window');

export default function App() {
  const [myToDo, setMyToDo] = useState('');
  const [myToDoList, setMyToDoList] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [loadedToDo, setLoadedToDo] = useState(false);

  useEffect(() => {
    _loadedToDo();
  }, []);

  useEffect(() => {}, [myToDoList]);

  const _pushToDoItem = () => {
    const ID = uuid.v1();
    const toDoObject = {
      [ID]: {
        id: ID,
        isCompleted: false,
        text: myToDo,
        createdAt: Date.now(),
      },
    };
    setMyToDoList((prevState) => {
      return { ...prevState, ...toDoObject };
    });
    setMyToDo('');
  };

  const _loadedToDo = () => {
    setLoadedToDo(true);
  };

  const _deleteToDoItem = (id) => {
    const deleteToDo = { ...myToDoList };
    delete deleteToDo[id];
    setMyToDoList(deleteToDo);
  };

  const _unCompletedTodo = (id) => {
    const handleCompletedTodo = { ...myToDoList };
    handleCompletedTodo[id].isCompleted = false;
    setMyToDoList(handleCompletedTodo);
  };

  const _completedTodo = (id) => {
    const handleCompletedTodo = { ...myToDoList };
    handleCompletedTodo[id].isCompleted = true;
    setMyToDoList(handleCompletedTodo);
  };

  // const _saveTodoList = getTodoList => {
  //   const saveToDOList = AsyncStorage.setItem()
  // }

  if (!loadedToDo) {
    return <AppLoading />;
  }

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
            {Object.values(myToDoList)
              .sort(function (a, b) {
                return b.createdAt - a.createdAt;
              })
              .sort(function (a, b) {
                var completedA = a.isCompleted.toString().toUpperCase();
                var completedB = b.isCompleted.toString().toUpperCase();
                if (completedA < completedB) {
                  return -1;
                }
                if (completedA > completedB) {
                  return 1;
                }
                return 0;
              })
              .map((toDoItem) => (
                <ToDoCard
                  key={toDoItem.id}
                  deleteFunc={_deleteToDoItem}
                  completedTodo={_completedTodo}
                  unCompletedTodo={_unCompletedTodo}
                  {...toDoItem}
                />
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
            maxLength={20}
            onSubmitEditing={() => {
              setModalVisible(!modalVisible);
              _pushToDoItem();
            }}
          />
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: '#ffb974' }}
            onPress={() => {
              setModalVisible(!modalVisible);
              _pushToDoItem();
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
    left: 27,
    width: 300,
    height: 130,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    borderRadius: 20,
    padding: 7,
    paddingRight: 15,
    paddingLeft: 15,
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
