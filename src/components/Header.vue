<template>
  <div class="headers">
    <div class="logo_img">
      <img src="http://cool.gumpxd.cn/file/1637407186632.jpeg" />
    </div>
    <div class="logo">后台管理系统</div>
    <div class="header_middle">
      <div style="margin-top: 8px; cursor: pointer" @click="isShow">
        <el-tooltip
          effect="dark"
          :content="!show ? `收起菜单` : `展开菜单`"
          placement="bottom"
          v-if="!show"
        >
          <el-icon color="#fff" size="32"><fold /></el-icon>
        </el-tooltip>
      </div>
      <div style="margin-top: 8px; cursor: pointer" @click="isShow">
        <el-tooltip
          effect="dark"
          :content="!show ? `收起菜单` : `展开菜单`"
          placement="bottom"
          v-if="show"
        >
          <el-icon color="#fff" size="32"><expand /></el-icon>
        </el-tooltip>
      </div>
    </div>
    <div class="header_right">
      <div
        style="cursor: pointer; margin-right: 20px; margin-left: 20px"
        @click="handleFullScreen"
        v-if="!fullscreen"
      >
        <el-tooltip
          effect="dark"
          :content="fullscreen ? `取消全屏` : `全屏`"
          placement="bottom"
        >
          <span
            class="iconfont icon-quanping_o"
            style="color: #fff; font-size: 40px"
          ></span>
        </el-tooltip>
      </div>
      <div
        style="cursor: pointer; margin-right: 20px; margin-left: 20px"
        @click="handleFullScreen"
        v-if="fullscreen"
      >
        <el-tooltip
          effect="dark"
          :content="fullscreen ? `取消全屏` : `全屏`"
          placement="bottom"
        >
          <span
            class="iconfont icon-quxiaoquanping_o"
            style="color: #fff; font-size: 40px"
          ></span>
        </el-tooltip>
      </div>
      <el-dropdown>
        <div
          style="
            margin-top: 10px;
            display: flex;
            cursor: pointer;
            padding-right: 10px;
          "
        >
          <img
            src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
            class="avatar"
          />
          <span class="user">靓仔.</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Edit, Expand, Fold } from "@element-plus/icons";
import bus from "../assets/ts/bus";

export default defineComponent({
  components: {
    Edit,
    Expand,
    Fold,
  },
  setup(props, context) {
    let fullscreen = ref(false);
    let show = ref(false);

    const handleFullScreen = () => {
      let element = document.documentElement;
      if (fullscreen.value) {
        document.exitFullscreen();
        fullscreen.value = !fullscreen.value;
      } else {
        element.requestFullscreen();
        fullscreen.value = !fullscreen.value;
      }
    };

    const isShow = () => {
      show.value = !show.value;
      sendShow(show.value);
      bus.$emit("sendShow", show.value);
    };

    const sendShow = (data: boolean) => {
      context.emit("changeMenu", data);
    };

    return {
      handleFullScreen,
      fullscreen,
      show,
      isShow,
    };
  },
});
</script>

<style scoped>
.headers {
  width: 100%;
  height: 70px;
  font-size: 22px;
  /* color: #fff; */
  margin: 0 !important;
  padding: 0 !important;
  display: flex;
  position: relative;
  display: flex;
}
.headers .logo {
  float: left;
  width: 170px;
  line-height: 70px;
  color: #fff;
}
.headers .logo_img {
  margin-top: 10px;
  padding: 0 10px;
  cursor: pointer;
}
.headers .logo_img img {
  width: 50px;
  height: 50px;
  border-radius: 20%;
}
.header_right {
  position: absolute;
  right: 30px;
  height: 70px;
  display: flex;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  flex: 1;
  margin: 0 10px;
}
.user {
  font-size: 16px;
  line-height: 50px !important;
  color: #fff;
}
</style>
