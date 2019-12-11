import React from "react";
import ReactDom  from  "react-dom";
import {HashRouter as Router,Route,Switch,Redirect} from "react-router-dom"
import App from  "./App"
import {Detail,Goodslist,About,Mine,NotFound} from  "./views"

ReactDom.render(

<Router>
<Switch>
    <Route path="/" component={App} ></Route>
 </Switch>
</Router>,document.getElementById("root"))
