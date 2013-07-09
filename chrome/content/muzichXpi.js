
var url_base = '//local.muzi.ch/app_dev.php/share-from/?from_url=';

var shareUrl =  function () {
  return {
    share : function () {
      
      var iframe_url = url_base+encodeURIComponent(gBrowser.contentWindow.location.href);
      alert(iframe_url);
      var fade = document.createElement('div');
      fade.setAttribute("id", "muzich_fade");
      fade.setAttribute("style", 
        "background: none repeat scroll 0 0 #000000; "+
        "height: 100%; "+
        "left: 0; "+
        "opacity: 0.8; "+
        "position: fixed; "+
        "top: 0; "+
        "width: 100%; "+
        "z-index: 100000; "
      );
      
      var container = document.createElement('div');
      container.setAttribute("id", "muzich_iframe_addcontainer");
      container.setAttribute("style", 
        "width: 640px; height: 480px; "+
        "position: absolute; "+
        "top: 0; "+
        "left: 50%; "+
        "margin-left: -320px; "+
        "margin-top: 25px; "+
        "z-index: 100001; "+
        "border: 10px solid #DDDDDD; "+
        "border-radius: 10px 10px 10px 10px; "+
        "box-shadow: 0 0 20px #000000; "
      );
      
      var iframe = document.createElement('iframe');
      iframe.setAttribute("style", 
        "width: 100%; height: 100%; "
      );
      iframe.setAttribute("src", iframe_url);
      
      container.appendChild(iframe);
      gBrowser.contentDocument.body.appendChild(container);
      gBrowser.contentDocument.body.appendChild(fade);
    }
  };
}();
