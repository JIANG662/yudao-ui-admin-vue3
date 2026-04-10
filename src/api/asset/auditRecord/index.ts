import request from '@/config/axios'
import type { Dayjs } from 'dayjs';

/** 通用审核信息 */
export interface AuditRecord {
          id: number; // 主键ID
          sourceType: string; // source_type + source_id 关联多个业务主表
          sourceId?: number; // 关联业务ID
          auditStage?: string; // 审核阶段
          auditResult: string; // 审核结果: approved/rejected
          auditComment: string; // 审核意见
          auditorId?: number; // 审核人ID
  }

// 通用审核 API
export const AuditRecordApi = {
  // 查询通用审核分页
  getAuditRecordPage: async (params: any) => {
    return await request.get({ url: `/asset/audit-record/page`, params })
  },

  // 查询通用审核详情
  getAuditRecord: async (id: number) => {
    return await request.get({ url: `/asset/audit-record/get?id=` + id })
  },

  // 新增通用审核
  createAuditRecord: async (data: AuditRecord) => {
    return await request.post({ url: `/asset/audit-record/create`, data })
  },

  // 修改通用审核
  updateAuditRecord: async (data: AuditRecord) => {
    return await request.put({ url: `/asset/audit-record/update`, data })
  },

  // 删除通用审核
  deleteAuditRecord: async (id: number) => {
    return await request.delete({ url: `/asset/audit-record/delete?id=` + id })
  },

  /** 批量删除通用审核 */
  deleteAuditRecordList: async (ids: number[]) => {
    return await request.delete({ url: `/asset/audit-record/delete-list?ids=${ids.join(',')}` })
  },

  // 导出通用审核 Excel
  exportAuditRecord: async (params) => {
    return await request.download({ url: `/asset/audit-record/export-excel`, params })
  },
}