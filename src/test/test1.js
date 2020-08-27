/*
/!*let str = null;
  //str = "0"
if(str){
  console.log('str: true')
}else{
  console.log('str: false')
}
const M_0002_btn = 'str';*!/
const arr1 = [1,2];
const arr2 = [4,5,6]
arr1.push(1);
arr2.push(...arr1)
console.log(arr2)
console.log(arr1)
*/
const str = '${0} is pig';
//console.log(str)




function test(str,...p){
  //p.forEach(item=>console.log(item))
  //const str = `${p[0]} 不允许为空`;
  console.log(templateFunc(str,p))
}
test(str,'s1','s2','s3')
function templateFunc(str,data){
  return str.replace(/\$\{(\w+)\}/g,  (match, key)=> data[key]);
}
