(function () {
  function isIos() {
    return /iPhone|iPad|iPod/.test(navigator.userAgent || "");
  }

  function standaloneUrl() {
    var url = new URL(location.href);
    url.searchParams.delete("print");
    return url.href;
  }

  function printDocument() {
    if (window.self !== window.top) {
      if (isIos()) {
        window.top.location.href = standaloneUrl();
        return;
      }
      var url = new URL(location.href);
      url.searchParams.set("print", "1");
      var opened = window.open(url.href, "_blank");
      if (!opened) window.top.location.href = url.href;
      return;
    }
    window.print();
  }

  window.printDocument = printDocument;

  var autoPrint = new URLSearchParams(location.search).get("print") === "1";
  if (autoPrint && window.self === window.top && !isIos()) {
    window.addEventListener("load", function () {
      window.print();
    });
  }
})();
