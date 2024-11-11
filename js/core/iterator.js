define('iterator',[],()=>{
  var{
    assign:a,getPrototypeOf:p,setPrototypeOf:s,defineProperty:d,getOwnPropertyDescriptor:g,getOwnPropertyNames:n
  }=Object,h=class{
    constructor(){
      if(new.target===h.constructor)
        throw new TypeError(`Abstract class Iterator not directly constructable`);
    }[Symbol.iterator](){
      return this
    }reduce(f,init){
      var n=arguments.length>1?init:this.next().value,m,c=0;
      for(m of this)n=f(n,m,c++);return n
    }toArray(){
      return[...this]
    }forEach(f,t){
      var n,c=0;
      if(arguments.length>1)for(n of this)f(n,c++);
      else for(n of this)f.call(t,n,c++);
    }some(f,t){
      var n,c=0;
      if(arguments.length>1)for(n of this)if(f(n,c++))return!0;
      else for(n of this)if(f.call(t,n,c++))return!0;
      return!1
    }every(f,t){
      var n,c=0;
      if(arguments.length>1)for(n of this)if(!f(n,c++))return!1;
      else for(n of this)if(!f.call(t,n,c++))return!1;
      return!0
    }find(f,t){
      var n,c=0;
      if(arguments.length>1)for(n of this)if(f(n,c++))return n;
      else for(n of this)if(f.call(t,n,c++))return n;
    }*map(f,t){
      var n,c=0;
      if(arguments.length>1)for(n of this)yield f(n,c++);
      else for(n of this)yield f.call(t,n,c++);
    }*filter(f,t){
      var n,c=0;
      if(arguments.length>1)for(n of this)if(f(n,c++))yield n;
      else for(n of this)if(f.call(t,n,c++))yield n;
    }*take(c){
      var n;for(n of c){if(!c--)break;yield n}
    }*drop(c){
      var n;for(n of c){if(!c--)break}yield*this
    }*flatMap(){
      var n,c=0;
      if(arguments.length>1)for(n of this)yield*f(n,c++);
      else for(n of this)yield*f.call(t,n,c++);
    }
  }.prototype
  ,warp=n=>('[object GeneratorFunction]'===toString.call(n.value)&&(n.value.prototype=helper),n)
  ,ge=p(function*(){}.prototype)
  ,u=p(ge)
  ,helper={next:ge.next,return:ge.return,[Symbol.toStringTag]:"Iterator Helper",constructor:h.constructor}
  ;u.constructor===Object&&(u.constructor=h.constructor)
  ;return n(h).forEach(k=>{
    g(u,k)||d(u,k,warp(g(h,k)))
  }),{
    Iterator:u.constructor
    ,toStream:n=>new ReadableStream({
      pull:e=>new Promise(r=>r(n.next(e.desiredSize))).then(a=>a.done?e.close(a.value):e.enqueue(a.value),a=>e.error(a))
      ,async*g(n){yield*n},start(){n=this.g(n)}
    })
    ,fromStream:n=>(n=n.getReader(),n.next=n.read,n[Symbol.asyncIterator]=()=>n,n)
    ,toArrayAsync:async n=>{
      var o=[],e;for await(e of n)o.push(e);return o
    }
  }
})
