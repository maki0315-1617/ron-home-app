(function () {
  function isIos() {
    return /iPhone|iPad|iPod/.test(navigator.userAgent || "");
  }

  function printLink() {
    return document.querySelector("a.print");
  }

  function pdfUrl() {
    var link = printLink();
    return link ? link.getAttribute("href") : "";
  }

  function fileName() {
    var name = "document.pdf";
    try {
      name = decodeURIComponent(pdfUrl().split("/").pop().split("?")[0]) || name;
    } catch (e) {}
    return name;
  }

  var sharedFile = null;

  function preparePdf() {
    var link = printLink();
    var url = pdfUrl();
    if (!isIos() || !link || !url) return;
    link.textContent = "読み込み中";
    link.setAttribute("aria-busy", "true");
    fetch(url)
      .then(function (response) { return response.blob(); })
      .then(function (blob) {
        sharedFile = new File([blob], fileName(), { type: "application/pdf" });
        link.textContent = "印刷・保存";
        link.removeAttribute("aria-busy");
      })
      .catch(function () {
        link.textContent = "印刷・保存";
        link.removeAttribute("aria-busy");
      });
  }

  function sharePdf() {
    var url = pdfUrl();
    if (
      sharedFile &&
      navigator.share &&
      (!navigator.canShare || navigator.canShare({ files: [sharedFile] }))
    ) {
      navigator.share({ files: [sharedFile], title: document.title }).catch(function () {});
      return;
    }
    if (url) window.location.href = url;
  }

  function printDocument(event) {
    if (event && event.preventDefault) event.preventDefault();
    if (isIos()) {
      sharePdf();
      return false;
    }
    if (window.self !== window.top) {
      var page = new URL(location.href);
      page.searchParams.set("print", "1");
      var opened = window.open(page.href, "_blank");
      if (!opened) window.top.location.href = page.href;
      return false;
    }
    window.print();
    return false;
  }

  window.printDocument = printDocument;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", preparePdf);
  } else {
    preparePdf();
  }

  var autoPrint = new URLSearchParams(location.search).get("print") === "1";
  if (autoPrint && window.self === window.top && !isIos()) {
    window.addEventListener("load", function () {
      window.print();
    });
  }
})();
