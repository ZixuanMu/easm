<template>
  <div class="container">
    <Breadcrumb :items="['menu.footage', 'menu.footage.labelmanager']" />
    <a-card class="general-card" :title="$t('menu.footage.labelmanager')">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item
                  field="labelname"
                  :label="$t('labelmanager.form.labelname')"
                >
                  <a-input
                    v-model="formModel.name"
                    :placeholder="$t('labelmanager.form.labelname.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="11"></a-col>
            <a-col :span="5" style="text-align: right">
              <a-button type="primary" @click="search" class="search-button">
                <template #icon>
                  <icon-search />
                </template>
                {{ $t('labelmanager.form.search') }}
              </a-button>
            <a-button @click="reset" class="search-button">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('labelmanager.form.reset') }}
            </a-button>
          </a-col>
          </a-row>
          </a-form>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <a-button @click="create" type="primary">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('labelmanager.operation.create') }}
            </a-button>
          </a-space>
        </a-col>
        <a-col
          :span="12"
          style="display: flex; align-items: center; justify-content: end"
        >
          <a-tooltip :content="$t('labelmanager.actions.refresh')">
            <div class="action-icon" @click="search">
              <icon-refresh size="18" />
            </div>
          </a-tooltip>
          <a-dropdown @select="handleSelectDensity">
            <a-tooltip :content="$t('labelmanager.actions.density')">
              <div class="action-icon"><icon-line-height size="18" /></div>
            </a-tooltip>
            <template #content>
              <a-doption
                v-for="item in densityList"
                :key="item.value"
                :value="item.value"
                :class="{ active: item.value === size }"
              >
                <span>{{ item.name }}</span>
              </a-doption>
            </template>
          </a-dropdown>
          <a-tooltip :content="$t('labelmanager.actions.columnSetting')">
            <a-popover
              trigger="click"
              position="bl"
              @popup-visible-change="popupVisibleChange"
            >
              <div class="action-icon"><icon-settings size="18" /></div>
              <template #content>
                <div id="tableSetting">
                  <div
                    v-for="(item, index) in showColumns"
                    :key="item.dataIndex"
                    class="setting"
                  >
                    <div style="margin-right: 4px; cursor: move">
                      <icon-drag-arrow />
                    </div>
                    <div>
                      <a-checkbox
                        v-model="item.checked"
                        @change="
                          handleChange($event, item as TableColumnData, index)
                        "
                      >
                      </a-checkbox>
                    </div>
                    <div class="title">
                      {{ item.title }}
                    </div>
                  </div>
                </div>
              </template>
            </a-popover>
          </a-tooltip>
        </a-col>
      </a-row>
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :columns="cloneColumns"
        :data="renderData"
        :bordered="false"
        :size="size"
        @page-change="onPageChange"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.page-1) * pagination.page_size }}
        </template>
        <template #status="{ record }">
          <span v-if="record.status === 'offline'" class="circle"></span>
          <span v-else class="circle pass"></span>
          {{ $t(`searchTable.form.status.${record.status}`) }}
        </template>
        <template #operations="{ record }">
          <a-button type="text" size="small" @click="edit(record.id)">
            {{ $t('labelmanager.columns.operations.edit') }}
          </a-button>
          <a-button type="text" size="small" @click="confirmDelete(record.id)">
            {{ $t('labelmanager.columns.operations.delete') }}
          </a-button>
        </template>
      </a-table>
    </a-card>
  </div>

  <a-modal v-model:visible="editVisible" @ok="submitEditForm" @cancel="handleCancel">
  <template #title>
    {{ $t('labelmanager.edit.title') }}
  </template>
  <a-form :model="currentLabel">
    <a-form-item
      field="name"
      :label="$t('labelmanager.create.formItem')"
      :rules="[{ required: true, message: $t('labelmanager.create.formItem.required') }]"
    >
      <a-input v-model="currentLabel.name" :style="{ width: '320px' }" :placeholder="$t('labelmanager.create.placeholder')" :max-length="10" allow-clear show-word-limit />
    </a-form-item>
  </a-form>
</a-modal>

  <a-modal v-model:visible="createVisible" @ok="submitForm" @cancel="handleCancel">
    <template #title>
      {{ $t('labelmanager.create.title') }}
    </template>
    <a-form :model="labelForm">
  <a-form-item field="name" :label="$t('labelmanager.create.formItem')"  :rules="[
    { required: true, message: $t('labelmanager.create.formItem.required')}
  ]"
        >
    <a-input v-model="labelForm.name" :style="{width:'320px'}" :placeholder="$t('labelmanager.create.placeholder')" :max-length="10" allow-clear show-word-limit />
  </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, watch, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import useLoading from '@/hooks/loading';
import { createLabelForm, deleteLabelForm, PolicyRecord, PolicyParams, labelPolicyList,putLabel  } from '@/api/footage/labelManager';
import { Pagination } from '@/types/global';
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
import cloneDeep from 'lodash/cloneDeep';
import Sortable from 'sortablejs';
import { useRouter } from 'vue-router';
import { Message, Modal } from '@arco-design/web-vue';

const router = useRouter();
type SizeProps = 'mini' | 'small' | 'medium' | 'large';
type Column = TableColumnData & { checked?: true };

const generateFormModel = () => {
  return {
    name: '',
  };
};
const editVisible = ref(false);  // 控制编辑对话框的显示
const currentLabel = ref({ id: 0, name: '' });  // 存储当前编辑的标签信息
const labelForm = ref({ name: '' });
const { loading, setLoading } = useLoading(true);
const { t } = useI18n();
const renderData = ref<PolicyRecord[]>([]);
const formModel = ref(generateFormModel());
const cloneColumns = ref<Column[]>([]);
const showColumns = ref<Column[]>([]);
const createVisible = ref(false);

const size = ref<SizeProps>('medium');

const basePagination: Pagination = {
  page: 1,
  page_size: 10,
};
const pagination = reactive({
  ...basePagination,
});
const densityList = computed(() => [
  {
    name: t('labelmanager.size.mini'),
    value: 'mini',
  },
  {
    name: t('labelmanager.size.small'),
    value: 'small',
  },
  {
    name: t('labelmanager.size.medium'),
    value: 'medium',
  },
  {
    name: t('labelmanager.size.large'),
    value: 'large',
  },
]);

const columns = computed<TableColumnData[]>(() => [
  {
    title: t('labelmanager.columns.index'),
    dataIndex: 'index',
    slotName: 'index',
    width: 200, // 固定宽度的索引列
    align: 'center', // 使内容水平居中
  },
  {
    title: t('labelmanager.columns.name'),
    dataIndex: 'name',
    flex: 1, // 自适应宽度的name列
    align: 'center', // 使内容水平居中
  },
  {
    title: t('labelmanager.columns.operations'),
    dataIndex: 'operations',
    slotName: 'operations',
    width: 200, // 固定宽度的操作列
    align: 'center', // 使内容水平居中
  },
]);

const fetchData = async (params: PolicyParams = { page: 1, page_size: 10 }) => {
  setLoading(true);
  try {
    const res = await labelPolicyList(params) as any;
    renderData.value = res.data;
    pagination.page = params.page;
    pagination.total = res.total;
    console.log(res.total);
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false);
  }
};

const search = () => {
  fetchData({
    ...basePagination,
    ...formModel.value,
  } as unknown as PolicyParams);
};

const onPageChange = (page: number) => {
  fetchData({ ...basePagination, page });
};

fetchData();

const submitForm = () => {
  createLabelForm(labelForm.value.name);
  createVisible.value = false;
};
const submitEditForm = () => {
  putLabel(currentLabel.value.id, currentLabel.value.name).then(() => {
    Message.success({
      content: "编辑成功",
      duration: 5 * 1000,
    });
    editVisible.value = false;  // 关闭对话框
    search();  // 刷新列表
  }).catch((error) => {
    console.error('Error updating label:', error);
  });
};
const create = () => {
  createVisible.value = true;
};

const handleCancel = () => {
  editVisible.value =false;
  createVisible.value = false;
};

const reset = () => {
  formModel.value = generateFormModel();
};

const handleSelectDensity = (
  val: string | number | Record<string, any> | undefined,
  e: Event
) => {
  size.value = val as SizeProps;
};

const handleChange = (
  checked: boolean | (string | boolean | number)[],
  column: Column,
  index: number
) => {
  if (!checked) {
    cloneColumns.value = showColumns.value.filter(
      (item) => item.dataIndex !== column.dataIndex
    );
  } else {
    cloneColumns.value.splice(index, 0, column);
  }
};

const exchangeArray = <T extends Array<any>>(
  array: T,
  beforeIdx: number,
  newIdx: number,
  isDeep = false
): T => {
  const newArray = isDeep ? cloneDeep(array) : array;
  if (beforeIdx > -1 && newIdx > -1) {
    newArray.splice(
      beforeIdx,
      1,
      newArray.splice(newIdx, 1, newArray[beforeIdx]).pop()
    );
  }
  return newArray;
};

const popupVisibleChange = (val: boolean) => {
  if (val) {
    nextTick(() => {
      const el = document.getElementById('tableSetting') as HTMLElement;
      const sortable = new Sortable(el, {
        onEnd(e: any) {
          const { oldIndex, newIndex } = e;
          exchangeArray(cloneColumns.value, oldIndex, newIndex);
          exchangeArray(showColumns.value, oldIndex, newIndex);
        },
      });
    });
  }
};
const edit = (id: number) => {
  const label = renderData.value.find(item => item.id === id);
  if (label) {
    currentLabel.value = { ...label };  // 深拷贝当前编辑的标签信息
    editVisible.value = true;  // 显示编辑对话框
  }
};

const confirmDelete = (id: number) => {
  Modal.confirm({
    title: '确认删除',
    content: '您确定要删除这个标签吗？',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      deleteLabelForm(id).then(() => {
        Message.success({
          content: "删除成功",
          duration: 5 * 1000,  // 消息显示 5 秒钟
        });
        search(); // 删除后刷新列表
      }).catch((error) => {
        console.error('Error deleting label:', error);
      });
    }
  });
};

watch(
  () => columns.value,
  (val) => {
    cloneColumns.value = cloneDeep(val);
    cloneColumns.value.forEach((item, index) => {
      item.checked = true;
    });
    showColumns.value = cloneDeep(cloneColumns.value);
  },
  { deep: true, immediate: true }
);
</script>

<script lang="ts">
export default {
  name: 'labelmanager',
};
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}
:deep(.arco-table-th) {
  &:last-child {
    .arco-table-th-item-title {
      margin-left: 16px;
    }
  }
}
.action-icon {
  margin-left: 12px;
  cursor: pointer;
}
.search-button {
  margin: 3px;
}
.active {
  color: #0960bd;
  background-color: #e3f4fc;
}
.setting {
  display: flex;
  align-items: center;
  width: 200px;
  .title {
    margin-left: 12px;
    cursor: pointer;
  }
}
</style>
