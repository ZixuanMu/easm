<template>
  <div class="container">
    <Breadcrumb :items="['menu.footage', 'menu.footage.footageList']" />
    <a-row :gutter="20" align="stretch">
      <a-col :span="24">
        <a-card class="general-card" :title="$t('menu.footage.footageList')">
          <a-row justify="space-between">
            <a-col :span="24">
              <a-form layout="inline" :model="formModel" @submit="search" class="search-form">
                <a-form-item :label="$t('footageList.searchInput.type')">
                  <a-select  placeholder="Please select ..." multiple>
                    <a-option>北京</a-option>
                    <a-option>上海</a-option>
                    <a-option>广州</a-option>
                    <template #header>
                      <div style="padding: 6px 12px;">
                        <a-checkbox value="1">全选</a-checkbox>
                      </div>
                    </template>
                  </a-select>
                </a-form-item>

                <a-form-item :label="$t('footageList.searchInput.name')">
                  <a-input v-model="formModel.name" :placeholder="$t('footageList.searchInput.placeholderName')" />
                </a-form-item>

                <a-form-item :label="$t('footageList.searchInput.tag')">
                  <a-select  
                      v-model="formModel.tag" 
                      :placeholder="$t('footage.placeholder.footageLabel')" 
                      dropdown-scroll 
                      allow-search 
                      multiple
                    >
                      <a-option v-for="item of labeldata" :key="item.id" :value="item.name" :label="item.name" />
                    </a-select>
                </a-form-item>
              </a-form>

              <a-divider />
              <div class="grid-container">
                <div class="grid-item empty-wrap" @click="createNewFootage">
                  <a-card :bordered="false" hoverable>
                    <a-result :status="null" :title="$t('footageList.content.action')">
                      <template #icon>
                        <icon-plus style="font-size: 20px" />
                      </template>
                    </a-result>
                  </a-card>
                </div>
                <div v-for="item in renderData" :key="item.id" class="grid-item card-wrap">
                  <CardWrap imageSrc="https://training.knowbe4.com/modstore/artwork/5p5g8aw91gaetqretjfe6r5p9k5a"
                    :title="item.name" :action-type="item.type" :open-txt="$t('footageList.content.inspection')"
                    :close-txt="$t('footageList.content.delete')" :show-tag="false">
                    <a-descriptions style="margin-top: 16px" layout="inline-horizontal" :column="2" />
                    <template #skeleton>
                      <a-skeleton :animation="true">
                        <a-skeleton-line :widths="['50%', '50%', '100%', '40%']" :rows="4" />
                        <a-skeleton-line :widths="['40%']" :rows="1" />
                      </a-skeleton>
                    </template>
                  </CardWrap>
                </div>
              </div>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>

  </div>
</template>
<script lang="ts" setup>

import { useRouter } from 'vue-router';
import { FootagePolicyList, FootageParams, FootageRecord } from '@/api/footage/footageManager';
import { reactive, ref } from 'vue';
import { Pagination } from '@/types/global';
import useLoading from '@/hooks/loading';
import CardWrap from '@/views/footage/footagemanager/components//card-wrap.vue';
import { labelPolicyList, PolicyParams, PolicyRecord } from '@/api/footage/labelManager';

const labeldata = ref<PolicyRecord[]>([]);
const { loading, setLoading } = useLoading(true);
const basePagination: Pagination = {
  page: 1,
  pageSize: 12,
};
const renderData = ref<FootageRecord[]>([]);
const pagination = reactive({
  ...basePagination,
});

const generateFormModel = () => {
  return {
    name: '',
    type: 0,
    tag: [],
  };
};
const fetchDataLabels = async (params: PolicyParams = { page: 1, pageSize: 6000 }) => {
  try {
    const res = await labelPolicyList(params) as any;
    labeldata.value = res.data;
    console.log(res);
  } catch (err) {
    // 处理错误
  } 
};
fetchDataLabels();
const fetchData = async (params: FootageParams = { page: 1, pageSize: 20 }) => {
  setLoading(true);
  try {
    const res = await FootagePolicyList(params) as any;
    renderData.value = res.data;
    pagination.page = params.page;
    pagination.total = res.total;
  } catch (err) {
    // 错误处理
  } finally {
    setLoading(false);
  }
};
fetchData();

const formModel = ref(generateFormModel());
const search = () => {
  fetchData({
    ...basePagination,
    ...formModel.value,
  } as FootageParams);
};
const router = useRouter();
const createNewFootage = () => {
  router.push('/footage/footagecreate');
};
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
  margin: 0 auto;

  /* 让容器水平居中 */
  :deep(.arco-list-content) {
    overflow-x: hidden;
  }

  :deep(.arco-card-meta-title) {
    font-size: 14px;
  }
}

:deep(.arco-list-col) {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

:deep(.arco-list-item) {
  width: 33%;
}

:deep(.block-title) {
  margin: 0 0 12px 0;
  font-size: 14px;
}

.search-form {
  margin-bottom: 20px;
}

.list-wrap {
  margin-left: 15px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 8px;
}

.grid-item {
  margin-bottom: 20px;
  border-radius: 4px;
  width: 223px;
  /* 自动适应格子的宽度 */
  height: 320px;
  /* 固定高度 */
  transition: all 0.3s;
  border: 1px solid var(--color-neutral-3);

  :deep(.arco-card-meta-description) {
    color: rgb(var(--gray-6));

    .arco-descriptions-item-label-inline {
      font-weight: normal;
      font-size: 12px;
      color: rgb(var(--gray-6));
    }

    .arco-descriptions-item-value-inline {
      color: rgb(var(--gray-8));
    }
  }
}

.empty-wrap {
  width: 223px;
  /* 自动适应格子的宽度 */
  height: 320px;
  /* 固定高度 */
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid var(--color-neutral-3);
  transition: all 0.3s;

  :deep(.arco-card) {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .arco-result-title {
      color: rgb(var(--gray-6));
    }
  }
}
</style>
