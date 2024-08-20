<template>
  <div class="container">
    <Breadcrumb :items="['menu.footage', 'menu.footage.footageList']" />
    <a-row :gutter="20" align="stretch">
      <a-col :span="24">
        <a-card class="general-card" :title="$t('menu.footage.footageList')">
          <a-row justify="space-between">
            <a-col :span="24">
              <a-tabs :default-active-tab="1" type="rounded">
                <a-tab-pane key="1" :title="$t('footageList.tab.title.all')">
                  <FootageCard/>
                </a-tab-pane>
                <a-tab-pane key="2" :title="$t('footageList.tab.title.content')">
                </a-tab-pane>
                <a-tab-pane key="3" :title="$t('footageList.tab.title.service')">
                </a-tab-pane>
                <a-tab-pane key="4" :title="$t('footageList.tab.title.preset')">
                </a-tab-pane>
              </a-tabs>
            </a-col>
            <a-input-search
              :placeholder="$t('footageList.searchInput.placeholder')"
              style="width: 240px; position: absolute; top: 60px; right: 20px"
            />
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import FootageCard from './components/footage-card.vue';

</script>

<script lang="ts">
  export default {
    name: 'Card',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
    margin: 0 auto; /* 让容器水平居中 */
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
  :deep(.list-wrap) {
    // min-height: 140px;
    .list-row {
      align-items: stretch;
      .list-col {
        margin-bottom: 16px;
      }
    }
    :deep(.arco-space) {
      width: 100%;
      .arco-space-item {
        &:last-child {
          flex: 1;
        }
      }
    }
  }
</style>
