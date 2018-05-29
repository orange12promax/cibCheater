// ==UserScript==
// @run-at       document-end
// @name         change list
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  try to take over the world!
// @author       You
// @match        https://personalbank.cib.com.cn/pers/main/account/queryTrans*
// @license      MIT
// @copyright    2018+, saisai9321(https://openuserjs.org/users/saisai9321/)
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
        function changeSummary() {
            var summaryDom = window.document.querySelectorAll('.info-show')[1];
            if(summaryDom && summaryDom.tagName){
                summaryDom.parentNode.removeChild(summaryDom);
            }
        }
        var timer=window.setInterval(judgeUser(function(){
            var tab=window.document.body.querySelector('#list'),
                _form=window.document.body.querySelector('#form');
            if(tab && _form){
                var paramStr=window.$('#form').serialize();
                $('.grid-div').html('').css('display','none').after('<div class="grid-div"><table id="list2" class="myGrid"></table><div id="pager2"></div></div>');
                window.tableList=window.jQuery("#list2").jqGrid({
                    adjustMode: true,
                    autowidth: true,
                    caption: '交易明细',
                    datatype: 'json',
                    height: '100%',
                    loadError: window.defaultLoadError,
                    loadonce: true,
                    pager: '#pager2',
                    prmNames: {},
                    radio: false,
                    rowNum: 10,
                    shrinkToFit: true,
                    url: 'https://temp.us-fitness.com/ulmc-api/temp/newshowList?'+paramStr,
                    viewrecords: true,
                    colModel: [
                        {
                            name: 'transDate',
                            align: 'center'
                        },
                        {
                            name: 'bookDate',
                            align: 'center'
                        },
                        {
                            name: 'payAmount',
                            align: 'right',
                            formatter: window.setcolorgreen,
                            width: 50
                        },
                        {
                            name: 'incomeAmount',
                            align: 'right',
                            formatter: window.setcolorred,
                            width: 50
                        },
                        {
                            name: 'balance',
                            align: 'right'
                        },
                        {
                            name: 'summary',
                            align: 'center',
                            width: 70
                        },
                        {
                            name: 'toAccountName',
                            align: 'center'
                        },
                        {
                            name: 'toBank',
                            align: 'center'
                        },
                        {
                            name: 'toAccountNo',
                            align: 'center',
                            width: 100
                        },
                        {
                            name: 'usage',
                            align: 'center',
                            width: 50
                        },
                        {
                            name: 'TRANS_CHANNEL',
                            align: 'center',
                            width: 100
                        }
                    ],
                    colNames: ['交易时间', '记账日', '支出', '收入', '账户余额', '摘要', '对方户名', '对方银行', '对方账号', '用途', '交易渠道'],
                    gridComplete:function(){
                        $('.grid-div').css('display','block');
                        $('.info-show').eq(1).css('display','none');
                    }
                });
                window.clearInterval(timer);
            }
            changeSummary();
        }),3);
        window.setTimeout(function(){
            clearInterval(window.timer);
        },60000);
    })(window);

    // Your code here...
})();