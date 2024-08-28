<template>
  <a-card class="card-wrap" :style="{ width: '100%',height:'100%' }">
    <template #cover>
      <div
        class="image-container"

      >
        <img
        class="img"
        fit="fill"
        :style="{ width: '100%',height:'100%'}"
        :src=imageSrc
        alt="网络有点卡顿呢"
        @error="errorImg"
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
        <a-typography-text type="secondary" :style="{ margin: '15px' }">
            <span v-if="type === 0"  style="text-align: center">
            <span class="svg-icon svg-baseline">
              <svg t="1724817354544" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4519" width="12" height="12"><path d="M743.168 85.333333c-24.618667-24.661333-68.010667-42.666667-102.826667-42.666666H238.933333C176.810667 42.666667 128 95.744 128 159.573333v704.853334C128 928.213333 176.896 981.333333 238.933333 981.333333h546.133334c62.08 0 110.933333-53.162667 110.933333-116.864V298.965333c0-34.986667-17.877333-78.336-42.538667-103.082666l-110.293333-110.506667z m-60.416 60.288l110.293333 110.506667c8.661333 8.746667 17.621333 30.421333 17.621334 42.837333V864.426667c0 18.090667-12.373333 31.530667-25.6 31.530666H238.933333c-13.226667 0-25.6-13.397333-25.6-31.573333V159.573333c0-18.218667 12.288-31.573333 25.6-31.573333h401.365334c12.16 0 33.834667 8.96 42.453333 17.621333z" p-id="4520" fill="#4e5969"></path><path d="M341.333333 554.666667h170.666667a42.666667 42.666667 0 0 0 0-85.333334H341.333333a42.666667 42.666667 0 0 0 0 85.333334zM341.333333 682.666667h341.333334a42.666667 42.666667 0 0 0 0-85.333334H341.333333a42.666667 42.666667 0 0 0 0 85.333334zM341.333333 810.666667h341.333334a42.666667 42.666667 0 0 0 0-85.333334H341.333333a42.666667 42.666667 0 0 0 0 85.333334zM853.333333 256h-127.786666A42.794667 42.794667 0 0 1 682.666667 213.12V85.333333a42.666667 42.666667 0 0 0-85.333334 0v127.786667A128.128 128.128 0 0 0 725.546667 341.333333H853.333333a42.666667 42.666667 0 0 0 0-85.333333z" p-id="4521" fill="#4e5969"></path><path d="M298.666667 256.426667C298.666667 232.576 317.568 213.333333 341.76 213.333333h84.48c23.808 0 43.093333 18.901333 43.093333 43.093334v84.48C469.333333 364.757333 450.432 384 426.24 384H341.76C317.909333 384 298.666667 365.098667 298.666667 340.906667V256.426667z" p-id="4522" fill="#4e5969"></path></svg>  
            </span>
              文章  
            </span>
            <span v-else-if="type === 1">视频</span>
            <span v-else-if="type === 2">试卷</span>
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

import { ref } from 'vue';



const props = defineProps({
  imageSrc: {
    type: String,
    default: '素材缩略图',
  },
  title: {
    type: String,
    default: '素材标题',
  },
  type: {
    type: Number,
    default: -1,
  },
});
const imageSrc = ref(props.imageSrc);
const errorImg = () => {
  imageSrc.value = 'https://via.placeholder.com/150x150';
}
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
  width: 100%;
  padding-bottom: 100%; /* 使高度与宽度相等 */
  
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
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0; /* 确保图片在蒙版下方 */
    object-fit: fill; /* 使图片拉伸并裁剪以填充整个容器 */
  }
}

.svg-icon {
  display: inline-flex;
  align-self: center;
  position: relative;
  height: 1em;
  width: 1em;
}

.svg-icon svg {
  height: 1em;
  width: 1em;
}

.svg-icon.svg-baseline svg {
  bottom: -0.125em;
  position: absolute;
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
