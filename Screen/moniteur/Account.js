import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

const Account = () => {
  return (
    <LinearGradient 
    colors={['#000B14', '#020F19', '#051622', '#09202F', '#11324A', '#153A54']}
    style={{flex:1}}>
      <Text>Home</Text>
    </LinearGradient>
  )
}

export default Account

const styles = StyleSheet.create({})