import request from '@/config/axios'
import type { Dayjs } from 'dayjs';

/** 正式资产台账信息 */
export interface DataAsset {
          id: number; // 主键ID
          assetId?: number; // 关联盘点主表ID
          companyId?: number; // 企业ID
          archiveStatus: string; // 归档状态
          approvedTime: string | Dayjs; // 审核通过时间
          assetLevel: string; // 资产等级
          qualityScore: number; // 质量评分
          tradeFlag: boolean; // 是否可交易
          assetCode: string; // 资产编号
          versionNo: number; // 版本号
          effectiveDate: string | Dayjs; // 生效日期
          expiryDate: string | Dayjs; // 失效日期
          archiveReason: string; // 归档/停用原因
          archivedAt: string | Dayjs; // 归档时间
  }

// 正式资产台账 API
export const DataAssetApi = {
  // 查询正式资产台账分页
  getDataAssetPage: async (params: any) => {
    return await request.get({ url: `/asset/data-asset/page`, params })
  },

  // 查询正式资产台账详情
  getDataAsset: async (id: number) => {
    return await request.get({ url: `/asset/data-asset/get?id=` + id })
  },

  // 新增正式资产台账
  createDataAsset: async (data: DataAsset) => {
    return await request.post({ url: `/asset/data-asset/create`, data })
  },

  // 修改正式资产台账
  updateDataAsset: async (data: DataAsset) => {
    return await request.put({ url: `/asset/data-asset/update`, data })
  },

  // 删除正式资产台账
  deleteDataAsset: async (id: number) => {
    return await request.delete({ url: `/asset/data-asset/delete?id=` + id })
  },

  /** 批量删除正式资产台账 */
  deleteDataAssetList: async (ids: number[]) => {
    return await request.delete({ url: `/asset/data-asset/delete-list?ids=${ids.join(',')}` })
  },

  // 导出正式资产台账 Excel
  exportDataAsset: async (params) => {
    return await request.download({ url: `/asset/data-asset/export-excel`, params })
  },
}