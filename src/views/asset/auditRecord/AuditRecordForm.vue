<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="关联业务主表" prop="sourceType">
        <el-select v-model="formData.sourceType" placeholder="请选择关联多个业务主表">
          <el-option
            v-for="dict in getDictOptions(DICT_TYPE.SOURCE_TYPE)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="关联业务ID" prop="sourceId">
        <el-input v-model="formData.sourceId" placeholder="请输入关联业务ID" />
      </el-form-item>
      <el-form-item label="审核阶段" prop="auditStage">
        <el-input v-model="formData.auditStage" placeholder="请输入审核阶段" />
      </el-form-item>
      <el-form-item label="审核结果" prop="auditResult">
        <el-input v-model="formData.auditResult" placeholder="请输入审核结果" />
      </el-form-item>
      <el-form-item label="审核意见" prop="auditComment">
        <el-input v-model="formData.auditComment" placeholder="请输入审核意见" />
      </el-form-item>
      <el-form-item label="审核人ID" prop="auditorId">
        <el-input v-model="formData.auditorId" placeholder="请输入审核人ID" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { AuditRecordApi, AuditRecord } from '@/api/asset/auditRecord'
import { DICT_TYPE, getDictOptions } from '@/utils/dict'

/** 通用审核 表单 */
defineOptions({ name: 'AuditRecordForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  sourceType: undefined,
  sourceId: undefined,
  auditStage: undefined,
  auditResult: undefined,
  auditComment: undefined,
  auditorId: undefined,
})
const formRules = reactive({
  sourceId: [{ required: true, message: '关联业务ID不能为空', trigger: 'blur' }],
  auditStage: [{ required: true, message: '审核阶段不能为空', trigger: 'blur' }],
  auditorId: [{ required: true, message: '审核人ID不能为空', trigger: 'blur' }],
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
      formData.value = await AuditRecordApi.getAuditRecord(id)
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
    const data = formData.value as unknown as AuditRecord
    if (formType.value === 'create') {
      await AuditRecordApi.createAuditRecord(data)
      message.success(t('common.createSuccess'))
    } else {
      await AuditRecordApi.updateAuditRecord(data)
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
    sourceType: undefined,
    sourceId: undefined,
    auditStage: undefined,
    auditResult: undefined,
    auditComment: undefined,
    auditorId: undefined,
  }
  formRef.value?.resetFields()
}
</script>