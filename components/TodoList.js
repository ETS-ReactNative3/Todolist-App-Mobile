import React from "react";
import { StyleSheet, View, TextInput, Button, Text, FlatList, Switch } from 'react-native';
import {useState, useEffect} from "react";
import { getTasks, createTask, deleteTask, updateTask } from '../API/todoAPI'

import TodoItem from './TodoItem';
import { ScrollView } from "react-native-web";

export default function TodoList(props) {
    const[count, setCount] = useState(0)
    const[todos, setTodos] = useState(null)
    const[newTodoText, setNewTodoText] = useState("")
    const[visible, setVisible] = useState(true)
    const[showTaskDone, setShowTaskDone] = useState(false)
    const[showTaskNotDone, setShowTaskNotDone] = useState(false)

    useEffect(() => {
        getTasks(props.route.params.id, props.token)
        .then((data) => {
            if(showTaskDone) {
                setTodos(data.filter(item=>item.done==true))
            }
            else if(showTaskNotDone) {
                setTodos(data.filter(item=>item.done==false))
            }
            else {
                setTodos(data)
            }
            setCount(data.length - data.filter((item)=>item.done).length)
        })
        .catch(error => {
            throw error
        })
      }, [todos]
    )


    const updateTodo = (done, id) => {
        setVisible(false)
        updateTask(done, id, props.token)
        setVisible(true)
    }

    const deleteTodo = (id) => {
        setVisible(false)
        deleteTask(id, props.token)
        setVisible(true)
    }

    const addNewTodo = () => {
        setVisible(false)
        createTask(newTodoText, props.route.params.id, props.token)
        setVisible(true)
        setNewTodoText("")
    }
    const showAllTasks = () => {
        setShowTaskDone(false)
        setShowTaskNotDone(false)
    }

    const afficherTachesFaites = () => {
        setShowTaskDone(true)
        setShowTaskNotDone(false)
    }
    
    const afficherTachesNonFaites = () => {
        setShowTaskDone(false)
        setShowTaskNotDone(true)
    }

    const checkAll = () => {
        setVisible(false)
        todos.forEach(task => {
            updateTask(true, task.id, props.token)
        });
        setVisible(true)
      }
    
    const checkNone = () => {
        todos.forEach(task => {
            updateTask(false, task.id, props.token)
        });
    }

    return (
        <ScrollView>
            {visible ? (
                <View>
                    <View style={styles.composants}>
                        <FlatList 
                            style={{ paddingLeft: 10 }}
                            data={todos}
                            renderItem={({item}) => <TodoItem item={item} updateTodo={updateTodo} deleteTodo={deleteTodo} todos={todos} route={props.route} token={props.token} />}
                        />
                        <Text>Il reste {count} tâches à faire.</Text>
                    </View>

                    <View style={styles.composants}>
                        <TextInput style={styles.composants}
                            onChangeText={setNewTodoText}
                            placeholder='saisir ici un nouvel item'
                            onSubmitEditing={addNewTodo}
                            value={newTodoText}
                        />
                    </View>

                    <View style={styles.composants}>
                        <Button
                            onPress={() => showAllTasks()} 
                            title= 'afficher toutes les tâches'
                        />
                    </View>

                    <View style={styles.composants}>
                        <Button
                            onPress={() => afficherTachesFaites()} 
                            title= 'afficher les tâches faites'
                        />
                    </View>

                    <View style={styles.composants}>
                        <Button
                            onPress={() => afficherTachesNonFaites()} 
                            title= 'afficher les tâches non faites'
                        />
                    </View>

                    <View style={styles.boutonsCoche}>
                        <Button
                            onPress={() => checkAll()} 
                            color="#008000" 
                            title= 'Tout cocher'
                        />

                        <Button
                            onPress={() => checkNone()} 
                            color="#E10303" 
                            title= 'Tout décocher'
                        />
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
    },
    boutonsCoche: {
        alignContent: 'center',
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 3
    }
})