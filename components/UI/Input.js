import React, {useState} from "react";
import { StyleSheet, View, TextInput, Button, Text, FlatList, Switch } from 'react-native';

import { newTaskList } from '../../API/todoAPI'


export default function Input(props){
    const[newTaskListText, setNewTasklistText] = useState('')
    const [visible, setVisible] = useState(true)

    const newTL = () => {
        if (newTaskList == '') return
        setVisible(false)
        newTaskList(props.username, newTaskListText, props.token)
        setVisible(true)
        
        setNewTasklistText("")
    }


    return (
        <View>
            {visible ? (
                <TextInput
                    onChangeText={setNewTasklistText}
                    placeholder='saisir ici une nouvelle liste'
                    onSubmitEditing={newTL}
                    value={newTaskListText}
                />
            ) : (
                <ActivityIndicator />
            )}
        </View>
    )
}