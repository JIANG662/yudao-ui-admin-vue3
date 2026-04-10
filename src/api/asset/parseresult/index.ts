import request from '@/config/axios'
import type { Dayjs } from 'dayjs';

/** 解析结果信息 */
export interface ParseResult {
          id: number; // 主键ID
          fileId?: number; // 关联附件ID
          parseJson: string; // 解析JSON结果
          confidence: number; // 置信度
          failReason: string; // 失败原因
          status: string; // 解析状态
  }

// 解析结果 API
export const ParseResultApi = {
  // 查询解析结果分页
  getParseResultPage: async (params: any) => {
    return await request.get({ url: `/asset/parse-result/page`, params })
  },

  // 查询解析结果详情
  getParseResult: async (id: number) => {
    return await request.get({ url: `/asset/parse-result/get?id=` + id })
  },

  // 新增解析结果
  createParseResult: async (data: ParseResult) => {
    return await request.post({ url: `/asset/parse-result/create`, data })
  },

  // 修改解析结果
  updateParseResult: async (data: ParseResult) => {
    return await request.put({ url: `/asset/parse-result/update`, data })
  },

  // 删除解析结果
  deleteParseResult: async (id: number) => {
    return await request.delete({ url: `/asset/parse-result/delete?id=` + id })
  },

  /** 批量删除解析结果 */
  deleteParseResultList: async (ids: number[]) => {
    return await request.delete({ url: `/asset/parse-result/delete-list?ids=${ids.join(',')}` })
  },

  // 导出解析结果 Excel
  exportParseResult: async (params) => {
    return await request.download({ url: `/asset/parse-result/export-excel`, params })
  },
}