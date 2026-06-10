let filters = {
  brightness: {
    name: "brightness",
    min: 0,
    max: 200,
    value: 100,
    unit: "%",
    section: "tone",
  },
  contrast: {
    name: "contrast",
    min: 0,
    max: 200,
    value: 100,
    unit: "%",
    section: "tone",
  },
  saturation: {
    name: "saturate",
    min: 0,
    max: 200,
    value: 100,
    unit: "%",
    section: "tone",
  },
  blur: {
    name: "blur",
    min: 0,
    max: 20,
    value: 0,
    unit: "px",
    section: "effects",
  },
  grayscale: {
    name: "grayscale",
    min: 0,
    max: 100,
    value: 0,
    unit: "%",
    section: "effects",
  },
  sepia: {
    name: "sepia",
    min: 0,
    max: 100,
    value: 0,
    unit: "%",
    section: "effects",
  },
  huerotate: {
    name: "hue-rotate",
    min: 0,
    max: 360,
    value: 0,
    unit: "deg",
    section: "effects",
  },
  invert: {
    name: "invert",
    min: 0,
    max: 100,
    value: 0,
    unit: "%",
    section: "effects",
  },
  opacity: {
    name: "opacity",
    min: 0,
    max: 100,
    value: 100,
    unit: "%",
    section: "effects",
  },
};

let file = null;
let image = null;

let imageCanvas = document.querySelector("#ig-canvas");
let canvasCTX = imageCanvas.getContext("2d");

let fileInput = document.querySelector("#image-input");
let resetBtn = document.querySelector("#reset-btn");
let exportBtn = document.querySelector("#export-btn");

let filtersContainer = document.querySelector(".ig-panel-section");

function createFilters(name, unit = "%", value, min, max, section) {
  let filtersContainer = document.querySelector(
    `.ig-panel-section[data-section="${section}"]`,
  );

  /* filters container */
  let sliderRowDiv = document.createElement("div");
  sliderRowDiv.classList.add("ig-slider-row");

  /* filter name and value div */
  let sliderHeadDiv = document.createElement("div");
  sliderHeadDiv.classList.add("ig-slider-head");

  /* name element of filter */
  let filterName = document.createElement("span");
  filterName.classList.add("ig-slider-name");
  filterName.textContent = name;

  /* value element of filter */
  let filterVal = document.createElement("span");
  filterVal.classList.add("ig-slider-val");
  filterVal.id = `val-${name}`;
  filterVal.textContent = value;

  /* filter input element */
  let filterInput = document.createElement("input");
  filterInput.classList.add("ig-range");
  filterInput.type = "range";
  filterInput.min = min;
  filterInput.max = max;
  filterInput.value = value;
  filterInput.name = name;

  //Live update
  filterInput.addEventListener("input", () => {
    filterVal.textContent = filterInput.value;
    filters[name].value = filterInput.value;
    applyFilter();
  });

  filtersContainer.appendChild(sliderRowDiv);
  sliderRowDiv.appendChild(sliderHeadDiv);
  sliderHeadDiv.appendChild(filterName);
  sliderHeadDiv.appendChild(filterVal);
  sliderRowDiv.appendChild(filterInput);
}

Object.keys(filters).forEach((key) => {
  let createFilter = createFilters(
    key,
    filters[key].unit,
    filters[key].value,
    filters[key].min,
    filters[key].max,
    filters[key].section,
  );
});

fileInput.addEventListener("change", (event) => {
  file = event.target.files[0];

  if (!file) return;

  let igPlaceholder = document.querySelector(".ig-placeholder");
  igPlaceholder.style.display = "none";
  imageCanvas.style.display = "block";

  let igStatusDot = document.querySelector(".ig-status-dot");
  igStatusDot.style.background = "green";
  let igStatus = document.querySelector(".ig-status-text");
  igStatus.textContent = "image is loaded";

  let img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    image = img;
    imageCanvas.width = image.width;
    imageCanvas.height = image.height;
    canvasCTX.drawImage(img, 0, 0);

    updateFileInfo(file, img);

    let dimEl = document.querySelector(".ig-status-dim");
    if (dimEl) dimEl.textContent = `${img.width} × ${img.height}`;
  };
});

function applyFilter() {
  canvasCTX.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

  canvasCTX.filter =
    `brightness(${filters.brightness.value}${filters.brightness.unit}) contrast(${filters.contrast.value}${filters.contrast.unit})saturate(${filters.saturation.value}${filters.saturation.unit}) blur(${filters.blur.value}${filters.blur.unit}) grayscale(${filters.grayscale.value}${filters.grayscale.unit}) sepia(${filters.sepia.value}${filters.sepia.unit}) hue-rotate(${filters.huerotate.value}${filters.huerotate.unit}) invert(${filters.invert.value}${filters.invert.unit}) opacity(${filters.opacity.value}${filters.opacity.unit})`.trim();

  canvasCTX.drawImage(image, 0, 0);
}

resetBtn.addEventListener("click", () => {
  filters = {
    brightness: {
      name: "brightness",
      min: 0,
      max: 200,
      value: 100,
      unit: "%",
      section: "tone",
    },
    contrast: {
      name: "contrast",
      min: 0,
      max: 200,
      value: 100,
      unit: "%",
      section: "tone",
    },
    saturation: {
      name: "saturate",
      min: 0,
      max: 200,
      value: 100,
      unit: "%",
      section: "tone",
    },
    blur: {
      name: "blur",
      min: 0,
      max: 20,
      value: 0,
      unit: "px",
      section: "effects",
    },
    grayscale: {
      name: "grayscale",
      min: 0,
      max: 100,
      value: 0,
      unit: "%",
      section: "effects",
    },
    sepia: {
      name: "sepia",
      min: 0,
      max: 100,
      value: 0,
      unit: "%",
      section: "effects",
    },
    huerotate: {
      name: "hue-rotate",
      min: 0,
      max: 360,
      value: 0,
      unit: "deg",
      section: "effects",
    },
    invert: {
      name: "invert",
      min: 0,
      max: 100,
      value: 0,
      unit: "%",
      section: "effects",
    },
    opacity: {
      name: "opacity",
      min: 0,
      max: 100,
      value: 100,
      unit: "%",
      section: "effects",
    },
  };

  document.querySelectorAll(".ig-panel-section").forEach((section) => {
    section.innerHTML = "";
  });

  document.querySelector('[data-section="tone"]').innerHTML =
    '<div class="ig-section-label">Tone</div>';
  document.querySelector('[data-section="effects"]').innerHTML =
    '<div class="ig-section-label">Effects</div>';

  // Preset active class reset
  document
    .querySelectorAll(".ig-preset-card")
    .forEach((c) => c.classList.remove("active"));

  resetSlider();
  applyFilter();
});

function resetSlider() {
  Object.keys(filters).forEach((key) => {
    let createFilter = createFilters(
      key,
      filters[key].unit,
      filters[key].value,
      filters[key].min,
      filters[key].max,
      filters[key].section,
    );
  });
}

exportBtn.addEventListener("click", () => {
  let link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = imageCanvas.toDataURL();
  link.click();
});

function applyPreset(presetFilters) {
  if (!image) return;

  Object.keys(presetFilters).forEach((key) => {
    if (filters[key]) {
      filters[key].value = presetFilters[key];
    }
  });

  applyFilter();
}

// Preset and info
const tabs = document.querySelectorAll(".ig-tab");
const panel = document.getElementById("ig-panel");

const presetData = [
  {
    name: "Vintage",
    colors: ["#c4a882", "#8b6f47", "#5c4033"],
    filters: {
      brightness: 110,
      contrast: 85,
      saturation: 75,
      sepia: 40,
      blur: 0,
      grayscale: 0,
      huerotate: 0,
      invert: 0,
      opacity: 100,
    },
  },
  {
    name: "Chrome",
    colors: ["#e8e8e8", "#a0a0a0", "#404040"],
    filters: {
      brightness: 120,
      contrast: 130,
      saturation: 60,
      sepia: 0,
      blur: 0,
      grayscale: 20,
      huerotate: 0,
      invert: 0,
      opacity: 100,
    },
  },
  {
    name: "Fade",
    colors: ["#d4c5b0", "#b8a99a", "#9c8c80"],
    filters: {
      brightness: 115,
      contrast: 75,
      saturation: 70,
      sepia: 20,
      blur: 0,
      grayscale: 0,
      huerotate: 0,
      invert: 0,
      opacity: 100,
    },
  },
  {
    name: "Cinema",
    colors: ["#1a1a2e", "#4a4560", "#ff6b35"],
    filters: {
      brightness: 90,
      contrast: 140,
      saturation: 80,
      sepia: 0,
      blur: 0,
      grayscale: 0,
      huerotate: 200,
      invert: 0,
      opacity: 100,
    },
  },
  {
    name: "Matte",
    colors: ["#e8ddd0", "#c4b8aa", "#857870"],
    filters: {
      brightness: 105,
      contrast: 80,
      saturation: 65,
      sepia: 15,
      blur: 0,
      grayscale: 0,
      huerotate: 0,
      invert: 0,
      opacity: 100,
    },
  },
  {
    name: "Vivid",
    colors: ["#ff4d6d", "#06d6a0", "#118ab2"],
    filters: {
      brightness: 110,
      contrast: 130,
      saturation: 180,
      sepia: 0,
      blur: 0,
      grayscale: 0,
      huerotate: 0,
      invert: 0,
      opacity: 100,
    },
  },
  {
    name: "Noir",
    colors: ["#2a2a2a", "#555", "#888"],
    filters: {
      brightness: 90,
      contrast: 120,
      saturation: 0,
      sepia: 0,
      blur: 0,
      grayscale: 100,
      huerotate: 0,
      invert: 0,
      opacity: 100,
    },
  },
  {
    name: "Golden",
    colors: ["#f4c542", "#e8a020", "#c07800"],
    filters: {
      brightness: 115,
      contrast: 110,
      saturation: 140,
      sepia: 50,
      blur: 0,
      grayscale: 0,
      huerotate: 30,
      invert: 0,
      opacity: 100,
    },
  },
];

function getFilterContent() {
  return panel.innerHTML;
}

const presetContent = `
    <div class="ig-panel-section">
      <div class="ig-section-label">Style Presets</div>
      <div class="ig-presets-grid">
        ${presetData
          .map(
            (p, i) => `
          <div class="ig-preset-card" data-index="${i}">
            <div class="ig-preset-thumb" style="background: linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]}, ${p.colors[2]})"></div>
            <div class="ig-preset-name">${p.name}</div>
            <div class="preset-colors">
              ${p.colors.map((c) => `<div class="pc" style="background:${c}"></div>`).join("")}
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
  `;

const infoContent = `
  <div class="ig-panel-section">
    <div class="ig-section-label">File Info</div>
    <div style="display:flex;flex-direction:column;gap:10px;">
      ${[
        ["Filename", "info-filename", "—"],
        ["Dimensions", "info-dimensions", "— × —"],
        ["File size", "info-filesize", "—"],
        ["Format", "info-format", "—"],
        ["Color mode", "info-colormode", "—"],
      ]
        .map(
          ([label, id, val]) => `
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;color:rgba(255,255,255,0.35);">${label}</span>
          <span id="${id}" style="font-size:12px;font-family:'Space Mono',monospace;color:rgba(255,255,255,0.55);">${val}</span>
        </div>
      `,
        )
        .join("")}
    </div>
  </div>
`;

tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    panel.style.opacity = "0";
    setTimeout(() => {
      if (i === 0) {
        panel.innerHTML = `
          <div class="ig-panel-section" data-section="tone">
            <div class="ig-section-label">Tone</div>
          </div>
          <div class="ig-divider"></div>
          <div class="ig-panel-section" data-section="effects">
            <div class="ig-section-label">Effects</div>
          </div>
        `;
        Object.keys(filters).forEach((key) => {
          createFilters(
            key,
            filters[key].unit,
            filters[key].value,
            filters[key].min,
            filters[key].max,
            filters[key].section,
          );
        });
      } else if (i === 1) {
        panel.innerHTML = presetContent;
      } else {
        panel.innerHTML = infoContent;
        refreshInfoPanel();
      }

      panel.style.transition = "opacity 0.2s ease";
      panel.style.opacity = "1";
      attachSliderListeners();
      if (i === 2) refreshInfoPanel();
    }, 120);
  });
});

function attachSliderListeners() {
  panel.querySelectorAll(".ig-range").forEach((input) => {
    input.addEventListener("input", () => {
      let key = input.name;
      filters[key].value = input.value;

      let valEl = document.getElementById(`val-${input.name}`);
      if (valEl) valEl.textContent = input.value;

      applyFilter();
    });
  });

  panel.querySelectorAll(".ig-preset-card").forEach((card) => {
    card.addEventListener("click", () => {
      panel
        .querySelectorAll(".ig-preset-card")
        .forEach((c) => c.classList.remove("active"));
      card.classList.add("active");

      let index = card.dataset.index;
      applyPreset(presetData[index].filters);
    });
  });
}

function updateFileInfo(file, img) {
  let sizeInKB = (file.size / 1024).toFixed(1);
  let sizeFormatted =
    sizeInKB > 1024 ? (sizeInKB / 1024).toFixed(2) + " MB" : sizeInKB + " KB";

  let format = file.name.split(".").pop().toUpperCase();

  window.fileInfoData = {
    filename: file.name,
    dimensions: `${img.width} × ${img.height}`,
    filesize: sizeFormatted,
    format: format,
    colormode: "RGB",
  };

  refreshInfoPanel();
}

function refreshInfoPanel() {
  if (!window.fileInfoData) return;
  const d = window.fileInfoData;

  const set = (id, val) => {
    let el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  set("info-filename", d.filename);
  set("info-dimensions", d.dimensions);
  set("info-filesize", d.filesize);
  set("info-format", d.format);
  set("info-colormode", d.colormode);
}
