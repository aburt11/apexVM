import { getQuickJS } from "quickjs-emscripten";

export class Hypervisor{

  //write a function to check the vm process and memory for malicious code or tampered code
  constructor(public vm: any){
    this.vm = vm;
  }

  public async scan(){
    
  }


 
}


export default class JSVM {


  vm:any;

  qjsContext:any;

 constructor(){
  this.init();
 }

 init(){
  console.time("VMWarmup");
  this.qjsContext  = getQuickJS().then((res)=>{
    this.vm = res.newContext();
    console.timeEnd("VMWarmup");
    console.time("VMW_RUN_CODE");
    this.runVM('hi there :)');
  },err=>{
    console.log("GET JSVMENV ERROR",err);
  });
 }

 runVM(payload:string){


  // We can pass objects to the context and run code safely
  
  //arena.expose(exposed);
  const result = this.vm.evalCode(`${payload}`);
  if (result.error) {
    console.log("Execution failed:", this.vm.dump(result.error))
    result.error.dispose()
  } else {
    console.log("Success:", this.vm.dump(result.value))
    result.value.dispose()
  }
  console.timeEnd("VMW_RUN_CODE");

this.killVM();
 }

 killVM(){
  console.time("VMW_PROC_KILL");
  this.vm.dispose();
  console.timeEnd("VMW_PROC_KILL");
 }


}

var VM = new JSVM();

//setTimeout(()=>{
  console.log(VM);
  console.log("DONE");
//},5000)
