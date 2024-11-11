define('global',[],g=>(
  function f(){
    var c=n=>{if(n)try{return n.__check_globals=1,__check_globals}catch(e){}finally{delete n.__check_globals}}
    try{if(c(g=this))return g}catch(e){}
    try{if(c(g='object'==typeof globalThis&&globalThis))return g}catch(e){}
    try{if(c(g='object'==typeof window&&window))return g}catch(e){}
    try{if(c(g='object'==typeof self&&self))return g}catch(e){}
    try{if(c(g='object'==typeof global&&global))return g}catch(e){}
    try{if(c(g=f.constructor('return this')()))return g}catch(e){}
    try{
      if(Object.defineProperty(Object.prototype,'__check_globals',{get(){return this},configurable:!0}),c(g=__check_globals))return g
    }catch(e){}finally{delete Object.prototype.__check_globals}
    throw new Error(`globalThis not found.`)
  }()
  ,g.self||=g,g.globalThis||=g,g.window||=g,g.global||=g,g
))
