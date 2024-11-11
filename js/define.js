globalThis.define=(n,r,f)=>{
  var m="object"==typeof exports&&"undefined"!=typeof module&&module
  ,g=m||this||"object"==typeof globalThis&&globalThis||self
  ,d=Object.defineProperty
  ,q=d=>(d=r.map(e=>t(e))).some(d=>d&&"function"==typeof d.then)?Promise.all(d).then(d=>f.apply(this,d)):f.apply(this,d)
  ,t="function"==typeof require?require:(k,t=Object.getOwnPropertyDescriptor(g,k))=>(
    t&&t.get?t.get.call(g):t&&!t.set?t.value:
    {then:r=>d(g,k,{set(e){r(e),t?d(g,k,t):delete g[k],g[k]=e},configurable:!0})}
  )
  return m?m.exports=q():"function"==typeof define&&define.amd?define(n,r,f):g[n]=q();
}
