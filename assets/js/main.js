/* ==========================================================================
   Baye Aly Elhadj — Portfolio interactions
   Vanilla JS, no dependencies.
   ========================================================================== */
(function () {
  "use strict";

  const doc = document.documentElement;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* Translation helper — falls back to French then to the key itself. */
  function t(key) {
    return window.I18N && typeof window.I18N.t === "function" ? window.I18N.t(key) : key;
  }

  /* ---------- Theme ---------- */
  /* The <head> boot script already applied the saved (or system) theme, so the
     first paint is correct. We only persist an explicit user choice here. */
  const THEME_KEY = "ba-theme";
  const themeToggle = document.getElementById("themeToggle");
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function storedTheme() {
    try {
      const value = localStorage.getItem(THEME_KEY);
      return value === "light" || value === "dark" ? value : null;
    } catch (err) {
      return null;
    }
  }

  function syncThemeLabel() {
    if (!themeToggle) return;
    const isDark = doc.getAttribute("data-theme") === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", t(isDark ? "a11y.themeLight" : "a11y.themeDark"));
  }

  function applyTheme(theme, persist) {
    doc.setAttribute("data-theme", theme);
    syncThemeLabel();
    if (themeMeta) themeMeta.setAttribute("content", theme === "dark" ? "#070B12" : "#F7F3EB");
    if (persist) {
      try {
        localStorage.setItem(THEME_KEY, theme);
      } catch (err) {
        /* storage unavailable */
      }
    }
  }

  if (themeToggle) {
    syncThemeLabel();
    themeToggle.addEventListener("click", function () {
      applyTheme(doc.getAttribute("data-theme") === "light" ? "dark" : "light", true);
    });

    /* Follow the system preference until the visitor picks a theme himself. */
    const onSystemTheme = function (event) {
      if (storedTheme()) return;
      applyTheme(event.matches ? "dark" : "light", false);
    };
    if (typeof darkQuery.addEventListener === "function") {
      darkQuery.addEventListener("change", onSystemTheme);
    } else if (typeof darkQuery.addListener === "function") {
      darkQuery.addListener(onSystemTheme);
    }
  }

  /* ---------- Header state + scroll progress + back to top ---------- */
  const header = document.getElementById("siteHeader");
  const progressBar = document.querySelector(".scroll-progress span");
  const toTop = document.getElementById("toTop");

  let ticking = false;
  function onScrollFrame() {
    const y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("scrolled", y > 12);
    if (toTop) toTop.classList.toggle("is-visible", y > 700);
    if (progressBar) {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = height > 0 ? Math.min(y / height, 1) : 0;
      progressBar.style.transform = "scaleX(" + ratio + ")";
    }
    updateActiveSection();
    checkReveals();
    maybeStartCounters();
    ticking = false;
  }
  function requestScrollFrame() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScrollFrame);
    }
  }
  window.addEventListener("scroll", requestScrollFrame, { passive: true });
  window.addEventListener("resize", requestScrollFrame);

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    });
  }

  /* ---------- Mobile navigation ---------- */
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  function closeMenu() {
    if (!mobileNav || !menuToggle) return;
    mobileNav.hidden = true;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", t("a11y.menuOpen"));
    document.body.style.overflow = "";
  }

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", function () {
      const open = menuToggle.getAttribute("aria-expanded") === "true";
      if (open) {
        closeMenu();
      } else {
        mobileNav.hidden = false;
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", t("a11y.menuClose"));
        document.body.style.overflow = "hidden";
      }
    });

    mobileNav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  /* ---------- Reveal on scroll ---------- */
  /* Geometry based (not IntersectionObserver) so content always appears,
     even in background tabs or embedded webviews. */
  const revealItems = Array.from(document.querySelectorAll(".reveal"));
  document.body.classList.add("reveal-ready");

  function computeRevealOffsets() {
    revealItems.forEach(function (el) {
      if (el.classList.contains("is-visible")) return;
      el.dataset.revealTop = String(el.getBoundingClientRect().top + (window.scrollY || 0));
    });
  }

  function checkReveals() {
    const limit = (window.scrollY || 0) + window.innerHeight * 0.94;
    revealItems.forEach(function (el) {
      if (el.classList.contains("is-visible")) return;
      if (Number(el.dataset.revealTop || 0) <= limit) el.classList.add("is-visible");
    });
  }

  if (prefersReduced) {
    revealItems.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    computeRevealOffsets();
    checkReveals();
    window.addEventListener("load", function () {
      computeRevealOffsets();
      checkReveals();
    });
    window.addEventListener("resize", function () {
      computeRevealOffsets();
      checkReveals();
    });
    /* Fonts and images can shift layout after first paint. */
    window.setTimeout(function () {
      computeRevealOffsets();
      checkReveals();
    }, 700);
  }

  /* ---------- Scroll spy ---------- */
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const spySections = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  function updateActiveSection() {
    if (!spySections.length) return;
    const offset = (header ? header.offsetHeight : 0) + 140;
    const y = (window.scrollY || window.pageYOffset) + offset;
    let current = null;
    spySections.forEach(function (section) {
      if (section.offsetTop <= y) current = section;
    });
    /* Before the first tracked section, nothing is active. */
    if (spySections[0] && y < spySections[0].offsetTop) current = null;
    navLinks.forEach(function (link) {
      const isActive = !!current && link.getAttribute("href") === "#" + current.id;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  /* ---------- Rotating role words ---------- */
  const roleWords = Array.from(document.querySelectorAll(".role-word"));
  if (roleWords.length > 1 && !prefersReduced) {
    let index = 0;
    setInterval(function () {
      roleWords[index].classList.remove("is-active");
      index = (index + 1) % roleWords.length;
      roleWords[index].classList.add("is-active");
    }, 2600);
  }

  /* ---------- Seamless marquee ---------- */
  const marqueeTrack = document.getElementById("marqueeTrack");
  if (marqueeTrack && !prefersReduced) {
    marqueeTrack.innerHTML += marqueeTrack.innerHTML;
  }

  /* ---------- Animated counters ---------- */
  let counters = Array.from(document.querySelectorAll(".count"));
  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-count"), 10);
    if (isNaN(target)) return;
    if (prefersReduced) {
      el.textContent = String(target);
      return;
    }
    const duration = 1100;
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = String(Math.round(target * eased));
      if (progress < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  let countersStarted = false;
  function maybeStartCounters() {
    if (countersStarted || !counters.length) return;
    const stats = document.querySelector(".hero-stats");
    if (!stats) return;
    const rect = stats.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) {
      countersStarted = true;
      counters.forEach(animateCounter);
    }
  }

  if (counters.length) {
    maybeStartCounters();
    window.setTimeout(maybeStartCounters, 800);
  }

  /* ---------- Copy to clipboard ---------- */
  const toast = document.getElementById("toast");
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2400);
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        /* permission denied — fall back below */
      }
    }
    try {
      const field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.top = "0";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(field);
      return ok;
    } catch (err) {
      return false;
    }
  }

  document.querySelectorAll(".copy-btn").forEach(function (button) {
    button.addEventListener("click", async function () {
      const value = button.getAttribute("data-copy") || "";
      if (!value) return;
      const ok = await copyText(value);
      button.classList.toggle("is-copied", ok);
      showToast(ok ? t("toast.copied") : t("toast.copyFail") + value);
      if (ok) {
        window.setTimeout(function () {
          button.classList.remove("is-copied");
        }, 2200);
      }
    });
  });

  /* ---------- Portrait tilt ---------- */
  const portraitWrap = document.getElementById("portraitWrap");
  if (portraitWrap && canHover && !prefersReduced) {
    portraitWrap.addEventListener("pointermove", function (event) {
      const rect = portraitWrap.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      portraitWrap.style.transform =
        "perspective(1000px) rotateY(" + (x * 6).toFixed(2) + "deg) rotateX(" +
        (-y * 6).toFixed(2) + "deg)";
    });
    portraitWrap.addEventListener("pointerleave", function () {
      portraitWrap.style.transform = "";
    });
  }

  /* ---------- Project detail dialogs ---------- */
  const projectDialog = document.getElementById("projectDialog");
  const projectPanels = projectDialog
    ? Array.from(projectDialog.querySelectorAll("[data-project-panel]"))
    : [];
  const projectTitleEl = document.getElementById("projectDialogTitle");
  const PROJECT_TITLE_KEYS = {
    "it-smart-desk": "projects.p4.title",
    pharmacie: "projects.p1.title",
    restaurant: "projects.p2.title",
    "bloc-notes": "projects.p3.title",
  };
  let lastProjectTrigger = null;

  function projectPanelFor(slug) {
    if (!slug) return null;
    return (
      projectPanels.filter(function (panel) {
        return panel.getAttribute("data-project-panel") === slug;
      })[0] || null
    );
  }

  function projectTitleFor(slug, fallback) {
    const key = PROJECT_TITLE_KEYS[slug];
    if (key) {
      const value = t(key);
      if (value && value !== key) return value;
    }
    return fallback || "";
  }

  function updateProjectTitle(slug, fallback) {
    if (!projectTitleEl) return;
    projectTitleEl.textContent = projectTitleFor(slug, fallback);
  }

  function syncProjectUrl(slug) {
    if (!window.history || typeof window.history.replaceState !== "function") return;
    try {
      const url = new URL(window.location.href);
      if (slug) url.searchParams.set("project", slug);
      else url.searchParams.delete("project");
      window.history.replaceState(window.history.state, "", url.toString());
    } catch (err) {
      /* ignore — deep links are a bonus, not a requirement */
    }
  }

  function openProject(slug, trigger) {
    const panel = projectPanelFor(slug);
    if (!projectDialog || !panel) return;

    lastProjectTrigger = trigger || null;
    projectPanels.forEach(function (item) {
      item.hidden = item !== panel;
    });
    updateProjectTitle(slug, trigger ? trigger.getAttribute("data-project-title") : "");

    if (!projectDialog.open) {
      if (typeof projectDialog.showModal === "function") projectDialog.showModal();
      else projectDialog.setAttribute("open", "");
    }
    projectDialog.classList.add("is-open");
    document.body.classList.add("dialog-open");
    syncProjectUrl(slug);

    const closeBtn = projectDialog.querySelector("[data-dialog-close]");
    if (projectTitleEl) projectTitleEl.focus({ preventScroll: true });
    else if (closeBtn) closeBtn.focus({ preventScroll: true });
  }

  function closeProject() {
    if (!projectDialog) return;
    projectDialog.classList.remove("is-open");
    if (projectDialog.open && typeof projectDialog.close === "function") {
      projectDialog.close();
    } else {
      projectDialog.removeAttribute("open");
      afterProjectClose();
    }
  }

  function afterProjectClose() {
    projectPanels.forEach(function (panel) {
      panel.hidden = true;
    });
    document.body.classList.remove("dialog-open");
    syncProjectUrl(null);

    if (lastProjectTrigger && typeof lastProjectTrigger.focus === "function") {
      lastProjectTrigger.focus({ preventScroll: true });
    }
    lastProjectTrigger = null;
  }

  document.querySelectorAll("[data-project-open]").forEach(function (button) {
    button.addEventListener("click", function () {
      openProject(button.getAttribute("data-project-open"), button);
    });
  });

  if (projectDialog) {
    projectDialog.addEventListener("click", function (event) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      if (target === projectDialog) {
        closeProject();
        return;
      }

      if (target.closest("[data-dialog-close]")) {
        event.preventDefault();
        closeProject();
        return;
      }

      const closer = target.closest("[data-close-dialog]");
      if (closer) closeProject();
    });

    projectDialog.addEventListener("close", afterProjectClose);
    projectDialog.addEventListener("cancel", function () {
      projectDialog.classList.remove("is-open");
    });
  }

  /* Deep link: /?project=it-smart-desk opens the matching panel. */
  try {
    const initialSlug = new URLSearchParams(window.location.search).get("project");
    if (initialSlug) {
      const initialPanel = projectPanelFor(initialSlug);
      if (initialPanel) {
        const innerTitle = initialPanel.querySelector("h3");
        openProject(initialSlug, null);
        updateProjectTitle(initialSlug, innerTitle ? innerTitle.textContent.trim() : "");
      }
    }
  } catch (err) {
    /* URLSearchParams unavailable — skip deep linking */
  }

  /* ---------- Contact form ---------- */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const statusEl = document.getElementById("formStatus");
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const endpoint = (contactForm.getAttribute("data-endpoint") || "").trim();
    const fields = Array.from(contactForm.querySelectorAll("input, textarea")).filter(function (field) {
      return field.type !== "hidden" && field.name !== "company";
    });

    function setStatus(message, state) {
      if (!statusEl) return;
      statusEl.textContent = message;
      if (state) statusEl.setAttribute("data-state", state);
      else statusEl.removeAttribute("data-state");
    }

    function clearErrors() {
      fields.forEach(function (field) {
        field.removeAttribute("aria-invalid");
        const wrapper = field.closest(".form-field");
        if (wrapper) wrapper.classList.remove("has-error");
      });
    }

    function markErrors() {
      let firstInvalid = null;
      fields.forEach(function (field) {
        const valid = field.checkValidity();
        if (valid) {
          field.removeAttribute("aria-invalid");
          const wrapper = field.closest(".form-field");
          if (wrapper) wrapper.classList.remove("has-error");
        } else {
          field.setAttribute("aria-invalid", "true");
          const wrapper = field.closest(".form-field");
          if (wrapper) wrapper.classList.add("has-error");
          if (!firstInvalid) firstInvalid = field;
        }
      });
      return firstInvalid;
    }

    fields.forEach(function (field) {
      field.addEventListener("input", function () {
        if (field.getAttribute("aria-invalid") === "true" && field.checkValidity()) {
          field.removeAttribute("aria-invalid");
          const wrapper = field.closest(".form-field");
          if (wrapper) wrapper.classList.remove("has-error");
        }
      });
    });

    function readValue(name) {
      const field = contactForm.elements[name];
      return field && typeof field.value === "string" ? field.value.trim() : "";
    }

    function buildMailto() {
      const name = readValue("name");
      const email = readValue("email");
      const subject = readValue("subject") || t("form.subject");
      const message = readValue("message");
      const body = message + "\n\n— " + name + (email ? " (" + email + ")" : "");
      return (
        "mailto:bayeelhadj@gmail.com?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body)
      );
    }

    contactForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      clearErrors();

      /* Honeypot: bots fill it, humans never see it. */
      if (readValue("company")) {
        setStatus(t("form.statusSuccess"), "success");
        contactForm.reset();
        return;
      }

      const firstInvalid = markErrors();
      if (firstInvalid) {
        setStatus(t("form.statusInvalid"), "error");
        firstInvalid.focus({ preventScroll: false });
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.setAttribute("aria-busy", "true");
      }
      setStatus("", "");

      if (endpoint) {
        try {
          const response = await fetch(endpoint, {
            method: "POST",
            body: new FormData(contactForm),
            headers: { Accept: "application/json" },
          });
          if (!response.ok) throw new Error("HTTP " + response.status);
          setStatus(t("form.statusSuccess"), "success");
          contactForm.reset();
        } catch (err) {
          /* The endpoint is optional: fall back to a prefilled email. */
          setStatus(t("form.statusError"), "error");
          window.location.href = buildMailto();
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.removeAttribute("aria-busy");
          }
        }
        return;
      }

      setStatus(t("form.statusMailto"), "info");
      window.location.href = buildMailto();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.removeAttribute("aria-busy");
      }
    });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Language change sync ---------- */
  document.addEventListener("ba:languagechange", function () {
    syncThemeLabel();
    if (menuToggle && mobileNav) {
      const open = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-label", t(open ? "a11y.menuClose" : "a11y.menuOpen"));
    }

    if (projectDialog && projectDialog.open) {
      const activePanel = projectPanels.filter(function (panel) {
        return !panel.hidden;
      })[0];
      if (activePanel) updateProjectTitle(activePanel.getAttribute("data-project-panel"));
    }

    if (contactForm) {
      const statusEl = document.getElementById("formStatus");
      const state = statusEl ? statusEl.getAttribute("data-state") : "";
      if (state === "success") statusEl.textContent = t("form.statusSuccess");
      else if (state === "error") statusEl.textContent = t("form.statusInvalid");
    }

    /* The translated markup replaces the counter nodes: keep their final value
       and stop the animation from restarting on stale references. */
    counters = Array.from(document.querySelectorAll(".count"));
    counters.forEach(function (el) {
      const target = el.getAttribute("data-count");
      if (target !== null) el.textContent = target;
    });
    countersStarted = true;

    if (!prefersReduced) {
      window.requestAnimationFrame(function () {
        computeRevealOffsets();
        checkReveals();
      });
    }
  });

  /* ---------- Initial state ---------- */
  onScrollFrame();
})();
