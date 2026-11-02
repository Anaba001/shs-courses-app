document.addEventListener("DOMContentLoaded", function () {
  /* Career path chips: click one to reveal a one-line description
     in the panel underneath. Click the same chip again to close it. */
  var panel = document.querySelector(".career-path-panel");
  var chips = document.querySelectorAll(".career-path-button button");

  chips.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var wasActive = btn.classList.contains("is-active");
      chips.forEach(function (b) {
        b.classList.remove("is-active");
      });

      if (wasActive) {
        if (panel) {
          panel.classList.remove("is-open");
          panel.textContent = "";
        }
        return;
      }

      btn.classList.add("is-active");
      if (panel) {
        panel.textContent = btn.getAttribute("data-tip") || "";
        panel.classList.add("is-open");
      }
    });
  });

  /* Program code badge: click to copy the code to the clipboard. */
  var codeBtn = document.querySelector('[class$="-button"] button:nth-child(2)');
  var toast = document.querySelector(".copy-toast");

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 1600);
  }

  if (codeBtn) {
    codeBtn.setAttribute("title", "Click to copy the program code");
    codeBtn.addEventListener("click", function () {
      var code = codeBtn.textContent.replace("Code:", "").trim();
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard
          .writeText(code)
          .then(function () {
            showToast('Copied "' + code + '" to clipboard');
          })
          .catch(function () {
            showToast(code);
          });
      } else {
        showToast(code);
      }
    });
  }

  /* Back-to-top control. */
  var topBtn = document.querySelector(".back-to-top");
  if (topBtn) {
    window.addEventListener("scroll", function () {
      topBtn.classList.toggle("is-visible", window.scrollY > 320);
    });
    topBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
