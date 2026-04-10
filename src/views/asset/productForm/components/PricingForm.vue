<template>
  <el-form
    ref="formRef"
    :model="formData"
    :rules="formRules"
    v-loading="formLoading"
    label-width="0px"
    :inline-message="true"
  >
    <el-table :data="formData" class="-mt-10px">
      <el-table-column label="序号" type="index" width="100" />
       <el-table-column label="采购类型" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.purchaseType`" :rules="formRules.purchaseType" class="mb-0px!">
            <el-select v-model="row.purchaseType" placeholder="请选择采购类型">
                <el-option label="请选择字典生成" value="" />
            </el-select>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="价格" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.price`" :rules="formRules.price" class="mb-0px!">
            <el-input v-model="row.price" placeholder="请输入价格" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="价格单位" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.priceUnit`" :rules="formRules.priceUnit" class="mb-0px!">
            <el-input v-model="row.priceUnit" placeholder="请输入价格单位" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="可用次数" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.usageTimes`" :rules="formRules.usageTimes" class="mb-0px!">
            <el-input v-model="row.usageTimes" placeholder="请输入可用次数" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="备注" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.remark`" :rules="formRules.remark" class="mb-0px!">
            <el-input v-model="row.remark" placeholder="请输入备注" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="版本号" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.versionNo`" :rules="formRules.versionNo" class="mb-0px!">
            <el-input v-model="row.versionNo" placeholder="请输入版本号" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="生效时间" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.effectiveFrom`" :rules="formRules.effectiveFrom" class="mb-0px!">
            <el-date-picker
              v-model="row.effectiveFrom"
              type="date"
              value-format="x"
              placeholder="选择生效时间"
            />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="失效时间" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.effectiveTo`" :rules="formRules.effectiveTo" class="mb-0px!">
            <el-date-picker
              v-model="row.effectiveTo"
              type="date"
              value-format="x"
              placeholder="选择失效时间"
            />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="60">
        <template #default="{ $index }">
          <el-button @click="handleDelete($index)" link>—</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-form>
  <el-row justify="center" class="mt-3">
    <el-button @click="handleAdd" round>+ 添加产品价格</el-button>
  </el-row>
</template>
<script setup lang="ts">
import { ProductApi } from '@/api/asset/productForm'

const props = defineProps<{
  productId: number // 产品ID（主表的关联字段）
}>()
const formLoading = ref(false) // 表单的加载中
const formData = ref<any[]>([])
const formRules = reactive({
  productId: [{ required: true, message: '产品ID不能为空', trigger: 'blur' }],
  versionNo: [{ required: true, message: '版本号不能为空', trigger: 'blur' }],
})
const formRef = ref() // 表单 Ref

/** 监听主表的关联字段的变化，加载对应的子表数据 */
watch(
  () => props.productId,
  async (val) => {
    // 1. 重置表单
    formData.value = []
    // 2. val 非空，则加载数据
    if (!val) {
      return;
    }
    try {
      formLoading.value = true
      formData.value = await ProductApi.getPricingListByProductId(val)
    } finally {
      formLoading.value = false
    }
  },
  { immediate: true }
)

/** 新增按钮操作 */
const handleAdd = () => {
  const row = {
    id: undefined,
    productId: undefined,
    purchaseType: undefined,
    price: undefined,
    priceUnit: undefined,
    usageTimes: undefined,
    remark: undefined,
    versionNo: undefined,
    effectiveFrom: undefined,
    effectiveTo: undefined,
  }
  row.productId = props.productId as any
  formData.value.push(row)
}

/** 删除按钮操作 */
const handleDelete = (index) => {
  formData.value.splice(index, 1)
}

/** 表单校验 */
const validate = () => {
  return formRef.value.validate()
}

/** 表单值 */
const getData = () => {
  return formData.value
}

defineExpose({ validate, getData })
</script>