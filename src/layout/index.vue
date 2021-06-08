<template>
  <el-container>
    <el-header>
      <router-link to="/">Home</router-link>&nbsp;
      <router-link to="/play">Play</router-link>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "Layout",
});
</script>

<style lang="scss">
.el-container {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  height: calc(100% - 60px);
}
</style>