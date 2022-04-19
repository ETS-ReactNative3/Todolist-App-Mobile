import React, { useState, useEffect } from "react";
import { Image, View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { getTasks } from '../API/todoAPI'

export default function TodoItem(props) {
    const [done, setDone] = useState(null);

    useEffect(() => {
        getTasks(props.route.params.id, props.token)
        .then((data) => {
            if((data.filter((item)=>item.id == props.item.id)).length != 0) {
                setDone((data.filter((item)=>item.id == props.item.id))[0].done)
            }
        })
        .catch(error => {
            throw error
        })
      }
    )

    const updateSwitch = (state) => {
        props.updateTodo(state, props.item.id)
    }


    return (
        <View style={styles.content}>
            <Switch value={done} onValueChange={(state) => updateSwitch(state)} />
            <Text style={[styles.text_item, { textDecorationLine: done ? 'line-through' : 'none' }]}>{props.item.content}</Text>
            <TouchableOpacity onPress={() => props.deleteTodo(props.item.id)}>
                <Image source={require('../assets/trash-can-outline.png')} style={{ height: 24, width: 24 }} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row'
    },
    text_item: {
        marginLeft: 10,
        width: 150
    }
})