import request from '@/config/axios'
import type { Dayjs } from 'dayjs';

/** 清洗任务信息 */
export interface CleanTask {
          id: number; // 主键ID
          fileId?: number; // 关联附件ID
          companyId?: number; // 企业ID
          assigneeId: number; // 负责人ID
          status: string; // 任务状态
          dueTime: string | Dayjs; // 截止时间
          resultSummary: string; // 结果总结
  }

// 清洗任务 API
export const CleanTaskApi = {
  // 查询清洗任务分页
  getCleanTaskPage: async (params: any) => {
    return await request.get({ url: `/asset/clean-task/page`, params })
  },

  // 查询清洗任务详情
  getCleanTask: async (id: number) => {
    return await request.get({ url: `/asset/clean-task/get?id=` + id })
  },

  // 新增清洗任务
  createCleanTask: async (data: CleanTask) => {
    return await request.post({ url: `/asset/clean-task/create`, data })
  },

  // 修改清洗任务
  updateCleanTask: async (data: CleanTask) => {
    return await request.put({ url: `/asset/clean-task/update`, data })
  },

  // 删除清洗任务
  deleteCleanTask: async (id: number) => {
    return await request.delete({ url: `/asset/clean-task/delete?id=` + id })
  },

  /** 批量删除清洗任务 */
  deleteCleanTaskList: async (ids: number[]) => {
    return await request.delete({ url: `/asset/clean-task/delete-list?ids=${ids.join(',')}` })
  },

  // 导出清洗任务 Excel
  exportCleanTask: async (params) => {
    return await request.download({ url: `/asset/clean-task/export-excel`, params })
  },
}