<template>
  <div class="materialReceivingRecordsPrintModel1">
    <div class="printItem" v-for="(item,index) in data" :key="index">
      <table cellspacing="0">
        <caption>原辅料接收记录</caption>
        <tbody>
          <tr>
            <td class="content-stretch">原辅料名称</td>
            <td>{{item.mitemname}}</td>
            <td class="content-stretch">货号</td>
            <td>{{item.mitemid}}</td>
          </tr>
          <tr>
            <td class="content-stretch">原辅料外包装名称</td>
            <td>{{item.mitemspecname}}</td>
            <td class="content-stretch">级别</td>
            <td>{{item.mitemgradle}}</td>
          </tr>
          <tr>
            <td class="content-stretch">交货单原辅料名称</td>
            <td>{{item.sourcemitemname}}</td>
            <td class="content-stretch">到货日期</td>
            <td>{{item.deliverydate}}</td>
          </tr>
          <tr>
            <td class="content-stretch">最大包装规格</td>
            <td>{{item.maxmitemspec}}</td>
            <td class="content-stretch" rowspan="2">批号</td>
            <td rowspan="2">{{item.producercode}}</td>
          </tr>
          <tr>
            <td class="content-stretch">最小包装规格</td>
            <td>{{item.minmitemspec}}</td>
          </tr>
          <tr>
            <td class="content-stretch">物料编号</td>
            <td>{{item.materialid}}</td>
            <td class="content-stretch">件数</td>
            <td>{{item.num}}</td>
          </tr>
          <tr>
            <td class="content-stretch">接受总量</td>
            <td>{{item.receiveqty}}</td>
            <td class="content-stretch">有效期至</td>
            <td>{{item.validatedate}}</td>
          </tr>
          <tr>
            <td class="content-stretch">生产厂家</td>
            <td colspan="3">{{item.producercode1}}</td>
          </tr>
          <tr>
            <td class="content-stretch">经销商</td>
            <td colspan="3">{{item.dealer}}</td>
          </tr>
          <tr class="content-center">
            <td colspan="2">检 查 项 目</td>
            <td>判 定</td>
            <td>备 注</td>
          </tr>
          <tr>
            <td colspan="2">1.原辅料的代理商名称、生产商名称、生产商地址、货号、包装规格等信息与合格供应商清单一致</td>
            <td class="content-center">
              <Checkbox v-model="item.suppisqualified" :true-value="1" :false-value="0">是</Checkbox>
              <Checkbox v-model="item.suppisqualified" :true-value="0" :false-value="1">否</Checkbox>
            </td>
            <td></td>
          </tr>
          <tr>
            <td colspan="2">2.原辅料包装容器上的名称、货号、规格、批号等信息应与送货单相符，票、物相符</td>
            <td class="content-center">
              <Checkbox v-model="item.iscomplete" :true-value="1" :false-value="0">是</Checkbox>
              <Checkbox v-model="item.iscomplete" :true-value="0" :false-value="1">否</Checkbox>
            </td>
            <td></td>
          </tr>
          <tr>
            <td colspan="2">3.原辅料包装无破损，标识清晰，密封件无损坏情况（如瓶盖、袋子的封口）、无明显被开启或被污染的情况</td>
            <td class="content-center">
              <Checkbox v-model="item.packingisok" :true-value="1" :false-value="0">是</Checkbox>
              <Checkbox v-model="item.packingisok" :true-value="0" :false-value="1">否</Checkbox>
            </td>
            <td></td>
          </tr>
          <tr>
            <td colspan="2">4.每批原辅料附有供应商盖鲜章的检验合格报告或经过供应商确认的原辅料质量符合性证明材料</td>
            <td class="content-center">
              <Checkbox v-model="item.checkisok" :true-value="1" :false-value="0">是</Checkbox>
              <Checkbox v-model="item.checkisok" :true-value="0" :false-value="1">否</Checkbox>
            </td>
            <td></td>
          </tr>
          <tr>
            <td colspan="2">5.冷藏储存的原辅料应采用冷藏运输，冷冻储存的原辅料应采用冷冻运输</td>
            <td class="content-center">
              <Checkbox v-model="item.transportisok" :true-value="1" :false-value="0">是</Checkbox>
              <Checkbox v-model="item.transportisok" :true-value="0" :false-value="1">否</Checkbox>
            </td>
            <td></td>
          </tr>
          <tr>
            <td colspan="4">
              <p>若为需要温度控制的原辅料验收应核对一下信息：</p>
              <p>
                冷藏运输：冰盒或冰袋。冰盒或冰袋有冰凉感，内容物可流动。
                <Checkbox v-model="item.freezingisok" :true-value="1" :false-value="0">是</Checkbox>
                <Checkbox v-model="item.freezingisok" :true-value="0" :false-value="1">否</Checkbox>
              </p>
              <p>
                冷冻运输：干冰未化冻：冷冻的冰盒或冰袋，内容物不流动。
                <Checkbox v-model="item.coldisok" :true-value="1" :false-value="0">是</Checkbox>
                <Checkbox v-model="item.coldisok" :true-value="0" :false-value="1">否</Checkbox>
              </p>
              <p>
                <Row >
                  <Col span='12'>
                    到货开始验收时间：
                  </Col>
                  <Col span='12'>
                    全部转入储存仓库的时间：
                  </Col>
                </Row>
              </p>
              <p>(非常温运输原辅料到货验收后需在30分钟内放置到要求储存的温度范围内，验收开始时间和转入储存仓库的时间填写方式为几时几分，如：16：20)</p>
            </td>
          </tr>
          <tr>
            <td colspan="4">
              <p>结论：</p>
              <Row>
                <Col span="4">
                  <Checkbox v-model="item.iqcresult" :true-value="1" :false-value="0">接收</Checkbox>
                </Col>
                <Col span="4">
                  <Checkbox v-model="item.iqcresult" :true-value="0" :false-value="1">不接收</Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  接收人及日期：
                </Col>
                <Col span="12">
                  审核人及日期：
                </Col>
              </Row>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="note">
        注：1.批号：填写供方批号：若供方无批号则按进厂年号、月号和当月流水号编注批号，用括号注明“自编”。2.件数：最大包装数。3.若供应商盖鲜章的检验报告未随货同行时应在第4项备注中记录检验报告提交的时间
      </div>
    </div>

  </div>
</template>

<script>
  export default{
    name:"materialReceivingRecordsPrintModel1",
    props:{
      data:Array
    },
    data(){
      return{

      }
    },
    created() {
    },
    methods:{

    }
  }
</script>

<style lang="less">
@import '../assets/styles/common';
.materialReceivingRecordsPrintModel1{
  // margin: 0 auto;

  .printItem{
    width: 21cm;
    height: 29.7cm;
    margin: 0 auto;
    font-size: 16px;
    .ivu-checkbox-wrapper{
      font-size: 16px;
    }
    .ivu-checkbox-inner{
      border-color: #515A6E;
    }
    .ivu-checkbox-checked .ivu-checkbox-inner{
      border-color: #515A6E;
      background-color: #fff;
      &:after{
        border-color:#515A6E;
      }
    }
    table{
      text-align: left;
      border-top: solid 1px #888;
      border-left: solid 1px #888;
      caption{
        font-weight: bold;
        font-size: 20px;
        font-family: "arial black";
      }
      td{
        padding: 5px;
        border-bottom: solid 1px #888;
        border-right: solid 1px #888;
      }
      p{
        line-height: 2;
      }
      tr:nth-child(10) td{
        word-spacing: 20px;
      }
      tr:first-child{
        td:first-child{
          width: 25%;
        }
        td:nth-child(2){
          width: 40%;
        }
        td:nth-child(3){
          width: 15%;
        }
        td:nth-child(4){
          width: 20%;
        }
      }
      .ivu-checkbox-group{
        display: inline-block;
      }
      .content-stretch{
        text-align: justify;
        text-align-last: justify;
      }
      .content-center{
        text-align: center;
      }

    }
    .note{
      font-size: 14px;
      text-align: left;
    }
  }
}
</style>
