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
       <el-table-column label="类型：input-输入字段 output-输出字段" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.type`" :rules="formRules.type" class="mb-0px!">
            <el-select v-model="row.type" placeholder="请选择类型：input-输入字段 output-输出字段">
                <el-option label="请选择字典生成" value="" />
            </el-select>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="序号" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.seqNo`" :rules="formRules.seqNo" class="mb-0px!">
            <el-input v-model="row.seqNo" placeholder="请输入序号" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="参数名称" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.paramName`" :rules="formRules.paramName" class="mb-0px!">
            <el-input v-model="row.paramName" placeholder="请输入参数名称" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="字段名称" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.fieldName`" :rules="formRules.fieldName" class="mb-0px!">
            <el-input v-model="row.fieldName" placeholder="请输入字段名称" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="字段描述" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.fieldDesc`" :rules="formRules.fieldDesc" class="mb-0px!">
            <el-input v-model="row.fieldDesc" placeholder="请输入字段描述" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="示例值" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.sampleValue`" :rules="formRules.sampleValue" class="mb-0px!">
            <el-input v-model="row.sampleValue" placeholder="请输入示例值" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="单位（输出字段专用）" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.unit`" :rules="formRules.unit" class="mb-0px!">
            <el-input v-model="row.unit" placeholder="请输入单位（输出字段专用）" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="数据类型（输出字段专用）" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.dataType`" :rules="formRules.dataType" class="mb-0px!">
            <el-select v-model="row.dataType" placeholder="请选择数据类型（输出字段专用）">
                <el-option label="请选择字典生成" value="" />
            </el-select>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="备注（输入字段专用）" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.remark`" :rules="formRules.remark" class="mb-0px!">
            <el-input v-model="row.remark" placeholder="请输入备注（输入字段专用）" />
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
    <el-button @click="handleAdd" round>+ 添加产品字段（输入+输出）</el-button>
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
  type: [{ required: true, message: '类型：input-输入字段 output-输出字段不能为空', trigger: 'change' }],
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
      formData.value = await ProductApi.getProductFieldListByProductId(val)
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
    type: undefined,
    seqNo: undefined,
    paramName: undefined,
    fieldName: undefined,
    fieldDesc: undefined,
    sampleValue: undefined,
    unit: undefined,
    dataType: undefined,
    remark: undefined,
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