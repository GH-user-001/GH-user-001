(function () {
  var THEMES = [["light", "Light"], ["dark", "Dark"], ["neon", "Cyberphunk Neon"]];
  var root = document.documentElement;

  function saved() {
    try { return localStorage.getItem("theme"); } catch (e) { return null; }
  }

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    try { localStorage.setItem("theme", theme); } catch (e) {}
    var buttons = document.querySelectorAll(".theme-switch button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute("aria-pressed", String(buttons[i].dataset.theme === theme));
    }
  }

  var current = saved();
  if (!THEMES.some(function (t) { return t[0] === current; })) current = "light";
  root.setAttribute("data-theme", current);

  document.addEventListener("DOMContentLoaded", function () {
    var group = document.createElement("div");
    group.className = "theme-switch";
    group.setAttribute("role", "group");
    group.setAttribute("aria-label", "Colour theme");
    THEMES.forEach(function (t) {
      var b = document.createElement("button");
      b.type = "button";
      b.dataset.theme = t[0];
      b.textContent = t[1];
      b.addEventListener("click", function () { apply(t[0]); });
      group.appendChild(b);
    });
    document.body.appendChild(group);
    apply(root.getAttribute("data-theme"));
  });
})();
