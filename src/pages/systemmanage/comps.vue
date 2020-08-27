<template>
  <div class="comps">

    <div class="outter">
      <div class="border"></div>
      <div class="tri"></div>
      <div class="inner">
        随便写一点内容看看随便写一点内容看看
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name:"comps",
    components:{
    },
    data(){
      return{
      }
    }
  }
</script>

<style lang="less">

  @width:200px;
  @height:50px;
  #borderWidth(){
    primary:1px;
    bold:3px;
  };
  @clipWidthHor:18px;
  @clipWidthVert:12px;
  .outter{
    width: @width;
    height: @height;
    position: relative;
    background-color: lightblue;
    clip-path: polygon(0 0, 100% 0, 100% 100%,
        @clipWidthHor 100%, 0 calc(100% - @clipWidthVert));
    .border{
      height:1px;
      width:60px;
      background-color:royalblue;
      position:absolute;
      right:0;
      top:-1;
      z-index: 3;
    }
    .tri{
      height:6px;
      width:10px;
      background-color:royalblue;
      clip-path: polygon(0 0,100% 0,100% 100%);
      position:absolute;
      right:0;
      top:0;
      z-index: 6;
    }
    .inner{
      width: calc(100% - #borderWidth[primary]*2);
      height: calc(100% - #borderWidth[primary]*2);
      position: absolute;
      top: #borderWidth[primary];
      left: #borderWidth[primary];
      background-color: white;
      padding:5px 20px;
      clip-path: polygon(0 0, 100% 0, 100% 100%,
          (@clipWidthHor - #borderWidth[primary]) 100%, 0 calc(100% - (@clipWidthVert - #borderWidth[primary])));
    }
    .inner::before{
      content:"";
      width:8px;
      height:12px;
      // background-color: lightblue;
      position:absolute;
      left:0;
      top:0;
      background: linear-gradient(-45deg,transparent 5px,royalblue 0);
    }
    .inner::after{
      content:"";
      width:20px;
      height: 8px;
      background-color: royalblue;
      clip-path: polygon(100% 0,100% 100%,0 100%);
      position:absolute;
      right:0;
      bottom:0;
    }
  }
</style>
