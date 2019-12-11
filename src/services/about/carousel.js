
import axios from "../axios";
const about = {
    carousel(subid,refid){
        return axios({
            method: "get",
            url:`items/${refid}?extras=promotionTip,+phrases,+activityopt,+suiteDescription,+loved,+targetCouponPrice&skuId=${subid}`
        })
    },
    msg(refid){
        return axios({
            method: "get",
            url:`feeds?type=5&id=${refid}&platform=2`
        })
    }
}
const aboutCarousel = about.carousel;
const aboutMsg = about.msg;

export{
    aboutCarousel,
    aboutMsg
}

