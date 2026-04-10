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
      <el-form-item label="解析JSON结果" prop="parseJson">
        <el-input v-model="formData.parseJson" placeholder="请输入解析JSON结果" />
      </el-form-item>
      <el-form-item label="置信度" prop="confidence">
        <el-input v-model="formData.confidence" placeholder="请输入置信度" />
      </el-form-item>
      <el-form-item label="失败原因" prop="failReason">
        <el-input v-model="formData.failReason" placeholder="请输入失败原因" />
      </el-form-item>
      <el-form-item label="解析状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio value="1">请选择字典生成</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { ParseResultApi, ParseResult } from '@/api/asset/parseresult'

/** 解析结果 表单 */
defineOptions({ name: 'ParseResultForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  fileId: undefined,
  parseJson: undefined,
  confidence: undefined,
  failReason: undefined,
  status: undefined,
})
const formRules = reactive({
  fileId: [{ required: true, message: '关联附件ID不能为空', trigger: 'blur' }],
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
      formData.value = await ParseResultApi.getParseResult(id)
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
    const data = formData.value as unknown as ParseResult
    if (formType.value === 'create') {
      await ParseResultApi.createParseResult(data)
      message.success(t('common.createSuccess'))
    } else {
      await ParseResultApi.updateParseResult(data)
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
    parseJson: undefined,
    confidence: undefined,
    failReason: undefined,
    status: undefined,
  }
  formRef.value?.resetFields()
}
</script>