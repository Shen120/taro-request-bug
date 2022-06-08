import * as Taro from "@tarojs/taro";
import {Text, View} from '@tarojs/components'
import {AtButton} from 'taro-ui'
import './index.less'
import {wxUserLogin} from "../../services";

const Index: Taro.FC = () => {

  const onClick = () => {
    Taro.login({
      success: async res => {
        console.log(res)
        if (res.code) {
          const user = await wxUserLogin(res.code);
          console.log(user)
        }
      }
    })
  }

  return (
    <View className='index'>
      <Text>Hello world!</Text>
      <AtButton type='primary' onClick={onClick}>请求</AtButton>
      <Text>Taro UI 支持 Vue 了吗？</Text>
      <AtButton type='primary' circle={true}>支持</AtButton>
      <Text>共建？</Text>
      <AtButton type='secondary' circle={true}>来</AtButton>
    </View>
  )
}

export default Index;
