/**
 * ultra-super-lux.js — Elmohandes Decor
 * Dynamic package specification switcher & interactive actions
 */

(function () {
  "use strict";

  // Packages specifications data dictionary
  const packagesData = {
    "silver": {
        "title": "سيلفر \/ Silver — 225,000 جنية كلي",
        "desc": "مواصفات ممتازة واقتصادية متكاملة لمساحة 90 متر مربع تشمل البنود الأساسية والتصميم والتنفيذ بدقة عالية.",
        "specs": [
            {
                "label": "العزل المائي",
                "desc": "مجموعة عزل إسمنتي معتمد من Smart Home معدل بالبوليمرات لمنع تسريب المياه تماماً للحمام والمطبخ."
            },
            {
                "label": "تأسيس السباكة",
                "desc": "توريد وتركيب خامات التأسيس من خامات BR للتغذية وسمارت هوم للصرف بضمان 10 سنوات كاملة."
            },
            {
                "label": "صرف التكييفات",
                "desc": "توريد وتركيب خامات سمارت هوم لعمل صرف تكييفات مستقل لكل نقطة تكييف داخل الوحدة."
            },
            {
                "label": "تأسيس الكهرباء",
                "desc": "أسلاك السويدي الأصلي المعتمد - خراطيم وعلب ماجيك وفليكسيبل مصطفى محمود - لوحة قواطع فينوس سبرنت - مفاتيح وقواطع السويدي (هيميل) - أسلاك الدش والتليفون إيطالي."
            },
            {
                "label": "تشطيب السباكة",
                "desc": "توريد وتركيب طقم صحي إيديال ستاندرد (سابيس) - طقم خلاطات هاواي تركي مستورد - خلاط لزوم حوض المطبخ تركي."
            },
            {
                "label": "تشطيب الكهرباء",
                "desc": "توريد وتركيب خامات تشطيب الكهرباء النهائية من لقم وشاسيهات وأوشاش ماركة (سانشي) بضمان مدى الحياة حسب اختيار شكل العميل."
            },
            {
                "label": "المصيص والجبس",
                "desc": "توريد وتركيب خامات لزوم عمل ضهارة جبسية ومصيص لكامل جدران وأسقف الوحدة."
            },
            {
                "label": "الكرانيش والفيوتك",
                "desc": "توريد وتركيب كرانيش جبسية كلاسيكية لكامل الغرف + إطارات فيوتك (Futec) للمطبخ والحمام."
            },
            {
                "label": "النجارة والأبواب",
                "desc": "توريد وتركيب حلوق خشب موسكي أصيل + أبواب غرف موسكي قشرة أرو من الوجهين شاملة المفصلات، كوالين الأهرام، والأوكر بدهان أستر أو لاكيه."
            },
            {
                "label": "أرضيات السيراميك",
                "desc": "توريد سيراميك لزوم الوحدة بالكامل بقيمة إجمالية (27,000ج) من خامات فينيسيا، الفا، أورينت أو فيردي + توريد خامات التركيب شامل مصنعية التركيب."
            },
            {
                "label": "أعمال الدهانات",
                "desc": "تجهيز الجدران: 2 سكينة معجون سافيتو + 3 سكاكين معجون GLC + 2 وش بطانة 30*30 + التشطيب النهائي بدهانات جوتن أو سايبس سلك قابلة للغسيل + عمل 2 جانب ديكور هدية (قطيفة)."
            },
            {
                "label": "التصميم الفني",
                "desc": "إعداد مخططات توزيع الفرش والأثاث بتقنية 2D لتنظيم حركة المساحات بدقة."
            }
        ]
    },
    "gold": {
        "title": "جولد \/ Gold — 270,000 جنية كلي",
        "desc": "الباقة الأكثر طلباً لمساحة 90 متر مربع! سباكة بضمان مدى الحياة، حوض بوحدة أكريليك، أسقف معلقة جبسيوم بورد، وتصميم 3D.",
        "specs": [
            {
                "label": "العزل المائي",
                "desc": "مجموعة عزل إسمنتي معتمد من Smart Home معدل بالبوليمرات لضمان عزل كامل للمطابخ والحمامات."
            },
            {
                "label": "تأسيس السباكة",
                "desc": "توريد وتركيب خامات التأسيس الفاخرة من خامات BR للتغذية وسمارت هوم للصرف مع شهادة ضمان معتمد مدى الحياة."
            },
            {
                "label": "صرف التكييفات",
                "desc": "تأسيس شبكة صرف تكييفات مدفونة ماركة سمارت هوم لجميع الغرف والصالون بشكل خفي."
            },
            {
                "label": "تأسيس الكهرباء",
                "desc": "أسلاك السويدي الأصلي المعتمد - خراطيم وعلب ماجيك وفليكسيبل مصطفى محمود - لوحة اتصالات متكاملة - تأسيس ساوند سيستم وتأسيس شبكة كاميرات مراقبة (خراطيم فقط)."
            },
            {
                "label": "تشطيب السباكة",
                "desc": "توريد وتركيب قاعدة ملاصقة للحائط إيديال ستاندرد (بلان) - توريد وتركيب حوض شامل وحدة أكريليك - توريد وتركيب طقم خلاطات إيديال ستاندرد (سليم لاين) - كابينة شاور سيكوريت - توريد وتركيب خلاط لحوض المطبخ."
            },
            {
                "label": "تشطيب الكهرباء",
                "desc": "توريد وتركيب لقم ومفاتيح وأوشاش من ماركات سانشي أو أوسا الفاخرة حسب ألوان الجدران واختيار العميل."
            },
            {
                "label": "المصيص والجدران",
                "desc": "أعمال لياسة ومصيص ناعم عالي الدقة لإعداد جدران الشقة لاستقبال المعجون والدهانات."
            },
            {
                "label": "الكرانيش والديكور",
                "desc": "توريد وتركيب كرانيش جبسية لكافة الغرف لإضفاء لمسة جمالية."
            },
            {
                "label": "النجارة والأبواب",
                "desc": "أبواب غرف خشبية عالية الجودة قشرة أرو دهان أستر فاخر شاملة كوالين الأهرام ومفصلات وأوكر كومكس المميزة."
            },
            {
                "label": "أرضيات السيراميك",
                "desc": "توريد سيراميك راقي وفرز أول للصالون والغرف بقيمة (30,000ج) شامل الرمل والأسمنت ومصنعيات التركيب الاحترافية."
            },
            {
                "label": "أعمال الدهانات",
                "desc": "تجهيز الجدران: 2 سكينة سافيتو + 3 سكاكين معجون GLC + 2 وش بطانة + تشطيب نهائي بدهانات جوتن (Jotun) العالمية الفاخرة + عمل جدران ديكور قطيفة."
            },
            {
                "label": "الجبسيوم بورد",
                "desc": "توريد وتركيب جبسيوم بورد لعمل بيت نور فخم في الريسبشن والممرات شامل الإضاءة المخفية الليد واسبوتات الإضاءة ماركة LEDEX."
            },
            {
                "label": "التصميم الفني",
                "desc": "إعداد تصميم 3D كامل لمنطقة الاستقبال (الريسبشن) لرؤية الديكور والألوان قبل التنفيذ + مخططات 2D للفرش وتوزيع نقاط الإضاءة لكامل الشقة."
            }
        ]
    },
    "platinum": {
        "title": "بلاتنيوم \/ Platinum — 320,000 جنية كلي",
        "desc": "باقة الرفاهية الكاملة لمساحة 90 متر مربع! قواطع ABB، خلاط دش دفن إيديال ستاندرد، عزل سيكا 107، وأبواب PVC تركي، وجبسيوم بورد فلات.",
        "specs": [
            {
                "label": "العزل المائي",
                "desc": "مجموعة عزل إسمنتي كيميائي معتمد عالي الجودة بمادة سيكا 107 (Sika 107) لضمان منع تسريب المياه تماماً."
            },
            {
                "label": "تأسيس السباكة",
                "desc": "تأسيس التغذية خامات BR الألمانية وتأسيس الصرف خامات سمارت هوم بضمان واختبار معتمد 10 سنوات."
            },
            {
                "label": "صرف التكييفات",
                "desc": "شبكات صرف تكييفات معزولة لكل غرف الوحدة لمنع أي تسريب مستقبلي للجدران."
            },
            {
                "label": "تأسيس الكهرباء",
                "desc": "أسلاك السويدي الأصلي مع قواطع ABB المعتمدة - لوحة اتصالات مخصصة - تأسيس متكامل للساوند سيستم وكاميرات المراقبة."
            },
            {
                "label": "تشطيب السباكة",
                "desc": "حمام (1): وحدة حوض أكريليك راقية - قاعدة معلقة وخزان دفن - خلاط دش دفن إيديال ستاندرد (Ideal Standard) - كابينة شاور زجاج سيكوريت - خلاط حوض مطبخ تركي."
            },
            {
                "label": "تشطيب الكهرباء",
                "desc": "مفاتيح وأوشاش تشطيب فاخرة ماركة سانشي أو أوسا بضمان مدى الحياة حسب اختيار العميل."
            },
            {
                "label": "المصيص والجدران",
                "desc": "ضهارة جبسية ومصيص فائق النعومة لإجمالي الغرف والمطبخ."
            },
            {
                "label": "الكرانيش والفيوتك",
                "desc": "توريد وتركيب كرانيش للمطبخ فقط."
            },
            {
                "label": "النجارة والأبواب",
                "desc": "أبواب غرف PVC تركي فاخرة ومستوردة للغرف والحمامات تتميز بمقاومتها الكاملة للمياه، الرطوبة، والحرارة مع عزل صوت ممتاز."
            },
            {
                "label": "أرضيات السيراميك",
                "desc": "توريد سيراميك راقي بقيمة إجمالية (38,000ج) شامل الرمل والأسمنت الأسود والأبيض والتركيب الهندسي الفني."
            },
            {
                "label": "أعمال الدهانات",
                "desc": "تحضير فائق: 2 سكينة سافيتو + 3 سكاكين معجون GLC + 2 وش بطانة + تشطيب نهائي بدهانات جوتن (Jotun) العالمية الفاخرة."
            },
            {
                "label": "الجبسيوم بورد",
                "desc": "توريد وتركيب جبسيوم بورد فلات للاستقبال والطرقات والحمام شامل الإضاءة الكاملة من الليد واسبوتات الإضاءة LEDEX."
            },
            {
                "label": "التصميم الفني",
                "desc": "تصميم داخلي ثلاثي الأبعاد (3D Design) كامل وتفصيلي لكافة غرف ومساحات الشقة مع توزيع الأثاث والإضاءة والديكورات."
            }
        ]
    }
};

  // DOM Elements
  const tabsContainer = document.querySelector(".specs-tabs");
  const specListContainer = document.getElementById("specs-list-container");
  const activeTitle = document.getElementById("active-package-title");
  const activeDesc = document.getElementById("active-package-desc");
  const selectPackageDropdown = document.getElementById("selected-package");

  if (!tabsContainer || !specListContainer) return;

  // Render specifications for selected package
  function renderSpecs(pkgKey) {
    const data = packagesData[pkgKey];
    if (!data) return;

    // Update Title and Subtitle
    if (activeTitle) activeTitle.textContent = data.title;
    if (activeDesc) activeDesc.textContent = data.desc;

    // Clear previous list
    specListContainer.innerHTML = "";

    // Build specification cards
    data.specs.forEach((spec) => {
      const item = document.createElement("div");
      item.className = "spec-item animate-fade-in";

      // Formatting multi-line text (like in plumbing fixtures)
      const rawText = spec.text || spec.desc || "";
      const formattedText = String(rawText).replace(/\n/g, "<br>");

      item.innerHTML = `
        <div class="spec-item__label">
          <span>🔧</span>
          <span>${spec.label}</span>
        </div>
        <div class="spec-item__desc">${formattedText}</div>
      `;
      specListContainer.appendChild(item);
    });

    // Auto-update the contact form dropdown selection
    if (selectPackageDropdown) {
      selectPackageDropdown.value = pkgKey;
    }
  }

  // Handle Tab Switch Click
  tabsContainer.addEventListener("click", (e) => {
    const tabBtn = e.target.closest(".spec-tab-btn");
    if (!tabBtn) return;

    // Toggle active classes on tab buttons
    tabsContainer.querySelectorAll(".spec-tab-btn").forEach((btn) => {
      btn.classList.remove("is-active");
      btn.setAttribute("aria-selected", "false");
    });

    tabBtn.classList.add("is-active");
    tabBtn.setAttribute("aria-selected", "true");

    // Switch specifications
    const pkgKey = tabBtn.dataset.tab;

    // Add fade animation reset
    const panel = document.getElementById("spec-panel");
    if (panel) {
      panel.classList.remove("animate-fade-in");
      void panel.offsetWidth; // Trigger reflow to restart animation
      panel.classList.add("animate-fade-in");
    }

    renderSpecs(pkgKey);
  });

  // Handle overview card buttons scroll-to-specs and select tab
  document.querySelectorAll(".scroll-to-specs").forEach((button) => {
    button.addEventListener("click", (e) => {
      const targetPackage = e.currentTarget.dataset.target;
      if (!targetPackage) return;

      // Scroll to specs section smoothly
      const specsSection = document.getElementById("specs-section");
      if (specsSection) {
        const elementPosition =
          specsSection.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - 90;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }

      // Simulate tab click
      const correspondingTab = tabsContainer.querySelector(
        `[data-tab="${targetPackage}"]`
      );
      if (correspondingTab) {
        correspondingTab.click();
      }
    });
  });

  // Initialize page on load with default specs
  renderSpecs("silver");
})();
