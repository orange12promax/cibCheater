// ==UserScript==
// @name         change trans balance
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       You
// @match        https://personalbank.cib.com.cn/pers/main/transfer/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    (function(window){
        function judgeUser(callback){
            var infoShow=window.document.querySelector('.info-show'),
                formValue=window.document.querySelectorAll('.form-value'),
                result=false;
            if(infoShow){
                var spans=infoShow.querySelectorAll('span');
                for(var i=0;i<spans.length;i++){
                    if(String(spans[i].textContent).indexOf('622908403023365810')>-1){
                        result=true;
                    }
                }
            }
            if(formValue && formValue.length>0){
                for(var j=0;j<formValue.length;j++){
                    if(formValue[j] && (String(formValue[j].textContent).indexOf('622908403023365810')>-1)){
                        result=true;
                    }
                }
            }
            if(result){
                callback();
            }
        }
        function getBalance(callback){
            window.fetch('https://temp.us-fitness.com/ulmc-api/temp/balance').then(function(res){
                return res.json();
            }).then(function(res){
                window.localStorage.setItem('cheatBalance',res.balance);
                if(callback){
                    callback();
                }
            });
        }
        //window.document.body.style.opacity=0;
        window.timer=window.setInterval(function(){
            judgeUser(function(){
                var labels=window.document.querySelectorAll('label'),
                    hasLabel;
                for(var i=0;i<labels.length;i++){
                    if(labels[i].textContent.indexOf('可用余额')>-1 ){
                        if(!!window.localStorage.getItem('cheatBalance')){
                            hasLabel=true;
                            window.clearInterval(window.timer);
                            labels[i].parentNode.querySelector('span').textContent=window.localStorage.getItem('cheatBalance')||'---,---';
                            setTimeout(function(){
                                //window.document.body.style.opacity=1;
                            },500);
                        }else{
                            labels[i].parentNode.querySelector('span').textContent='---,---';
                        }
                    }
                }
            });
        },3);
        getBalance();
    })(window);
    // Your code here...
})();