<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">{{ $t('login.form.title') }}</div>
    <div class="login-form-tabs">
    <a-tabs type="text" default-active-key="1">
    <a-tab-pane class="login-form-tab-pane" key="1" title="用户名登录">
      <username-login/>
    </a-tab-pane>
    <a-tab-pane class="login-form-tab-pane" key="2" title="验证码登录">
      <phone-login/>
    </a-tab-pane>
    </a-tabs>
  </div>
  </div>
</template>

<script lang="ts" setup>
  import usernameLogin from './way/username.vue'
  import phoneLogin from './way/phone.vue';
</script>

<style lang="less" scoped>
  .login-form {
    &-wrapper {
      width: 250px;
    }

    &-title {
      color: var(--color-text-1);
      font-weight: 1000;
      font-size: 32px;
      line-height: 32px;
      text-align:center;
    }

    &-tabs{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1.5vh;
      padding: 3.5vh;
    }
    
    &-tab-pane{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    }
  }
</style>
