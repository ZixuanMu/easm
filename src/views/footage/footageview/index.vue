<template>
  <div class="container">
    <Breadcrumb :items="['menu.footage', 'menu.footage.labelmanager']" />
    <a-card class="general-card">
      <a-button type="text" class="back-btn" @click="handleBack()">$t('footagevew.back')</a-button>
      <div>
        <a-row class="grid-demo">
          <a-col :span="6">
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
          </div>
          </a-col>
          <a-col :span="6">
            <!--文章标题-->
            <!--文章标签-->
            <!--文章内容-->
          </a-col>
          </a-row >

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
  router.push('/footage/labelmanager');
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
  display: grid;
  grid-gap: 20px;
  margin: 20px;
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

</style>
