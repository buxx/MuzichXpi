
var url_base = 'http://muzi.ch/share-from/?from_url=';

var shareUrl =  function () {
  return {
    share : function () {
      
      var visited_url = gBrowser.contentWindow.location.href;
      var tBrowser = top.document.getElementById("content");
      var tab = tBrowser.addTab(url_base+encodeURIComponent(visited_url));
      tBrowser.selectedTab = tab;

    }
  };
}();
