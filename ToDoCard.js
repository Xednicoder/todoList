import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

export default function ToDoCard(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [toDoItem, setTodoItem] = useState('');

  const toggleComplete = () => {
    setIsCompleted(!isCompleted);
  };

  const startEditing = () => {
    const toDoValue = props.text;
    setTodoItem(toDoValue);
    setIsEditing(true);
  };

  const endEditing = () => {
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={toggleComplete}>
          <View
            style={[
              styles.checkBox,
              isCompleted
                ? styles.completedCheckBox
                : styles.unCompletedCheckBox,
            ]}
          />
        </TouchableOpacity>
        {isEditing ? (
          <TextInput value={toDoItem} />
        ) : (
          <Text
            style={[
              styles.bodyText,
              isCompleted ? styles.completeBodyText : styles.unCompleteBodyText,
            ]}>
            {props.text}
          </Text>
        )}
      </View>
      {isEditing ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={endEditing}>
            <View style={styles.actionContainer}>
              <Text style={styles.actionButton}>확인</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={startEditing}>
            <View style={styles.actionContainer}>
              <Text style={styles.actionButton}>수정</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.actionContainer}>
              <Text style={styles.actionButton}>삭제</Text>
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
    borderColor: 'gray',
  },
  unCompletedCheckBox: {
    borderColor: 'black',
  },
  bodyText: {
    fontWeight: '500',
    marginVertical: 20,
  },
  completeBodyText: {
    color: 'gray',
    textDecorationLine: 'line-through',
  },
  unCompleteBodyText: {
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 5,
  },
  actionContainer: {
    padding: 3,
  },
});
