import React, {useState, useEffect} from "react";
import { StyleSheet, View, TextInput, Button, Text, FlatList, Switch } from 'react-native';
import { ScrollView } from "react-native-web";

import { getTaskLists, deleteTaskList } from '../API/todoAPI'
import TaskListItem from './TaskListItem';
import Input from './UI/Input'



export default function TaskLists(props){
    const[dataList, setData] = useState(null)
    const[visible, setVisible] = useState(true)

    useEffect(() => {
        getTaskLists(props.username, props.token)
        .then( (data) => {
            setData(data)
        })
        .catch(error => {
            throw error
        })
      }, [dataList]
    )

    const deleteTL = (id) => {
        setVisible(false)
        deleteTaskList(props.username, id, props.token)
        setVisible(true)
    }

    return (
        <ScrollView>
            {visible ? (
                <View>
                    <View style={styles.composants}>
                        <FlatList
                            style={{ paddingLeft: 10 }}
                            data={dataList}
                            renderItem={({item}) => <TaskListItem item={item} username={props.username} token={props.token} deleteTL={deleteTL} navigation={props.navigation} />}
                        />
                    </View>

                    <View style={styles.composants}>
                        <Input username={props.username} token={props.token} />
                    </View>
                </View>
            ) : (
                <ActivityIndicator />
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    composants: {
        paddingVertical: 2
    }
})
