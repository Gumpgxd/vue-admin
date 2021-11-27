<template>
  <div class="pd-le-ri">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <el-icon :size="11"><circle-plus-filled /></el-icon> 添加音乐
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div style="width: 600px">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="音乐名">
            <el-input v-model="form.name" placeholder="请输入歌曲名"></el-input>
          </el-form-item>
          <el-form-item label="音乐时长">
            <el-input
              v-model="form.time"
              placeholder="请输入音乐时长（单位：秒）"
            ></el-input>
          </el-form-item>
          <el-form-item label="歌手名">
            <el-input v-model="form.star" placeholder="请输入歌手名"></el-input>
          </el-form-item>
          <el-form-item label="音乐图片">
            <el-upload
              class="upload-demo"
              drag
              action="http://upload.gumpxd.cn/upload"
            >
              <el-icon class="el-icon--upload" v-if="!form.url"
                ><upload-filled
              /></el-icon>
              <div class="el-upload__text" v-if="!form.url">
                将图片拖到此处，或<em>点击上传</em>
              </div>
              <img v-if="form.url" :src="form.url" class="upload-img" />
            </el-upload>
          </el-form-item>
          <el-form-item label="音乐文件" class="upload_file">
            <el-upload
              class="upload-demo"
              drag
              action="http://upload.gumpxd.cn/upload"
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
              <template #tip>
                <div class="el-upload__tip">
                  tips：只能上传mp3格式音乐文件
                </div>
              </template>
            </el-upload>
          </el-form-item>
        </el-form>
        <div style="width: 600px; text-align: center; margin: 50px 0 10px">
          <el-button type="primary">报存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { CirclePlusFilled, UploadFilled, Plus } from "@element-plus/icons";

interface myForm {
  name: string;
  img: string;
  star: string;
  time: null | number;
  url: string;
}

export default defineComponent({
  components: {
    CirclePlusFilled,
    UploadFilled,
    Plus,
  },
  setup() {
    const form: myForm = reactive({
      name: "",
      img: "",
      star: "",
      time: null,
      url: "",
    });

    return {
      form,
    };
  },
});
</script>

<style scoped>
</style>
