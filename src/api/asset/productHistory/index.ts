import request from '@/config/axios'
import type { Dayjs } from 'dayjs';

/** 产品说明书历史信息 */
export interface ProductHistory {
          id: number; // 主键ID
          productId?: number; // 主表ID
          versionNo?: number; // 版本号
          snapshotData: string; // 产品快照数据(原JSON类型)
          changedBy: number; // 变更人ID
          changeReason: string; // 变更原因
  }

// 产品说明书历史 API
export const ProductHistoryApi = {
  // 查询产品说明书历史分页
  getProductHistoryPage: async (params: any) => {
    return await request.get({ url: `/asset/product-history/page`, params })
  },

  // 查询产品说明书历史详情
  getProductHistory: async (id: number) => {
    return await request.get({ url: `/asset/product-history/get?id=` + id })
  },

  // 新增产品说明书历史
  createProductHistory: async (data: ProductHistory) => {
    return await request.post({ url: `/asset/product-history/create`, data })
  },

  // 修改产品说明书历史
  updateProductHistory: async (data: ProductHistory) => {
    return await request.put({ url: `/asset/product-history/update`, data })
  },

  // 删除产品说明书历史
  deleteProductHistory: async (id: number) => {
    return await request.delete({ url: `/asset/product-history/delete?id=` + id })
  },

  /** 批量删除产品说明书历史 */
  deleteProductHistoryList: async (ids: number[]) => {
    return await request.delete({ url: `/asset/product-history/delete-list?ids=${ids.join(',')}` })
  },

  // 导出产品说明书历史 Excel
  exportProductHistory: async (params) => {
    return await request.download({ url: `/asset/product-history/export-excel`, params })
  },
}