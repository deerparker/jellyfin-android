define(["dialogHelper","require","layoutManager","globalize","appStorage","connectionManager","loading","focusManager","dom","apphost","emby-select","listViewStyle","paper-icon-button-light","css!./../formdialog","material-icons","css!./subtitleeditor","emby-button"],function(e,t,n,i,s,a,o,r,l,c){function u(e,n){var s="Items/"+D.Id+"/RemoteSearch/Subtitles/"+n,o=a.getApiClient(D.ServerId);o.ajax({type:"POST",url:o.getUrl(s)}).then(function(){q=!0,t(["toast"],function(e){e(i.translate("sharedcomponents#MessageDownloadQueued"))}),r.autoFocus(e)})}function d(e,n){var s=i.translate("sharedcomponents#MessageAreYouSureDeleteSubtitles");t(["confirm"],function(t){t(s,i.translate("sharedcomponents#ConfirmDeletion")).then(function(){o.show();var t=D.Id,i="Videos/"+t+"/Subtitles/"+n,s=a.getApiClient(D.ServerId);s.ajax({type:"DELETE",url:s.getUrl(i)}).then(function(){q=!0,g(e,s,t)})})})}function v(e,t){var s=t.MediaStreams||[],a=s.filter(function(e){return"Subtitle"==e.Type}),o="";a.length&&(o+="<h1>"+i.translate("sharedcomponents#MySubtitles")+"</h1>",o+=n.tv?'<div class="paperList paperList-clear">':'<div class="paperList">',o+=a.map(function(e){var t="",s=n.tv?"button":"div",a=n.tv&&e.Path?"listItem btnDelete":"listItem";return n.tv&&(a+=" listItem-focusscale listItem-button"),a+=" listItem-noborder",t+="<"+s+' class="'+a+'" data-index="'+e.Index+'">',t+='<i class="listItemIcon md-icon">closed_caption</i>',t+='<div class="listItemBody two-line">',t+="<div>",t+=e.DisplayTitle||"",t+="</div>",e.Path&&(t+='<div class="secondary listItemBodyText">'+e.Path+"</div>"),t+="</a>",t+="</div>",n.tv||e.Path&&(t+='<button is="paper-icon-button-light" data-index="'+e.Index+'" title="'+i.translate("sharedcomponents#Delete")+'" class="btnDelete listItemButton"><i class="md-icon">delete</i></button>'),t+="</"+s+">"}).join(""),o+="</div>");var r=e.querySelector(".subtitleList");a.length?r.classList.remove("hide"):r.classList.add("hide"),r.innerHTML=o}function m(e,t,n){var i=e.querySelector("#selectLanguage");i.innerHTML=n.map(function(e){return'<option value="'+e.ThreeLetterISOLanguageName+'">'+e.DisplayName+"</option>"});var a=s.getItem("subtitleeditor-language");a?i.value=a:t.getCurrentUser().then(function(e){var t=e.Configuration.SubtitleLanguagePreference;t&&(i.value=t)})}function h(e,t){var i="",s="";if(!t.length)return e.querySelector(".noSearchResults").classList.remove("hide"),e.querySelector(".subtitleResults").innerHTML="",void o.hide();e.querySelector(".noSearchResults").classList.add("hide");for(var a="dots-horiz"==c.moreIcon?"&#xE5D3;":"&#xE5D4;",r=0,l=t.length;l>r;r++){var u=t[r],d=u.ProviderName;d!=i&&(r>0&&(s+="</div>"),s+="<h1>"+d+"</h1>",s+=n.tv?'<div class="paperList paperList-clear">':'<div class="paperList">',i=d);var v=n.tv?"button":"div",m=n.tv?"listItem btnOptions":"listItem";n.tv&&(m+=" listItem-focusscale listItem-button"),s+="<"+v+' class="'+m+'" data-subid="'+u.Id+'">',s+='<i class="listItemIcon md-icon">closed_caption</i>',s+='<div class="listItemBody two-line">',s+="<div>"+u.Name+"</div>",s+='<div class="secondary listItemBodyText">'+u.Format+"</div>",u.Comment&&(s+='<div class="secondary listItemBodyText">'+u.Comment+"</div>"),s+="</div>",s+='<div class="secondary listItemAside">'+(u.DownloadCount||0)+"</div>",n.tv||(s+='<button type="button" is="paper-icon-button-light" data-subid="'+u.Id+'" class="btnOptions listItemButton"><i class="md-icon">'+a+"</i></button>"),s+="</"+v+">"}t.length&&(s+="</div>");var h=e.querySelector(".subtitleResults");h.innerHTML=s,o.hide()}function p(e,t){s.setItem("subtitleeditor-language",t),o.show();var n=a.getApiClient(D.ServerId),i=n.getUrl("Items/"+D.Id+"/RemoteSearch/Subtitles/"+t);n.getJSON(i).then(function(t){h(e,t)})}function g(e,t,n){function i(t){D=t,v(e,t);var n=t.Path||"",i=Math.max(n.lastIndexOf("/"),n.lastIndexOf("\\"));i>-1&&(n=n.substring(i+1)),n?(e.querySelector(".pathValue").innerHTML=n,e.querySelector(".originalFile").classList.remove("hide")):(e.querySelector(".pathValue").innerHTML="",e.querySelector(".originalFile").classList.add("hide")),o.hide()}e.querySelector(".noSearchResults").classList.add("hide"),"string"==typeof n?t.getItem(t.getCurrentUserId(),n).then(i):i(n)}function f(e){var t=this,n=t.querySelector("#selectLanguage",t).value;return p(l.parentWithClass(t,"formDialogContent"),n),e.preventDefault(),!1}function b(e){var t=l.parentWithClass(e.target,"btnDelete");if(t){var n=t.getAttribute("data-index"),i=l.parentWithClass(t,"subtitleEditorDialog");d(i,n)}}function S(e){var t=l.parentWithClass(e.target,"btnOptions");if(t){var n=t.getAttribute("data-subid"),i=l.parentWithClass(t,"subtitleEditorDialog");y(t,i,n)}}function y(e,n,i){var s=[];s.push({name:Globalize.translate("sharedcomponents#Download"),id:"download"}),t(["actionsheet"],function(t){t.show({items:s,positionTo:e}).then(function(e){switch(e){case"download":u(n,i)}})})}function I(e,n,i){t(["scrollHelper"],function(t){var s=i?"on":"off";t.centerFocus[s](e,n)})}function L(t,s,o){q=!1;var r=a.getApiClient(s);return r.getItem(r.getCurrentUserId(),t).then(function(t){var s={removeOnClose:!0,scrollY:!1};s.size=n.tv?"fullscreen":"small";var a=e.createDialog(s);a.classList.add("formDialog"),a.classList.add("subtitleEditorDialog"),a.innerHTML=i.translateDocument(o,"sharedcomponents"),document.body.appendChild(a),a.querySelector(".originalSubtitleFileLabel").innerHTML=i.translate("sharedcomponents#File"),a.querySelector(".subtitleSearchForm").addEventListener("submit",f);var l=a.querySelector(".btnSubmit");n.tv?(I(a.querySelector(".formDialogContent"),!1,!0),a.querySelector(".btnSearchSubtitles").classList.add("hide")):l.classList.add("hide");var c=a.querySelector(".formDialogContent");return a.querySelector(".subtitleList").addEventListener("click",b),a.querySelector(".subtitleResults").addEventListener("click",S),r.getCultures().then(function(e){m(c,r,e)}),a.querySelector(".btnCancel").addEventListener("click",function(){e.close(a)}),new Promise(function(i,s){a.addEventListener("close",function(){n.tv&&I(a.querySelector(".formDialogContent"),!1,!1),q?i():s()}),e.open(a),g(c,r,t)})})}function C(e,n){return o.show(),new Promise(function(i,s){t(["text!./subtitleeditor.template.html"],function(t){L(e,n,t).then(i,s)})})}var D,q;return{show:C}});