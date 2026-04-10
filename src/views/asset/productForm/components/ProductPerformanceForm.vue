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
       <el-table-column label="每秒查询数" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.qps`" :rules="formRules.qps" class="mb-0px!">
            <el-input v-model="row.qps" placeholder="请输入每秒查询数" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="平均响应毫秒" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.avgResponseMs`" :rules="formRules.avgResponseMs" class="mb-0px!">
            <el-input v-model="row.avgResponseMs" placeholder="请输入平均响应毫秒" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="超时秒数" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.timeoutSeconds`" :rules="formRules.timeoutSeconds" class="mb-0px!">
            <el-input v-model="row.timeoutSeconds" placeholder="请输入超时秒数" />
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
    <el-button @click="handleAdd" round>+ 添加性能参数</el-button>
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
      formData.value = await ProductApi.getProductPerformanceListByProductId(val)
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
    qps: undefined,
    avgResponseMs: undefined,
    timeoutSeconds: undefined,
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