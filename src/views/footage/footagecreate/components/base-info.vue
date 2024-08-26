<template>
  <a-form
    ref="formRef"
    :model="formData"
    class="form"
    :label-col-props="{ span: 6 }"
    :wrapper-col-props="{ span: 18 }"
  >
    <a-form-item
      field="footageType"
      :label="$t('footage.form.footageType')"
      :rules="[
        {
          required: true,
          message: $t('footage.form.error.footageType.required'),
        },
      ]"
    >
      <a-select
        v-model="formData.footageType"
        :placeholder="$t('footage.placeholder.footageType')"
      >
        <a-option :value="0">{{ $t('footage.placeholder.footageType.article') }}</a-option>
        <a-option :value="1">{{ $t('footage.placeholder.footageType.video') }}</a-option>
        <a-option :value="2">{{ $t('footage.placeholder.footageType.exam') }}</a-option>
      </a-select>
    </a-form-item>
    <a-form-item
      field="label"
      :label="$t('footage.form.label')"
      row-class="keep-margin"
    >
      <a-select  
        v-model="labelsName" 
        :placeholder="$t('footage.placeholder.footageLabel')" 
        allow-create 
        dropdown-scroll 
        allow-search 
        multiple
        @change="handleLabelChange(labelsName)"
      >
        <a-option v-for="item of labeldata" :key="item.id" :value="item.name" :label="item.name" />
      </a-select>
      <template #help>
        <span>{{ $t('footage.form.tip.label') }}</span>
      </template>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="onNextClick">
        {{ $t('footage.button.next') }}
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { BaseInfoModel } from '@/api/footage/createNewFootage';
import { labelPolicyList, PolicyParams, PolicyRecord, createLabelForm } from '@/api/footage/labelManager';

const labeldata = ref<PolicyRecord[]>([]);
const emits = defineEmits(['changeStep']);
const formRef = ref<FormInstance>();
const labelsName = ref<string[]>([]);
const formData = ref<BaseInfoModel>({
  footageType: 0,
  labels: [],
});

const fetchData = async (params: PolicyParams = { page: 1, pageSize: 6000 }) => {
  try {
    const res = await labelPolicyList(params) as any;
    labeldata.value = res.data;
  } catch (err) {
    // 处理错误
  } 
};
fetchData();

const handleLabelChange = async (newLabels: string[]) => {
  // 检查新标签是否已经存在于 labeldata 中
  const newLabelNames = newLabels.filter(label => !labeldata.value.some(existing => existing.name === label));

  const createdLabels = await Promise.all(
    newLabelNames.map(async (newLabelName) => {
      const newLabel = await createLabelForm(newLabelName);
      console.log(newLabel);
      fetchData();
    })
  );

  // 更新 formData 中的 labels
  formData.value.labels = newLabels.map(label => {
    const foundLabel = labeldata.value.find(item => item.name === label);
    return foundLabel ? foundLabel.id : null;
  }).filter(id => id !== null) as number[];
};


const onNextClick = async () => {
  const res = await formRef.value?.validate();
  if (!res) {
    emits('changeStep', 'forward', { ...formData.value });
  }
};
</script>

<style scoped lang="less">
  .container {
    padding: 20px;
    .keep-margin {
      margin-bottom: 20px;
    }
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 64px 0;
    background-color: var(--color-bg-2);
  }

  .steps {
    margin-bottom: 36px;
  }

  .form {
    width: 500px;
  }

  .form-content {
    padding: 8px 50px 0 30px;
  }
</style>
