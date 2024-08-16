<template>
  <a-form
    ref="formRef"
    :model="formData"
    class="form"
    :label-col-props="{ span: 6 }"
    :wrapper-col-props="{ span: 18 }"
  >
    <a-form-item
      field="footageName"
      :label="$t('stepForm.form.label.footageName')"
      :rules="[
        {
          required: true,
          message: $t('stepForm.form.error.footageName.required'),
        },
        {
          match: /^[a-zA-Z0-9\u4e00-\u9fa5]{1,20}$/,
          message: $t('stepForm.form.error.footageName.pattern'),
        },
      ]"
    >
      <a-input
        v-model="formData.footageName"
        :placeholder="$t('stepForm.placeholder.footageName')"
      />
    </a-form-item>
    <a-form-item
      field="footageType"
      :label="$t('stepForm.form.label.footageType')"
      :rules="[
        {
          required: true,
          message: $t('stepForm.form.error.footageType.required'),
        },
      ]"
    >
      <a-select
        v-model="formData.footageType"
        :placeholder="$t('stepForm.placeholder.footageType')"
      >
        <a-option>APP通用渠道</a-option>
      </a-select>
    </a-form-item>
    <a-form-item
      field="label"
      :label="$t('stepForm.form.label.label')"
      row-class="keep-margin"
    >
      <a-input-tag
        v-model="formData.label"
        :placeholder="$t('stepForm.placeholder.label')"
        allow-clear
      />
      <template #help>
        <span>{{ $t('stepForm.form.tip.label') }}</span>
      </template>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="onNextClick">
        {{ $t('stepForm.button.next') }}
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { BaseInfoModel } from '@/api/footage/createNewFootage';

  const emits = defineEmits(['changeStep']);
  const formRef = ref<FormInstance>();
  const formData = ref<BaseInfoModel>({
    footageName: '',
    footageType: '',
    label: [],
  });

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
