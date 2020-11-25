<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
          (!onlyOneChild.children || onlyOneChild.noShowingChildren)
      "
    >
      <router-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}" >
          <i :class="onlyOneChild.meta.icon"></i>
          <span slot="title">{{ onlyOneChild.meta.title }}</span>
        </el-menu-item>
      </router-link>
    </template>
    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template v-if="item.meta" slot="title">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        class="nest-menu"
        v-for="(v, i) in item.children"
        :key="i"
        :item="v"
        :is-nest="true"
        :base-path="resolvePath(v.path)"
      ></sidebar-item>
    </el-submenu>
  </div>
</template>
<script>
import path from "path";
export default {
  name: "SidebarItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
    basePath: {
      type: String,
      default: "",
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      onlyOneChild: null,
    };
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          this.onlyOneChild = item;
          return true;
        }
      });
      if (showingChildren.length === 1) {
        return true;
      }
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }
      return false;
    },
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath);
    },
  },
};
</script>
