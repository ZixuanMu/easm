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
        :label="$t('footage.form.footageName')"
        :rules="[
          {
            required: true,
            message: $t('footage.form.error.footageName.required'),
          },
          {
            match: /^[a-zA-Z0-9\u4e00-\u9fa5]{1,20}$/,
            message: $t('footage.form.error.footageName.pattern'),
          },
        ]"
      >
        <a-input
          v-model="formData.footageName"
          :placeholder="$t('footage.placeholder.footageName')"
        />
      </a-form-item>
      <a-form-item
        field="advertisingSource"
        :label="$t('footage.form.advertisingSource')"
        :rules="[
          {
            required: true,
            message: $t('footage.form.error.advertisingSource.required'),
          },
        ]"
      >
        <a-input
          v-model="formData.advertisingSource"
          :placeholder="$t('footage.placeholder.advertisingSource')"
        />
      </a-form-item>
      <a-form-item
        field="advertisingMedia"
        :label="$t('footage.form.advertisingMedia')"
        :rules="[
          {
            required: true,
            message: $t('footage.form.error.advertisingMedia.required'),
          },
        ]"
      >
        <a-input
          v-model="formData.advertisingMedia"
          :placeholder="$t('footage.placeholder.advertisingMedia')"
        />
      </a-form-item>
      <a-form-item
        field="keyword"
        :label="$t('footage.form.keyword')"
        :rules="[
          { required: true, message: $t('footage.form.error.keyword.required') },
        ]"
      >
        <a-select
          v-model="formData.keyword"
          :placeholder="$t('footage.placeholder.keyword')"
          multiple
        >
          <a-option>今日头条</a-option>
          <a-option>火山</a-option>
        </a-select>
      </a-form-item>
      <a-form-item
        field="pushNotify"
        :label="$t('footage.form.pushNotify')"
        :rules="[{ required: true }]"
      >
        <a-switch v-model="formData.pushNotify" />
      </a-form-item>
      <a-form-item
        field="advertisingContent"
        :label="$t('footage.form.advertisingContent')"
        :rules="[
          {
            required: true,
            message: $t('footage.form.error.advertisingContent.required'),
          },
          {
            maxLength: 200,
            message: $t('footage.form.error.advertisingContent.maxLength'),
          },
        ]"
        row-class="keep-margin"
      >
        <a-textarea
          v-model="formData.advertisingContent"
          :placeholder="$t('footage.placeholder.advertisingContent')"
        />
      </a-form-item>
      <a-form-item>
        <!-- <a-button type="primary" @click="onNextClick">
          {{ $t('footage.button.next') }}
        </a-button> -->
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
    import { ChannelInfoModel } from '@/api/form';
  
    const emits = defineEmits(['changeStep']);
  
    const formRef = ref<FormInstance>();
    const formData = ref<ChannelInfoModel>({
      footageName: '',
      advertisingSource: '',
      advertisingMedia: '',
      keyword: [],
      pushNotify: true,
      advertisingContent: '',
    });
  
    const onNextClick = async () => {
      const res = await formRef.value?.validate();
      if (!res) {
        emits('changeStep', 'submit', { ...formData.value });
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
  