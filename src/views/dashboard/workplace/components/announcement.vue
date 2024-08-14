<template>
  <a-card
    class="general-card"
    :title="$t('workplace.announcement')"
    :header-style="{ paddingBottom: '0' }"
    :body-style="{ padding: '15px 20px 13px 20px' }"
  >
    <template #extra>
      <a-link>{{ $t('workplace.viewMore') }}</a-link>
    </template>
    <div>
      <div v-for="(item, idx) in list" :key="idx" class="item">
        <a-tag :color="item.type" size="small">{{ item.label }}</a-tag>
        <span class="item-content">
          {{ item.content }}
        </span>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
  const list = [
  {
  type: 'orangered',
  label: '培训',
  content: '新一期的网络安全培训活动已经发布，请通知相关人员及时报名。',
},
{
  type: 'cyan',
  label: '消息',
  content: '某用户上传的培训材料未通过审核，请查看详情并通知整改。',
},
{
  type: 'blue',
  label: '通知',
  content: '当前培训课程即将到期，请确保所有参与者完成课程。',
},
{
  type: 'blue',
  label: '通知',
  content: '系统将于1月进行安全更新，届时可能影响培训系统的使用，请提前做好准备。',
},
{
  type: 'cyan',
  label: '消息',
  content: '某用户上传的培训材料已通过审核，相关内容已更新。',
},

  ];
</script>

<style scoped lang="less">
  .item {
    display: flex;
    align-items: center;
    width: 100%;
    height: 24px;
    margin-bottom: 4px;
    .item-content {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-left: 4px;
      color: var(--color-text-2);
      text-decoration: none;
      font-size: 13px;
      cursor: pointer;
    }
  }
</style>
