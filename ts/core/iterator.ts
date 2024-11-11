import'../../js/core/iterator.js';
type Int=Number
type anyrecall=(any:any,index:Int)=>any
type voidrecall=(any:any,index:Int)=>any
type boolrecall=(any:any,index:Int)=>Boolean
type flatAny=Iterator1|any
type flatrecall=(value:any,index:Int)=>flatAny
type reducerecall=(a:any,b:any,index:Int)=>Boolean
class Iterator1{
  [Symbol.iterator]:()=>this
  map:(recall:anyrecall,self?:any)=>Iterator1
  flatMap:(recall:flatrecall,self?:any)=>Iterator1
  forEach:(recall:voidrecall,self?:any)=>Iterator1
  reduce:(recall:reducerecall,self?:any)=>any
  some:(recall:boolrecall,self?:any)=>Boolean
  eveny:(recall:boolrecall,self?:any)=>Boolean
  find:(recall:boolrecall,self?:any)=>any
  filter:(recall:boolrecall,self?:any)=>Iterator1
  toArray:()=>Array<any>
}
export default(await globalThis['core/iterator']).Iterator as typeof Iterator1
