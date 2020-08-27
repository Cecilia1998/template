<template>
  <div class="print">
    <div class="boxcode-header">
      HANARO
    </div>
    <table class="boxcode-content" cellspacing="0">
      <tr>
        <td colspan="4">
          <div class="title">AIR WAYBILL NO.</div>
          <div class="content">
            LUFTHANS
          </div>
        </td>
        <td colspan="2">
          <div class="title">DESTINATION</div>
          <div class="content">12345678</div>
        </td>
      </tr>
      <tr>
        <td colspan="4">
          <img id="jsbarcode1" />
        </td>
        <td colspan="2">
          <div class="title">TOTAL NO.OF PCS</div>
        </td>
      </tr>
      <tr>
        <td colspan="6"></td>
      </tr>
      <tr>
        <td colspan="4">
           <div class="title">HAWB#</div>
           <div class="content">
             {{number}}
           </div>
        </td>
        <td>
          <div class="title">H DEST</div>
          <div class="content">AMS</div>
        </td>
        <td>
          <div class="title">DEPT</div>
          <div class="content">AMS</div>
        </td>
      </tr>
      <tr>
        <td colspan="4">
          <img id="jsbarcode2" />
        </td>
        <td colspan="2">
          <div class="title">H.PCS</div>
          <div class="content">PVG</div>
        </td>
      </tr>
    </table>

  </div>
</template>
<script>
import JsBarcode from "jsbarcode"
  export default{
    name:"print",
    props:{

    },
    data(){
      return {
        text:"LUFTHANS",
        number:"522 3221 0212"
      }
    },
    methods:{

    },
    created() {
      // JsBarcode("#jsbarcode").init()
    },
    mounted(){
      JsBarcode("#jsbarcode1", this.text)
      JsBarcode("#jsbarcode2",this.number)
    }

  }
</script>

<style lang="less">
  .print{
    font-weight: bold;
    .boxcode-header{
      font-size: 36px;
      padding-left: 20px;
    }
    .boxcode-content{
      width:100%;
      tr:first-child{
        td:nth-child(2){
          border-bottom: solid 2px gray;
        }
      }
      tr:nth-child(4){
        td:nth-child(2){
          border-right: solid 2px gray;
        }
        td:not(:nth-child(1)){
          border-bottom: solid 2px gray;
        }
      }
      tr:not(:nth-child(3)){
        td:first-child{
          border-right: solid 2px gray;
        }
      }
      tr:nth-child(3){
        td{
          border-top: solid 2px gray;
          border-bottom: solid 2px gray;
        }
      }
      #jsbarcode1,#jsbarcode2{
        height: 60px;
        width:100%;
      }

      td{
        padding-left: 10px;
        width:100px;
        height:50px;
      }
      .title{
        font-size: 20px;
      }
      .content{
        font-size: 30px;
      }
    }
  }
</style>
