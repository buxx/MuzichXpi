
var muzich_config = {
  base_url : '//muzi.ch/share-from/?from_url=',
  running : false,
  listener : null,
  css : {
    fade : "background: none repeat scroll 0 0 #000000; "+
      "height: 100%; "+
      "left: 0; "+
      "opacity: 0.8; "+
      "position: fixed; "+
      "top: 0; "+
      "width: 100%; "+
      "z-index: 100000; ",
    container : "width: 710px; height: 480px; "+
      "position: fixed; "+
      "top: 0; "+
      "left: 50%; "+
      "margin-left: -355px; "+
      "margin-top: 25px; "+
      "z-index: 100001; "+
      "border: 10px solid #DDDDDD; "+
      "border-radius: 10px 10px 10px 10px; "+
      "box-shadow: 0 0 20px #000000; "+
      "background-color: #F4F4F4; "+
      "background-image: url(http://static.muzi.ch/img/ajax-loader.gif); "+
      "background-repeat:no-repeat; "+
      "background-position: center center; ",
    close_button : "font-weigth: bold; "+
      "color: black; "+
      "position: absolute; "+
      "cursor: pointer; "+
      "border: 10px solid #DDDDDD; border-radius: 10px 10px 10px 10px; "+
      "margin-left: -25px; "+
      "margin-top: -25px; "+
      "padding: 5px 10px; "+
      "background-color: #F4F4F4; "
  }
};

var muzich_tool =  function () {
  return {
    close_all : function () {
      this.end_listener();
      this.close_sharing_tool();
      this.fadeOut();
    },
    close_sharing_tool : function()
    {
      var iframe = content.document.getElementById("muzich_iframe_addcontainer");
      if (iframe)
        content.document.body.removeChild(iframe);
    },
    fadeIn : function()
    {
      var fade = document.createElement('div');
      fade.setAttribute("id", "muzich_fade");
      fade.setAttribute("style", muzich_config.css.fade);
      content.document.body.appendChild(fade);
    },
    fadeOut : function()
    {
      var fade = content.document.getElementById("muzich_fade");
      if (fade)
        content.document.body.removeChild(fade);
    },
    open_sharing_tool : function(iframe_url)
    {
      this.start_listener();
      var htmlns = "http://www.w3.org/1999/xhtml";
      var close_button = document.createElement('a');
      close_button.setAttribute('href', '#');
      close_button.setAttribute('id', 'muzich_close_button');
      close_button.onclick = function(){ muzich_tool.close_all(); };
      close_button.innerHTML = "X";
      close_button.setAttribute("style", muzich_config.css.close_button);
      
      var container = document.createElementNS(htmlns,'div');
      container.setAttribute("id", "muzich_iframe_addcontainer");
      container.setAttribute("style", muzich_config.css.container);
      
      var iframe = document.createElementNS(htmlns,'iframe');
      iframe.setAttribute("id", "muzich_iframe");
      iframe.setAttribute("style", 
        "width: 100%; height: 100%; border: none;"
      );
      iframe.setAttribute("src", iframe_url);
      
      container.appendChild(close_button);
      window.content.document.body.appendChild(container);
      window.content.document.getElementById("muzich_iframe_addcontainer").appendChild(iframe);
    },
    valid_url : function(string) {
      var regexp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
      return regexp.test(string);
    },
    get_sharing_url : function()
    {
      var url = null;
      
      if(gContextMenu)
      {
        if (gContextMenu.onLink)
          url = gContextMenu.linkURL;
      }
      
      if (!url)
        url = window.content.location.href;
      
      if (this.valid_url(url))
        return muzich_config.base_url+encodeURIComponent(url);
      
      return false;
    },
    start_listener : function()
    {
      muzich_config.running = true;
      var _this = this;
      muzich_config.listener = setTimeout(function(){ _this.listen_finish(); }, 500);
    },
    end_listener : function()
    {
      muzich_config.running = false;
      window.clearTimeout(muzich_config.listener);
      muzich_config.listener = null;
    },
    listen_finish : function()
    {
      if (muzich_config.running)
      {
        var iframe = window.content.document.getElementById("muzich_iframe");
        if (iframe)
        {
          if (iframe.contentDocument.getElementById("shared_from_finished"))
          {
            //this.close_all();
          }
        }
      }
    }
  };
}();

var shareUrl =  function () {
  return {
    share : function () {
      muzich_tool.close_all();
      if (muzich_tool.get_sharing_url())
      {
        muzich_tool.fadeIn();
        muzich_tool.open_sharing_tool(muzich_tool.get_sharing_url());
      }
      else
      {
        alert('Muzi.ch: Can\'t share this URL !');
      }
    }
  };
}();

function initOverlay() {
  var menu = document.getElementById("contentAreaContextMenu");
  menu.addEventListener("popupshowing", contextPopupShowing, false);
}

window.addEventListener("load", initOverlay, false);

function contextPopupShowing() {
  var menuitem = document.getElementById("menu-item-share");
  if(menuitem)
    menuitem.hidden = !gContextMenu.onLink;
}
