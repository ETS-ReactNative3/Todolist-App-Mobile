import React from 'react'
import { View, Text, Button } from 'react-native'
import { Link } from '@react-navigation/native'

import SignIn from '../components/SignIn'

export default function SignInScreen () {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <SignIn/>
      <Text>
        Si vous préférez, vous pouvez vous{' '}
        <Link
          style={{ textDecorationLine: 'underline' }}
          to={{ screen: 'SignUp' }}
        >
          inscrire
        </Link>
        .
      </Text>
    </View>
  )
}
