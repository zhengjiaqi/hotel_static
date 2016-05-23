(function(){
  window.addEventListener("load",load,false);
  function load(){
    var ua = navigator.userAgent,
    bdSource = getUrlParam('bd_source') || 'qunar';

    if(ua.toLowerCase().indexOf('qunar')==-1 ){
      var body=document.getElementsByTagName('body');
      var downTxt='打开客户端';  
      // html='<div style="height:60px;font-size:0;background-color:#000"><div id="jq-download" style="position:fixed;top:0;z-index:5;height:60px;width:100%;background-color:rgba(0, 0, 0, 0.6);font-size:12px;display:box;display:-webkit-box;display:-moz-box;display:-ms-flexbox;padding-top:10px;box-sizing: border-box"><div style="width:60px;text-align:center"><img style="width:39px;height:39px" src="http://source.qunar.com/site/images/wap/touch/images/v2/images1x/top-logo.png"/></div><div style="-webkit-box-flex:1;-moz-box-flex:1;-ms-box-flex:1; box-flex:1"><div style="font-size:21px;color: #25A4BB">去哪儿旅行</div><div style="color: #c4c4c4;line-height:20px">超过<span style="font-size:14px;color:#fab400">4.6亿</span>人的聪明选择</div></div><div style="padding:5px 10px 0 0;font-size:0"><div id="jq-content" style="border-bottom:3px solid #e58700;border-radius:5px;background-color:#e58700"><img style="width:105px" src="http://source.qunar.com/site/images/wap/touch/images/v2/images1x/top-download.png"/></div></div></div></div>';
      // var html2='<div style="height:60px;font-size:0;background-color:#000" id="jq-appendDIV"><div id="jq-download" style="position:fixed;top:0;z-index:5;height:60px;width:100%;background-color:rgba(0, 0, 0, 0.6);font-size:12px;padding-top:10px;box-sizing: border-box"><div style="width:60px;text-align:center;float:left"><img style="width:39px;height:39px" src="http://source.qunar.com/site/images/wap/touch/images/v2/images1x/top-logo.png"/></div><div style="float:left"><div style="font-size:21px;color: #25A4BB">去哪儿旅行</div><div style="color: #c4c4c4;line-height:20px">超过<span style="font-size:14px;color:#fab400">4.6亿</span>人的聪明选择</div></div><div style="padding:5px 10px 0 0;font-size:0"><div id="jq-content" style="border-bottom:3px solid #e58700;border-radius:5px;background-color:#e58700;float:right"><div style="width:105px;height:28px;background-color:#f4b000;font-size:14px;text-align:center;border-radius:5px;color:#fff;line-height:28px" id="downloadHTML">下载客户端</div></div></div></div></div>';
      var div = document.getElementById("jq-appendDIV");
      if(div){div.parentNode.removeChild(div)}
      if(ua.toLowerCase().indexOf('micromessenger')!==-1 ){downTxt='下载客户端'}else{downTxt='下载客户端'}
      var html='<div style="height:60px;font-size:0;background-color:#000" id="jq-appendDIV"><div id="jq-download" style="-webkit-backdrop-filter: blur(10px);position:fixed;top:0;z-index:5;height:60px;width:100%;background-color:rgba(0, 0, 0, 0.6);font-size:12px;padding:10px 0;box-sizing: border-box"><div style="width:60px;text-align:center;position:absolute;"><img style="width:40px;height:40px" src="http://source.qunar.com/site/images/wap/touch/images/v2/images1x/top-logo.png"/></div><div style="position:absolute;left:60px"><div style="font-size:22px;color: #25A4BB;font-weight:bold;line-height:22px">去哪儿旅行</div><div style="color: #c4c4c4;line-height:20px">超过<span style="font-size:14px;color:#fab400;font-weight:bold">4.6亿</span>人的聪明选择</div></div><div style="padding:5px 10px 0 0;font-size:0;position:relative"><div id="jq-content" style="border-bottom:3px solid #e58700;border-radius:5px;background-color:#e58700;top:2px;right:45px;position:absolute"><div style="width:80px;height:33px;background-color:#f4b000;font-size:14px;text-align:center;border-radius:5px;color:#fff;line-height:33px;font-weight:bold" id="downloadHTML">'+downTxt+'</div></div></div><div id="closeDiv" style="position:absolute;top:5px;right:5px;width:20px;height:20px"><img style="width:100%;height:100%" src="http://source.qunar.com/site/images/wap/touch/images/v2/images1x/modifydelete.png"></div></div></div>';
      prependHTML(body[0],html);
      var a = document.getElementById('jq-download');
      var butten=document.getElementById('jq-content');
      var closeDiv=document.getElementById('closeDiv');
      var jqappendDIV=document.getElementById('jq-appendDIV');

      function skip(){
        if(ua.toLowerCase().indexOf('micromessenger')!==-1 ){
          var url ='http://a.app.qq.com/o/simple.jsp?pkgname=com.Qunar';
          location.href = url;
        }else{
          location.href = 'http://touch.qunar.com/h5/client?bd_source='+bdSource+'&sScheme=0&scheme=home&touchUrl=download?bd_source='+bdSource;
        } 
      }
      butten.onclick=function(){
        skip();
      };
      butten.addEventListener("touchstart",function(){this.setAttribute('style','border-bottom:0px solid #f4b000;border-radius:5px;background-color:#f4b000;top:5px;right:45px;position:absolute');},false);
      butten.addEventListener("touchend",function(){this.setAttribute('style','border-bottom:3px solid #e58700;border-radius:5px;background-color:#e58700;top:2px;right:45px;position:absolute');},false); 
      closeDiv.addEventListener("click",function(){jqappendDIV.setAttribute('style','display:none');},false);  
     
    }

    function getUrlParam(name){
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = decodeURIComponent(window.location.search.substr(1)).match(reg);  //匹配目标参数
      if (r!=null) return unescape(r[2]); return ''; //返回参数值
    }
    function prependHTML(el,html) {
        var divTemp = document.createElement("div"), nodes = null
          , fragment = document.createDocumentFragment();

      divTemp.innerHTML = html;
      nodes = divTemp.childNodes;
      for (var i=0, length=nodes.length; i<length; i+=1) {
         fragment.appendChild(nodes[i].cloneNode(true));
      }
      el.insertBefore(fragment, el.firstChild);
      nodes = null;
      fragment = null;
    }  
  }
  
})();