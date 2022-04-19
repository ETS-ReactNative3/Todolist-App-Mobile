import React, { useState, useEffect } from "react";
import { Image, View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import {Bar} from 'react-native-progress';
import { getTasks, createTask, deleteTask, updateTask } from '../API/todoAPI'

export default function TaskListItem(props) {
    const [data, setData] = useState(null)
    const [ratio, setRatio] = useState(0)

    useEffect(() => {
        getTasks(props.item.id, props.token)
        .then((data) => {
            setData(data)
            if(data.length == 0) setRatio(1)
            else setRatio(data.filter((item)=>item.done).length / data.length)
        })
        .catch(error => {
            throw error
        })
        }, [data]
    )

    return (
        <View style={styles.content}>
            <TouchableOpacity onPress={() => props.navigation.navigate("Details", {id: props.item.id})}>
                <Text style={[styles.text_item]}>{props.item.title}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.deleteTL(props.item.id)}>
                <Image source={require('../assets/trash-can-outline.png')} style={{ height: 24, width: 24 }} />
            </TouchableOpacity>

            <View>
                <Bar progress={ratio} width={200} height={10} />
            </View>
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