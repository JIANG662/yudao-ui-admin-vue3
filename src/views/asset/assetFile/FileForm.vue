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
          <el-option
            v-for="dict in getDictOptions(DICT_TYPE.ASSET_TYPE)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="关联业务ID" prop="bizId">
        <el-input v-model="formData.bizId" placeholder="请输入关联业务ID" />
      </el-form-item>
      <el-form-item label="企业ID" prop="companyId">
        <el-input v-model="formData.companyId" placeholder="请输入企业ID" />
      </el-form-item>
      <el-form-item label="文件名" prop="fileName">
        <el-input v-model="formData.fileName" placeholder="请输入文件名" />
      </el-form-item>
      <el-form-item label="文件后缀" prop="fileExt">
        <el-input v-model="formData.fileExt" placeholder="请输入文件后缀" />
      </el-form-item>
      <el-form-item label="文件大小" prop="fileSize">
        <el-input v-model="formData.fileSize" placeholder="请输入文件大小" />
      </el-form-item>
      <el-form-item label="文件链接" prop="fileUrl">
        <el-input v-model="formData.fileUrl" placeholder="请输入文件链接" />
      </el-form-item>
      <el-form-item label="解析状态" prop="parseStatus">
        <el-radio-group v-model="formData.parseStatus">
          <el-radio
            v-for="dict in getDictOptions(DICT_TYPE.PARSE_STATUS)"
            :key="dict.value"            
            :label="dict.label"
          />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上传人ID" prop="uploadedBy">
        <el-input v-model="formData.uploadedBy" placeholder="请输入上传人ID" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { FileApi, File } from '@/api/asset/assetFile'
import { DICT_TYPE, getDictOptions } from '@/utils/dict'

/** 通用附件 表单 */
defineOptions({ name: 'FileForm' })

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
  companyId: undefined,
  fileName: undefined,
  fileExt: undefined,
  fileSize: undefined,
  fileUrl: undefined,
  parseStatus: undefined,
  uploadedBy: undefined
})
const formRules = reactive({
  bizType: [{ required: true, message: '业务类型不能为空', trigger: 'change' }],
  bizId: [{ required: true, message: '关联业务ID不能为空', trigger: 'blur' }],
  companyId: [{ required: true, message: '企业ID不能为空', trigger: 'blur' }],
  fileName: [{ required: true, message: '文件名不能为空', trigger: 'blur' }]
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
      formData.value = await FileApi.getFile(id)
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
    const data = formData.value as unknown as File
    if (formType.value === 'create') {
      await FileApi.createFile(data)
      message.success(t('common.createSuccess'))
    } else {
      await FileApi.updateFile(data)
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
    companyId: undefined,
    fileName: undefined,
    fileExt: undefined,
    fileSize: undefined,
    fileUrl: undefined,
    parseStatus: undefined,
    uploadedBy: undefined
  }
  formRef.value?.resetFields()
}
</script>
