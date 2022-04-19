import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

import { TokenContext } from '../Context/Context'

export default function SignOut ({ navigation }) {
  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <View style={styles.bouton}>
          <Text>Voulez vous vous déconnecter ?</Text>
          <Button
            title='Sign me out'
            onPress={() => setToken(null)}
            color="#E10303"
          />
          </View>
      )}
    </TokenContext.Consumer>
  )
}

const styles = StyleSheet.create({
  bouton: {
    margin: 'auto',
    width: 200
  }
})
