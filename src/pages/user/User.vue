<template>
  <div class="pd-le-ri">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <el-icon :size="11"><user-filled /></el-icon> 用户管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div style="width: 400px; display: flex">
        <el-input v-model="Search" placeholder="查询用户名/用户ID" />
        <div style="margin: 0 20px">
          <el-button type="primary">搜索</el-button>
        </div>
      </div>
      <div style="margin: 20px 0 30px">
        <el-table :data="tableData" border style="width: 100%" :stripe = true>
          <el-table-column prop="username" label="用户名" width="180" />
          <el-table-column prop="sex" label="性别" width="100" align="center"></el-table-column>
          <el-table-column prop="address" label="地址" width="180" />
          <el-table-column prop="content" label="简介"></el-table-column>
          <el-table-column align="center" label="头像" width="180">
            <template v-slot="scope">
              <el-image
                style="width: 50px; height: 50px"
                fit="cover"
                :src="scope.row.img"
                :preview-src-list="[scope.row.img]"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <el-button type="danger" size="small">删除</el-button>
          </el-table-column>
        </el-table>
      </div>
      <div style="margin-bottom:10px">
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
import { UserFilled } from "@element-plus/icons";

export default defineComponent({
  components: {
    UserFilled
  },
  setup() {
    const Search = ref(null);
    const tableData = reactive([
      {
        username: "Tom",
        sex:'男',
        address: "四川省成都市",
        content:'简介',
        img: "http://cool.gumpxd.cn/file/1637911386274.jpg",
        status:0
      },
      {
        username: "Tim",
        sex:'女',
        address: "四川省成都市",
        content:'简介',
        img: "http://cool.gumpxd.cn/file/1637911407793.jpg",
        status:0
      },
      {
        username: "Tom",
        sex:'男',
        address: "四川省成都市",
        content:'简介',
        img: "http://cool.gumpxd.cn/file/1637911407793.jpg",
        status:0
      },
      {
        username: "Tom",
        sex:'男',
        address: "四川省成都市",
        content:'简介',
        img: "http://cool.gumpxd.cn/file/1637911407793.jpg",
        status:1
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
