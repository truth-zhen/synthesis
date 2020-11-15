<template>
  <div class="layout">
    <sidebar class="sidebar" />
    <div class="main-container">
      <header />
      <router-view />
    </div>
  </div>
</template>
<script>
import Header from "./component/header";
import Sidebar from "./component/sideber";
export default {
  name: "layout",
  data() {
    return {};
  },
  components: {
    Header,
    Sidebar
  }
};
</script>
<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  background: white;
}
.sidebar {
  position: fixed;
  top: 0;
}
.main-container {
  width: 100%;
  height: 100%;
  margin-left: 250px;
}
</style>
