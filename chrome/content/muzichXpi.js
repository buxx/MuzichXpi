
var muzich_config = {
  base_url : '//local.muzi.ch/app_dev.php/share-from/?from_url=',
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
      "position: absolute; "+
      "top: 0; "+
      "left: 50%; "+
      "margin-left: -355px; "+
      "margin-top: 25px; "+
      "z-index: 100001; "+
      "border: 10px solid #DDDDDD; "+
      "border-radius: 10px 10px 10px 10px; "+
      "box-shadow: 0 0 20px #000000; "+
      "background-color: #F4F4F4; ",
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
      this.close_sharing_tool();
      this.fadeOut();
    },
    close_sharing_tool : function()
    {
      var iframe = content.document.getElementById("muzich_iframe_addcontainer");
      if (iframe)
      {
        content.document.body.removeChild(iframe);
      }
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
      {
        content.document.body.removeChild(fade);
      }
    },
    open_sharing_tool : function(iframe_url)
    {
      var close_button = document.createElement('a');
      close_button.setAttribute('href', '#');
      close_button.setAttribute('id', 'muzich_close_button');
      close_button.onclick = function(){ muzich_tool.close_all(); };
      close_button.innerHTML = "X";
      close_button.setAttribute("style", muzich_config.css.close_button);
      
      var container = document.createElement('div');
      container.setAttribute("id", "muzich_iframe_addcontainer");
      container.setAttribute("style", muzich_config.css.container);
      
      var iframe = document.createElement('iframe');
      iframe.setAttribute("style", 
        "width: 100%; height: 100%; "
      );
      iframe.setAttribute("src", iframe_url);
      
      container.appendChild(close_button);
      container.appendChild(iframe);
      content.document.body.appendChild(container);
    }
  };
}();

var shareUrl =  function () {
  return {
    share : function () {
      muzich_tool.close_all();
      muzich_tool.fadeIn();
      muzich_tool.open_sharing_tool(muzich_config.base_url+encodeURIComponent(window.content.location.href));
    }
  };
}();
