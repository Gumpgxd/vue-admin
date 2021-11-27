<template>
  <div class="pd-le-ri">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <el-icon :size="11"><setting /></el-icon> 轮播设置
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <!-- 设置轮播图 -->
      <div class="demo-image__lazy" :style="{ height: Height }">
        <el-image
          v-for="(url, index) in data.imgList"
          :key="url"
          :src="url"
          lazy
          @click="clickImage($event, index)"
          style="cursor: pointer"
        ></el-image>
      </div>
      <div
        style="
          margin: 20px 10px 10px;
          display: flex;
          justify-content: space-between;
        "
      >
        <span style="line-height: 35px; font-size: 15px"
          >tips:点击更换轮播图</span
        >
        <el-button type="primary">保存</el-button>
      </div>
    </div>
    <el-dialog v-model="dialogVisible" title="图片上传" width="400px">
      <el-upload
        class="upload-demo"
        drag
        action="http://upload.gumpxd.cn/upload"
        multiple
        :on-success="successLoad"
        :on-error="errorLoad"
        :before-close="handleClose"
      >
        <el-icon class="el-icon--upload" v-if="!url"><upload-filled /></el-icon>
        <div class="el-upload__text" v-if="!url">
          将文件拖到此处，或<em>点击上传</em>
        </div>
        <img v-if="url" :src="url" class="upload-img" />
      </el-upload>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelBtn">取消</el-button>
          <el-button type="primary" @click="confimBtn"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { Setting, UploadFilled } from "@element-plus/icons";
import { ElMessage } from 'element-plus'

interface myData {
  imgList: string[];
}

export default defineComponent({
  components: {
    Setting,
    UploadFilled,
  },
  setup() {
    let data: myData = reactive({
      imgList: [
        "http://p1.music.126.net/CZr34Ni3xO6TyA1pYeGmCA==/109951166508594259.jpg?imageView&quality=89",
        "http://p1.music.126.net/QH1PDIrEvICkW5EwAlDGOQ==/109951166508785471.jpg?imageView&quality=89",
        "http://p1.music.126.net/3MO8PMy1Gfd-XpZj9N83hQ==/109951166508628091.jpg?imageView&quality=89",
        "http://p1.music.126.net/E7w7NDkD4_cGDSAvFgVvkg==/109951166511120535.jpg?imageView&quality=89",
      ],
    });
    //需要替换图片链接
    let url = ref("");
    //需要替换图片的索引
    let indexImage = ref(0);
    //对话框
    const dialogVisible = ref(false);
    //文档高度
    let Height: string =
      (document.documentElement.clientHeight - 300).toString() + "px";

    const clickImage = (e: any, index: number) => {
    //   url.value = e.path[0].src;
      indexImage.value = index;
      dialogVisible.value = true;
    };

    //文件上传成功
    const successLoad = (res:any) => {
        if(res.code == 200) {
            ElMessage.success('上传成功！')
            url.value = res.fileUrl
        }else {
            ElMessage.error(res.msg)
        }
    }

    //文件上传失败
    const errorLoad = () => {
        ElMessage.error('上传失败！')
    }

    //确认弹出框
    const confimBtn = () => {
        dialogVisible.value = false
        if(url.value !== "") {
            data.imgList[indexImage.value] = url.value
            url.value = ""
        }
    }

    //取消弹出框
    const cancelBtn = () => {
        dialogVisible.value = false
        url.value = ""
    }

    //关闭弹出框
    const handleClose = () => {
        dialogVisible.value = false
        url.value = ""
    }

    return {
      data,
      Height,
      dialogVisible,
      url,
      clickImage,
      successLoad,
      errorLoad,
      confimBtn,
      cancelBtn,
      handleClose
    };
  },
});
</script>

<style scoped>
ul li {
  list-style: none;
  float: left;
  width: 30px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}
.banner {
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  /* margin-top: 60px; */
}
.banner img {
  width: 100%;
  display: block;
}
.banner .page {
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
}
.banner .page ul {
  float: right;
}
.current {
  color: #ff6700;
}

.demo-image__lazy {
  overflow-y: auto;
}
.el-image {
  display: block;
  min-height: 200px;
  margin-bottom: 10px;
}
.el-image :last-child {
  margin-bottom: 0;
}
.upload-img {
  width: 358px;
  height: 178px;
  object-fit: cover;
}
</style>