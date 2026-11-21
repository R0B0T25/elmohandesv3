/**
 * elmohandes-frontend.js — Elmohandes Hybrid Builder
 * Complete frontend interactions matching the reference design system + WordPress AJAX & Calculator
 */

(function () {
  "use strict";

  // ============================================
  // 1. HERO SEQUENCE ANIMATION
  // ============================================
  function initHeroAnimation() {
    const heroes = document.querySelectorAll(".hero");
    heroes.forEach((hero) => {
      const heroElements = hero.querySelectorAll(
        ".hero-mask, .hero-seq--1, .hero-seq--2, .hero-seq--3, .hero-seq--4, .hero-seq--5, .hero-seq--6"
      );
      const scrollIndicator = hero.querySelector(".scroll-indicator");
      const heroImage = hero.querySelector(".hero__bg");

      requestAnimationFrame(() => {
        if (heroImage) {
          heroImage.style.transform = "scale(1)";
        }
        heroElements.forEach((el) => {
          el.classList.add("is-revealed");
        });
        if (scrollIndicator) {
          setTimeout(() => {
            scrollIndicator.classList.add("is-revealed");
          }, 1200);
        }
      });
    });
  }

  // ============================================
  // 2. SCROLL REVEALS, STAGGER, PROCESS & TIMELINE
  // ============================================
  function initScrollAnimations() {
    // Stagger children
    document.querySelectorAll(".stagger-parent").forEach((parent) => {
      const children = parent.querySelectorAll(".reveal");
      children.forEach((child, index) => {
        child.classList.add("reveal--delay-" + Math.min(index + 1, 6));
      });
    });

    const revealEls = document.querySelectorAll(
      ".reveal, .image-reveal, .timeline-item"
    );

    if (!("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-revealed"));
      document
        .querySelectorAll(".process-line, .timeline")
        .forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealEls.forEach((el) => revealObserver.observe(el));

    // Process Line & Timeline Fill
    const lineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            lineObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document
      .querySelectorAll(".process-line, .timeline")
      .forEach((el) => lineObserver.observe(el));
  }

  // ============================================
  // 3. COUNTER ANIMATION
  // ============================================
  function initCounters() {
    const counters = document.querySelectorAll("[data-counter]");
    if (!counters.length) return;

    function animateCounter(element, target, duration) {
      duration = duration || 1600;
      const suffix = element.dataset.suffix || "";
      const prefix = element.dataset.prefix || "";
      let startTimestamp = null;
      const numTarget = parseInt(target.toString().replace(/[^0-9]/g, ""), 10);

      function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
      }

      function step(timestamp) {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);
        const current = Math.floor(easedProgress * numTarget);

        element.textContent = prefix + current.toLocaleString("ar-EG") + suffix;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          element.textContent = prefix + target + suffix;
        }
      }

      requestAnimationFrame(step);
    }

    if (!("IntersectionObserver" in window)) return;

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const target = counter.dataset.target || counter.dataset.counter;
            if (target && !counter.classList.contains("is-counted")) {
              counter.classList.add("is-counted");
              animateCounter(counter, target);
            }
            counterObserver.unobserve(counter);
          }
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach((el) => {
      counterObserver.observe(el);
    });
  }

  // ============================================
  // 4. HEADER, MOBILE MENU & SCROLL PROGRESS
  // ============================================
  function initHeaderAndNavigation() {
    const header = document.querySelector(".header");
    const progressBar = document.querySelector(".scroll-progress");
    const navToggle = document.querySelector(".nav__toggle");
    const navDrawer = document.querySelector(".nav__drawer");

    let lastScrollY = 0;
    let ticking = false;
    let menuOpen = false;

    function updateHeader() {
      if (progressBar) {
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
        progressBar.style.width = Math.min(progress, 100) + "%";
      }

      if (!header) {
        ticking = false;
        return;
      }

      if (menuOpen) {
        header.classList.remove("is-hidden");
        ticking = false;
        return;
      }

      const currentScrollY = window.scrollY;
      const isHeroPage = document.querySelector(".hero");

      if (currentScrollY > 80) {
        header.classList.remove("is-transparent");
        header.classList.add("is-scrolled");
      } else {
        if (isHeroPage) {
          header.classList.add("is-transparent");
          header.classList.remove("is-scrolled");
        } else {
          header.classList.add("is-scrolled");
          header.classList.remove("is-transparent");
        }
      }

      if (currentScrollY > 200) {
        if (currentScrollY > lastScrollY + 4) {
          header.classList.add("is-hidden");
        } else if (currentScrollY < lastScrollY - 4) {
          header.classList.remove("is-hidden");
        }
      } else {
        header.classList.remove("is-hidden");
      }

      lastScrollY = currentScrollY;
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(updateHeader);
          ticking = true;
        }
      },
      { passive: true }
    );

    updateHeader();

    function openMenu() {
      menuOpen = true;
      header?.classList.remove("is-hidden");
      header?.classList.add("is-scrolled");
      document.body.classList.add("nav-open");
      navToggle?.classList.add("is-open");
      navDrawer?.classList.add("is-open");
      navDrawer?.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      navToggle?.setAttribute("aria-expanded", "true");
      navToggle?.setAttribute("aria-label", "إغلاق القائمة");
    }

    function closeMenu() {
      menuOpen = false;
      document.body.classList.remove("nav-open");
      navToggle?.classList.remove("is-open");
      navDrawer?.classList.remove("is-open");
      navDrawer?.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      navToggle?.setAttribute("aria-expanded", "false");
      navToggle?.setAttribute("aria-label", "فتح القائمة");
      updateHeader();
    }

    navToggle?.addEventListener("click", () => {
      menuOpen ? closeMenu() : openMenu();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menuOpen) closeMenu();
    });

    navDrawer?.addEventListener("click", (e) => {
      if (e.target === navDrawer) closeMenu();
    });

    navDrawer?.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const href = anchor.getAttribute("href");
        if (!href || href === "#") return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerHeight = header?.offsetHeight || 0;
          const targetTop =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight -
            24;
          window.scrollTo({ top: targetTop, behavior: "smooth" });
        }
      });
    });
  }

  // ============================================
  // 5. TESTIMONIALS CAROUSEL
  // ============================================
  function initCarousel() {
    const carouselEl = document.getElementById("testimonials-carousel");
    const dotsContainer = document.querySelector(".testimonials__dots");
    if (!carouselEl) return;

    const slides = carouselEl.querySelectorAll(".testimonial-slide");
    const dots = dotsContainer?.querySelectorAll(".testimonials__dot");
    let current = 0;
    let autoplayInterval;
    let touchStartX = 0;
    let touchEndX = 0;

    if (slides.length <= 1) return;

    function goTo(index) {
      slides[current].classList.remove("is-active");
      dots?.[current]?.classList.remove("is-active");
      dots?.[current]?.setAttribute("aria-selected", "false");

      current = (index + slides.length) % slides.length;
      slides[current].classList.add("is-active");
      dots?.[current]?.classList.add("is-active");
      dots?.[current]?.setAttribute("aria-selected", "true");
    }

    function next() {
      goTo(current + 1);
    }

    function prev() {
      goTo(current - 1);
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayInterval = setInterval(next, 5000);
    }

    function stopAutoplay() {
      if (autoplayInterval) clearInterval(autoplayInterval);
    }

    dots?.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        stopAutoplay();
        goTo(index);
        startAutoplay();
      });
    });

    carouselEl.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    carouselEl.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
          stopAutoplay();
          diff > 0 ? next() : prev();
          startAutoplay();
        }
      },
      { passive: true }
    );

    const wrapper = carouselEl.closest(".testimonials__wrapper");
    wrapper?.addEventListener("mouseenter", stopAutoplay);
    wrapper?.addEventListener("mouseleave", startAutoplay);

    goTo(0);
    startAutoplay();
  }

  // ============================================
  // 6. PROJECTS FILTER BAR
  // ============================================
  function initProjectFilters() {
    const filterBar = document.querySelector(".filter-bar");
    const items = document.querySelectorAll(".filter-item");
    if (!filterBar || !items.length) return;

    filterBar.addEventListener("click", (e) => {
      const button = e.target.closest(".filter-pill");
      if (!button) return;

      filterBar.querySelectorAll(".filter-pill").forEach((btn) => {
        btn.classList.remove("is-active");
        btn.setAttribute("aria-selected", "false");
      });

      button.classList.add("is-active");
      button.setAttribute("aria-selected", "true");

      const filterVal = button.dataset.filter;

      items.forEach((item) => {
        const category = item.dataset.category;
        if (filterVal === "all" || category === filterVal) {
          item.classList.remove("is-hidden");
          item.setAttribute("aria-hidden", "false");
          item.style.opacity = "1";
          item.style.transform = "scale(1)";
        } else {
          item.classList.add("is-hidden");
          item.setAttribute("aria-hidden", "true");
          item.style.opacity = "0";
          item.style.transform = "scale(0.95)";
        }
      });
    });
  }

  // ============================================
  // 7. BEFORE / AFTER SLIDER
  // ============================================
  function initBeforeAfterSlider() {
    const slider = document.getElementById("before-after-slider");
    if (!slider) return;

    const beforeWrapper = slider.querySelector(".ba-slider__before-wrapper");
    const handle = slider.querySelector(".ba-slider__handle");
    const hint = slider.querySelector(".ba-slider__hint");

    if (!beforeWrapper || !handle) return;

    let active = false;
    let currentPos = 50;

    function hideHint() {
      if (hint) hint.classList.add("is-hidden");
    }

    function setPosition(position) {
      currentPos = Math.max(0, Math.min(100, position));
      beforeWrapper.style.setProperty("--ba-split", currentPos + "%");
      handle.style.left = currentPos + "%";
      handle.setAttribute("aria-valuenow", String(Math.round(currentPos)));
    }

    function slide(x) {
      hideHint();
      const rect = slider.getBoundingClientRect();
      if (!rect.width) return;
      setPosition(((x - rect.left) / rect.width) * 100);
    }

    setPosition(50);

    handle.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        hideHint();
        setPosition(currentPos - 5);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        hideHint();
        setPosition(currentPos + 5);
      }
    });

    slider.addEventListener("mousedown", (e) => {
      active = true;
      slide(e.clientX);
    });

    window.addEventListener("mouseup", () => {
      active = false;
    });

    window.addEventListener("mousemove", (e) => {
      if (!active) return;
      slide(e.clientX);
    });

    slider.addEventListener(
      "touchstart",
      (e) => {
        active = true;
        slide(e.touches[0].clientX);
      },
      { passive: false }
    );

    window.addEventListener("touchend", () => {
      active = false;
    });

    window.addEventListener(
      "touchmove",
      (e) => {
        if (!active) return;
        e.preventDefault();
        slide(e.touches[0].clientX);
      },
      { passive: false }
    );
  }

  // ============================================
  // 8. LIGHTBOX DIALOG & PROJECT GALLERY
  // ============================================
  function initLightboxAndGallery() {
    const lightbox = document.getElementById("lightbox");
    if (!lightbox) return;

    let lightboxImages = [];
    let currentIndex = 0;

    function updateLightboxImage() {
      const img = lightbox.querySelector(".lightbox__img");
      const counter = lightbox.querySelector(".lightbox__counter");
      const current = lightboxImages[currentIndex];
      if (img && current?.src) {
        img.hidden = false;
        img.src = current.src;
        img.alt = current.alt || "";
      }
      if (counter) {
        counter.textContent =
          currentIndex + 1 + " / " + lightboxImages.length;
      }
    }

    function openLightbox(images, index) {
      lightboxImages = images;
      currentIndex = index;
      updateLightboxImage();
      if (typeof lightbox.showModal === "function") {
        lightbox.showModal();
      } else {
        lightbox.setAttribute("open", "open");
      }
      document.body.style.overflow = "hidden";
      lightbox.querySelector(".lightbox__close")?.focus();
    }

    function closeLightbox() {
      if (typeof lightbox.close === "function") {
        lightbox.close();
      } else {
        lightbox.removeAttribute("open");
      }
      const img = lightbox.querySelector(".lightbox__img");
      if (img) {
        img.removeAttribute("src");
        img.hidden = true;
      }
      document.body.style.overflow = "";
    }

    lightbox
      .querySelector(".lightbox__close")
      ?.addEventListener("click", closeLightbox);
    lightbox.querySelector(".lightbox__next")?.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % lightboxImages.length;
      updateLightboxImage();
    });
    lightbox.querySelector(".lightbox__prev")?.addEventListener("click", () => {
      currentIndex =
        (currentIndex - 1 + lightboxImages.length) % lightboxImages.length;
      updateLightboxImage();
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
      if (!lightbox.open) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") {
        currentIndex = (currentIndex + 1) % lightboxImages.length;
        updateLightboxImage();
      }
      if (e.key === "ArrowRight") {
        currentIndex =
          (currentIndex - 1 + lightboxImages.length) % lightboxImages.length;
        updateLightboxImage();
      }
    });

    window.openLightbox = openLightbox;

    // Bind project gallery grid
    const grid = document.getElementById("project-gallery-grid");
    if (grid) {
      const items = grid.querySelectorAll(".project-gallery__item");
      const images = Array.from(items).map((item) => {
        const img = item.querySelector("img");
        return {
          src: img?.getAttribute("src") || "",
          alt: img?.getAttribute("alt") || "",
        };
      });

      items.forEach((item, index) => {
        item.addEventListener("click", () => {
          openLightbox(images, index);
        });
      });
    }
  }

  // ============================================
  // 9. BLOG SINGLE TABLE OF CONTENTS
  // ============================================
  function initTableOfContents() {
    const articleBody = document.querySelector(".article-body");
    const tocList = document.querySelector(".toc-list");
    if (!articleBody || !tocList) return;

    const headings = articleBody.querySelectorAll("h2");
    if (!headings.length) {
      const box = tocList.closest(".toc-box");
      if (box) box.style.display = "none";
      return;
    }

    const links = [];
    tocList.innerHTML = "";

    headings.forEach((heading, idx) => {
      const id = heading.getAttribute("id") || "section-" + (idx + 1);
      heading.setAttribute("id", id);

      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#" + id;
      a.className = "toc-link" + (idx === 0 ? " is-active" : "");
      a.textContent = heading.textContent.trim();

      li.appendChild(a);
      tocList.appendChild(li);
      links.push(a);
    });

    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            links.forEach((link) => {
              link.classList.toggle(
                "is-active",
                link.getAttribute("href") === "#" + id
              );
            });
          }
        });
      },
      { rootMargin: "-100px 0px -40% 0px", threshold: 0 }
    );

    headings.forEach((h) => observer.observe(h));
  }

  // ============================================
  // 10. PACKAGE SPECIFICATIONS TABS SWITCHER
  // ============================================
  function initPackageSpecsSwitcher() {
    const specsSection = document.getElementById("specs-section");
    const contentContainer = document.getElementById("spec-panel-content");
    const tabBtns = document.querySelectorAll(".spec-tab-btn");
    const viewSpecsBtns = document.querySelectorAll(
      ".view-specs-btn, .scroll-to-specs",
    );
    const dataMap = window.elmPackagesData || null;

    if (!contentContainer || !tabBtns.length || !dataMap) return;

    function renderSpecContent(pkgKey) {
      const data = dataMap[pkgKey];
      if (!data) return;

      contentContainer.style.opacity = "0";
      setTimeout(() => {
        let html =
          '<div class="spec-panel__header animate-fade-in">' +
          '<h3 id="active-package-title" class="spec-panel__title">' +
          (data.title || "") +
          "</h3>" +
          '<p id="active-package-desc" class="body spec-panel__subtitle">' +
          (data.subtitle || "") +
          "</p>" +
          "</div>" +
          '<div id="specs-list-container" class="specs-list animate-fade-in">';

        (data.specs || []).forEach((item) => {
          const itemLabel = item.label || item.category || "";
          const rawDesc = item.desc || item.text || item.details || "";
          const formattedDesc = String(rawDesc).replace(/\n/g, "<br>");
          html +=
            '<div class="spec-item animate-fade-in">' +
            '<div class="spec-item__label">' +
            "<span>" +
            (item.icon || "🔧") +
            "</span> " +
            "<span>" +
            itemLabel +
            "</span>" +
            "</div>" +
            '<div class="spec-item__desc">' +
            formattedDesc +
            "</div>" +
            "</div>";
        });

        html += "</div>";
        contentContainer.innerHTML = html;
        contentContainer.style.opacity = "1";
      }, 150);
    }

    function setActiveTab(pkgKey) {
      tabBtns.forEach((btn) => {
        const key = btn.dataset.target || btn.dataset.tab;
        const isActive = key === pkgKey;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-selected", isActive ? "true" : "false");
      });
      renderSpecContent(pkgKey);
    }

    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.target || btn.dataset.tab;
        if (key) setActiveTab(key);
      });
    });

    viewSpecsBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const pkgKey = btn.dataset.package || btn.dataset.target;
        if (pkgKey) setActiveTab(pkgKey);
        if (specsSection) {
          const top =
            specsSection.getBoundingClientRect().top + window.scrollY - 96;
          window.scrollTo({ top, behavior: "smooth" });
        }
      });
    });

    const firstKey = tabBtns[0]?.dataset.target || tabBtns[0]?.dataset.tab;
    if (firstKey && !contentContainer.children.length) {
      renderSpecContent(firstKey);
    }
  }

  // ============================================
  // 11.5. OCTOBER MASTER HUB SUB-CATEGORIES ENGINE
  // ============================================
  function initOctoberHub() {
    const hubData = window.elmOctoberHubData || null;
    const hubCards = document.querySelectorAll(".october-hub-card");
    const subcatBtns = document.querySelectorAll(".october-subcat-btn");
    if (!hubData || (!hubCards.length && !subcatBtns.length)) return;

    let currentSubcat = null;
    let currentTier = "silver";

    const promptBox = document.getElementById("october-select-prompt");
    const tiersSection = document.getElementById("october-tiers-section");
    const specsSection = document.getElementById("specs-section");
    const tiersMainTitle = document.getElementById("october-tiers-main-title");
    const tiersMainSubtitle = document.getElementById("october-tiers-main-subtitle");
    const btnBackPackages = document.getElementById("btn-back-to-packages");
    const cardsContainer = document.querySelector(".pricing-grid");
    const noticeContainer = document.getElementById("october-notice-container");
    const noticeText = document.getElementById("october-notice-text");
    const tabsContainer = document.querySelector(".specs-tabs");
    const contentContainer = document.getElementById("spec-panel-content");
    const selectPackageDropdown = document.getElementById("selected-package");

    function renderSubcategory(catKey, shouldScroll) {
      if (!hubData[catKey]) catKey = "october";
      currentSubcat = catKey;
      const cat = hubData[catKey];

      // 1. Update Master Hub Cards Selected State
      hubCards.forEach((card) => {
        const isMatch = card.dataset.subcat === catKey;
        card.classList.toggle("is-selected", isMatch);
      });

      // 2. Update Subcategory Buttons Active State
      subcatBtns.forEach((btn) => {
        const isMatch = btn.dataset.subcat === catKey;
        btn.classList.toggle("is-active", isMatch);
        btn.setAttribute("aria-selected", isMatch ? "true" : "false");
      });

      // 3. Update Tiers Section Header
      if (tiersMainTitle) {
        tiersMainTitle.textContent = "فئات: " + cat.title;
      }
      if (tiersMainSubtitle) {
        const tierNames = cat.cards.map((c) => c.name.split("/")[0].trim()).join("، ");
        tiersMainSubtitle.textContent = "استعرض فئات (" + cat.title + ") (" + tierNames + ") وقارن بين أسعارها ومواصفاتها.";
      }

      // 4. Update Notice Alert Banner
      if (noticeContainer && noticeText) {
        if (cat.notice) {
          noticeText.textContent = cat.notice;
          noticeContainer.style.display = "block";
        } else {
          noticeContainer.style.display = "none";
        }
      }

      // 5. Render Pricing Cards dynamically (3 or 4)
      if (cardsContainer) {
        cardsContainer.classList.remove("grid-3", "grid-4");
        cardsContainer.classList.add(cat.cards.length === 3 ? "grid-3" : "grid-4");
        cardsContainer.innerHTML = "";
        cat.cards.forEach((c) => {
          const cardEl = document.createElement("article");
          cardEl.className = c.card_class;
          cardEl.setAttribute("data-package", c.key);

          const featsHtml = c.features
            .map((f) => `<li><span class="icon">✓</span> <span>${f}</span></li>`)
            .join("");

          cardEl.innerHTML = `
            <div>
              <div class="pricing-card__header">
                <span class="pricing-card__badge">${c.badge}</span>
                <h3 class="pricing-card__title">${c.name}</h3>
                <div class="pricing-card__price">
                  <span class="price-val">${c.price}</span>
                  <span class="price-unit">${c.unit}</span>
                </div>
              </div>
              <div class="pricing-card__body">
                <ul class="pricing-card__features">
                  ${featsHtml}
                </ul>
              </div>
            </div>
            <div class="pricing-card__footer flex flex-col gap-2">
              <a href="#specs-section" class="btn btn--primary btn--full view-specs-btn scroll-to-specs" data-package="${c.key}" data-target="${c.key}">
                عرض المواصفات بالتفصيل
              </a>
              <a href="https://wa.me/201010068145?text=${c.wa_msg}" target="_blank" rel="noopener noreferrer" class="btn btn--whatsapp btn--full">
                احجز العرض الآن
              </a>
            </div>
          `;
          cardsContainer.appendChild(cardEl);
        });

        // Re-attach scroll-to-specs events
        cardsContainer.querySelectorAll(".view-specs-btn, .scroll-to-specs").forEach((btn) => {
          btn.addEventListener("click", (e) => {
            e.preventDefault();
            const pkgKey = btn.dataset.package || btn.dataset.target;
            if (pkgKey) setActiveTier(pkgKey);
            const specsSec = document.getElementById("specs-section");
            if (specsSec) {
              const top = specsSec.getBoundingClientRect().top + window.scrollY - 96;
              window.scrollTo({ top, behavior: "smooth" });
            }
          });
        });
      }

      // 4. Render Specs Tab Buttons
      if (tabsContainer) {
        tabsContainer.innerHTML = "";
        cat.tab_buttons.forEach((tb, idx) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "spec-tab-btn" + (idx === 0 ? " is-active" : "");
          btn.setAttribute("data-tab", tb.key);
          btn.setAttribute("data-target", tb.key);
          btn.setAttribute("role", "tab");
          btn.setAttribute("aria-selected", idx === 0 ? "true" : "false");
          btn.textContent = tb.label;
          btn.addEventListener("click", () => {
            setActiveTier(tb.key);
          });
          tabsContainer.appendChild(btn);
        });
      }

      // 5. Render Specs for the first tier
      currentTier = (cat.tab_buttons && cat.tab_buttons[0]) ? cat.tab_buttons[0].key : (cat.cards[0] ? cat.cards[0].key : "silver");
      renderSpecContent(currentTier);

      // 6. Reveal Tiers and Specs sections & hide Prompt
      if (promptBox) promptBox.style.display = "none";
      if (tiersSection) {
        tiersSection.style.display = "block";
        tiersSection.classList.add("animate-fade-in");
      }
      if (specsSection) {
        specsSection.style.display = "block";
      }

      // 7. Smooth Scroll if requested
      if (shouldScroll && tiersSection) {
        setTimeout(() => {
          const topOffset = tiersSection.getBoundingClientRect().top + window.scrollY - 90;
          window.scrollTo({ top: topOffset, behavior: "smooth" });
        }, 60);
      }
    }

    function setActiveTier(pkgKey) {
      if (tabsContainer) {
        tabsContainer.querySelectorAll(".spec-tab-btn").forEach((btn) => {
          const key = btn.dataset.target || btn.dataset.tab;
          const isActive = key === pkgKey;
          btn.classList.toggle("is-active", isActive);
          btn.setAttribute("aria-selected", isActive ? "true" : "false");
        });
      }
      renderSpecContent(pkgKey);
    }

    function renderSpecContent(pkgKey) {
      const cat = hubData[currentSubcat];
      if (!cat || !cat.specs || !cat.specs[pkgKey]) return;
      currentTier = pkgKey;
      const data = cat.specs[pkgKey];

      if (!contentContainer) return;
      contentContainer.style.opacity = "0";

      setTimeout(() => {
        let html =
          '<div class="spec-panel__header animate-fade-in">' +
          '<h3 id="active-package-title" class="spec-panel__title">' +
          (data.title || "") +
          "</h3>" +
          '<p id="active-package-desc" class="body spec-panel__subtitle">' +
          (data.subtitle || "") +
          "</p>" +
          "</div>" +
          '<div id="specs-list-container" class="specs-list animate-fade-in">';

        if (Array.isArray(data.specs)) {
          data.specs.forEach((s) => {
            const label = s.label || s.category || "";
            const desc = s.desc || s.text || s.details || "";
            const formatted = String(desc).replace(/\n/g, "<br>");
            html +=
              '<div class="spec-item">' +
              '<div class="spec-item__label"><span>🔧</span> <span>' +
              label +
              "</span></div>" +
              '<div class="spec-item__desc">' +
              formatted +
              "</div>" +
              "</div>";
          });
        }
        html += "</div>";
        contentContainer.innerHTML = html;
        contentContainer.style.opacity = "1";

        if (selectPackageDropdown) {
          selectPackageDropdown.value = pkgKey;
        }
      }, 140);
    }

    function handleSelectCategory(catKey, updateHash) {
      if (!catKey) return;
      if (updateHash) {
        if (history.pushState) {
          history.pushState(null, null, "#" + catKey);
        } else {
          location.hash = catKey;
        }
      }
      renderSubcategory(catKey, true);
    }

    // Handle Master Package Cards Click & Keyboard
    hubCards.forEach((card) => {
      card.addEventListener("click", () => {
        handleSelectCategory(card.dataset.subcat, true);
      });
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleSelectCategory(card.dataset.subcat, true);
        }
      });
    });

    // Handle Sub-Category Quick-Switcher Buttons Click
    subcatBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const catKey = btn.dataset.subcat;
        if (catKey === currentSubcat) return;
        handleSelectCategory(catKey, true);
      });
    });

    // Handle Back to Packages button
    if (btnBackPackages) {
      btnBackPackages.addEventListener("click", () => {
        const packagesHub = document.getElementById("october-hub-packages");
        if (packagesHub) {
          const offset = packagesHub.getBoundingClientRect().top + window.scrollY - 90;
          window.scrollTo({ top: offset, behavior: "smooth" });
        }
      });
    }

    // Check URL Hash on load
    function initFromHash() {
      const rawHash = (location.hash || "").replace("#", "").toLowerCase();
      let targetCat = null;
      if (rawHash === "area-65m" || rawHash === "65m") {
        targetCat = "area-65m";
      } else if (rawHash === "area-90m" || rawHash === "90m") {
        targetCat = "area-90m";
      } else if (rawHash === "sun-capital" || rawHash === "mountain-view") {
        targetCat = "sun-capital";
      } else if (rawHash === "october" || rawHash === "october-meter" || rawHash === "meter") {
        targetCat = "october";
      }

      if (targetCat) {
        renderSubcategory(targetCat, true);
      } else {
        // Initial view: show the 4 Master Package Cards only, waiting for user click
        if (promptBox) promptBox.style.display = "block";
        if (tiersSection) tiersSection.style.display = "none";
        if (specsSection) specsSection.style.display = "none";
        hubCards.forEach((c) => c.classList.remove("is-selected"));
      }
    }

    window.addEventListener("hashchange", initFromHash);
    initFromHash();
  }

  // ============================================
  // 12. CONTACT FORM SUBMISSION (WP AJAX)
  // ============================================
  function initContactForm() {
    const form = document.getElementById("contact-form");
    const successEl = document.getElementById("form-success");
    const resetBtn = document.getElementById("reset-form-btn");
    if (!form) return;

    function validateField(input) {
      const val = input.value.trim();
      let isValid = val.length > 0;
      if (isValid && input.type === "tel") {
        const digits = val.replace(/[^0-9]/g, "");
        isValid = digits.length >= 8;
      }
      const group = input.closest(".form-group");
      input.classList.toggle("is-error", !isValid);
      input.setAttribute("aria-invalid", isValid ? "false" : "true");
      if (group) group.classList.toggle("has-error", !isValid);
      return isValid;
    }

    form.querySelectorAll("[required]").forEach((input) => {
      const evt = input.tagName === "SELECT" ? "change" : "input";
      input.addEventListener(evt, () => {
        if (input.classList.contains("is-error")) {
          validateField(input);
        }
      });
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      let valid = true;
      let firstInvalid = null;

      form.querySelectorAll("[required]").forEach((input) => {
        if (!validateField(input)) {
          valid = false;
          if (!firstInvalid) firstInvalid = input;
        }
      });

      if (!valid) {
        firstInvalid?.focus();
        return;
      }

      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn?.innerHTML || "إرسال الطلب";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = "<span>جارٍ الإرسال...</span>";
      }

      const formData = new FormData(form);
      formData.append("action", "elm_submit_lead");
      if (window.elmFrontendConfig?.nonce) {
        formData.append("nonce", window.elmFrontendConfig.nonce);
      }

      try {
        const ajaxUrl = window.elmFrontendConfig?.ajaxUrl;
        if (ajaxUrl) {
          await fetch(ajaxUrl, {
            method: "POST",
            body: formData,
          });
        }
      } catch (err) {
        // Fallback graceful UI
      }

      form.style.display = "none";
      if (successEl) {
        successEl.classList.add("is-visible");
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });

    resetBtn?.addEventListener("click", () => {
      form.reset();
      form.querySelectorAll(".is-error").forEach((el) => {
        el.classList.remove("is-error");
        el.removeAttribute("aria-invalid");
      });
      form.querySelectorAll(".has-error").forEach((el) => {
        el.classList.remove("has-error");
      });
      form.style.display = "";
      successEl?.classList.remove("is-visible");
    });
  }

  function initWhatsappConcierge() {
    const pill = document.getElementById("whatsapp-concierge-pill");
    const closeBtn = document.getElementById("whatsapp-concierge-close");
    if (!pill) return;

    try {
      if (sessionStorage.getItem("elm_wa_pill_closed") === "1") {
        pill.style.display = "none";
      }
    } catch (e) {}

    closeBtn?.addEventListener("click", () => {
      pill.style.display = "none";
      try {
        sessionStorage.setItem("elm_wa_pill_closed", "1");
      } catch (e) {}
    });
  }

  // ============================================
  // INITIALIZE ALL MODULES
  // ============================================
  function initAll() {
    initHeroAnimation();
    initScrollAnimations();
    initCounters();
    initHeaderAndNavigation();
    initCarousel();
    initProjectFilters();
    initBeforeAfterSlider();
    initLightboxAndGallery();
    initTableOfContents();
    initPackageSpecsSwitcher();
    initOctoberHub();
    initContactForm();
    initWhatsappConcierge();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();
