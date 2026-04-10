import request from '@/config/axios'
import type { Dayjs } from 'dayjs';

/** 数据字典信息 */
export interface ProductDictionary {
          id: number; // 主键ID
          productId?: number; // 产品ID
          fieldName: string; // 字段名
          displayValue: string; // 显示值
          description: string; // 含义说明
}

/** 产品字段（输入+输出）信息 */
export interface ProductField {
          id: number; // 主键ID
          productId?: number; // 产品ID
          type?: string; // 类型：input-输入字段 output-输出字段
          seqNo: number; // 序号
          paramName: string; // 参数名称
          fieldName: string; // 字段名称
          fieldDesc: string; // 字段描述
          sampleValue: string; // 示例值
          unit: string; // 单位（输出字段专用）
          dataType: string; // 数据类型（输出字段专用）
          remark: string; // 备注（输入字段专用）
}

/** 性能参数信息 */
export interface ProductPerformance {
          id: number; // 主键ID
          productId?: number; // 产品ID
          qps: number; // 每秒查询数
          avgResponseMs: number; // 平均响应毫秒
          timeoutSeconds: number; // 超时秒数
}

/** 产品价格信息 */
export interface Pricing {
          id: number; // 主键ID
          productId?: number; // 产品ID
          purchaseType: string; // 采购类型
          price: number; // 价格
          priceUnit: string; // 价格单位
          usageTimes: number; // 可用次数
          remark: string; // 备注
          versionNo?: number; // 版本号
          effectiveFrom: string | Dayjs; // 生效时间
          effectiveTo: string | Dayjs; // 失效时间
}

/** 来源描述信息 */
export interface SourceDesc {
          id: number; // 主键ID
          productId?: number; // 产品ID
          outputSeqRange: string; // 输出序号范围
          sourceType: string; // 来源类型
}

/** 使用案例信息 */
export interface UsageCase {
          id: number; // 主键ID
          productId?: number; // 产品ID
          caseTitle: string; // 案例标题
          caseContent: string; // 案例内容
}

/** 使用条件信息 */
export interface UsageCondition {
          id: number; // 主键ID
          productId?: number; // 产品ID
          usagePurpose: string; // 使用用途
          usageSubject: string; // 使用主体
          qualificationReq: string; // 资质要求
          timeLimit: string; // 时效限制
          transferLimit: string; // 流转限制
          otherLimit: string; // 其他限制
}

/** 产品主表信息 */
export interface Product {
          id: number; // 主键ID
          assetId: number; // 关联正式资产ID(data_asset.id)
          companyId?: number; // 企业ID
          productName?: string; // 产品名称
          productType: string; // 产品类型: API/文件/数据库等
          deliveryMethod: string; // 交付方式
          usageCondition: string; // 使用条件
          priceStrategy: string; // 定价策略
          status: string; // 状态: draft/pending/reviewed/rejected
          seriesName: string; // 产品系列名称
          supplierName: string; // 数据供应商名称
          appModule: string; // 应用模块分类
          sourceIndustry: string; // 数据来源行业
          dataTheme: string; // 数据主题分类
          productDesc: string; // 产品描述
          keywords: string; // 关键词
          updateFrequency: string; // 更新频率
          coverageRange: string; // 覆盖范围
          storageSize: string; // 存储大小
          storageIncrement: string; // 存储增量
          dataDimension: number; // 数据维度
            productdictionarys?: ProductDictionary[]
          productfields?: ProductField[]
          productperformances?: ProductPerformance[]
          pricings?: Pricing[]
          sourcedescs?: SourceDesc[]
          usagecases?: UsageCase[]
          usageconditions?: UsageCondition[]
}

// 产品主表 API
export const ProductApi = {
  // 查询产品主表分页
  getProductPage: async (params: any) => {
    return await request.get({ url: `/asset/product/page`, params })
  },

  // 查询产品主表详情
  getProduct: async (id: number) => {
    return await request.get({ url: `/asset/product/get?id=` + id })
  },

  // 新增产品主表
  createProduct: async (data: Product) => {
    return await request.post({ url: `/asset/product/create`, data })
  },

  // 修改产品主表
  updateProduct: async (data: Product) => {
    return await request.put({ url: `/asset/product/update`, data })
  },

  // 删除产品主表
  deleteProduct: async (id: number) => {
    return await request.delete({ url: `/asset/product/delete?id=` + id })
  },

  /** 批量删除产品主表 */
  deleteProductList: async (ids: number[]) => {
    return await request.delete({ url: `/asset/product/delete-list?ids=${ids.join(',')}` })
  },

  // 导出产品主表 Excel
  exportProduct: async (params) => {
    return await request.download({ url: `/asset/product/export-excel`, params })
  },

// ==================== 子表（数据字典） ====================

  // 获得数据字典列表
  getProductDictionaryListByProductId: async (productId) => {
    return await request.get({ url: `/asset/product/product-dictionary/list-by-product-id?productId=` + productId })
  },

// ==================== 子表（产品字段（输入+输出）） ====================

  // 获得产品字段（输入+输出）列表
  getProductFieldListByProductId: async (productId) => {
    return await request.get({ url: `/asset/product/product-field/list-by-product-id?productId=` + productId })
  },

// ==================== 子表（性能参数） ====================

  // 获得性能参数列表
  getProductPerformanceListByProductId: async (productId) => {
    return await request.get({ url: `/asset/product/product-performance/list-by-product-id?productId=` + productId })
  },

// ==================== 子表（产品价格） ====================

  // 获得产品价格列表
  getPricingListByProductId: async (productId) => {
    return await request.get({ url: `/asset/product/pricing/list-by-product-id?productId=` + productId })
  },

// ==================== 子表（来源描述） ====================

  // 获得来源描述列表
  getSourceDescListByProductId: async (productId) => {
    return await request.get({ url: `/asset/product/source-desc/list-by-product-id?productId=` + productId })
  },

// ==================== 子表（使用案例） ====================

  // 获得使用案例列表
  getUsageCaseListByProductId: async (productId) => {
    return await request.get({ url: `/asset/product/usage-case/list-by-product-id?productId=` + productId })
  },

// ==================== 子表（使用条件） ====================

  // 获得使用条件列表
  getUsageConditionListByProductId: async (productId) => {
    return await request.get({ url: `/asset/product/usage-condition/list-by-product-id?productId=` + productId })
  },
}
