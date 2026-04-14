<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="公司名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入公司名称" />
      </el-form-item>
      <el-form-item label="统一社会信用代码" prop="creditCode">
        <el-input v-model="formData.creditCode" placeholder="请输入统一社会信用代码" />
      </el-form-item>
      <el-form-item label="公司注册地址" prop="registeredAddress">
        <el-input v-model="formData.registeredAddress" placeholder="请输入公司注册地址" />
      </el-form-item>
      <el-form-item label="法人代表" prop="legalRepresentative">
        <el-input v-model="formData.legalRepresentative" placeholder="请输入法人代表" />
      </el-form-item>
      <el-form-item label="公司类型" prop="companyType">
        <el-select v-model="formData.companyType" placeholder="请选择公司类型">
          <el-option
            v-for="dict in getDictOptions(DICT_TYPE.COMPANY_TYPE)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="操作人姓名" prop="operatorName">
        <el-input v-model="formData.operatorName" placeholder="请输入操作人姓名" />
      </el-form-item>
      <el-form-item label="操作人手机号" prop="operatorMobile">
        <el-input v-model="formData.operatorMobile" placeholder="请输入操作人手机号" />
      </el-form-item>
      <el-form-item label="操作人邮箱" prop="operatorEmail">
        <el-input v-model="formData.operatorEmail" placeholder="请输入操作人邮箱" />
      </el-form-item>
      <el-form-item label="是否有业务系统" prop="hasBusinessSystem">
        <el-radio-group v-model="formData.hasBusinessSystem">
          <el-radio
            v-for="dict in getDictOptions(DICT_TYPE.HAS_BUSINESS_SYS)"
            :key="dict.value"
            :value="dict.value"
          >
            {{ dict.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="系统名称" prop="systemName">
        <el-input v-model="formData.systemName" placeholder="请输入系统名称" />
      </el-form-item>
      <el-form-item label="数据存储方式" prop="dataStorageType">
        <el-select v-model="formData.dataStorageType" placeholder="请选择数据存储方式">
          <el-option
            v-for="dict in getDictOptions(DICT_TYPE.DATA_STORAGE_TYPE)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="乐观锁版本号" prop="revision">
        <el-input v-model="formData.revision" placeholder="请输入乐观锁版本号" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading"
        >提交并开通账号</el-button
      >
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { SysCompanyApi, SysCompany } from '@/api/asset/sysCompany'
import { DICT_TYPE, getDictOptions } from '@/utils/dict'

/** 公司管理 表单 */
defineOptions({ name: 'SysCompanyForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  name: undefined,
  creditCode: undefined,
  registeredAddress: undefined,
  legalRepresentative: undefined,
  companyType: undefined,
  operatorName: undefined,
  operatorMobile: undefined,
  operatorEmail: undefined,
  hasBusinessSystem: undefined,
  systemName: undefined,
  dataStorageType: undefined,
  revision: undefined
})
const formRules = reactive({
  name: [{ required: true, message: '公司名称不能为空', trigger: 'blur' }],
  creditCode: [{ required: true, message: '统一社会信用代码不能为空', trigger: 'blur' }],
  registeredAddress: [{ required: true, message: '公司注册地址不能为空', trigger: 'blur' }],
  operatorName: [{ required: true, message: '操作人姓名不能为空', trigger: 'blur' }],
  operatorMobile: [{ required: true, message: '操作人手机号不能为空', trigger: 'blur' }],
  legalRepresentative: [{ required: true, message: '法人代表不能为空', trigger: 'blur' }]
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
      formData.value = await SysCompanyApi.getSysCompany(id)
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
    const data = formData.value as unknown as SysCompany
    if (formType.value === 'create') {
      await SysCompanyApi.createSysCompany(data)
      message.success(t('common.createSuccess'))
    } else {
      await SysCompanyApi.updateSysCompany(data)
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
    name: undefined,
    creditCode: undefined,
    registeredAddress: undefined,
    legalRepresentative: undefined,
    companyType: undefined,
    operatorName: undefined,
    operatorMobile: undefined,
    operatorEmail: undefined,
    hasBusinessSystem: undefined,
    systemName: undefined,
    dataStorageType: undefined,
    revision: undefined
  }
  formRef.value?.resetFields()
}
</script>
