<template>
  <ContentWrap>
    <!-- 搜索工作栏 -->
    <el-form
      class="-mb-15px"
      :model="queryParams"
      ref="queryFormRef"
      :inline="true"
      label-width="68px"
    >
      <!-- <el-form-item label="关联正式资产ID(data_asset.id)" prop="assetId">
        <el-input
          v-model="queryParams.assetId"
          placeholder="请输入关联正式资产ID(data_asset.id)"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="企业ID" prop="companyId">
        <el-input
          v-model="queryParams.companyId"
          placeholder="请输入企业ID"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item> -->
      <el-form-item label="产品名称" prop="productName">
        <el-input
          v-model="queryParams.productName"
          placeholder="请输入产品名称"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <!-- <el-form-item label="产品类型: API/文件/数据库等" prop="productType">
        <el-select
          v-model="queryParams.productType"
          placeholder="请选择产品类型: API/文件/数据库等"
          clearable
          class="!w-240px"
        >
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="交付方式" prop="deliveryMethod">
        <el-input
          v-model="queryParams.deliveryMethod"
          placeholder="请输入交付方式"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="使用条件" prop="usageCondition">
        <el-input
          v-model="queryParams.usageCondition"
          placeholder="请输入使用条件"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="定价策略" prop="priceStrategy">
        <el-input
          v-model="queryParams.priceStrategy"
          placeholder="请输入定价策略"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item> -->
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择状态"
          clearable
          class="!w-240px"
        >
          <el-option
            v-for="dict in getDictOptions(DICT_TYPE.STATUS)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="产品系列名称" prop="seriesName">
        <el-input
          v-model="queryParams.seriesName"
          placeholder="请输入产品系列名称"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item> -->
      <el-form-item label="数据供应商名称" prop="supplierName" label-width="140px">
        <el-input
          v-model="queryParams.supplierName"
          placeholder="请输入数据供应商名称"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <!-- <el-form-item label="应用模块分类" prop="appModule">
        <el-input
          v-model="queryParams.appModule"
          placeholder="请输入应用模块分类"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="数据来源行业" prop="sourceIndustry">
        <el-input
          v-model="queryParams.sourceIndustry"
          placeholder="请输入数据来源行业"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="数据主题分类" prop="dataTheme">
        <el-input
          v-model="queryParams.dataTheme"
          placeholder="请输入数据主题分类"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="产品描述" prop="productDesc">
        <el-input
          v-model="queryParams.productDesc"
          placeholder="请输入产品描述"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="关键词" prop="keywords">
        <el-input
          v-model="queryParams.keywords"
          placeholder="请输入关键词"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="更新频率" prop="updateFrequency">
        <el-input
          v-model="queryParams.updateFrequency"
          placeholder="请输入更新频率"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="覆盖范围" prop="coverageRange">
        <el-input
          v-model="queryParams.coverageRange"
          placeholder="请输入覆盖范围"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="存储大小" prop="storageSize">
        <el-input
          v-model="queryParams.storageSize"
          placeholder="请输入存储大小"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="存储增量" prop="storageIncrement">
        <el-input
          v-model="queryParams.storageIncrement"
          placeholder="请输入存储增量"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="数据维度" prop="dataDimension">
        <el-input
          v-model="queryParams.dataDimension"
          placeholder="请输入数据维度"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item> -->
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker
          v-model="queryParams.createTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"
          class="!w-220px"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleQuery"><Icon icon="ep:search" class="mr-5px" /> 搜索</el-button>
        <el-button @click="resetQuery"><Icon icon="ep:refresh" class="mr-5px" /> 重置</el-button>
        <el-button
          type="primary"
          plain
          @click="openForm('create')"
          v-hasPermi="['asset:product:create']"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button>
        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['asset:product:export']"
        >
          <Icon icon="ep:download" class="mr-5px" /> 导出
        </el-button>
        <el-button
            type="danger"
            plain
            :disabled="isEmpty(checkedIds)"
            @click="handleDeleteBatch"
            v-hasPermi="['asset:product:delete']"
        >
          <Icon icon="ep:delete" class="mr-5px" /> 批量删除
        </el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table
        row-key="id"
        v-loading="loading"
        :data="list"
        :stripe="true"
        :show-overflow-tooltip="true"
        @selection-change="handleRowCheckboxChange"
    >
    <el-table-column type="selection" width="55" />
      <el-table-column label="主键ID" align="center" prop="id" />
      <el-table-column label="关联正式资产ID" align="center" prop="assetId" width="140px"/>
      <el-table-column label="企业ID" align="center" prop="companyId" />
      <el-table-column label="产品名称" align="center" prop="productName" />
      <el-table-column label="产品类型" align="center" prop="productType" />
      <el-table-column label="交付方式" align="center" prop="deliveryMethod" />
      <el-table-column label="使用条件" align="center" prop="usageCondition" />
      <el-table-column label="定价策略" align="center" prop="priceStrategy" />
      <el-table-column label="状态" align="center" prop="status" />
      <el-table-column label="产品系列名称" align="center" prop="seriesName" width="140px" />
      <el-table-column label="数据供应商名称" align="center" prop="supplierName" width="140px"/>
      <el-table-column label="应用模块分类" align="center" prop="appModule" width="140px"/>
      <el-table-column label="数据来源行业" align="center" prop="sourceIndustry" width="140px"/>
      <el-table-column label="数据主题分类" align="center" prop="dataTheme" width="140px"/>
      <el-table-column label="产品描述" align="center" prop="productDesc" />
      <el-table-column label="关键词" align="center" prop="keywords" />
      <el-table-column label="更新频率" align="center" prop="updateFrequency" />
      <el-table-column label="覆盖范围" align="center" prop="coverageRange" />
      <el-table-column label="存储大小" align="center" prop="storageSize" />
      <el-table-column label="存储增量" align="center" prop="storageIncrement" />
      <el-table-column label="数据维度" align="center" prop="dataDimension" />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        :formatter="dateFormatter"
        width="180px"
      />
      <el-table-column label="操作" align="center" min-width="120px" fixed="right">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="openForm('update', scope.row.id)"
            v-hasPermi="['asset:product:update']"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['asset:product:delete']"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination
      :total="total"
      v-model:page="queryParams.pageNo"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
  </ContentWrap>

  <!-- 表单弹窗：添加/修改 -->
  <ProductForm ref="formRef" @success="getList" />
</template>

<script setup lang="ts">
import { isEmpty } from '@/utils/is'
import { dateFormatter } from '@/utils/formatTime'
import download from '@/utils/download'
import { ProductApi, Product } from '@/api/asset/productForm'
import ProductForm from './ProductForm.vue'
import { DICT_TYPE, getDictOptions } from '@/utils/dict'

/** 产品主表 列表 */
defineOptions({ name: 'Product' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref<Product[]>([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  assetId: undefined,
  companyId: undefined,
  productName: undefined,
  productType: undefined,
  deliveryMethod: undefined,
  usageCondition: undefined,
  priceStrategy: undefined,
  status: undefined,
  seriesName: undefined,
  supplierName: undefined,
  appModule: undefined,
  sourceIndustry: undefined,
  dataTheme: undefined,
  productDesc: undefined,
  keywords: undefined,
  updateFrequency: undefined,
  coverageRange: undefined,
  storageSize: undefined,
  storageIncrement: undefined,
  dataDimension: undefined,
  createTime: [],
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await ProductApi.getProductPage(queryParams)
    list.value = data.list
    total.value = data.total
  } finally {
    loading.value = false
  }
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.pageNo = 1
  getList()
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value.resetFields()
  handleQuery()
}

/** 添加/修改操作 */
const formRef = ref()
const openForm = (type: string, id?: number) => {
  formRef.value.open(type, id)
}

/** 删除按钮操作 */
const handleDelete = async (id: number) => {
  try {
    // 删除的二次确认
    await message.delConfirm()
    // 发起删除
    await ProductApi.deleteProduct(id)
    message.success(t('common.delSuccess'))
    // 刷新列表
    await getList()
  } catch {}
}

/** 批量删除产品主表 */
const handleDeleteBatch = async () => {
  try {
    // 删除的二次确认
    await message.delConfirm()
    await ProductApi.deleteProductList(checkedIds.value);
    checkedIds.value = [];
    message.success(t('common.delSuccess'))
    await getList();
  } catch {}
}

const checkedIds = ref<number[]>([])
const handleRowCheckboxChange = (records: Product[]) => {
  checkedIds.value = records.map((item) => item.id!);
}

/** 导出按钮操作 */
const handleExport = async () => {
  try {
    // 导出的二次确认
    await message.exportConfirm()
    // 发起导出
    exportLoading.value = true
    const data = await ProductApi.exportProduct(queryParams)
    download.excel(data, '产品主表.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
}

/** 初始化 **/
onMounted(() => {
  getList()
})
</script>