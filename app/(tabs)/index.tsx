import { View, Text } from 'react-native'
import React from 'react'
import { useAppSelector } from '@/src/store/hooks'

const index = () => {
  const {user} = useAppSelector(state => state.auth)
  return (
    <View style={{marginTop:40}}>
      <Text className='text-4xl'>Home finally, { user.username }</Text>
    </View>
  )
}

export default index