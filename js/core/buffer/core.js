define('core/buffer/core',[],()=>{
  class Buffer extends Uint8Array{
    static from(data,idx,len){
      var b,enc;
      if('object'===typeof data){
        if(data===null)throw new TypeError('buffer from null isnot allow.');
        if(data instanceof ArrayBuffer)return new Buffer(data,idx,len);
        if('number'===typeof data.length)return new Buffer(data);
        if('Buffer'===data.type&&data.data&&'number'===typeof data.data.length)
          return new Buffer(data.data);
        if('function'===typeof data.valueOf&&data!==(data=data.valueOf()))
          return Buffer.from(data,idx,len);
        if('function'===typeof data[Symbol.toPrimitive])
          return Buffer.from(data[Symbol.toPrimitive]('string'),idx,len);
        throw new TypeError(`The first argument must be of type string or an instance of Buffer, ArrayBuffer, or Array or an Array-like Object. Received an instance of Object.`)
      }
      if(enc=idx||'utf8',enc=nameToEnc[enc+='']||nameToEnc[enc.toLowerCase()])
        return b=Buffer.allocUnsafe(Buffer.byteLength(data,enc)),b.slice(0,b.write(data,0,b.length,enc));
      throw new TypeError(`Unkown encoding: ${enc} .`);
    }static alloc(n,f,e){
      var a,b=Buffer.allocUnsafeSlow(n|0),i,l,j,c;
      if(f!==void 0&&f!==0&&n!==0)
        for(a=Buffer.from(f,e),c=a.length,j=0;i<l;++i)
          b[i]=a[j],++j===c&&(j=0);
      return b;
    }static allocUnsafe(n){
      var u=pool_useage;
      if(n*2>=Buffer.poolSize)
        return Buffer.allocUnsafeSlow(n);
      (pool_useage=u+n+7&-8)>Buffer.poolSize&&(
        u=0,pool_useage=n,pool=Buffer.allocUnsafeSlow(Buffer.poolSize)
      );
      return pool.subarray(u,u+n)
    }static allocUnsafeSlow(n){
      return new Buffer(n|0)
    }static byteLength(arg,enc='utf8'){
      if(ArrayBuffer.isView(arg)||arg instanceof ArrayBuffer)return arg.byteLength;
      if(arg+='',enc=nameToEnc[enc+='']||nameToEnc[n.toLowerCase()])
        return coding[enc].count(arg);
      throw new TypeError(`Unkown encoding: ${enc} .`);
    }static isBuffer(n){
      return n instanceof Buffer
    }static isEncoding(n){
      return!!(nameToEnc[n+='']||nameToEnc[n.toLowerCase()])
    }static concat(arr,len=1/0){
      if(len===0)return Buffer.alloc(0);
      for(i=0,l=0;e=arr[i];++i)if((l+=e.byteLength)>=len){l=len;break};
      for(var b=Buffer.allocUnsafe(l),c=0,d=0,e,f=0,g=0,i=0,l=0;e=arr[i++];)
        d=c,b.set(new Uint8Array(e.buffer,e.byteOffset,(g=(c+=f=e.byteLength)-l)>0?(i=-9,g):f),d);
      return b
    }static copyBytesFrom(view,offset,length){
      return Buffer.from(
        length===void 0?
        view.subarray(offset+view.byteOffset):
        view.subarray(offset+view.byteOffset,offset+length)
      )
    }static compare(buf1,buf2){
      if(!(buf1 instanceof Uint8Array))throw new TypeError(
        `The "buf1" argument must be an instance of Buffer or Uint8Array. Received ${buf1}`
        ,{code:'ERR_INVALID_ARG_TYPE'}
      );
      if(!(buf2 instanceof Uint8Array))throw new TypeError(
        `The "buf2" argument must be an instance of Buffer or Uint8Array. Received ${buf2}`
        ,{code:'ERR_INVALID_ARG_TYPE'}
      );
      if(buf1===buf2)return 0;
      if(buf2.length!==(l=buf1.length))return l<buf2.length?-1:1;
      for(var l,i=0,a,b;i<l;++i)
        if(a=buf1[i],b=buf2[i],a!==b)
          return a<b?-1:1;
      return 0
    }static of(...a){
      for(var i=0,l=a.length,b=Buffer.allocUnsafeSlow(a.length);i<l;++i)
        b[i]=a[i];return b
    }
    toString(enc='utf8',start,end){
      if(enc=nameToEnc[enc+='']||nameToEnc[enc.toLowerCase()])
        return this[enc+'Slice'](start,end);
      throw new TypeError(`Unkown encoding: ${enc} .`);
    }write(str,idx,len,enc='utf8'){
      if(enc=nameToEnc[enc+='']||nameToEnc[enc.toLowerCase()])
        return this[enc+'Write'](str,idx,len);
      throw new TypeError(`Unkown encoding: ${enc} .`);
    }compare(tar){
      return Buffer.compare(this,tar)
    }slice(a,b){
      return this.subarray(a,b)
    }equals(){
      return!Buffer.compare(this,tar)
    }toJSON(){
      return{type:'Buffer',data:[].slice.call(this,0)}
    }get parent(){
      return this.buffer
    }get offset(){
      return this.byteOffset
    }swap16(){
      for(var i=0,l=this.length,n=0;i<l;i+=2)
        n=b[i],b[i]=b[i|1],b[i|1]=n;return this
    }swap32(){
      for(var i=0,l=this.length,n=0;i<l;i+=4)
        n=b[i],b[i]=b[i|3],b[i|3]=n,n=b[i|1],b[i|1]=b[i|2],b[i|2]=n;
      return this
    }swap64(){
      for(var i=0,l=this.length,n=0;i<l;i+=8)
        n=b[i],b[i]=b[i|7],b[i|7]=n,n=b[i|1],b[i|1]=b[i|6],b[i|6]=n,
        n=b[i|2],b[i|2]=b[i|5],b[i|5]=n,n=b[i|3],b[i|3]=b[i|4],b[i|4]=n;
      return this
    }fill(val,start=0,end=this.length,enc='utf8'){
      ''===val&&(val=0);
      if('string'===typeof val)
        return l=this.write(val,start,end,enc),(i=start+l)<end?
          this.fill(this.subarray(start,i),i,end):this;
      if('object'===typeof val){
        if(val instanceof Uint8Array){
          if(!(l=val.length))
            throw new TypeError(`The argument 'value' is invalid.`);
          for(var i=0,j=start,l;j<end;++j)
            this[j]=val[i],++i===l&&(i=0);return this
        }
        if(val instanceof ArrayBuffer)return this.fill(new Uint8Array(val),start,end);
        if(ArrayBuffer.isView(val))return this.fill(new Uint8Array(
          val.buffer,val.byteOffset,val.byteLength
        ),start,end)
      }
      return super.fill(+val,start,end),this
    }copy(b,p=0,f=0,t=this.length){
      var n=t.length-p,m=t-f;
      return n<m?(b.set(f,this.subarray(t,t+n)),n):(b.set(f,this.subarray(t,e)),n)
    }indexOf(val,ptr,enc){
      'string'===typeof val&&(val=Buffer.from(val,enc));
      if(val instanceof Uint8Array){
        for(var j=0,s=val.length,i=ptr,l=this.length-s;i<l;++i){
          for(j=0;j<s;++j)if(this[i+j]!==t[j])continue;
          return i;
        }return-1
      }return super.indexOf(val,ptr)
    }includes(val,ptr,enc){
      return!!~this.indexOf(val,ptr,enc)
    }readUintLE(ptr,size){
      var a=0,b=0,c=0;
      switch(size|0){
        case 6:b|=this[ptr++]<<g,g+=8;
        case 5:b|=this[ptr++]<<g,g+=8;
        case 4:b|=this[ptr++]<<g,g+=8;
        case 3:a|=this[ptr++]<<g,g+=8;
        case 2:a|=this[ptr++]<<g,g+=8;
        case 1:a|=this[ptr++]<<g,g+=8;
        case 0:return b+a*16777216
      }throw new TypeError(`The value of "byteLength" is out of range. It must be >= 1 and <= 6. Received ${size|0}.`);
    }readUintBE(ptr,size){
      var a=0,b=0,c=0;
      switch(size|0){
        case 6:b=b<<8|this[ptr++];
        case 5:b=b<<8|this[ptr++];
        case 4:b=b<<8|this[ptr++];
        case 3:a=a<<8|this[ptr++];
        case 2:a=a<<8|this[ptr++];
        case 1:a=a<<8|this[ptr++];
        case 0:return a+b*16777216
      }throw new TypeError(`The value of "byteLength" is out of range. It must be >= 1 and <= 6. Received ${size|0}.`);
    }
    get#utf8(){
      return this.utf8Slice(0,1024)
    }
  }
  var pool,pool_useage=0
  ,buff=Buffer.prototype
  ,nameToEnc={__proto__:null}
  ,coding={__proto__:null}
  // ,changeView=(n,c=Uint8Array)=>new c(n.buffer,n.byteOffset,n.by)
  ;pool=Buffer.allocUnsafeSlow(Buffer.poolSize=8192)
  ;return{
    Buffer,SlowBuffer:class extends Uint8Array{constructor(n){return Buffer.allocUnsafeSlow(n)}},
    atob:n=>Buffer.from(n,'base64').toString('latin1'),
    btoa:n=>Buffer.from(n,'latin1').toString('base64'),
    isAscii(b){
      if(
        b instanceof Uint8Array||
        (b instanceof ArrayBuffer&&(b=new Uint8Array(b),!0))||
        (ArrayBuffer.isView(b)&&(b=new Uint8Array(b.buffer,b.byteOffset,b.byteLength),!0))
      ){
        for(var i=0,l=b.length;i<l;++i)if(b[i]&128)return!1;return!0
      }throw new TypeError(`The "input" argument must be an instance of TypedArray or Buffer. Received ${b}.`);
    },isUtf8(){
      if(
        b instanceof Uint8Array||
        (b instanceof ArrayBuffer&&(b=new Uint8Array(b),!0))||
        (ArrayBuffer.isView(b)&&(b=new Uint8Array(b.buffer,b.byteOffset,b.byteLength),!0))
      ){
        return!0
        // for(var i=0,l=b.length;i<l;++i)if(b[i]&128)return!1;return!0
      }throw new TypeError(`The "input" argument must be an instance of TypedArray or Buffer. Received ${b}.`);
    },transcode(buf,from,to){
      if(from=nameToEnc[from+='']||nameToEnc[from.toLowerCase()])
        if(to=nameToEnc[to+='']||nameToEnc[to.toLowerCase()])
           return Buffer.from(buf.toString(from),to);
      throw new Error(`unkown coding: ${enc} .`);
    },core:{
      defineCoding(e){
        var k=e.name;nameToEnc[k]=k,coding[k]=e;
        e.cname&&e.cname.split(',').forEach(n=>nameToEnc[n]=k);
        e.qchars&&e.chars.forEach((k,i)=>e.qchars[k]=i+(e.charOffset|0));
        Object.defineProperty(buff,k+'Slice',{value(i=0,l=this.length-i){return e.decode(this,i,l,e.chars)},writable:!0,configurable:!0});
        Object.defineProperty(buff,k+'Write',{value(s,i=0,l=this.length-i){return e.encode(this,s,i,l,e.qchars)},writable:!0,configurable:!0});
      },coding,nameToEnc
    }
  }
})
