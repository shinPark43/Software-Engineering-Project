import { View, Text, StyleSheet , ImageBackground} from 'react-native'
import React from 'react'

import image1 from "@/assets/images/ASU_logo_2.0.png" 

const app = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>CampusMind</Text>
    </View>
  )
}

export default app

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  }
})