<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-sub-menu :index="item.index" :key="item.index">
            <template #title>
              <el-icon v-if="item.icon == 'List'"><list /></el-icon>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-sub-menu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                  >{{ threeItem.title }}</el-menu-item
                >
              </el-sub-menu>
              <el-menu-item v-else :index="subItem.index">{{
                subItem.title
              }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
              <el-icon v-if="item.icon == 'UserFilled'"
                ><user-filled
              /></el-icon>
              <el-icon v-if="item.icon == 'Setting'"><setting /></el-icon>
              <el-icon v-if="item.icon == 'HomeFilled'"
                ><home-filled
              /></el-icon>
              <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { menu } from "../router/menu/menuList";
import { UserFilled, List, Setting, HomeFilled } from "@element-plus/icons";
import bus from "@/assets/ts/bus";

export default defineComponent({
  components: {
    UserFilled,
    List,
    Setting,
    HomeFilled,
  },
  setup() {
    let items: any = menu;
    let collapse = ref(false)

    bus.$on('sendShow',(val:any) => {
      collapse.value = val
    })

    return {
      collapse,
      items,
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    },
  },
});
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.sidebar > ul {
  height: 100%;
}
</style>
