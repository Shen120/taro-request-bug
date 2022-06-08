import * as Taro from "@tarojs/taro";

export const Host: string = "http://192.168.31.245:7001";

export const crsfKey: string = "crsfToken";
const tokenKey: string = "userToken";

type RequestParams = {
  url: string;
  data?: {[key: string]: any};
  header?: {[key: string]: any};
  method?: any;
};
type RequestResponse = {
  success: boolean;
  data?: any;
  errorMessage?: string;
}

const requestInterceptor = chain => {
  console.log(chain)
}

export const request = (params: RequestParams): Promise<RequestResponse> => {
  return new Promise(async (resolve, reject) => {
    const {url, data, header, method = "get"} = params;
    const cookie = Taro.getStorageSync(crsfKey);
    const token = Taro.getStorageSync(tokenKey);
    const headers = {
      "token": cookie,
      "Cookie": cookie,
      "authorization": token,
    };
    if (header) {
      Object.assign(headers, {...header});
    }
    // Taro.addInterceptor(requestInterceptor);
    // @ts-ignore
    const requestTask = Taro.request({
      url: `${Host}${url}`,
      data: data,
      method,
      header: headers,
      success: result => {
        console.log(555, result);
        const res: RequestResponse = result.data;
        if (res.success) {
          resolve(res)
        } else {
          reject(res.errorMessage || "请求错误")
        }
      },
      fail: error => {
        console.log("请求触发fail：", error)
        reject("请求错误")
      },
      complete: () => {

      }
    })

    requestTask.onHeadersReceived(response => {
      console.log(1111111, response)
    })
    // requestTask.then(result => {
    //   const res: RequestResponse = result.data;
    //   if (res.success) {
    //     resolve(res)
    //   } else {
    //     reject(res.errorMessage || "请求错误")
    //   }
    // })
    // requestTask.catch(error => {
    //   console.log("请求触发fail：", error)
    //   reject("请求错误")
    // })

  })
}
