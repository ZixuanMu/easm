<template>
  <a-card class="card-wrap" :style="{ width: '100%',height:'100%' }">
    <template #cover>
      <div
        class="image-container"

      >
        <img
        class="img"
          :style="{ width: '100%',height:'100%'}"
          alt="dessert"
          :src=imageSrc
        />
      </div>
    </template>

    <a-card-meta  
      class="content-wrap"
      >
      <template #title>
        <a-typography-title :heading="6"  class="content-title">
      {{ title }}
    </a-typography-title>
      </template>
      <template #description>
        <a-typography-text type="secondary" :style="{ margin: '15px'}">
      {{ category }}
    </a-typography-text>

      <div class="hidden-content">
        <!-- <a-typography-text type="secondary" :style="{ margin: '15px'}">
      创建时间
    </a-typography-text> -->

    <a-button type="outline" class="view-button" @click="handleViewDetail">查看详情</a-button>
    <a-button type="outline" status="danger" class="view-button" @click="handleViewDetail">删除素材</a-button>
      </div>
      </template>
    </a-card-meta>
  </a-card>
</template>

<script lang="ts" setup>
import router from '@/router';
import { IconRight } from '@arco-design/web-vue/es/icon';

const props = defineProps({
  imageSrc: {
    type: String,
    default: '素材缩略图',
  },
  title: {
    type: String,
    default: '素材标题',
  },
  category: {
    type: String,
    default: '素材种类',
  },
});
const handleViewDetail = () => {
  console.log('查看详情');
  router.push('/footage/footageview');
};
</script>

<style scoped lang="less">
.card-wrap {
  position: relative; /* 确保子元素绝对定位基于 .card-wrap */
  transition: all 0.3s;
  border-radius: 4px;
  overflow: hidden;

  &:hover {
    .image-container{
      transform: scale(1.05);
    }
    .image-container::before {
      opacity: 1; /* 显示蒙版 */
    }

    .content-wrap {
      transform: translateY(-100px);
    }
  }

  :deep(.arco-card) {
    border-radius: 4px;
  }
}

.image-container {
  position: relative;
  overflow: hidden;
  width: '100%';
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* 半透明灰色蒙版 */
    transition: opacity 0.3s ease;
    opacity: 0; /* 默认隐藏蒙版 */
    z-index: 1; /* 确保蒙版在图片之上 */
  }

  .img {
    position: relative;
    z-index: 0; /* 确保图片在蒙版下方 */
    width: 100%;
    height: 100%;
  }
}

.content-wrap {
  position: absolute;
  width: 100%;
  height: 250px;
  margin-top:-15px;
  margin-left: -16px;
  transition: transform 0.3s ease;
  background-color: white;
  z-index: 2; /* 确保内容在蒙版之上 */


  .card-title {
    font-size: 32px;
    margin-bottom: 8px;
  }
}
.hidden-content{
  position: absolute;
  width: 100%;
  height: 250px;
  margin-top:15px;
}
.view-button{
  width:190px;
  margin-left:15px;
  margin-top: 10px;
}
.content-title{
  margin-top: 5px;
  margin-left: 15px;
  margin-bottom: 5px;
  font-weight: bold;
  height: 40px; /* 固定高度 */
  line-height: 20px; /* 每行的高度 */
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 限制最多两行 */
  display: flex;
  align-items: center; /* 一行时垂直居中 */
}
</style>
