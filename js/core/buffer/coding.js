define('core/buffer/coding',[],()=>{
  var{TextEncoder,TextDecoder}=globalThis
  ,te,td,b62='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  ,ascii={
    count:a=>a.length
    ,encode(b,s,i,l){
      l=Math.min(l,s.length);
      for(var p=0;p<l;++p)
        b[p+i]=s.charCodeAt(p)&127;
      return l
    },decode(b,i,l){
      for(var p=0,o=Array(l),f=String.fromCharCode;p<l;++i)
        o[p]=f(b[p+i]&127);return o.join('')
    }
  },latin1={
    cname:'binary'
    ,count:a=>a.length
    ,encode(b,s,i,l){
      l=Math.min(l,s.length);
      for(var p=0,n;p<l;++p)
        n=s.charCodeAt(p),b[i++]=n;
      return l
    },decode(b,i,l){
      for(var p=0,o=Array(l),f=String.fromCharCode;p<l;++i)
        o[p]=f(b[p+i]);return o.join('')
    }
  },ucs2={
    count:a=>a.length*2
    ,encode(b,s,i,l){
      l=Math.min(l,s.length*2);
      for(var p=0,n;p<l;++p)
        n=s.charCodeAt(p),b[i++]=n>>8,b[i++]=n&255
      return l
    },decode(b,i,l){
      for(var p=0,o=Array(l),f=String.fromCharCode;p<l;)
        o[p]=f(b[p+i++]|b[p+i++]<<8);return o.join('')
    }
  },utf16le={
    ...ucs2,cname:'utf16-le'
  },utf8={
    cname:'utf-8',
    count:n=>te.encode(n).length
    ,encode:(b,s,i,l)=>te.encodeInto(s,b.subarray(i,i+l)).written
    ,decode:(b,i,l)=>td.decode(b.subarray(i,i+l))
  },hex={
    chars:[...'0123456789abcdef'],charOffset:16,
    qchars:{A:0x1a,B:0x1b,C:0x1c,D:0x1d,E:0x1e,F:0x1f},
    count:a=>a.length+1>>>1
    ,encode(bin,str,ptr,size,tbl){
      for(var b=bin.subarray(ptr,size===void 0?void 0:size+ptr)
      ,i=0,j=0,l=(str+='').length,n=0,g=0,c=l>256&&(l=(str=str.split('')).length);i<l;)
        if((c=tbl[str[i++]]|0)&16&&(n=n<<4|c&15,g+=4)>7&&(b[ptr+j]=n>>(g-=8),++j===size))return j;
      return g?(b[ptr+j]=n>>g,++j):j
    },decode(b,i,l,t){
      for(var o=Array(l<<1),p=0,c;p<l;++p)
        c=b[i+p],o[p<<1]=t[c>>4],o[p<<1|1]=t[c&15];
      return o.join('');
    }
  },base64={
    chars:[...b62+'+/='],charOffset:64
    ,qchars:{_:127,'/':127,'+':126,'-':126}
    ,count:a=>(a.length*3+2>>2)-(a[a.length-1]==='='?a[a.length-2]==='='?2:1:0)
    ,encode(bin,str,ptr,size,tbl){
      if(!size)return 0;
      for(var b=bin.subarray(ptr,size===void 0?void 0:size+ptr)
      ,i=0,j=0,l=(str+='').length,n=0,g=0,c=l>256&&(l=(str=str.split('')).length);i<l;)
        if((c=tbl[str[i++]]|0)&64&&(n=n<<6|c&63,g+=6)>7&&(b[ptr+j]=n>>(g-=8),++j===size))return j;
      return g?(b[ptr+j]=n>>g,++j):j
    },decode(b,i,l,tbl){
      if(!l)return'';
      for(var o=Array(l),p=0,f=String.fromCharCode;p<l;++p)
        o[p]=f(b[i+p]);
      return o=btoa(o.join('')),
        tbl[64]!=='='&&o[o.length-1]==='='&&(o=o.slice(0,~(o[o.length-2]==='='))),
        tbl[63]!=='/'&&(o=o.split('/').join(tbl[63])),
        tbl[62]!=='+'&&(o=o.split('+').join(tbl[62])),o
    }
  },base64url={
    ...base64,chars:[...b62+'-_'],
  }
  ;TextDecoder&&(td=new TextDecoder)
  ;TextEncoder&&(te=new TextEncoder)
  ;return{
    ascii,
    base64,
    base64url,
    latin1,
    hex,
    ucs2,
    utf8,
  }
})
