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
      <el-form-item label="企业ID" prop="companyId">
        <el-input
          v-model="queryParams.companyId"
          placeholder="请输入企业ID"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <!-- <el-form-item label="应用场景" prop="sceneName">
        <el-input
          v-model="queryParams.sceneName"
          placeholder="请输入应用场景"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="场景描述" prop="sceneDesc">
        <el-input
          v-model="queryParams.sceneDesc"
          placeholder="请输入场景描述"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="核心字段" prop="coreFields">
        <el-input
          v-model="queryParams.coreFields"
          placeholder="请输入核心字段"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="数据来源" prop="dataSource">
        <el-input
          v-model="queryParams.dataSource"
          placeholder="请输入数据来源"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="存储位置" prop="storageLocation">
        <el-input
          v-model="queryParams.storageLocation"
          placeholder="请输入存储位置"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="数据结构" prop="dataStructure">
        <el-input
          v-model="queryParams.dataStructure"
          placeholder="请输入数据结构"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="输出方式" prop="outputMethod">
        <el-input
          v-model="queryParams.outputMethod"
          placeholder="请输入输出方式"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="覆盖范围" prop="coverageArea">
        <el-input
          v-model="queryParams.coverageArea"
          placeholder="请输入覆盖范围"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="客户群体" prop="customerGroup">
        <el-input
          v-model="queryParams.customerGroup"
          placeholder="请输入客户群体"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="是否涉隐私" prop="isPrivacy">
        <el-select
          v-model="queryParams.isPrivacy"
          placeholder="请选择是否涉隐私"
          clearable
          class="!w-240px"
        >
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态: " prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择状态: "
          clearable
          class="!w-240px"
        >
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item> -->
      <el-form-item label="是否已生成产品" prop="productReadyFlag" label-width="120px">
        <el-select
          v-model="queryParams.productReadyFlag"
          placeholder="请选择是否已生成产品"
          clearable
          class="!w-240px"
        >
          
          <el-option
            v-for="dict in getDictOptions(DICT_TYPE.PRODUCT_READY_FLAG)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="衍生产品数" prop="productCount">
        <el-input
          v-model="queryParams.productCount"
          placeholder="请输入衍生产品数"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="产品版本" prop="productVersion">
        <el-input
          v-model="queryParams.productVersion"
          placeholder="请输入产品版本"
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
          v-hasPermi="['asset:asset:create']"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button>
        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['asset:asset:export']"
        >
          <Icon icon="ep:download" class="mr-5px" /> 导出
        </el-button>
        <el-button
          type="danger"
          plain
          :disabled="isEmpty(checkedIds)"
          @click="handleDeleteBatch"
          v-hasPermi="['asset:asset:delete']"
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
      <el-table-column label="盘点记录ID" align="center" prop="id" width="100px" />
      <el-table-column label="企业ID" align="center" prop="companyId" />
      <el-table-column label="应用场景" align="center" prop="sceneName" />
      <el-table-column label="场景描述" align="center" prop="sceneDesc" />
      <el-table-column label="核心字段" align="center" prop="coreFields" />
      <el-table-column label="数据来源" align="center" prop="dataSource" />
      <el-table-column label="存储位置" align="center" prop="storageLocation" />
      <el-table-column label="数据结构" align="center" prop="dataStructure" />
      <el-table-column label="输出方式" align="center" prop="outputMethod" />
      <el-table-column label="覆盖范围" align="center" prop="coverageArea" />
      <el-table-column label="客户群体" align="center" prop="customerGroup" />
      <el-table-column label="是否涉隐私" align="center" prop="isPrivacy" width="100px" />
      <el-table-column label="状态" align="center" prop="status" />
      <el-table-column
        label="是否已生成产品"
        align="center"
        prop="productReadyFlag"
        width="140px"
      />
      <el-table-column label="衍生产品数" align="center" prop="productCount" width="100px" />
      <el-table-column label="产品版本" align="center" prop="productVersion" />
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
            v-hasPermi="['asset:asset:update']"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['asset:asset:delete']"
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
  <AssetForm ref="formRef" @success="getList" />
</template>

<script setup lang="ts">
import { isEmpty } from '@/utils/is'
import { dateFormatter } from '@/utils/formatTime'
import download from '@/utils/download'
import { AssetApi, Asset } from '@/api/asset/assetForm'
import AssetForm from './AssetForm.vue'
import { getDictOptions, DICT_TYPE } from '@/utils/dict'

/** 盘点主表 列表 */
defineOptions({ name: 'Asset' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref<Asset[]>([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  companyId: undefined,
  sceneName: undefined,
  sceneDesc: undefined,
  coreFields: undefined,
  dataSource: undefined,
  storageLocation: undefined,
  dataStructure: undefined,
  outputMethod: undefined,
  coverageArea: undefined,
  customerGroup: undefined,
  isPrivacy: undefined,
  status: undefined,
  productReadyFlag: undefined,
  productCount: undefined,
  productVersion: undefined,
  createTime: []
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await AssetApi.getAssetPage(queryParams)
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
    await AssetApi.deleteAsset(id)
    message.success(t('common.delSuccess'))
    // 刷新列表
    await getList()
  } catch {}
}

/** 批量删除盘点主表 */
const handleDeleteBatch = async () => {
  try {
    // 删除的二次确认
    await message.delConfirm()
    await AssetApi.deleteAssetList(checkedIds.value)
    checkedIds.value = []
    message.success(t('common.delSuccess'))
    await getList()
  } catch {}
}

const checkedIds = ref<number[]>([])
const handleRowCheckboxChange = (records: Asset[]) => {
  checkedIds.value = records.map((item) => item.id!)
}

/** 导出按钮操作 */
const handleExport = async () => {
  try {
    // 导出的二次确认
    await message.exportConfirm()
    // 发起导出
    exportLoading.value = true
    const data = await AssetApi.exportAsset(queryParams)
    download.excel(data, '盘点主表.xls')
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
