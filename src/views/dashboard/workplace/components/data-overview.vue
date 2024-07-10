<template>
    <a-grid :cols="24" :col-gap="12" :row-gap="12">
      <a-grid-item :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 }">
        <ChainItem
          :title="$t('workplace.dataoverview.numofuser')"
          quota="user"
          :card-style="{
            background: isDark
              ? '#1D2129':'#ffffff' ,
          }"
        />
      </a-grid-item>
      <a-grid-item :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 }">
        <ChainItem
          :title="$t('workplace.dataoverview.numoffootage')"
          quota="footage"
          :card-style="{
            background: isDark
              ? '#1D2129':'#ffffff' ,
          }"
        />
      </a-grid-item>
      <a-grid-item :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 }">
        <ChainItem
          :title="$t('workplace.dataoverview.percentageoftraining')"
          quota="percent"
          :card-style="{
            background: isDark
              ? '#1D2129':'#ffffff' ,
          }"
        />
      </a-grid-item>
      <a-grid-item :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 }">
        <ChainItem
          :title="$t('workplace.dataoverview.numoftraining')"
          quota="training"
          :card-style="{
            background: isDark
              ? '#1D2129':'#ffffff' ,
          }"
        />
      </a-grid-item>
    </a-grid>
</template>

<script lang="ts" setup>
  import useThemes from '@/hooks/themes';
  import ChainItem from './chain-item.vue';

  const { isDark } = useThemes();
</script>
