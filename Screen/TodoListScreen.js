import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

import Tasklists from '../components/TaskLists'
import TodoList from '../components/TodoList'

import { TokenContext } from '../Context/Context'
import { UsernameContext } from '../Context/Context'

export default function TodoListScreen({navigation, route}) {
    return (
        <TokenContext.Consumer>
            {([token, setToken]) => (
                <UsernameContext.Consumer>
                    {([username, setUsername]) => {
                        return (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.text}>Liste des tâches</Text>
                                                                
                                <TodoList username={username} token={token} navigation={navigation} route={route} />
                            </View>
                        )
                    }}
                </UsernameContext.Consumer>
            )}
        </TokenContext.Consumer>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20
    }
})