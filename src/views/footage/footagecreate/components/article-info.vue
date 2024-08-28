<template>

  <a-form ref="formRef" :model="formData" class="form" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }">
    <a-form-item class="form-item" field="file" :label="$t('footage.form.image')" :rules="[
{
        required: true,
        message: $t('footage.form.error.title.required'),
      },
    ]" row-class="keep-margin">
      <a-upload 
      @change="onChange" 
      :auto-upload="false"

      >
        <template #upload-button>
          <a-space>
            <a-button> select file</a-button>
          </a-space>
        </template>
      </a-upload>
    </a-form-item>
    <a-form-item class="form-item" field="title" :label="$t('footage.form.title')" :rules="[
      {
        required: true,
        message: $t('footage.form.error.title.required'),
      },
      {
        maxLength: 25,
        message: $t('footage.form.error.title.maxLength'),
      },
    ]" row-class="keep-margin">
      <a-textarea v-model="formData.title" :placeholder="$t('footage.placeholder.title')" auto-size />
    </a-form-item>
    <a-form-item class="form-item" field="content" :label="$t('footage.form.content')" row-class="keep-margin">


      <div style="border: 1px solid #ccc">
        <Toolbar style="border-bottom: 1px solid #ccc;width: 100%;" :editor="editorRef" :defaultConfig="toolbarConfig"
          mode="default" />
        <Editor style="height: 500px; width: 100%; overflow-y: hidden;" v-model="formData.content"
          :defaultConfig="editorConfig" mode="default" @onCreated="handleCreated" />
      </div>
    </a-form-item>
    <a-form-item class="form-item">
      <a-space>
        <a-button type="secondary" @click="goPrev">
          {{ $t('footage.button.prev') }}
        </a-button>
        <a-button type="primary" @click="onNextClick">
          {{ $t('footage.button.next') }}
        </a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { FormInstance } from '@arco-design/web-vue/es/form';
import { ArticleInfoModel } from '@/api/footage/createNewFootage';
import { defineEmits } from 'vue';
import { shallowRef, ref, onBeforeUnmount } from 'vue';
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'


const editorRef = shallowRef()


const toolbarConfig = {
  excludeKeys: ['fullScreen'],
}

const editorConfig = { placeholder: '请输入内容...' }
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const emits = defineEmits(['changeStep']);
const formRef = ref<FormInstance>();
const formData = ref<ArticleInfoModel>({
  title: '',
  content: '',
  file: undefined,
});
const onChange = (info: any) => {

  const  [file]  = info;
  console.log('Upload event:', file.file);
    formData.value.file = file.file; // 获取原始文件对象

};

const onNextClick = async () => {
  try {
    const res = await formRef.value?.validate();
    if (!res) {
      emits('changeStep', 'submit', { ...formData.value });
    }
  } catch (error) {
    console.error('Validation failed:', error);
  }
};

const goPrev = () => {
  emits('changeStep', 'backward');
};
</script>

<style scoped lang="less">
.container {
  .keep-margin {
    margin-bottom: 20px;
  }
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 0;
  background-color: var(--color-bg-2);
}

.steps {
  margin-bottom: 36px;
}

.form {
  width: 540px;
}

.form-content {
  padding: 8px 50px 0 30px;
}

.form-item {
  margin-left: -8%;
}
</style>
