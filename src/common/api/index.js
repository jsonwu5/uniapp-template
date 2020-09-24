import { request } from '@/utils/request'

// 查询账户列表 listByBook
// 账号管理接口 - 查询收押信息
// http://192.168.110.225:10030/supervise-custody-account-watch/doc.html
export const getAccountList = data => {
  return request({
    url: '/supervise/supervise-custody-account-watch/account/listByBook',
    method: 'post',
    data,
  })
}
