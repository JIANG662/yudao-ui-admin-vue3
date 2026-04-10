<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="关联审核记录ID" prop="auditRecordId">
        <el-input v-model="formData.auditRecordId" placeholder="请输入关联审核记录ID" />
      </el-form-item>
      <el-form-item label="业务类型" prop="sourceType">
        <el-select v-model="formData.sourceType" placeholder="请选择业务类型">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="业务ID" prop="sourceId">
        <el-input v-model="formData.sourceId" placeholder="请输入业务ID" />
      </el-form-item>
      <el-form-item label="企业ID" prop="companyId">
        <el-input v-model="formData.companyId" placeholder="请输入企业ID" />
      </el-form-item>
      <el-form-item label="需要补充的字段列表" prop="supplementFields">
        <el-input v-model="formData.supplementFields" placeholder="请输入需要补充的字段列表" />
      </el-form-item>
      <el-form-item label="补充说明" prop="supplementDesc">
        <el-input v-model="formData.supplementDesc" placeholder="请输入补充说明" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio value="1">请选择字典生成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="截止时间" prop="deadline">
        <el-date-picker
          v-model="formData.deadline"
          type="date"
          value-format="x"
          placeholder="选择截止时间"
        />
      </el-form-item>
      <el-form-item label="提交时间" prop="submittedAt">
        <el-date-picker
          v-model="formData.submittedAt"
          type="date"
          value-format="x"
          placeholder="选择提交时间"
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
import { SupplementRecordApi, SupplementRecord } from '@/api/asset/supplement'

/** 补件记录 表单 */
defineOptions({ name: 'SupplementRecordForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  auditRecordId: undefined,
  sourceType: undefined,
  sourceId: undefined,
  companyId: undefined,
  supplementFields: undefined,
  supplementDesc: undefined,
  status: undefined,
  deadline: undefined,
  submittedAt: undefined,
})
const formRules = reactive({
  auditRecordId: [{ required: true, message: '关联审核记录ID不能为空', trigger: 'blur' }],
  sourceType: [{ required: true, message: '业务类型不能为空', trigger: 'change' }],
  sourceId: [{ required: true, message: '业务ID不能为空', trigger: 'blur' }],
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
      formData.value = await SupplementRecordApi.getSupplementRecord(id)
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
    const data = formData.value as unknown as SupplementRecord
    if (formType.value === 'create') {
      await SupplementRecordApi.createSupplementRecord(data)
      message.success(t('common.createSuccess'))
    } else {
      await SupplementRecordApi.updateSupplementRecord(data)
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
    auditRecordId: undefined,
    sourceType: undefined,
    sourceId: undefined,
    companyId: undefined,
    supplementFields: undefined,
    supplementDesc: undefined,
    status: undefined,
    deadline: undefined,
    submittedAt: undefined,
  }
  formRef.value?.resetFields()
}
</script>