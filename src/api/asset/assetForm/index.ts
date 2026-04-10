import request from '@/config/axios'
import type { Dayjs } from 'dayjs';

/** 盘点主表信息 */
export interface Asset {
          id: number; // 盘点记录ID
          companyId?: number; // 企业ID
          sceneName?: string; // 应用场景
          sceneDesc: string; // 场景描述
          coreFields: string; // 核心字段
          dataSource: string; // 数据来源
          storageLocation: string; // 存储位置
          dataStructure: string; // 数据结构
          outputMethod: string; // 输出方式
          coverageArea: string; // 覆盖范围
          customerGroup: string; // 客户群体
          isPrivacy: boolean; // 是否涉隐私
          status: string; // 状态: draft/pending/reviewed/rejected
          productReadyFlag: boolean; // 是否已生成产品
          productCount: number; // 衍生产品数
          productVersion: string; // 产品版本
  }

// 盘点主表 API
export const AssetApi = {
  // 查询盘点主表分页
  getAssetPage: async (params: any) => {
    return await request.get({ url: `/asset/asset/page`, params })
  },

  // 查询盘点主表详情
  getAsset: async (id: number) => {
    return await request.get({ url: `/asset/asset/get?id=` + id })
  },

  // 新增盘点主表
  createAsset: async (data: Asset) => {
    return await request.post({ url: `/asset/asset/create`, data })
  },

  // 修改盘点主表
  updateAsset: async (data: Asset) => {
    return await request.put({ url: `/asset/asset/update`, data })
  },

  // 删除盘点主表
  deleteAsset: async (id: number) => {
    return await request.delete({ url: `/asset/asset/delete?id=` + id })
  },

  /** 批量删除盘点主表 */
  deleteAssetList: async (ids: number[]) => {
    return await request.delete({ url: `/asset/asset/delete-list?ids=${ids.join(',')}` })
  },

  // 导出盘点主表 Excel
  exportAsset: async (params) => {
    return await request.download({ url: `/asset/asset/export-excel`, params })
  },
}
