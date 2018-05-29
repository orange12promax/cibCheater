// ==UserScript==
// @name         change balance
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://personalbank.cib.com.cn/pers/main/query/queryBalance*
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
                    if(String(formValue[i].textContent).indexOf('622908403023365810')>-1){
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
        function changeText(table){
            var head=table.querySelector('thead'),
                _body=table.querySelector('tbody');
            if(head){
                getBalance();
                var headTd=head.querySelectorAll('th');
                for (var i=0;i<headTd.length;i++){
                    if((headTd[i].textContent.indexOf('余额')>-1 || headTd[i].textContent.indexOf('总额')>-1) && headTd[i].textContent.indexOf('非活期')<0){
                        _body.querySelector('tr').querySelectorAll('td')[i].textContent=window.localStorage.getItem('cheatBalance')||'---,---';
                    }
                }
                // window.document.body.style.opacity=1;
                clearInterval(window.timer);
            }
        }
        // window.document.body.style.opacity=0;
        window.timer=window.setInterval(function(){
            judgeUser(function(){
                var tabs=window.document.querySelectorAll('table'),
                    _ban=window.localStorage.getItem('cheatBalance');
                if(tabs.length>0 && !!_ban){
                    for(var x=0;x<tabs.length;x++){
                        changeText(tabs[x]);
                    }
                }
            });
        },3);
        window.setTimeout(function(){
            clearInterval(window.timer);
        },60000);
        getBalance();
    })(window);
    // Your code here...
})();