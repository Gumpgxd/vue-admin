<template>
  <div class="pd-le-ri">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <el-icon :size="11"><list /></el-icon> 添加音乐
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div style="width: 400px; display: flex">
        <el-input v-model="Search" placeholder="查询音乐/歌手/音乐编号" />
        <div style="margin: 0 20px">
          <el-button type="primary">搜索</el-button>
        </div>
      </div>
      <div style="margin: 20px 0 30px">
        <el-table :data="tableData" border style="width: 100%" :stripe="true">
          <el-table-column prop="name" label="歌曲名" itemtype=""/>
          <el-table-column prop="star" label="歌手" />
          <el-table-column prop="time" label="时长" width="180" />
          <el-table-column align="center" label="专辑图片" width="180">
            <template v-slot="scope">
              <el-image
                style="width: 50px; height: 50px"
                fit="cover"
                :src="scope.row.img"
                :preview-src-list="[scope.row.img]"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="180">
            <template v-slot="scope">
              <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="margin-bottom: 10px">
        <div class="demo-pagination-block">
          <el-pagination
            :page-size="100"
            layout="total, prev, pager, next, jumper"
            :total="1000"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { List, VideoPause } from "@element-plus/icons";

interface tableData {
  star:string,
  name:string,
  time:string|number,
  img:string,
  url:string
}

export default defineComponent({
  components: {
    List,
    VideoPause,
  },
  setup() {
    const Search = ref(null)
    const tableData:tableData[] = reactive([
      {
        star: "王琴",
        name: "这是几",
        time: 363,
        img: "http://cool.gumpxd.cn/file/1637911386274.jpg",
        url: "https://isekko-1306311182.cos.ap-nanjing.myqcloud.com/art/C6bQZ8RL61yiE5d7CSc77jRtRsoLUr0KhCHUtUCP.mp3",
      },
      {
        star: "黄谦",
        name: "涛",
        time: 271,
        img: "http://cool.gumpxd.cn/file/1637911407793.jpg",
        url: "http://cool.gumpxd.cn/file/1636032752740.mp3",
      },
      {
        star: "李忠政",
        name: "送你一朵小红花",
        time: 428,
        url: "https://isekko-1306311182.cos.ap-nanjing.myqcloud.com/art/cNscVPGujQKPBWIVdXDzf9G9tB3kCFh27EbGzmNb.mp3",
        img:'http://cool.gumpxd.cn/file/1637911437314.jpg'
      },
      {
        star: "甘相东",
        name: "我为祖国献石油",
        time: 326,
        url: "http://cool.gumpxd.cn/file/1636034296349.mp3",
        img:'http://cool.gumpxd.cn/file/1637912771631.JPG'
      },
    ]);
    return {
      Search,
      tableData,
    };
  },
});
</script>

<style scoped>
</style>
