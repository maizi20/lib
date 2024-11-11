import'../../js/core/buffer/coding.js'
import'../../js/core/buffer/dataview.js'
import'../../js/core/buffer/core.js'
import'../../js/core/buffer/index.js'
type Int=Number;
type TypedArray=Uint8Array|Int8Array|Uint16Array|Int16Array|Uint32Array|Int32Array|Float32Array|Float64Array|Uint8ClampedArray|BigUint64Array|BigInt64Array;
type Data=String|ArrayBuffer|TypedArray|DataView;
type BufferLike=Uint8Array|Buffer;
type coding='ascii'|'base64'|'base64url'|'latin1'|'hex'|'ucs2'|'utf8';
//String;
type BufferJson={type:'Buffer',data:[]}
type writer=(ptr:Number,val:Number)=>void
type writer_size=(ptr:Number,val:Number,size:Number)=>void
type reader=(ptr:Number)=>Number
type reader_size=(ptr:Number,size:Number)=>Number
type decode=(idx?:Number,len?:Number)=>String
type encode=(str:String,idx?:Number,len?:Number)=>Number
type buffer_from=(
    ((str:String,enc?:coding)=>Buffer)
    |((size:Int)=>Buffer)
    |((size:BufferLike)=>Buffer)
    |((size:ArrayBuffer)=>Buffer)
    |((data:Data,idx?:Int,len?:Int)=>Buffer)
    |((arr:typeof Array)=>Buffer)
)
interface buffer{
    Buffer:typeof Buffer
    SlowBuffer:(Int)=>Buffer
    transcode:(str:String)=>String
    isUtf8:(buf:BufferLike)=>Boolean
    isAscii:(buf:BufferLike)=>Boolean
    kMaxLength:Int,kStringMaxLength:Int,INSPECT_MAX_BYTES:Int
    btoa:(String)=>String,atob:(String)=>String
    constants:{
        MAX_LENGTH: 4294967296, MAX_STRING_LENGTH: 536870888
    }
    MAX_LENGTH: 4294967296, MAX_STRING_LENGTH: 536870888
    //,Blob,resolveObjectURL,File
}
interface Buffer_{
    asciiSlice:decode,base64Slice:decode,base64urlSlice:decode,latin1Slice:decode,hexSlice:decode,ucs2Slice:decode,utf8Slice:decode
    asciiWrite:encode,base64Write:encode,base64urlWrite:encode,latin1Write:encode,hexWrite:encode,ucs2Write:encode,utf8Write:encode
    readUInt8:reader,readUint8:reader,readInt8:reader,readUInt16LE:reader,readUint16LE:reader,readInt16LE:reader,readUInt16BE:reader,readUint16BE:reader,readInt16BE:reader,readUInt32LE:reader,readUint32LE:reader,readInt32LE:reader,readFloatLE:reader,readFloatBE:reader,readDouleLE:reader
    writeUInt8:writer,writeUint8:writer,writeInt8:writer,writeUInt16LE:writer,writeUint16LE:writer,writeInt16LE:writer,writeUInt16BE:writer,writeUint16BE:writer,writeInt16BE:writer,writeFloatLE:writer,writeFloatBE:writer,writeDouleLE:writer,writeDouleBE:writer
    readUintLE:reader_size,readUIntLE:reader_size,readIntLE:reader_size,readUintBE:reader_size,readUIntBE:reader_size,readIntBE:reader_size,
    writeIntLE:writer_size,writeUIntLE:writer_size,writeUintLE:writer_size,writeIntBE:writer_size,writeUIntBE:writer_size,writeUintBE:writer_size,
}
class Buffer{
    static from:buffer_from
    static alloc:(size:Int)=>Buffer
    static allocUnsafe:(size:Int)=>Buffer
    static allocUnsafeSlow:(size:Int)=>Buffer
    static byteLength:((data:Data)=>Int)|((str:String,enc?:coding)=>Int)
    static isBuffer:(any)=>Boolean
    static isEncoding:(any)=>Boolean
    static concat:(Array,len?:Int)=>Buffer
    static copyBytesFrom:(view,offset,length)=>Buffer
    static compare:(buf1:BufferLike,buf2:BufferLike)=>Int
    static of:(...a:[Int])=>Buffer
    toString:(enc?:coding,from?:Int,to?:Int)=>String
    write:(str?:String,idx?:Int,len?:Int,enc?:coding)=>Int
    compare:(buf:BufferLike)=>Int
    slice:(from?:Int,to?:Int)=>Buffer
    equals:(buf:BufferLike)=>Boolean
    toJSON:()=>BufferJson
    swap16:()=>this
    swap32:()=>this
    swap64:()=>this
    fill:((val:BufferLike,start?:Int,end?:Int)=>this)|((str:String,start?:Int,end?:Int,enc?:coding)=>this)|((byte:Int,start?:Int,end?:Int)=>this)
    copy:(target:BufferLike,start?:Int,from?:Int,to?:Int)=>this
    indexOf:((val:BufferLike,start?:Int)=>Int)|((str:String,start?:Int,enc?:coding)=>Int)|((byte:Int,start?:Int)=>Int)
    includes:((val:BufferLike,start?:Int)=>Boolean)|((str:String,start?:Int,enc?:coding)=>Boolean)|((byte:Int,start?:Int)=>Boolean)
}

var buf1=(await globalThis['core/buffer'])as buffer;
export var{SlowBuffer,transcode,isUtf8,isAscii,kMaxLength,kStringMaxLength,btoa,atob,constants,INSPECT_MAX_BYTES}=buf1;
// export var{Blob,resolveObjectURL,File}=buf1;
export{Buffer};
export default buf1;
