import request from '@/config/axios'
import type { Dayjs } from 'dayjs';

/** 公司管理信息 */
export interface SysCompany {
          id: number; // 公司ID
          name?: string; // 公司名称
          creditCode?: string; // 统一社会信用代码
          registeredAddress: string; // 公司注册地址
          legalRepresentative: string; // 法人代表
          companyType: string; // 公司类型
          operatorName: string; // 操作人姓名
          operatorMobile: string; // 操作人手机号
          operatorEmail: string; // 操作人邮箱
          hasBusinessSystem: boolean; // 是否有业务系统
          systemName: string; // 系统名称
          dataStorageType: number; // 数据存储方式
          revision: number; // 乐观锁版本号
          status?: number; // 账号状态（0启用 1禁用）
  }

// 公司管理 API
export const SysCompanyApi = {



  // 查询公司管理分页
  getSysCompanyPage: async (params: any) => {
    return await request.get({ url: `/asset/sys-company/page`, params })
  },

  // 查询公司管理详情
  getSysCompany: async (id: number) => {
    return await request.get({ url: `/asset/sys-company/get?id=` + id })
  },

  // 新增公司管理
  createSysCompany: async (data: SysCompany) => {
    return await request.post({ url: `/asset/sys-company/create-and-open-account`, data })
  },

  // 修改公司管理
  updateSysCompany: async (data: SysCompany) => {
    return await request.put({ url: `/asset/sys-company/update`, data })
  },

  // 删除公司管理
  deleteSysCompany: async (id: number) => {
    return await request.delete({ url: `/asset/sys-company/delete?id=` + id })
  },

  /** 批量删除公司管理 */
  deleteSysCompanyList: async (ids: number[]) => {
    return await request.delete({ url: `/asset/sys-company/delete-list?ids=${ids.join(',')}` })
  },

  // 导出公司管理 Excel
  exportSysCompany: async (params) => {
    return await request.download({ url: `/asset/sys-company/export-excel`, params })
  },

  
// 重置公司管理密码
  resetSysCompanyPassword: async (id: number) => {
    return await request.put({ url: `/asset/sys-company/reset-password?id=` + id })
  },
// 更新公司管理状态
  updateSysCompanyStatus: async (id: number, status: number) => {
    return await request.put({ url: `/asset/sys-company/update-status?id=` + id + '&status=' + status })
  },
}
