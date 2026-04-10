<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="关联盘点主表ID" prop="assetId">
        <el-input v-model="formData.assetId" placeholder="请输入关联盘点主表ID" />
      </el-form-item>
      <el-form-item label="企业ID" prop="companyId">
        <el-input v-model="formData.companyId" placeholder="请输入企业ID" />
      </el-form-item>
      <el-form-item label="归档状态" prop="archiveStatus">
        <el-radio-group v-model="formData.archiveStatus">
          <el-radio value="1">请选择字典生成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="审核通过时间" prop="approvedTime">
        <el-date-picker
          v-model="formData.approvedTime"
          type="date"
          value-format="x"
          placeholder="选择审核通过时间"
        />
      </el-form-item>
      <el-form-item label="资产等级" prop="assetLevel">
        <el-input v-model="formData.assetLevel" placeholder="请输入资产等级" />
      </el-form-item>
      <el-form-item label="质量评分" prop="qualityScore">
        <el-input v-model="formData.qualityScore" placeholder="请输入质量评分" />
      </el-form-item>
      <el-form-item label="是否可交易" prop="tradeFlag">
        <el-radio-group v-model="formData.tradeFlag">
          <el-radio value="1">请选择字典生成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="资产编号" prop="assetCode">
        <el-input v-model="formData.assetCode" placeholder="请输入资产编号" />
      </el-form-item>
      <el-form-item label="版本号" prop="versionNo">
        <el-input v-model="formData.versionNo" placeholder="请输入版本号" />
      </el-form-item>
      <el-form-item label="生效日期" prop="effectiveDate">
        <el-date-picker
          v-model="formData.effectiveDate"
          type="date"
          value-format="x"
          placeholder="选择生效日期"
        />
      </el-form-item>
      <el-form-item label="失效日期" prop="expiryDate">
        <el-date-picker
          v-model="formData.expiryDate"
          type="date"
          value-format="x"
          placeholder="选择失效日期"
        />
      </el-form-item>
      <el-form-item label="归档/停用原因" prop="archiveReason">
        <el-input v-model="formData.archiveReason" placeholder="请输入归档/停用原因" />
      </el-form-item>
      <el-form-item label="归档时间" prop="archivedAt">
        <el-date-picker
          v-model="formData.archivedAt"
          type="date"
          value-format="x"
          placeholder="选择归档时间"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { DataAssetApi, DataAsset } from '@/api/asset/dataAsset'

/** 正式资产台账 表单 */
defineOptions({ name: 'DataAssetForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  assetId: undefined,
  companyId: undefined,
  archiveStatus: undefined,
  approvedTime: undefined,
  assetLevel: undefined,
  qualityScore: undefined,
  tradeFlag: undefined,
  assetCode: undefined,
  versionNo: undefined,
  effectiveDate: undefined,
  expiryDate: undefined,
  archiveReason: undefined,
  archivedAt: undefined,
})
const formRules = reactive({
  assetId: [{ required: true, message: '关联盘点主表ID不能为空', trigger: 'blur' }],
  companyId: [{ required: true, message: '企业ID不能为空', trigger: 'blur' }],
})
const formRef = ref() // 表单 Ref

/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await DataAssetApi.getDataAsset(id)
    } finally {
      formLoading.value = false
    }
  }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  // 校验表单
  await formRef.value.validate()
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as DataAsset
    if (formType.value === 'create') {
      await DataAssetApi.createDataAsset(data)
      message.success(t('common.createSuccess'))
    } else {
      await DataAssetApi.updateDataAsset(data)
      message.success(t('common.updateSuccess'))
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    id: undefined,
    assetId: undefined,
    companyId: undefined,
    archiveStatus: undefined,
    approvedTime: undefined,
    assetLevel: undefined,
    qualityScore: undefined,
    tradeFlag: undefined,
    assetCode: undefined,
    versionNo: undefined,
    effectiveDate: undefined,
    expiryDate: undefined,
    archiveReason: undefined,
    archivedAt: undefined,
  }
  formRef.value?.resetFields()
}
</script>