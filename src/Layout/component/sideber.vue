<template>
  <div class="navsideber">
    <el-menu
      :default-active="activeMenu"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
    >
    <silde-bar v-for="(item,i) in permission_routes" :key="i" :item="item" :base-path="item.path"></silde-bar>
      <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SildeBar from './sidebarItem'
export default {
  name: "navsideber",
  data() {
    return {
      isCollapse: false,
      onlyOneChild: null
    };
  },
  components: {
    SildeBar
  },
  computed: {
    ...mapGetters([
      'permission_routes'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      return path
    }
  }
};
</script>
<style lang="scss" scoped>
.navsideber {
  width: 250px;
  height: 100%;
  position: fixed;
}
.el-menu-vertical-demo {
  width: 250px;
  height: 100%;
}
</style>
