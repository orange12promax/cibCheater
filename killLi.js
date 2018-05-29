// ==UserScript==
// @name         Kill first li
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://personalbank.cib.com.cn/pers/main/index.do
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    (function(window){
        var timer=window.setInterval(function(){
            deleteFirstLi();
        },5);
        function deleteFirstLi() {
            var ul=window.document.querySelector('#primary-nav');
            if(ul){
                var lis=ul.querySelectorAll('li');
                if(lis.length>0){
                    lis[0].parentNode.removeChild(lis[0]);
                    window.clearInterval(timer);
                }
            }
        }
    })(window);
    // Your code here...
})();