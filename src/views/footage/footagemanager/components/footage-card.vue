<template>
  <div class="list-wrap">
    <a-typography-title class="block-title" :heading="6">
      {{ $t('footageList.tab.title.content') }}
    </a-typography-title>
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
      <div
        v-for="item in renderData"
        :key="item.id"
        class="grid-item card-wrap"
      >
        <CardWrap
          imageSrc="https://training.knowbe4.com/modstore/artwork/5p5g8aw91gaetqretjfe6r5p9k5a"
          :title="item.name"
          :action-type="item.type"
          :open-txt="$t('footageList.content.inspection')"
          :close-txt="$t('footageList.content.delete')"
          :show-tag="false"
        >
          <a-descriptions
            style="margin-top: 16px"
            
            layout="inline-horizontal"
            :column="2"
          />
          <template #skeleton>
            <a-skeleton :animation="true">
              <a-skeleton-line
                :widths="['50%', '50%', '100%', '40%']"
                :rows="4"
              />
              <a-skeleton-line :widths="['40%']" :rows="1" />
            </a-skeleton>
          </template>
        </CardWrap>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { labelPolicyList,FootageParams, FootageRecord} from '@/api/footage/footageManager';
import { reactive, ref } from 'vue';
import { Pagination } from '@/types/global';
import useLoading from '@/hooks/loading';

import CardWrap from './card-wrap.vue';

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
  };
};
const fetchData = async (params: FootageParams = { page: 1, pageSize: 20 }) => {
  setLoading(true);
  try {
    const res = await labelPolicyList(params) as any;
    console.log(res.data)
    renderData.value = res.data;
   
    pagination.page = params.page;
    pagination.total = res.total;
    console.log(res.total);
  } catch (err) {
    // you can report use errorHandler or other
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
  } as unknown as FootageParams);
};
const router = useRouter();
const response= labelPolicyList(
{page:1,pageSize:10});
const createNewFootage = () => {
  router.push('/footage/footagecreate');
};
</script>

<style scoped lang="less">
.list-wrap{
  margin-left:15px;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 8px;
}

.grid-item {
  margin-bottom: 20px;
  border-radius: 4px;
  width: 223px; /* 自动适应格子的宽度 */
  height: 320px; /* 固定高度 */
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
  width: 223px; /* 自动适应格子的宽度 */
  height: 320px; /* 固定高度 */
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
