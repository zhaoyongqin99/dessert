import axios from "axios";

const user = {
    login: async function(usertel,usercode){
        return  await  axios({
            method:"post",
            url:"http://60.205.184.130:1314/users/login",
            data:{
                usertel:usertel,
                usercode:usercode
            }
        })
    },
    sendCode:async function(usertel){
        return  await  axios({
            method:"post",
            url:"http://60.205.184.130:1314/users/add",
            data:{
                mobile:usertel
            }
        })
    },
    mylist:async function(userid){
        return await axios({
            method:"get",
            url:"",
            params:{

            }
        })
    }
}
const  userLogin = user.login;
const userList = user.mylist;
const userCode = user.sendCode
export {
    userLogin,
    userList,
    userCode
}
