import {request} from "../utils/request";

export async function wxUserLogin(code: string) {
  return await request({
    url: "/api/wxApi/user/login",
    method: "post",
    data: {code}
  })
}
