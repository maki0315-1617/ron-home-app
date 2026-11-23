(function () {
  function printDocument() {
    if (window.self === window.top) {
      window.print();
      return;
    }
    var url = new URL(location.href);
    url.searchParams.set("print", "1");
    var opened = window.open(url.href, "_blank");
    if (!opened) {
      window.top.location.href = url.href;
    }
  }

  window.printDocument = printDocument;

  if (new URLSearchParams(location.search).get("print") === "1" && window.self === window.top) {
    window.addEventListener("load", function () {
      window.print();
    });
  }
})();
