import request from '@/config/axios'
import type { Dayjs } from 'dayjs';

/** 审核记录版本信息 */
export interface AuditRecordHistory {
          id: number; // 主键ID
          auditRecordId?: number; // 关联审核记录ID
          versionNo?: number; // 版本号
          snapshotData: string; // 审核记录快照(原JSON类型)
  }

// 审核记录版本 API
export const AuditRecordHistoryApi = {
  // 查询审核记录版本分页
  getAuditRecordHistoryPage: async (params: any) => {
    return await request.get({ url: `/asset/audit-record-history/page`, params })
  },

  // 查询审核记录版本详情
  getAuditRecordHistory: async (id: number) => {
    return await request.get({ url: `/asset/audit-record-history/get?id=` + id })
  },

  // 新增审核记录版本
  createAuditRecordHistory: async (data: AuditRecordHistory) => {
    return await request.post({ url: `/asset/audit-record-history/create`, data })
  },

  // 修改审核记录版本
  updateAuditRecordHistory: async (data: AuditRecordHistory) => {
    return await request.put({ url: `/asset/audit-record-history/update`, data })
  },

  // 删除审核记录版本
  deleteAuditRecordHistory: async (id: number) => {
    return await request.delete({ url: `/asset/audit-record-history/delete?id=` + id })
  },

  /** 批量删除审核记录版本 */
  deleteAuditRecordHistoryList: async (ids: number[]) => {
    return await request.delete({ url: `/asset/audit-record-history/delete-list?ids=${ids.join(',')}` })
  },

  // 导出审核记录版本 Excel
  exportAuditRecordHistory: async (params) => {
    return await request.download({ url: `/asset/audit-record-history/export-excel`, params })
  },
}