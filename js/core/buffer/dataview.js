define('core/buffer/dataview',[],()=>{
  var u=new Uint8Array(8),f=new Float32Array(u.buffer),d=new Float64Array(u.buffer)
  ,_='',R='read',W='write',U='U',S='*',G='Big',L='LE',B='BE'
  ,D='Doule',F='Float',I='Int'
  return Object.fromEntries([
    // /^(read|write)(big)?(u)?(int|doule|float)(\d+)?(le|be)?$/i
    //f:0,r:0,b:50,u:26,i:0,s:20,l:6
    //f:0,r:0,b:50,u:26,i:54,s:20,l:6
    //func,R|W,?Size,?Le|Be,?Unsign,?Big,<?Int|int|Doule|Float>
    [(b,i)=>b[i],R,8,_,U],
    [(b,i)=>b[i]<<24>>24,R,8],
    
    [(b,i)=>b[i]|b[i+1]<<8,R,16,L,U],
    [(b,i)=>(b[i]|b[i+1]<<8)<<16>>16,R,16,L],
    [(b,i)=>b[i]<<8|b[i+1],R,16,B,U],
    [(b,i)=>(b[i]<<8|b[i+1])<<16>>16,R,16,B],

    [(b,i)=>(b[i]|b[i+1]<<8|b[i+1]<<16|b[i+1]<<24)>>>0,R,32,L,U],
    [(b,i)=>b[i]|b[i+1]<<8|b[i+1]<<16|b[i+1]<<24,R,32,L],
    [(b,i)=>(b[i]<<24|b[i+1]<<16|b[i+1]<<8|b[i+1])>>>0,R,32,L,U],
    [(b,i)=>b[i]<<24|b[i+1]<<16|b[i+1]<<8|b[i+1],R,32,L],

    [(b,i)=>(u[0]=b[i],u[1]=b[i+1],u[2]=b[i+2],u[3]=b[i+3],+f[0]),R,_,L,_,_,F],
    [(b,i)=>(u[3]=b[i],u[2]=b[i+1],u[1]=b[i+2],u[0]=b[i+3],+f[0]),R,_,B,_,_,F],
    
    [(b,i)=>(u[0]=b[i],u[1]=b[i+1],u[2]=b[i+2],u[3]=b[i+3],u[4]=b[i+4],u[5]=b[i+5],u[6]=b[i+6],u[7]=b[i+7],+f[0]),R,_,L,_,_,D],
    [(b,i)=>(u[0]=b[i],u[1]=b[i+1],u[5]=b[i+2],u[4]=b[i+3],u[3]=b[i+4],u[2]=b[i+5],u[1]=b[i+6],u[0]=b[i+7],+f[0]),R,_,L,_,_,D],

    
    [(b,i,v)=>b[i]=v,W,8,_,U],
    [(b,i,v)=>b[i]=v,W,8],
    
    [(b,i,v)=>{b[i]=v,b[i+1]=v>>8},W,16,L,S],
    [(b,i,v)=>{b[i]=v>>8,b[i+1]=v},W,16,B,S],

    [(b,i,v)=>{b[i]=v,b[i+1]=v>>8,b[i+2]=v>>16,b[i+3]=v>>24},W,16,L,S],
    [(b,i,v)=>{b[i]=v>>24,b[i+1]=v>>16,b[i+2]=v>>8,b[i+3]=v},W,16,B,S],

    [(b,i,v)=>{f[0]=v,b[i]=u[0],b[i+1]=u[1],b[i+2]=u[2],b[i+3]=u[3]},W,_,L,_,_,F],
    [(b,i,v)=>{f[0]=v,b[i]=u[3],b[i+1]=u[2],b[i+2]=u[1],b[i+3]=u[0]},W,_,B,_,_,F],
    
    [(b,i,v)=>{d[0]=v,b[i]=u[0],b[i+1]=u[1],b[i+2]=u[2],b[i+3]=u[3],b[i+4]=u[4],b[i+5]=u[5],b[i+6]=u[6],b[i+7]=u[7]},W,_,L,_,_,D],
    [(b,i,v)=>{d[0]=v,b[i]=u[7],b[i+1]=u[6],b[i+2]=u[5],b[i+3]=u[4],b[i+4]=u[3],b[i+5]=u[2],b[i+6]=u[1],b[i+7]=u[0]},W,_,B,_,_,D],

  ]
    // copy and rename UInt to Uint
    .flatMap(n=>n[4]===S?[(n[4]=U,[...n]),(n[4]=_,n)]:[n])
    .flatMap(n=>n[4]?[[...n],(n[6]='int',n)]:[n])
    // copy unsigned to signed writer
    // /^(read|write)(big)?(u)?(int|doule|float)(\d+)?(le|be)?$/i
                            
    .map(([f,r,s,l,u,b,i,n])=>[
      [r,b||_,u||_,i||I,s||_,l||_].join('')
      ,r===R?function(a){return f(this,a)}:function(a,b){f(this,a,b)}
    ])
  )
})
