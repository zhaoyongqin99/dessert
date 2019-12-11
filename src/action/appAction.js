import actionType from "./actionType"
const appHide=(flag)=>{
    return{
        type:actionType.SHOWHIDE,
        playload:flag
    }
}
export  default appHide;