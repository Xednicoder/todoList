import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
export default function ToDoCard(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [toDoItem, setTodoItem] = useState(props.text);

  const toggleComplete = () => {
    if (props.isCompleted) {
      props.unCompletedTodo(props.id);
    } else {
      props.completedTodo(props.id);
    }
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const endEditing = () => {
    setIsEditing(false);
  };

  const handleInput = (text) => {
    setTodoItem(text);
  };
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={toggleComplete}>
          <View
            style={[
              styles.checkBox,
              props.isCompleted
                ? styles.completedCheckBox
                : styles.unCompletedCheckBox,
            ]}
          />
        </TouchableOpacity>
        {isEditing ? (
          <TextInput
            style={styles.inputFixed}
            value={toDoItem}
            onChangeText={(text) => handleInput(text)}
          />
        ) : (
          <Text
            style={[
              styles.bodyText,
              props.isCompleted
                ? styles.completeBodyText
                : styles.unCompleteBodyText,
            ]}>
            {toDoItem}
          </Text>
        )}
      </View>
      {isEditing ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={endEditing}>
            <View style={styles.actionContainer}>
              <Image
                style={{
                  ...styles.iconStyle,
                  height: 15,
                  width: 15,
                }}
                source={require('./checked.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={startEditing}>
            <View style={styles.actionContainer}>
              <Image
                style={{ ...styles.iconStyle, height: 15, width: 15 }}
                source={require('./edit.png')}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPressOut={() => props.deleteFunc(props.id)}>
            <View style={styles.actionContainer}>
              <Image
                style={{ ...styles.iconStyle, height: 15, width: 15 }}
                source={require('./delete.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'gray',
    width: '100%',
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBox: {
    width: 20,
    height: 20,
    margin: 10,
    borderRadius: 7,
    borderWidth: 1,
  },
  completedCheckBox: {
    borderColor: '#aaaaaa',
  },
  unCompletedCheckBox: {
    borderColor: '#393939',
  },
  bodyText: {
    fontWeight: '500',
    marginVertical: 20,
  },
  completeBodyText: {
    color: '#aaaaaa',
    textDecorationLine: 'line-through',
  },
  unCompleteBodyText: {
    color: '#393939',
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 5,
  },
  actionContainer: {
    padding: 3,
  },
  inputFixed: {
    height: 57,
    color: 'gray',
  },
});
