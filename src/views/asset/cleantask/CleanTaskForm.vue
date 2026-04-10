<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="关联附件ID" prop="fileId">
        <el-input v-model="formData.fileId" placeholder="请输入关联附件ID" />
      </el-form-item>
      <el-form-item label="企业ID" prop="companyId">
        <el-input v-model="formData.companyId" placeholder="请输入企业ID" />
      </el-form-item>
      <el-form-item label="负责人ID" prop="assigneeId">
        <el-input v-model="formData.assigneeId" placeholder="请输入负责人ID" />
      </el-form-item>
      <el-form-item label="任务状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio value="1">请选择字典生成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="截止时间" prop="dueTime">
        <el-date-picker
          v-model="formData.dueTime"
          type="date"
          value-format="x"
          placeholder="选择截止时间"
        />
      </el-form-item>
      <el-form-item label="结果总结" prop="resultSummary">
        <el-input v-model="formData.resultSummary" placeholder="请输入结果总结" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { CleanTaskApi, CleanTask } from '@/api/asset/cleantask'

/** 清洗任务 表单 */
defineOptions({ name: 'CleanTaskForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  fileId: undefined,
  companyId: undefined,
  assigneeId: undefined,
  status: undefined,
  dueTime: undefined,
  resultSummary: undefined,
})
const formRules = reactive({
  fileId: [{ required: true, message: '关联附件ID不能为空', trigger: 'blur' }],
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
      formData.value = await CleanTaskApi.getCleanTask(id)
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
    const data = formData.value as unknown as CleanTask
    if (formType.value === 'create') {
      await CleanTaskApi.createCleanTask(data)
      message.success(t('common.createSuccess'))
    } else {
      await CleanTaskApi.updateCleanTask(data)
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
    fileId: undefined,
    companyId: undefined,
    assigneeId: undefined,
    status: undefined,
    dueTime: undefined,
    resultSummary: undefined,
  }
  formRef.value?.resetFields()
}
</script>