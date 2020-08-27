<template>
  <i-form>
    <Form-item v-for="(item,index) in items" :key="index" :prop="item.prop" :label="item.label" :label-width="item.labelWidth">


      <i-input v-if="item.itemType=='i-input'" :type='item.type' laceholder="item.placeholder" :value.sync="item.value"
      :style="item.style" :size="item.size" :icon="item.icon" :readonly="item.readonly" :disabled="item.disabled"
      @change='item.change'>
        <!-- 根据需要添加前缀 -->
        <span slot="prepend" v-if="item.prepend!=null&&item.prepend.type=='span'">{{item.prepend.content}}</span>
        <i-select slot="prepend" v-if="item.prepend!=null&&item.prepend.type=='i-select'" :value.sync="item.prepend.value">
          <i-option v-for="(opt,o) in item.prepend.options" :key="o" :value="opt.value">{{opt.content}}</i-option>
        </i-select>

        <!-- 根据需要添加后缀 -->
        <span slot="append" v-if="item.append!=null&&item.append.type=='span'">{{item.append.content}}</span>
        <i-select slot="append" v-if="item.append!=null&&item.append.type=='i-select'" :value.sync="item.append.value">
          <i-option v-for="(opt,o) in item.append.options" :key="o" :value="opt.value">{{opt.content}}</i-option>
        </i-select>
      </i-input>

      <i-select v-if="item.itemType == 'i-select'" :placeholder="item.placeholder" :value.sync="item.value"
      :style="item.style" :size="item.size" :icon="item.icon" :disabled="item.disabled">
        <i-option v-for="(opt,i) in item.options" v-if="item.itemType == 'i-select'" :key="i" :value="opt.value">
          {{opt.content}}
        </i-option>
      </i-select>

    </Form-item>
  </i-form>
</template>

<script>
  export default{
    data(){
      return {
        form:{
          name:"wang"
        }
      }
    },
    props:["items"]
  }
</script>

<style>
</style>
