(function(){window.addEventListener("load",a,false);function a(){var c=navigator.userAgent,n=f("bd_source")||"qunar";if(c.toLowerCase().indexOf("qunar")==-1){var h=document.getElementsByTagName("body");var j="打开客户端";var b=document.getElementById("jq-appendDIV");if(b){b.parentNode.removeChild(b)}if(c.toLowerCase().indexOf("micromessenger")!==-1){j="下载客户端"}else{j="下载客户端"}var g='<div style="height:60px;font-size:0;background-color:#000" id="jq-appendDIV"><div id="jq-download" style="-webkit-backdrop-filter: blur(10px);position:fixed;top:0;z-index:5;height:60px;width:100%;background-color:rgba(0, 0, 0, 0.6);font-size:12px;padding:10px 0;box-sizing: border-box"><div style="width:60px;text-align:center;position:absolute;"><img style="width:40px;height:40px" src="http://source.qunar.com/site/images/wap/touch/images/v2/images1x/top-logo.png"/></div><div style="position:absolute;left:60px"><div style="font-size:22px;color: #25A4BB;font-weight:bold;line-height:22px">去哪儿旅行</div><div style="color: #c4c4c4;line-height:20px">超过<span style="font-size:14px;color:#fab400;font-weight:bold">4.6亿</span>人的聪明选择</div></div><div style="padding:5px 10px 0 0;font-size:0;position:relative"><div id="jq-content" style="border-bottom:3px solid #e58700;border-radius:5px;background-color:#e58700;top:2px;right:45px;position:absolute"><div style="width:80px;height:33px;background-color:#f4b000;font-size:14px;text-align:center;border-radius:5px;color:#fff;line-height:33px;font-weight:bold" id="downloadHTML">'+j+'</div></div></div><div id="closeDiv" style="position:absolute;top:5px;right:5px;width:20px;height:20px"><img style="width:100%;height:100%" src="http://source.qunar.com/site/images/wap/touch/images/v2/images1x/modifydelete.png"></div></div></div>';e(h[0],g);var k=document.getElementById("jq-download");var m=document.getElementById("jq-content");var i=document.getElementById("closeDiv");var d=document.getElementById("jq-appendDIV");function l(){if(c.toLowerCase().indexOf("micromessenger")!==-1){var o="http://a.app.qq.com/o/simple.jsp?pkgname=com.Qunar";location.href=o}else{location.href="http://touch.qunar.com/h5/client?bd_source="+n+"&sScheme=0&scheme=home&touchUrl=download?bd_source="+n}}m.onclick=function(){l()};m.addEventListener("touchstart",function(){this.setAttribute("style","border-bottom:0px solid #f4b000;border-radius:5px;background-color:#f4b000;top:5px;right:45px;position:absolute")},false);m.addEventListener("touchend",function(){this.setAttribute("style","border-bottom:3px solid #e58700;border-radius:5px;background-color:#e58700;top:2px;right:45px;position:absolute")},false);i.addEventListener("click",function(){d.setAttribute("style","display:none")},false)}function f(o){var p=new RegExp("(^|&)"+o+"=([^&]*)(&|$)");var q=decodeURIComponent(window.location.search.substr(1)).match(p);if(q!=null){return unescape(q[2])}return""}function e(s,r){var u=document.createElement("div"),o=null,p=document.createDocumentFragment();u.innerHTML=r;o=u.childNodes;for(var q=0,t=o.length;q<t;q+=1){p.appendChild(o[q].cloneNode(true))}s.insertBefore(p,s.firstChild);o=null;p=null}}})();