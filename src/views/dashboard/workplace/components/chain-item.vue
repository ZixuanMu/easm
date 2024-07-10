\<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card :bordered="false" :style="cardStyle">
      <div class="content-wrap">
        <div class="content">
          <a-statistic
            :title="title"
            :value="renderData.count"
            :value-from="0"
            animation
            show-group-separator
          />
          <div class="desc">
            <a-typography-text type="secondary" class="label">
              {{ $t('dataAnalysis.card.yesterday') }}
            </a-typography-text>
            <a-typography-text type="danger">
              {{ renderData.growth }}
              <icon-arrow-rise />
            </a-typography-text>
          </div>
        </div>
        <div >

          <a-avatar  class="col-avatar">
          <img class="img" :src="imageSrc" />
        </a-avatar>
        </div>
      </div>
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, computed, PropType, CSSProperties } from 'vue';
  import useLoading from '@/hooks/loading';
  import {
    queryPublicOpinionAnalysis,
    PublicOpinionAnalysis,
    PublicOpinionAnalysisRes,
  } from '@/api/visualization';

  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    quota: {
      type: String,
      default: '',
    },
    cardStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => {
        return {};
      },
    },
  });

  const { loading, setLoading } = useLoading(true);
  const renderData = ref<PublicOpinionAnalysisRes>({
    count: 0,
    growth: 0,
    chartData: [],
  });

  const fetchData = async (params: PublicOpinionAnalysis) => {
    try {
      const { data } = await queryPublicOpinionAnalysis(params);
      renderData.value = data;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  fetchData({ quota: props.quota });

  const imageSrc = computed(() => {
    // 根据不同的quota值设置不同的图片路径
    if (props.quota === 'user') {
      return new URL('@/assets/workplace/user.png', import.meta.url).href;
    } 
    if (props.quota === 'footage') {
      return new URL('@/assets/workplace/footage.png', import.meta.url).href;
    }
    if (props.quota === 'percent') {
      return new URL('@/assets/workplace/percent.png', import.meta.url).href;
    }
    if (props.quota === 'training') {
      return new URL('@/assets/workplace/training.png', import.meta.url).href;
    } 
    return new URL('@/assets/path/to/defaultImage.png', import.meta.url).href;
  });
</script>

<style scoped lang="less">
  :deep(.arco-card) {
    border-radius: 4px;
  }
  :deep(.arco-card-body) {
    width: 100%;
    height: 134px;
    padding: 0;
  }
  .img {
    float: right;
    width: 40px;
    height: 40px;
    vertical-align: bottom;
  }
  .content-wrap {
    width: 100%;
    padding: 16px;
    white-space: nowrap;
  }
  :deep(.content) {
    float: left;
    width: 108px;
    height: 102px;
  }
  :deep(.arco-statistic) {
    .arco-statistic-title {
      font-size: 16px;
      font-weight: bold;
      white-space: nowrap;
    }
    .arco-statistic-content {
      margin-top: 10px;
    }
  }
  .col-avatar {
    float: right;
    size:50px;
    margin-left: 52px;
    background-color: var(--color-fill-2);
  }
  .label {
    padding-right: 8px;
    font-size: 12px;
  }
</style>
