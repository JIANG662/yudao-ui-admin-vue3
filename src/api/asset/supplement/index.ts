import request from '@/config/axios'
import type { Dayjs } from 'dayjs';

/** 补件记录信息 */
export interface SupplementRecord {
          id: number; // 主键ID
          auditRecordId?: number; // 关联审核记录ID
          sourceType?: string; // 业务类型
          sourceId?: number; // 业务ID
          companyId?: number; // 企业ID
          supplementFields: string; // 需要补充的字段列表
          supplementDesc: string; // 补充说明
          status: string; // 状态: pending/submitted/expired
          deadline: string | Dayjs; // 截止时间
          submittedAt: string | Dayjs; // 提交时间
  }

// 补件记录 API
export const SupplementRecordApi = {
  // 查询补件记录分页
  getSupplementRecordPage: async (params: any) => {
    return await request.get({ url: `/asset/supplement-record/page`, params })
  },

  // 查询补件记录详情
  getSupplementRecord: async (id: number) => {
    return await request.get({ url: `/asset/supplement-record/get?id=` + id })
  },

  // 新增补件记录
  createSupplementRecord: async (data: SupplementRecord) => {
    return await request.post({ url: `/asset/supplement-record/create`, data })
  },

  // 修改补件记录
  updateSupplementRecord: async (data: SupplementRecord) => {
    return await request.put({ url: `/asset/supplement-record/update`, data })
  },

  // 删除补件记录
  deleteSupplementRecord: async (id: number) => {
    return await request.delete({ url: `/asset/supplement-record/delete?id=` + id })
  },

  /** 批量删除补件记录 */
  deleteSupplementRecordList: async (ids: number[]) => {
    return await request.delete({ url: `/asset/supplement-record/delete-list?ids=${ids.join(',')}` })
  },

  // 导出补件记录 Excel
  exportSupplementRecord: async (params) => {
    return await request.download({ url: `/asset/supplement-record/export-excel`, params })
  },
}