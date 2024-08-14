<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :header-style="{ paddingBottom: '0' }"
      :body-style="{ padding: '17px 20px 21px 20px' }"
    >
      <template #title>
        {{ $t('workplace.popularContent') }}
      </template>
      <template #extra>
        <a-link>{{ $t('workplace.viewMore') }}</a-link>
      </template>
      <a-space direction="vertical" :size="10" fill>
        <a-radio-group
          v-model:model-value="type"
          type="button"
          @change="typeChange as any"
        >
          <a-radio value="text">
            {{ $t('workplace.popularContent.text') }}
          </a-radio>
          <a-radio value="image">
            {{ $t('workplace.popularContent.image') }}
          </a-radio>
          <a-radio value="video">
            {{ $t('workplace.popularContent.video') }}
          </a-radio>
        </a-radio-group>
        <a-table
          :data="renderList"
          :pagination="false"
          :bordered="false"
          :scroll="{ x: '100%', y: '390px' }"
          :columns="columns"
        />
      </a-space>
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import useLoading from '@/hooks/loading';
  import { queryPopularList } from '@/api/dashboard';
  import type { TableData } from '@arco-design/web-vue/es/table/interface';

  const type = ref('text');
  const { loading, setLoading } = useLoading();
  const renderList = ref<TableData[]>();

  const fetchData = async (contentType: string) => {
    try {
      setLoading(true);
      const { data } = await queryPopularList({ type: contentType });
      renderList.value = data;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  const typeChange = (contentType: string) => {
    fetchData(contentType);
  };

  fetchData('text');

  const columns = [
    {
      title: '序号',
      dataIndex: 'key',
      width: 150, // Adjust the width as needed
      align: 'center',
    },
    {
      title: '培训名称',
      dataIndex: 'title',
      align: 'center',

    },
    {
      title: '培训范围',
      dataIndex: 'clickNumber',
      width: 250, // Adjust the width as needed
      align: 'center',
    },
    {
      title: '完成度',
      dataIndex: 'increases',
      width: 300, // Adjust the width as needed
      align: 'center',

    },
  ];
</script>

<style scoped lang="less">
  .general-card {
    min-height: 395px;
  }

  :deep(.arco-table-tr) {
    height: 44px;
    .arco-typography {
      margin-bottom: 0;
    }
  }

  .increases-cell {
    display: flex;
    align-items: center;
    span {
      margin-right: 4px;
    }
  }
</style>
