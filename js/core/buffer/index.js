define('core/buffer',['buffer/core','buffer/coding','buffer/dataview'],(core,coding,dataview)=>{
  var{Buffer,nameToEnc,atob,btoa,core:{defineCoding}}=core
  ,buff=Buffer.prototype,ext=Object.getOwnPropertyDescriptors(dataview)
  ;delete ext.constructor,Object.defineProperties(buff,ext)
  ;Object.keys(coding).forEach(k=>coding[k]&&(coding[k].name=k,defineCoding(coding[k])))
  return core
})
