define(["loading","apphost","globalize","syncJobList","events","scripts/taskbutton","localsync","emby-button","paper-icon-button-light"],function(e,t,n,r,o,i){function s(){return[{href:"syncactivity.html",name:Globalize.translate("TabSyncJobs")},{href:"devicesupload.html",name:Globalize.translate("TabCameraUpload")},{href:"appservices.html?context=sync",name:Globalize.translate("TabServices")},{href:"syncsettings.html",name:Globalize.translate("TabSettings")}]}function a(e){e.querySelector(".supporterPromotion .mainText").innerHTML=n.translate("HeaderSyncRequiresSupporterMembership");var t=ApiClient;t.getPluginSecurityInfo().then(function(t){t.IsMBSupporter?e.querySelector(".supporterPromotionContainer").classList.add("hide"):e.querySelector(".supporterPromotionContainer").classList.remove("hide")},function(){e.querySelector(".supporterPromotionContainer").classList.remove("hide")})}return function(e,t){a(e,t);var n=new r({isLocalSync:"offline"===t.mode,serverId:ApiClient.serverId(),userId:"offline"===t.mode?null:ApiClient.getCurrentUserId(),element:e.querySelector(".syncActivity")});o.on(n,"jobedit",function(e,t){Dashboard.navigate("syncjob.html?id="+t)}),e.addEventListener("viewshow",function(){LibraryMenu.setTabs("syncadmin",0,s),i({mode:"on",progressElem:e.querySelector(".syncProgress"),taskKey:"SyncPrepare",button:e.querySelector(".btnSync")})}),e.addEventListener("viewbeforehide",function(){i({mode:"off",taskKey:"SyncPrepare",button:e.querySelector(".btnSync")})}),e.addEventListener("viewdestroy",function(){n.destroy()})}});