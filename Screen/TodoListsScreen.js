import React, {useState} from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

import Tasklists from '../components/TaskLists'
import Input from '../components/UI/Input'

import { TokenContext } from '../Context/Context'
import { UsernameContext } from '../Context/Context'

export default function TodoListsScreen({navigation, route}){
    return (
        <TokenContext.Consumer>
            {([token, setToken]) => (
                <UsernameContext.Consumer>
                    {([username, setUsername]) => {
                        return (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.text}>Liste des TodoLists</Text>
                                                                        
                                <Tasklists username={username} token={token} navigation={navigation} />
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