import request from '@/config/axios'
import type { Dayjs } from 'dayjs'

/** 用户信息 */
export interface User {
  id: number // 用户ID
  companyId?: number // 所属企业ID
  username?: string // 账号
  passwordHash?: string // 加密密码
  role?: string // 角色
  status: string // 状态
  lastLoginTime: string | Dayjs // 最后登录时间
}

// 用户 API
export const UserApi = {
  // 查询用户分页
  getUserPage: async (params: any) => {
    return await request.get({ url: `/asset/user/page`, params })
  },

  // 查询用户详情
  getUser: async (id: number) => {
    return await request.get({ url: `/asset/user/get?id=` + id })
  },

  // 新增用户
  createUser: async (data: User) => {
    return await request.post({ url: `/asset/user/create`, data })
  },

  // 修改用户
  updateUser: async (data: User) => {
    return await request.put({ url: `/asset/user/update`, data })
  },

  // 删除用户
  deleteUser: async (id: number) => {
    return await request.delete({ url: `/asset/user/delete?id=` + id })
  },

  /** 批量删除用户 */
  deleteUserList: async (ids: number[]) => {
    return await request.delete({ url: `/asset/user/delete-list?ids=${ids.join(',')}` })
  },

  // 导出用户 Excel
  exportUser: async (params) => {
    return await request.download({ url: `/asset/user/export-excel`, params })
  }
}
