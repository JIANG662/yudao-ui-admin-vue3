<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible" width="1500px">
    <div class="flex-container">
      <!-- 左侧：父表单 -->
     <div class="left-box">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="关联正式资产ID" prop="assetId">
        <el-input v-model="formData.assetId" placeholder="请输入关联正式资产ID" />
      </el-form-item>
      <el-form-item label="企业ID" prop="companyId">
        <el-input v-model="formData.companyId" placeholder="请输入企业ID" />
      </el-form-item>
      <el-form-item label="产品名称" prop="productName">
        <el-input v-model="formData.productName" placeholder="请输入产品名称" />
      </el-form-item>
      <el-form-item label="产品类型" prop="productType">
        <el-select v-model="formData.productType" placeholder="请选择产品类型">
          <el-option
            v-for="dict in getDictOptions(DICT_TYPE.PRODUCT_TYPE)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="交付方式" prop="deliveryMethod">
        <el-input v-model="formData.deliveryMethod" placeholder="请输入交付方式" />
      </el-form-item>
      <el-form-item label="使用条件" prop="usageCondition">
        <el-input v-model="formData.usageCondition" placeholder="请输入使用条件" />
      </el-form-item>
      <el-form-item label="定价策略" prop="priceStrategy">
        <el-input v-model="formData.priceStrategy" placeholder="请输入定价策略" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio
            v-for="dict in getDictOptions(DICT_TYPE.STATUS)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="产品系列名称" prop="seriesName">
        <el-input v-model="formData.seriesName" placeholder="请输入产品系列名称" />
      </el-form-item>
      <el-form-item label="数据供应商名称" prop="supplierName">
        <el-input v-model="formData.supplierName" placeholder="请输入数据供应商名称" />
      </el-form-item>
      <el-form-item label="应用模块分类" prop="appModule">
        <el-input v-model="formData.appModule" placeholder="请输入应用模块分类" />
      </el-form-item>
      <el-form-item label="数据来源行业" prop="sourceIndustry">
        <el-input v-model="formData.sourceIndustry" placeholder="请输入数据来源行业" />
      </el-form-item>
      <el-form-item label="数据主题分类" prop="dataTheme">
        <el-input v-model="formData.dataTheme" placeholder="请输入数据主题分类" />
      </el-form-item>
      <el-form-item label="产品描述" prop="productDesc">
        <el-input v-model="formData.productDesc" placeholder="请输入产品描述" />
      </el-form-item>
      <el-form-item label="关键词" prop="keywords">
        <el-input v-model="formData.keywords" placeholder="请输入关键词" />
      </el-form-item>
      <el-form-item label="更新频率" prop="updateFrequency">
        <el-input v-model="formData.updateFrequency" placeholder="请输入更新频率" />
      </el-form-item>
      <el-form-item label="覆盖范围" prop="coverageRange">
        <el-input v-model="formData.coverageRange" placeholder="请输入覆盖范围" />
      </el-form-item>
      <el-form-item label="存储大小" prop="storageSize">
        <el-input v-model="formData.storageSize" placeholder="请输入存储大小" />
      </el-form-item>
      <el-form-item label="存储增量" prop="storageIncrement">
        <el-input v-model="formData.storageIncrement" placeholder="请输入存储增量" />
      </el-form-item>
      <el-form-item label="数据维度" prop="dataDimension">
        <el-input v-model="formData.dataDimension" placeholder="请输入数据维度" />
      </el-form-item>
    </el-form>
    </div>
    <!-- 子表的表单 -->
       <div class="right-box">
    <el-tabs v-model="subTabsName">
      <el-tab-pane label="数据字典" name="productDictionary">
        <ProductDictionaryForm ref="productDictionaryFormRef" :product-id="formData.id" />
      </el-tab-pane>
      <el-tab-pane label="产品字段（输入+输出）" name="productField">
        <ProductFieldForm ref="productFieldFormRef" :product-id="formData.id" />
      </el-tab-pane>
      <el-tab-pane label="性能参数" name="productPerformance">
        <ProductPerformanceForm ref="productPerformanceFormRef" :product-id="formData.id" />
      </el-tab-pane>
      <el-tab-pane label="产品价格" name="pricing">
        <PricingForm ref="pricingFormRef" :product-id="formData.id" />
      </el-tab-pane>
      <el-tab-pane label="来源描述" name="sourceDesc">
        <SourceDescForm ref="sourceDescFormRef" :product-id="formData.id" />
      </el-tab-pane>
      <el-tab-pane label="使用案例" name="usageCase">
        <UsageCaseForm ref="usageCaseFormRef" :product-id="formData.id" />
      </el-tab-pane>
      <el-tab-pane label="使用条件" name="usageCondition">
        <UsageConditionForm ref="usageConditionFormRef" :product-id="formData.id" />
      </el-tab-pane>
    </el-tabs>
    </div>
  </div>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { ProductApi, Product } from '@/api/asset/productForm'
import ProductDictionaryForm from './components/ProductDictionaryForm.vue'
import ProductFieldForm from './components/ProductFieldForm.vue'
import ProductPerformanceForm from './components/ProductPerformanceForm.vue'
import PricingForm from './components/PricingForm.vue'
import SourceDescForm from './components/SourceDescForm.vue'
import UsageCaseForm from './components/UsageCaseForm.vue'
import UsageConditionForm from './components/UsageConditionForm.vue'
import { DICT_TYPE, getDictOptions } from '@/utils/dict'

/** 产品主表 表单 */
defineOptions({ name: 'ProductForm' })

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
  productName: undefined,
  productType: undefined,
  deliveryMethod: undefined,
  usageCondition: undefined,
  priceStrategy: undefined,
  status: undefined,
  seriesName: undefined,
  supplierName: undefined,
  appModule: undefined,
  sourceIndustry: undefined,
  dataTheme: undefined,
  productDesc: undefined,
  keywords: undefined,
  updateFrequency: undefined,
  coverageRange: undefined,
  storageSize: undefined,
  storageIncrement: undefined,
  dataDimension: undefined,
})
const formRules = reactive({
  companyId: [{ required: true, message: '企业ID不能为空', trigger: 'blur' }],
  productName: [{ required: true, message: '产品名称不能为空', trigger: 'blur' }],
})
const formRef = ref() // 表单 Ref

/** 子表的表单 */
const subTabsName = ref('productDictionary')
const productDictionaryFormRef = ref()
const productFieldFormRef = ref()
const productPerformanceFormRef = ref()
const pricingFormRef = ref()
const sourceDescFormRef = ref()
const usageCaseFormRef = ref()
const usageConditionFormRef = ref()

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
      formData.value = await ProductApi.getProduct(id)
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
  // 校验子表单
  try {
    await productDictionaryFormRef.value.validate()
  } catch (e) {
    subTabsName.value = 'productDictionary'
    return
  }
  try {
    await productFieldFormRef.value.validate()
  } catch (e) {
    subTabsName.value = 'productField'
    return
  }
  try {
    await productPerformanceFormRef.value.validate()
  } catch (e) {
    subTabsName.value = 'productPerformance'
    return
  }
  try {
    await pricingFormRef.value.validate()
  } catch (e) {
    subTabsName.value = 'pricing'
    return
  }
  try {
    await sourceDescFormRef.value.validate()
  } catch (e) {
    subTabsName.value = 'sourceDesc'
    return
  }
  try {
    await usageCaseFormRef.value.validate()
  } catch (e) {
    subTabsName.value = 'usageCase'
    return
  }
  try {
    await usageConditionFormRef.value.validate()
  } catch (e) {
    subTabsName.value = 'usageCondition'
    return
  }
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as Product
    // 拼接子表的数据
    data.productDictionarys = productDictionaryFormRef.value.getData()
    data.productFields = productFieldFormRef.value.getData()
    data.productPerformances = productPerformanceFormRef.value.getData()
    data.pricings = pricingFormRef.value.getData()
    data.sourceDescs = sourceDescFormRef.value.getData()
    data.usageCases = usageCaseFormRef.value.getData()
    data.usageConditions = usageConditionFormRef.value.getData()
    if (formType.value === 'create') {
      await ProductApi.createProduct(data)
      message.success(t('common.createSuccess'))
    } else {
      await ProductApi.updateProduct(data)
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
    productName: undefined,
    productType: undefined,
    deliveryMethod: undefined,
    usageCondition: undefined,
    priceStrategy: undefined,
    status: undefined,
    seriesName: undefined,
    supplierName: undefined,
    appModule: undefined,
    sourceIndustry: undefined,
    dataTheme: undefined,
    productDesc: undefined,
    keywords: undefined,
    updateFrequency: undefined,
    coverageRange: undefined,
    storageSize: undefined,
    storageIncrement: undefined,
    dataDimension: undefined,
  }
  formRef.value?.resetFields()
}
</script>
<style scoped>
/* 最外层：左右布局 + 等高 + 不凸出 */
.flex-container {
  display: flex;
  gap: 20px;
  align-items: stretch; /* 🔥 关键：左右自动等高 */
  max-height: 75vh;     /* 🔥 关键：小窗口不会无限高 */
}

/* 左侧 */
.left-box {
  flex: 1;
  min-width: 450px;
  overflow-y: auto; /* 内容多 → 内部滚动 */
}

/* 右侧：和左侧等高，不凸出 */
.right-box {
  flex: 1;
  min-width: 800px;
  display: flex;
  flex-direction: column;
}

/* 标签页高度 100% */
.full-height {
  flex: 1;
}
</style>