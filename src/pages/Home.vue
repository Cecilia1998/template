<template lang="html">
    <div class="home">
      <div class="body">
        <div class="header">

        </div>
        <div class="footer">
            <p>{{$t("home.msg1")}}</p>
            <p style="fong-size:22px;margin-top:20px;font-weight: 400;">{{$t("home.msg2")}}</p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="less">
  .home{
   
    display: flex;
    justify-content: center;

    background: url('../assets/img/icon.jpg') center center no-repeat;

    .body{
      margin-top: 40px;
      // width: 500px;
      // height: 500px;

      // display: flex;
      // flex-direction: column;
      // justify-content: center;
      // align-items: center;

      color: rgb(101,171,255);
      .header{
        width: 364px;
        height: 390px;

        // background: url('../assets/img/home.png') center center no-repeat;

        margin-bottom: 40px;
      }
      .footer{

          width: 650px;
          bottom: 30px;

          font-weight: lighter;
          font-size: 24px;
      }
    }
  }

</style>
