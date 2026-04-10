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
       <el-table-column label="字段名" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.fieldName`" :rules="formRules.fieldName" class="mb-0px!">
            <el-input v-model="row.fieldName" placeholder="请输入字段名" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="显示值" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.displayValue`" :rules="formRules.displayValue" class="mb-0px!">
            <el-input v-model="row.displayValue" placeholder="请输入显示值" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="含义说明" min-width="400">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.description`" :rules="formRules.description" class="mb-0px!">
            <Editor v-model="row.description" height="150px" />
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
    <el-button @click="handleAdd" round>+ 添加数据字典</el-button>
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
      formData.value = await ProductApi.getProductDictionaryListByProductId(val)
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
    fieldName: undefined,
    displayValue: undefined,
    description: undefined,
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