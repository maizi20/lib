define('promise',[],()=>{
  var w=(r,j)=>e=>e&&'function'===typeof e.then?e.then(w(r,j),j):r(e);
  Object.defineProperty(Promise,'resolveTo',{
    value(){
      val&&'function'===typeof val.then?val.then(e=>recall(null,e),e=>recall(e,null)):recall(null,val)
    },configurable:!0
  })
  Object.defineProperty(Promise,'ErrorFirst',{
    value:f=>new this((r,j)=>f((e,v)=>e?j(e):r(v)))
    ,configurable:!0
  })
  class HurryPromise extends Promise{
    constructor(f){
      super((r,j)=>{a=r,b=j});
      var a,b,q=s=>e=>{
        d&&=a=b=q=(d.forEach(d.push=f=>(f(e,s),0)),d.length=0,s?b:a)(e)
      },d=this.#d;
      try{f(w(q(0),q(1)),q(1))}catch(e){q(1)(e)};
    }then(a,b){
      return#d in this?new HurryPromise((r,j)=>~-this.#d.push((e,s)=>{
        try{
          'function'===typeof(s?b:a)?w(r,j)((s?b:a)(e)):(s?j:r)(e)
        }catch(err){j(err)}
      })||super.then(n=>{},n=>{})):super.then(a,b)
    }#d=[]
  }
  return{Promise,HurryPromise}
})
