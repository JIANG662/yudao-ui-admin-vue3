import request from '@/config/axios'
import type { Dayjs } from 'dayjs';

/** 通用日志信息 */
export interface Log {
          id: number; // 主键ID
          bizType?: string; // 业务类型
          bizId?: number; // 业务ID
          operationType?: string; // 操作类型
          operatorId?: number; // 操作人ID
          operationContent: string; // 操作内容
  }

// 通用日志 API
export const LogApi = {
  // 查询通用日志分页
  getLogPage: async (params: any) => {
    return await request.get({ url: `/asset/log/page`, params })
  },

  // 查询通用日志详情
  getLog: async (id: number) => {
    return await request.get({ url: `/asset/log/get?id=` + id })
  },

  // 新增通用日志
  createLog: async (data: Log) => {
    return await request.post({ url: `/asset/log/create`, data })
  },

  // 修改通用日志
  updateLog: async (data: Log) => {
    return await request.put({ url: `/asset/log/update`, data })
  },

  // 删除通用日志
  deleteLog: async (id: number) => {
    return await request.delete({ url: `/asset/log/delete?id=` + id })
  },

  /** 批量删除通用日志 */
  deleteLogList: async (ids: number[]) => {
    return await request.delete({ url: `/asset/log/delete-list?ids=${ids.join(',')}` })
  },

  // 导出通用日志 Excel
  exportLog: async (params) => {
    return await request.download({ url: `/asset/log/export-excel`, params })
  },
}