import { Alert, View, Text, TouchableOpacity} from 'react-native'
import { SafeAreaProvider ,SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { styles } from '../../styles/auth.styles'
import { Link } from 'expo-router';
const index = () => {
  return (
<SafeAreaView style={{ flex: 1 }}>
  <View>
      <Link href={"./notifications"}>index</Link>
      <TouchableOpacity onPress={()=>Alert.alert('Hello!')
      }>
        <Text>hello</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}

export default index