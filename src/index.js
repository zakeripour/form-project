import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";


String.prototype.toPersianDigits = function(){
    var id= ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
    return this.replace(/[0-9]/g, function(w){
        return id[+w]
    });
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
