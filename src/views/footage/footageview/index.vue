<template>
  <div class="container">
    <Breadcrumb :items="['menu.footage', 'menu.footage.labelmanager']" />
    <a-card class="general-card">
      <a-button type="text" class="back-btn" @click="handleBack()">$t('footagevew.back')</a-button>
      <div>
        <a-row class="grid-demo" :gutter="24">
          <a-col :span="6" >
            <div class="imge-box">
              <a-image 
                width="100%"
                title=' '
                src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
                :preview-props="{
                  actionsLayout: ['rotateRight', 'zoomIn', 'zoomOut'],
                }">
                <template #extra>
                  <div class="actions">
                    <a-upload action="/" >
                      <template #upload-button>
                        <div class="action">
                          <span class="anticon anticon-edit">编辑</span>
                          <icon-edit size="20"/>
                        </div>
                      </template>
                    </a-upload>
                  </div>
                </template>
              </a-image>
              <!--文章描述-->
              <div class="article-description">
                这是一段文章描述，用于介绍文章的主要内容。
              </div>
            </div>
          </a-col>
          <a-col :span="18">
            <!--文章标题-->
            <h2 class="article-title">文章标题</h2>
            <!--文章标签-->
            <div class="article-tags">
              <a-tag color="blue">标签1</a-tag>
              <a-tag color="green">标签2</a-tag>
              <a-tag color="red">标签3</a-tag>
            </div>
            <!--文章内容-->
            <div class="article-content">
              <p>这是文章的主要内容部分，包含了详细的文章内容和信息。</p>
            </div>
          </a-col>
        </a-row>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const router = useRouter();

const handleBack = () => {
  router.go(-1);
};
</script>

<style>
.container {
  padding: 0 20px 20px 20px;
}

.back-btn {
  margin-top: 20px;
}

.grid-demo {
  display: flex;
  height: 100%;
}

.imge-box {
  margin:20px;
  height: 100%;
}
.action {
  margin-left: auto;
  padding: 5px 4px;
  font-size: 14px;
  border-radius: 2px;
  line-height: 1;
  cursor: pointer;
}

.action:hover {
  background: rgba(0,0,0,.5);
}

.actions-outer {
  .action {
    &:hover {
      color: #ffffff;
    }
  }
}

.article-description {
  margin-top: 20px;
  font-size: 14px;
  color: #666;
}

.article-title {
  font-size: 24px;
  font-weight: bold;
}

.article-tags {
  margin-bottom: 10px;
}

.article-content {
  font-size: 16px;
  line-height: 1.6;
}
</style>
