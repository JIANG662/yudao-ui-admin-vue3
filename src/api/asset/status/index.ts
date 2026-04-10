import request from '@/config/axios'
import type { Dayjs } from 'dayjs';

/** 状态流信息 */
export interface Status {
          id: number; // 主键ID
          bizType?: string; // 业务类型
          bizId?: number; // 业务ID
          fromStatus: string; // 原状态
          toStatus?: string; // 目标状态
          changedBy?: number; // 操作人ID
          changeReason: string; // 变更原因
          changedAt?: string | Dayjs; // 变更时间
  }

// 状态流 API
export const StatusApi = {
  // 查询状态流分页
  getStatusPage: async (params: any) => {
    return await request.get({ url: `/asset/status/page`, params })
  },

  // 查询状态流详情
  getStatus: async (id: number) => {
    return await request.get({ url: `/asset/status/get?id=` + id })
  },

  // 新增状态流
  createStatus: async (data: Status) => {
    return await request.post({ url: `/asset/status/create`, data })
  },

  // 修改状态流
  updateStatus: async (data: Status) => {
    return await request.put({ url: `/asset/status/update`, data })
  },

  // 删除状态流
  deleteStatus: async (id: number) => {
    return await request.delete({ url: `/asset/status/delete?id=` + id })
  },

  /** 批量删除状态流 */
  deleteStatusList: async (ids: number[]) => {
    return await request.delete({ url: `/asset/status/delete-list?ids=${ids.join(',')}` })
  },

  // 导出状态流 Excel
  exportStatus: async (params) => {
    return await request.download({ url: `/asset/status/export-excel`, params })
  },
}