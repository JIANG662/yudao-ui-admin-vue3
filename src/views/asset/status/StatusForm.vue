<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="业务类型" prop="bizType">
        <el-select v-model="formData.bizType" placeholder="请选择业务类型">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="业务ID" prop="bizId">
        <el-input v-model="formData.bizId" placeholder="请输入业务ID" />
      </el-form-item>
      <el-form-item label="原状态" prop="fromStatus">
        <el-radio-group v-model="formData.fromStatus">
          <el-radio value="1">请选择字典生成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="目标状态" prop="toStatus">
        <el-radio-group v-model="formData.toStatus">
          <el-radio value="1">请选择字典生成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="操作人ID" prop="changedBy">
        <el-input v-model="formData.changedBy" placeholder="请输入操作人ID" />
      </el-form-item>
      <el-form-item label="变更原因" prop="changeReason">
        <el-input v-model="formData.changeReason" placeholder="请输入变更原因" />
      </el-form-item>
      <el-form-item label="变更时间" prop="changedAt">
        <el-date-picker
          v-model="formData.changedAt"
          type="date"
          value-format="x"
          placeholder="选择变更时间"
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
import { StatusApi, Status } from '@/api/asset/status'

/** 状态流 表单 */
defineOptions({ name: 'StatusForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  bizType: undefined,
  bizId: undefined,
  fromStatus: undefined,
  toStatus: undefined,
  changedBy: undefined,
  changeReason: undefined,
  changedAt: undefined,
})
const formRules = reactive({
  bizType: [{ required: true, message: '业务类型不能为空', trigger: 'change' }],
  bizId: [{ required: true, message: '业务ID不能为空', trigger: 'blur' }],
  toStatus: [{ required: true, message: '目标状态不能为空', trigger: 'blur' }],
  changedBy: [{ required: true, message: '操作人ID不能为空', trigger: 'blur' }],
  changedAt: [{ required: true, message: '变更时间不能为空', trigger: 'blur' }],
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
      formData.value = await StatusApi.getStatus(id)
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
    const data = formData.value as unknown as Status
    if (formType.value === 'create') {
      await StatusApi.createStatus(data)
      message.success(t('common.createSuccess'))
    } else {
      await StatusApi.updateStatus(data)
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
    bizType: undefined,
    bizId: undefined,
    fromStatus: undefined,
    toStatus: undefined,
    changedBy: undefined,
    changeReason: undefined,
    changedAt: undefined,
  }
  formRef.value?.resetFields()
}
</script>