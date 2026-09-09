/**
 * Host browsers (Cursor preview, Grammarly, password managers) sometimes stamp
 * extra attributes onto the DOM before React hydrates. That is not an app bug,
 * but Next.js reports it as a hydration mismatch. Strip known injected attrs
 * before and during load so SSR HTML matches the client tree.
 */
(function stripInjectedDomAttrs() {
  var ATTRS = [
    "data-cursor-ref",
    "data-cursor-element-id",
    "cz-shortcut-listen",
    "data-new-gr-c-s-check-loaded",
    "data-gr-ext-installed",
  ];

  function clean(node) {
    if (!node || node.nodeType !== 1 || !node.removeAttribute) {
      return;
    }
    for (var i = 0; i < ATTRS.length; i++) {
      if (node.hasAttribute(ATTRS[i])) {
        node.removeAttribute(ATTRS[i]);
      }
    }
  }

  function walk(root) {
    clean(root);
    if (!root || !root.querySelectorAll) {
      return;
    }
    var nodes = root.querySelectorAll("*");
    for (var i = 0; i < nodes.length; i++) {
      clean(nodes[i]);
    }
  }

  walk(document.documentElement);

  new MutationObserver(function (records) {
    for (var i = 0; i < records.length; i++) {
      var record = records[i];
      if (record.type === "attributes") {
        clean(record.target);
      }
      for (var j = 0; j < record.addedNodes.length; j++) {
        walk(record.addedNodes[j]);
      }
    }
  }).observe(document.documentElement, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ATTRS,
  });
})();
