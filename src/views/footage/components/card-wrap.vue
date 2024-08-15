<template>
  <a-card class="card-wrap" hoverable="false" :style="{ width: '100%',height:'100%' }">
    <template #cover>
      <div
        class="image-container"
        :style="{
          height: '100%',
          overflow: 'hidden',
        }"
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
      :style="{
        width: '100%',
        height:'300px'
        }"
      :title=title>
      <template #description>
        Card content
      </template>
    </a-card-meta>
  </a-card>
</template>

<script lang="ts" setup>
const props = defineProps({
  imageSrc: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    default: '',
  },
});
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
      transform: translateY(-80%);
    }
  }

  :deep(.arco-card) {
    border-radius: 4px;
  }
}

.image-container {
  position: relative;
  overflow: hidden;

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
  margin-left: -16px;
  transition: transform 0.3s ease;
  background-color: white;
  z-index: 2; /* 确保内容在蒙版之上 */


  .card-title {
    font-size: 32px;
    margin-bottom: 8px;
  }
}

</style>
