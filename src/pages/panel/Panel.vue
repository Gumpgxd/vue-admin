<template>
  <div class="pd-le-ri">
    <el-row :gutter="20">
      <!-- 头部 -->
      <el-col :span="8">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <div class="grid-content grid-con-1">
            <el-icon class="grid-con-icon"><zoomIn /></el-icon>
            <div class="grid-cont-right">
              <div class="grid-num">1234</div>
              <div>用户访问量</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <div class="grid-content grid-con-2">
            <el-icon class="grid-con-icon"><avatar /></el-icon>
            <div class="grid-cont-right">
              <div class="grid-num">321</div>
              <div>用户数量</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <div class="grid-content grid-con-3">
            <el-icon class="grid-con-icon"><list /></el-icon>
            <div class="grid-cont-right">
              <div class="grid-num">5000</div>
              <div>音乐数量</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <!-- 内容 -->
      <!-- 左侧 -->
      <el-col :span="7" class="pdt20">
        <el-card
          shadow="hover"
          :body-style="{ padding: '0px' }"
          style="height: 350px; padding: 0 20px"
        >
          <div class="user-info">
            <img
              src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
              class="user-avator"
              alt="avatar"
            />
            <div class="user-info-cont">
              <div class="user-info-name">靓仔.</div>
              <div>管理员</div>
            </div>
          </div>
          <div class="user-info-list" style="padding-top: 20px">
            上次登录地址：
            <span>四川成都</span>
          </div>
          <div class="user-info-list" style="padding: 17px 0 10px; display: flex">
            管理员账号：
            <span style="display: block; margin-left: 90px">3258694391</span>
          </div>
          <div class="user-info-list">
            修改密码：
            <span
              ><el-button type="primary" style="margin-left: 27px"
                >修改密码</el-button
              ></span
            >
          </div>
        </el-card>
        <el-card shadow="hover" :body-style="{ padding: '0px' }" class="mgt20">
          <div id="sex" style="width: 100%; height: 400px"></div>
        </el-card>
      </el-col>
      <!-- 右侧 -->
      <el-col :span="17" class="pdt20">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <div id="main" style="width: 100%; height: 300px"></div>
        </el-card>
        <el-card shadow="hover" :body-style="{ padding: '0px' }" class="mgt20">
          <div id="map" style="width: 100%; height: 450px"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Avatar, ZoomIn, List } from "@element-plus/icons";
import * as echarts from "echarts";
import china from "../../assets/json/china.json";
const China:any = china;
echarts.registerMap("china", China);

interface myParams {
  seriesName?: string;
  name?: string;
  value?: number;
}

export default defineComponent({
  components: {
    Avatar,
    ZoomIn,
    List,
  },
  mounted() {
    // 绘制条形图
    const myChart = echarts.init(
      document.getElementById("main") as HTMLDivElement
    );
    // 绘制地图
    const myMap = echarts.init(
      document.getElementById("map") as HTMLDivElement
    );
    //绘制男女比例
    const sexData = echarts.init(
      document.getElementById("sex") as HTMLDivElement
    );
    // 绘制条形图
    myChart.setOption({
      color: "#6495ED",
      title: {
        text: "近期注册用户数",
        left: "center",
        subtext: "模拟数据",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        // orient: 'horizontal',
        data: ["注册人数"],
        x: "center",
        // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
        y: "bottom",
      },
      xAxis: {
        data: ["五月", "六月", "七月", "八月", "九月", "十月", "十一月"],
      },
      yAxis: {},
      series: [
        {
          name: "注册人数",
          type: "line",
          data: [18, 20, 29, 13, 10, 20, 9],
        },
      ],
    });
    // 绘制地图
    myMap.setOption({
      title: {
        tetx: "各地区使用人数",
        left: "center",
      },
      tooltip: {
        formatter: function (params: myParams) {
          return (
            params.seriesName + "<br />" + params.name + "：" + params.value
          );
        }, //数据格式化
      },
      visualMap: {
        min: 0,
        max: 100,
        left: "left",
        //   top: "left",
        text: ["数量较多", "数量较少"], //取值范围的文字
        inRange: {
          color: ["#fff4e6", "#dd2002"], //取值范围的颜色
        },
        show: true, //图注
      },
      geo: {
        map: "china",
        roam: true, //不开启缩放和平移
        zoom: 1.5, //视角缩放比例
        label: {
          normal: {
            show: true,
            fontSize: "8", //注意：地图省份名字字体如果过大会导致字体重叠
            color: "rgba(0,0,0,0.5)",
          },
        },
        itemStyle: {
          lineStyle: {
            width: 3,
          },
          normal: {
            borderColor: "rgba(0, 0, 0, 0.2)",
          },
          emphasis: {
            areaColor: "#F3B329", //鼠标选择区域颜色
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 20,
            borderWidth: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
      series: [
        {
          name: "信息量",
          type: "map",
          geoIndex: 0,
          data: this.dataList,
        },
      ],
    });
    // 绘制男女比例
    sexData.setOption({
      color: ["#00BFFF", "#FFB6C1"],
      title: {
        text: "性别组成", //主标题
        subtext: "使用用户性别比例", //副标题
        x: "center", //x轴方向对齐方式
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: ["男", "女"],
      },
      axisName: {
        color: "#fff",
        backgroundColor: "#999",
        borderRadius: 3,
        padding: [3, 5],
      },
      series: [
        {
          name: "数据来源",
          type: "pie",
          radius: "55%",
          center: ["50%", "55%"],
          data: this.sexData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    });
  },
  setup() {
    const dataList = [
      { name: "南海诸岛", value: 3 },
      { name: "北京市", value: 16 },
      { name: "天津市", value: 9 },
      { name: "上海市", value: 27 },
      { name: "重庆市", value: 28 },
      { name: "河北省", value: 6 },
      { name: "河南省", value: 7 },
      { name: "云南省", value: 8 },
      { name: "辽宁省", value: 6 },
      { name: "黑龙江省", value: 17 },
      { name: "湖南省", value: 15 },
      { name: "安徽省", value: 5 },
      { name: "山东省", value: 21 },
      { name: "新疆维吾尔自治区", value: 4 },
      { name: "江苏省", value: 32 },
      { name: "浙江省", value: 29 },
      { name: "江西省", value: 3 },
      { name: "湖北省", value: 4 },
      { name: "广西壮族自治区", value: 5 },
      { name: "甘肃省", value: 4 },
      { name: "山西省", value: 5 },
      { name: "内蒙古自治区", value: 2 },
      { name: "陕西省", value: 23 },
      { name: "吉林省", value: 14 },
      { name: "福建省", value: 27 },
      { name: "贵州省", value: 15 },
      { name: "广东省", value: 47 },
      { name: "青海省", value: 6 },
      { name: "西藏自治区", value: 2 },
      { name: "四川省", value: 78 },
      { name: "宁夏回族自治区", value: 3 },
      { name: "海南省", value: 5 },
      { name: "台湾省", value: 16 },
      { name: "香港", value: 18 },
      { name: "澳门", value: 1 },
    ];
    const sexData = [
      { name: "男", value: "103" },
      { name: "女", value: "159" },
    ];
    return {
      dataList,
      sexData,
    };
  },
});
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}
.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}
.grid-num {
  font-size: 30px;
  font-weight: bold;
}
.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 115px;
  color: #fff;
}
.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}
.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}
.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}
.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}
.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}
.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}
.pdt20 {
  padding-top: 20px;
}
.mgt20 {
  margin-top: 20px;
}
.user-info {
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-bottom: 2px solid #ccc;
}
.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}
.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}
.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}
.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}
.user-info-list span {
  margin-left: 70px;
}
</style>
