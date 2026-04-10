import request from '@/config/axios'
import type { Dayjs } from 'dayjs';

/** 企业信息 */
export interface Company {
          id: number; // 企业ID
          companyName?: string; // 企业名称
          creditCode: string; // 统一社会信用代码
          industry: string; // 所属行业
          contactPerson: string; // 联系人
          contactPhone: string; // 联系电话
          status?: string; // 状态
          moduleConfig: string; // 已开通模块，逗号分隔
  }

// 企业 API
export const CompanyApi = {
  // 查询企业分页
  getCompanyPage: async (params: any) => {
    return await request.get({ url: `/asset/company/page`, params })
  },

  // 查询企业详情
  getCompany: async (id: number) => {
    return await request.get({ url: `/asset/company/get?id=` + id })
  },

  // 新增企业
  createCompany: async (data: Company) => {
    return await request.post({ url: `/asset/company/create`, data })
  },

  // 修改企业
  updateCompany: async (data: Company) => {
    return await request.put({ url: `/asset/company/update`, data })
  },

  // 删除企业
  deleteCompany: async (id: number) => {
    return await request.delete({ url: `/asset/company/delete?id=` + id })
  },

  /** 批量删除企业 */
  deleteCompanyList: async (ids: number[]) => {
    return await request.delete({ url: `/asset/company/delete-list?ids=${ids.join(',')}` })
  },

  // 导出企业 Excel
  exportCompany: async (params) => {
    return await request.download({ url: `/asset/company/export-excel`, params })
  },
}