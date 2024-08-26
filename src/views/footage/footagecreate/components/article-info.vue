<template>
  <a-form
    ref="formRef"
    :model="formData"
    class="form"
    :label-col-props="{ span: 6 }"
    :wrapper-col-props="{ span: 18 }"
  >
  <a-form-item
      field="title"
      :label="$t('footage.form.title')"
      :rules="[
        {
          required: true,
          message: $t('footage.form.error.title.required'),
        },
        {
          maxLength: 25,
          message: $t('footage.form.error.title.maxLength'),
        },
      ]"
      row-class="keep-margin"
    >
      <a-textarea
        v-model="formData.title"
        :placeholder="$t('footage.placeholder.title')"
        auto-size
      />
    </a-form-item>
    <a-form-item
      field="content"
      :label="$t('footage.form.content')"
      :rules="[
        {
          required: true,
          message: $t('footage.form.error.content.required'),
        },
        {
          maxLength: 200,
          message: $t('footage.form.error.content.maxLength'),
        },
      ]"
      row-class="keep-margin"
    >
      <a-textarea
        v-model="formData.content"
        :placeholder="$t('footage.placeholder.content')"
        auto-size
      />
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button type="secondary" @click="goPrev">
          {{ $t('footage.button.prev') }}
        </a-button>
        <a-button type="primary" @click="onNextClick">
          {{ $t('footage.button.next') }}
        </a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { ArticleInfoModel } from '@/api/footage/createNewFootage';

const emits = defineEmits(['changeStep']);

const formRef = ref<FormInstance>();
const formData = ref<ArticleInfoModel>({
  title: '',
  content: '',
});

const onNextClick = async () => {
  try {
    const res = await formRef.value?.validate();
    console.log('res', res);
    if (!res) {
      emits('changeStep', 'submit', { ...formData.value });
    }
  } catch (error) {
    console.error('Validation failed:', error);
  }
};

const goPrev = () => {
  emits('changeStep', 'backward');
};
</script>

<style scoped lang="less">
.container {
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
  width: 540px;
}

.form-content {
  padding: 8px 50px 0 30px;
}
</style>
