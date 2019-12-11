import axios from "../axios";

const goods = {
    list(id, pagenum) {
        return  axios({
            method: "get",
            url: `entries?refId=${id}&order=0&page=${pagenum}&size=8&tags=`,
        })
    },

    listtitle(id) {
        return axios({
            method: "get",
            url: `frames/detail/${id}`,
        })
    },
    typeList(){
        return axios({
            method: "get",
            url: `frames`,
        })
    }

    
}
const goodsList = goods.list;
const goodsListTitle = goods.listtitle;
const goodsType = goods.typeList

export {
    goodsList,
    goodsListTitle,
    goodsType
}