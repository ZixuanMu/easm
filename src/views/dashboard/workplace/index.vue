<template>
  <div class="container">
    <div class="left-side">
      <Banner />
      <a-grid :cols="24" :row-gap="16">
        <a-grid-item :span="24">
          <DataOverview />
        </a-grid-item>

        <a-grid-item class="left-panel"  :span="12">
          <ContentChart />
        </a-grid-item>
        <a-grid-item class="right-panel"  :span="12">
        
        <ContentChart />
        </a-grid-item>
    <a-grid-item class="panel" :span="24">
      <div class="panel">
          <PopularContent />
      </div>
    </a-grid-item>
  </a-grid>
    </div>
    <div class="right-side">
      <a-grid :cols="24" :row-gap="16">
        <a-grid-item :span="24">
          <div class="panel moduler-wrap">
            <Announcement />
          </div>
        </a-grid-item>
        <a-grid-item class="panel" :span="24">
          <QuickOperation />
          <a-divider class="half-divider" />
          <Docs />
        </a-grid-item>
        <a-grid-item class="panel" :span="24">
          
          <ContentTypeDistribution/>
        </a-grid-item>
      </a-grid>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Banner from './components/banner.vue';
  import ContentChart from './components/content-chart.vue';
  import PopularContent from './components/popular-content.vue';
  import QuickOperation from './components/quick-operation.vue';
  import Announcement from './components/announcement.vue';
  import ContentTypeDistribution from './components/content-type-distribution.vue';
  import Docs from './components/docs.vue';
  import DataOverview from './components/data-overview.vue'
</script>

<script lang="ts">
  export default {
    name: 'Dashboard', // If you want the include property of keep-alive to take effect, you must name the component
  };
</script>

<style lang="less" scoped>
  .container {
    padding: 16px 20px;
    padding-bottom: 0;
    display: flex;
  }

  .left-side {
    flex: 1;
    overflow: auto;
  }

  .right-side {
    width: 300px;
    margin-left: 16px;
  }
  .left-panel{
    margin-right: 8px;
  }
  .right-panel{
    margin-left:8px;
  }

  .panel {
    background-color: var(--color-bg-2);
    border-radius: 4px;
    overflow: auto;
  }
  :deep(.panel-border) {
    margin-bottom: 0;
    border-bottom: 1px solid rgb(var(--gray-2));
  }
  .moduler-wrap {
    border-radius: 4px;
    background-color: var(--color-bg-2);
    :deep(.text) {
      font-size: 12px;
      text-align: center;
      color: rgb(var(--gray-8));
    }

    :deep(.wrapper) {
      margin-bottom: 8px;
      text-align: center;
      cursor: pointer;

      &:last-child {
        .text {
          margin-bottom: 0;
        }
      }
      &:hover {
        .icon {
          color: rgb(var(--arcoblue-6));
          background-color: #e8f3ff;
        }
        .text {
          color: rgb(var(--arcoblue-6));
        }
      }
    }

    :deep(.icon) {
      display: inline-block;
      width: 32px;
      height: 32px;
      margin-bottom: 4px;
      color: rgb(var(--dark-gray-1));
      line-height: 32px;
      font-size: 16px;
      text-align: center;
      background-color: rgb(var(--gray-1));
      border-radius: 4px;
    }
  }
</style>

<style lang="less" scoped>
  // responsive
  .mobile {
    .container {
      display: block;
    }
    .right-side {
      // display: none;
      width: 100%;
      margin-left: 0;
      margin-top: 16px;
    }
  }
</style>
