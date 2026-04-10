<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="企业ID" prop="companyId">
        <el-input v-model="formData.companyId" placeholder="请输入企业ID" />
      </el-form-item>
      <el-form-item label="应用场景" prop="sceneName">
        <el-input v-model="formData.sceneName" placeholder="请输入应用场景" />
      </el-form-item>
      <el-form-item label="场景描述" prop="sceneDesc">
        <el-input v-model="formData.sceneDesc" placeholder="请输入场景描述" />
      </el-form-item>
      <el-form-item label="核心字段" prop="coreFields">
        <el-input v-model="formData.coreFields" placeholder="请输入核心字段" />
      </el-form-item>
      <el-form-item label="数据来源" prop="dataSource">
        <el-input v-model="formData.dataSource" placeholder="请输入数据来源" />
      </el-form-item>
      <el-form-item label="存储位置" prop="storageLocation">
        <el-input v-model="formData.storageLocation" placeholder="请输入存储位置" />
      </el-form-item>
      <el-form-item label="数据结构" prop="dataStructure">
        <el-input v-model="formData.dataStructure" placeholder="请输入数据结构" />
      </el-form-item>
      <el-form-item label="输出方式" prop="outputMethod">
        <el-input v-model="formData.outputMethod" placeholder="请输入输出方式" />
      </el-form-item>
      <el-form-item label="覆盖范围" prop="coverageArea">
        <el-input v-model="formData.coverageArea" placeholder="请输入覆盖范围" />
      </el-form-item>
      <el-form-item label="客户群体" prop="customerGroup">
        <el-input v-model="formData.customerGroup" placeholder="请输入客户群体" />
      </el-form-item>
      <el-form-item label="是否涉隐私" prop="isPrivacy">
        <el-radio-group v-model="formData.isPrivacy">
           <el-radio
            v-for="dict in getDictOptions(DICT_TYPE.IS_PRIVACY)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态: " prop="status">
        <el-radio-group v-model="formData.status">
           <el-radio
            v-for="dict in getDictOptions(DICT_TYPE.STATUS)"
            :key="dict.value"
            :label="dict.label"
           
          >{{ dict.label }} </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否已生成产品" prop="productReadyFlag" label-width="120px">
        <el-radio-group v-model="formData.productReadyFlag">
          <el-radio
            v-for="dict in getDictOptions(DICT_TYPE.PRODUCT_READY_FLAG)"
            :key="dict.value"            
            :label="dict.label"
          />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="衍生产品数" prop="productCount">
        <el-input v-model="formData.productCount" placeholder="请输入衍生产品数" />
      </el-form-item>
      <el-form-item label="产品版本" prop="productVersion">
        <el-input v-model="formData.productVersion" placeholder="请输入产品版本" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { AssetApi, Asset } from '@/api/asset/assetForm'
import { DICT_TYPE, getDictOptions } from '@/utils/dict'

/** 盘点主表 表单 */
defineOptions({ name: 'AssetForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
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
  productVersion: undefined
})
const formRules = reactive({
  companyId: [{ required: true, message: '企业ID不能为空', trigger: 'blur' }],
  sceneName: [{ required: true, message: '应用场景不能为空', trigger: 'blur' }]
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
      formData.value = await AssetApi.getAsset(id)
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
    const data = formData.value as unknown as Asset
    if (formType.value === 'create') {
      await AssetApi.createAsset(data)
      message.success(t('common.createSuccess'))
    } else {
      await AssetApi.updateAsset(data)
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
    productVersion: undefined
  }
  formRef.value?.resetFields()
}
</script>
