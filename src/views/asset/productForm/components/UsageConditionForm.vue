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
       <el-table-column label="使用用途" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.usagePurpose`" :rules="formRules.usagePurpose" class="mb-0px!">
            <el-input v-model="row.usagePurpose" placeholder="请输入使用用途" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="使用主体" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.usageSubject`" :rules="formRules.usageSubject" class="mb-0px!">
            <el-input v-model="row.usageSubject" placeholder="请输入使用主体" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="资质要求" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.qualificationReq`" :rules="formRules.qualificationReq" class="mb-0px!">
            <el-input v-model="row.qualificationReq" placeholder="请输入资质要求" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="时效限制" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.timeLimit`" :rules="formRules.timeLimit" class="mb-0px!">
            <el-input v-model="row.timeLimit" placeholder="请输入时效限制" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="流转限制" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.transferLimit`" :rules="formRules.transferLimit" class="mb-0px!">
            <el-input v-model="row.transferLimit" placeholder="请输入流转限制" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="其他限制" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.otherLimit`" :rules="formRules.otherLimit" class="mb-0px!">
            <el-input v-model="row.otherLimit" placeholder="请输入其他限制" />
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
    <el-button @click="handleAdd" round>+ 添加使用条件</el-button>
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
      formData.value = await ProductApi.getUsageConditionListByProductId(val)
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
    usagePurpose: undefined,
    usageSubject: undefined,
    qualificationReq: undefined,
    timeLimit: undefined,
    transferLimit: undefined,
    otherLimit: undefined,
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