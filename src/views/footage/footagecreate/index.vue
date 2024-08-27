<template>
  <div class="container">
    <Breadcrumb :items="['menu.footage', 'footage.step.title']" />
    <a-spin :loading="loading" style="width: 100%">
      <a-card class="general-card">
        <template #title>
          {{ $t('footage.step.title') }}
        </template>
        <div class="wrapper">
          <a-steps
            v-model:current="step"
            style="width: 70%"
            line-less
            class="steps"
          >
            <a-step :description="$t('footage.step.subTitle.baseInfo')">
              {{ $t('footage.step.title.baseInfo') }}
            </a-step>
            <a-step :description="$t('footage.step.articleInfo')">
              {{ $t('footage.step.title.articleInfo') }}
            </a-step>
            <a-step :description="$t('footage.step.subTitle.finish')">
              {{ $t('footage.step.title.finish') }}
            </a-step>
          </a-steps>
          <keep-alive style="width: 100%;">
            <BaseInfo v-if="step === 1" @change-step="changeStep" />
            
            <ArticleInfo v-else-if="step === 2" @change-step="changeStep" />
            <Success v-else-if="step === 3" @change-step="changeStep" />
          </keep-alive>
        </div>
      </a-card>
    </a-spin>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import useLoading from '@/hooks/loading';
  import {
    submitfootageForm,
    BaseInfoModel,
    ArticleInfoModel,
    UnitfootageModel,
  } from '@/api/footage/createNewFootage';
  import BaseInfo from './components/base-info.vue';
  import ArticleInfo from './components/article-info.vue';
  import Success from './components/success.vue';

  const { loading, setLoading } = useLoading(false);
  const step = ref(1);
  const submitModel = ref<UnitfootageModel>({} as UnitfootageModel);
  const submitForm = async () => {
    setLoading(true);
    try {
      console.log(submitModel.value);
      await submitfootageForm(submitModel.value); // The mock api default success
      step.value = 3;
      submitModel.value = {} as UnitfootageModel; // init
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  const changeStep = (
    direction: string | number,
    model: BaseInfoModel | ArticleInfoModel
  ) => {
    if (typeof direction === 'number') {
      step.value = direction;
      return;
    }

    if (direction === 'forward' || direction === 'submit') {
      submitModel.value = {
        ...submitModel.value,
        ...model,
      };
      if (direction === 'submit') {
        submitForm();
        return;
      }
      step.value += 1;
    } else if (direction === 'backward') {
      step.value -= 1;
    }
  };
</script>

<script lang="ts">
  export default {
    name: 'Step',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 64px 0;
    background-color: var(--color-bg-2);
    :deep(.arco-form) {
      .arco-form-item {
        &:last-child {
          margin-top: 20px;
        }
      }
    }
  }

  .steps {
    margin-bottom: 76px;
  }
</style>
