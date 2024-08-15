<template>
  <a-card
    class="general-card"
    :title="$t('workplace.quick.operation')"
    :header-style="{ paddingBottom: '0' }"
    :body-style="{ padding: '24px 20px 0 20px' }"
  >
    <template #extra>
      <a-link>{{ $t('workplace.quickOperation.setup') }}</a-link>
    </template>
    <a-row :gutter="8">
      <a-col v-for="link in links" :key="link.text" :span="8" class="wrapper">
        <a-link :href="link.path" class="link-wrapper">
          <div class="iconquick">
            <component :is="link.icon" />
          </div>
          <a-typography-paragraph class="text">
            {{ $t(link.text) }}
          </a-typography-paragraph>
        </a-link>
      </a-col>
    </a-row>
  </a-card>
</template>

<script lang="ts" setup>
  const links = [
    { text: 'workplace.trainingmanager', icon: 'icon-apps', path: '/training/trainingmanager' },
    { text: 'workplace.taskmanager', icon: 'icon-common', path: '/task/taskmanager' },
    { text: 'workplace.footagemanager', icon: 'icon-storage', path: '/footage' },
    { text: 'workplace.usermanager', icon: 'icon-user', path: '/online-promotion' },
    { text: 'workplace.report', icon: 'icon-file', path: '/content-put-in' },
    { text: 'workplace.settings', icon: 'icon-settings', path:'' },
  ];
</script>

<style scoped lang="less">
.link-wrapper {
  display: block;
  text-align: center;
}

.iconquick {
  font-size: 25px; /* 调整图标的大小 */
  margin-bottom: 2px; /* 调整图标和文字之间的距离 */
}

.text {
  font-size: 14px; /* 适当调整文本的大小 */
}
</style>
