<template>
  <div class="container">
    <div class="content">
      <div class="content-inner">
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import LoginForm from './components/login-form.vue';
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    height: 100vh;
    background-image: url('@/assets/images/login.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 50%;
      left: 71%;
      transform: translate(-50%, -50%);
      width: 305px;
      padding: 50px;
      background: white;
      box-sizing: border-box;
      box-shadow: 0px 15px 25px rgba(0, 0, 0, 0.5);
      border-radius: 15px;
    }
  }

  .logo {
    position: fixed;
    top: 24px;
    left: 22px;
    z-index: 1;
    display: inline-flex;
    align-items: center;

    &-text {
      margin-right: 4px;
      margin-left: 4px;
      color: var(--color-fill-1);
      font-size: 20px;
    }
  }
</style>
