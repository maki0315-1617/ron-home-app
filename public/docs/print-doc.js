(function () {
  function isIos() {
    return /iPhone|iPad|iPod/.test(navigator.userAgent || "");
  }

  function printDocument(event) {
    if (isIos()) return true;
    if (event && event.preventDefault) event.preventDefault();
    if (window.self !== window.top) {
      var url = new URL(location.href);
      url.searchParams.set("print", "1");
      var opened = window.open(url.href, "_blank");
      if (!opened) window.top.location.href = url.href;
      return false;
    }
    window.print();
    return false;
  }

  window.printDocument = printDocument;

  var autoPrint = new URLSearchParams(location.search).get("print") === "1";
  if (autoPrint && window.self === window.top && !isIos()) {
    window.addEventListener("load", function () {
      window.print();
    });
  }
})();
