import * as Taro from "@tarojs/taro";
import "taro-ui/dist/style/components/button.scss"; // 按需引入css
import { Component } from 'react'
import './app.less';
import {crsfKey, Host} from "./utils/request";

class App extends Component {

  componentDidMount () {
    Taro.request({
      url: `${Host}/api/init/all`,
      success: result => {
        const cookieStr = result.header["Set-Cookie"] || "";
        const cookies = cookieStr.split(";");
        for (const item of cookies) {
          const arr = item.split("=");
          if (arr[0] === "csrfToken") {
            Taro.setStorageSync(crsfKey, arr[1]);
            break;
          }
        }
      }
    })
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
