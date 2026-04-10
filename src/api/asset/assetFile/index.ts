import request from '@/config/axios'
import type { Dayjs } from 'dayjs';

/** 通用附件信息 */
export interface AssetFile {
          id: number; // 主键ID
          bizType?: string; // 业务类型: asset_form, product_form, data_asset等
          bizId?: number; // 关联业务ID
          companyId?: number; // 企业ID
          fileName?: string; // 文件名
          fileExt: string; // 文件后缀
          fileSize: number; // 文件大小
          fileUrl: string; // 文件链接
          parseStatus: string; // 解析状态
          uploadedBy: number; // 上传人ID
  }

// 通用附件 API
export const FileApi = {
  // 查询通用附件分页
  getFilePage: async (params: any) => {
    return await request.get({ url: `/asset/asset-file/page`, params })
  },

  // 查询通用附件详情
  getFile: async (id: number) => {
    return await request.get({ url: `/asset/asset-file/get?id=` + id })
  },

  // 新增通用附件
  createFile: async (data: File) => {
    return await request.post({ url: `/asset/asset-file/create`, data })
  },

  // 修改通用附件
  updateFile: async (data: File) => {
    return await request.put({ url: `/asset/asset-file/update`, data })
  },

  // 删除通用附件
  deleteFile: async (id: number) => {
    return await request.delete({ url: `/asset/asset-file/delete?id=` + id })
  },

  /** 批量删除通用附件 */
  deleteFileList: async (ids: number[]) => {
    return await request.delete({ url: `/asset/asset-file/delete-list?ids=${ids.join(',')}` })
  },

  // 导出通用附件 Excel
  exportFile: async (params) => {
    return await request.download({ url: `/asset/asset-file/export-excel`, params })
  },
}
