import request from '@/config/axios'
import type { Dayjs } from 'dayjs';

/** 盘点清单历史信息 */
export interface FormHistory {
          id: number; // 主键ID
          assetId?: number; // 关联asset_form.id
          versionNo?: number; // 版本号
          snapshotData: string; // 历史快照数据(原JSON类型)
          changedBy: number; // 操作人ID
          changeReason: string; // 变更原因
  }

// 盘点清单历史 API
export const FormHistoryApi = {
  // 查询盘点清单历史分页
  getFormHistoryPage: async (params: any) => {
    return await request.get({ url: `/asset/form-history/page`, params })
  },

  // 查询盘点清单历史详情
  getFormHistory: async (id: number) => {
    return await request.get({ url: `/asset/form-history/get?id=` + id })
  },

  // 新增盘点清单历史
  createFormHistory: async (data: FormHistory) => {
    return await request.post({ url: `/asset/form-history/create`, data })
  },

  // 修改盘点清单历史
  updateFormHistory: async (data: FormHistory) => {
    return await request.put({ url: `/asset/form-history/update`, data })
  },

  // 删除盘点清单历史
  deleteFormHistory: async (id: number) => {
    return await request.delete({ url: `/asset/form-history/delete?id=` + id })
  },

  /** 批量删除盘点清单历史 */
  deleteFormHistoryList: async (ids: number[]) => {
    return await request.delete({ url: `/asset/form-history/delete-list?ids=${ids.join(',')}` })
  },

  // 导出盘点清单历史 Excel
  exportFormHistory: async (params) => {
    return await request.download({ url: `/asset/form-history/export-excel`, params })
  },
}