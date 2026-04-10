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
      <el-form-item label="关联盘点主表ID" prop="assetId">
        <el-input
          v-model="queryParams.assetId"
          placeholder="请输入关联盘点主表ID"
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
      </el-form-item>
      <el-form-item label="归档状态" prop="archiveStatus">
        <el-select
          v-model="queryParams.archiveStatus"
          placeholder="请选择归档状态"
          clearable
          class="!w-240px"
        >
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="审核通过时间" prop="approvedTime">
        <el-date-picker
          v-model="queryParams.approvedTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"
          class="!w-220px"
        />
      </el-form-item>
      <el-form-item label="资产等级" prop="assetLevel">
        <el-input
          v-model="queryParams.assetLevel"
          placeholder="请输入资产等级"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="质量评分" prop="qualityScore">
        <el-input
          v-model="queryParams.qualityScore"
          placeholder="请输入质量评分"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="是否可交易" prop="tradeFlag">
        <el-select
          v-model="queryParams.tradeFlag"
          placeholder="请选择是否可交易"
          clearable
          class="!w-240px"
        >
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="资产编号" prop="assetCode">
        <el-input
          v-model="queryParams.assetCode"
          placeholder="请输入资产编号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="版本号" prop="versionNo">
        <el-input
          v-model="queryParams.versionNo"
          placeholder="请输入版本号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="生效日期" prop="effectiveDate">
        <el-date-picker
          v-model="queryParams.effectiveDate"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"
          class="!w-220px"
        />
      </el-form-item>
      <el-form-item label="失效日期" prop="expiryDate">
        <el-date-picker
          v-model="queryParams.expiryDate"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"
          class="!w-220px"
        />
      </el-form-item>
      <el-form-item label="归档/停用原因" prop="archiveReason">
        <el-input
          v-model="queryParams.archiveReason"
          placeholder="请输入归档/停用原因"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="归档时间" prop="archivedAt">
        <el-date-picker
          v-model="queryParams.archivedAt"
          value-format="YYYY-MM-DD"
          type="date"
          placeholder="选择归档时间"
          clearable
          class="!w-240px"
        />
      </el-form-item>
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
          v-hasPermi="['asset:data-asset:create']"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button>
        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['asset:data-asset:export']"
        >
          <Icon icon="ep:download" class="mr-5px" /> 导出
        </el-button>
        <el-button
            type="danger"
            plain
            :disabled="isEmpty(checkedIds)"
            @click="handleDeleteBatch"
            v-hasPermi="['asset:data-asset:delete']"
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
      <el-table-column label="关联盘点主表ID" align="center" prop="assetId" />
      <el-table-column label="企业ID" align="center" prop="companyId" />
      <el-table-column label="归档状态" align="center" prop="archiveStatus" />
      <el-table-column
        label="审核通过时间"
        align="center"
        prop="approvedTime"
        :formatter="dateFormatter"
        width="180px"
      />
      <el-table-column label="资产等级" align="center" prop="assetLevel" />
      <el-table-column label="质量评分" align="center" prop="qualityScore" />
      <el-table-column label="是否可交易" align="center" prop="tradeFlag" />
      <el-table-column label="资产编号" align="center" prop="assetCode" />
      <el-table-column label="版本号" align="center" prop="versionNo" />
      <el-table-column label="生效日期" align="center" prop="effectiveDate" />
      <el-table-column label="失效日期" align="center" prop="expiryDate" />
      <el-table-column label="归档/停用原因" align="center" prop="archiveReason" />
      <el-table-column
        label="归档时间"
        align="center"
        prop="archivedAt"
        :formatter="dateFormatter"
        width="180px"
      />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        :formatter="dateFormatter"
        width="180px"
      />
      <el-table-column label="操作" align="center" min-width="120px">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="openForm('update', scope.row.id)"
            v-hasPermi="['asset:data-asset:update']"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['asset:data-asset:delete']"
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
  <DataAssetForm ref="formRef" @success="getList" />
</template>

<script setup lang="ts">
import { isEmpty } from '@/utils/is'
import { dateFormatter } from '@/utils/formatTime'
import download from '@/utils/download'
import { DataAssetApi, DataAsset } from '@/api/asset/dataAsset'
import DataAssetForm from './DataAssetForm.vue'

/** 正式资产台账 列表 */
defineOptions({ name: 'DataAsset' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref<DataAsset[]>([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  assetId: undefined,
  companyId: undefined,
  archiveStatus: undefined,
  approvedTime: [],
  assetLevel: undefined,
  qualityScore: undefined,
  tradeFlag: undefined,
  assetCode: undefined,
  versionNo: undefined,
  effectiveDate: [],
  expiryDate: [],
  archiveReason: undefined,
  archivedAt: undefined,
  archivedAt: [],
  createTime: [],
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await DataAssetApi.getDataAssetPage(queryParams)
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
    await DataAssetApi.deleteDataAsset(id)
    message.success(t('common.delSuccess'))
    // 刷新列表
    await getList()
  } catch {}
}

/** 批量删除正式资产台账 */
const handleDeleteBatch = async () => {
  try {
    // 删除的二次确认
    await message.delConfirm()
    await DataAssetApi.deleteDataAssetList(checkedIds.value);
    checkedIds.value = [];
    message.success(t('common.delSuccess'))
    await getList();
  } catch {}
}

const checkedIds = ref<number[]>([])
const handleRowCheckboxChange = (records: DataAsset[]) => {
  checkedIds.value = records.map((item) => item.id!);
}

/** 导出按钮操作 */
const handleExport = async () => {
  try {
    // 导出的二次确认
    await message.exportConfirm()
    // 发起导出
    exportLoading.value = true
    const data = await DataAssetApi.exportDataAsset(queryParams)
    download.excel(data, '正式资产台账.xls')
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