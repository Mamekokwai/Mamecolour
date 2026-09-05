const vscode = require('vscode');

const GENERATED_KEYS = [
  "activityBar.background",
  "titleBar.activeBackground",
  "statusBar.background",
  "sideBarSectionHeader.background",
  "editor.lineHighlightBackground",
  "panelSectionHeader.background",
  "statusBar.debuggingBackground",
  "statusBar.noFolderBackground",
  "activityBar.foreground",
  "titleBar.activeForeground",
  "statusBar.foreground",
  "editor.foreground",
  "sideBar.foreground",
  "sideBarSectionHeader.foreground",
  "list.inactiveSelectionForeground",
  "terminal.foreground",
  "terminal.ansiWhite",
  "input.foreground",
  "quickInput.foreground",
  "widget.foreground",
  "statusBarItem.foreground",
  "breadcrumb.foreground",
  "breadcrumbPicker.foreground",
  "menu.foreground",
  "tab.activeForeground",
  "tab.hoverForeground",
  "panel.foreground",
  "panelSectionHeader.foreground",
  "sideBarTitle.foreground",
  "editorWidget.foreground",
  "editorSuggestWidget.foreground",
  "notifications.foreground",
  "commandCenter.foreground",
  "keybindingLabel.foreground",
  "tab.unfocusedHoverForeground",
  "statusBar.debuggingForeground",
  "panel.background",
  "terminal.background",
  "quickInput.background",
  "widget.background",
  "statusBarItem.background",
  "breadcrumb.background",
  "breadcrumbPicker.background",
  "editorGutter.background",
  "menu.background",
  "tab.activeBackground",
  "sideBarTitle.background",
  "minimap.background",
  "editorWidget.background",
  "editorSuggestWidget.background",
  "notifications.background",
  "commandCenter.background",
  "editorGroupHeader.tabsBackground",
  "sideBar.background",
  "panel.border",
  "input.border",
  "widget.border",
  "menu.border",
  "menu.separatorBackground",
  "tab.hoverBackground",
  "tab.border",
  "editor.lineHighlightBorder",
  "panelTitle.border",
  "panelSectionHeader.border",
  "sideBar.border",
  "sideBarTitle.border",
  "sideBarSectionHeader.border",
  "editorWidget.border",
  "notifications.border",
  "commandCenter.border",
  "keybindingLabel.background",
  "terminal.border",
  "titleBar.border",
  "tab.unfocusedHoverBackground",
  "editorGroup.border",
  "editorGroupHeader.tabsBorder",
  "editorGroupHeader.border",
  "sideBySideEditor.horizontalBorder",
  "sideBySideEditor.verticalBorder",
  "statusBar.border",
  "statusBar.noFolderBorder",
  "commandCenter.inactiveBorder",
  "list.hoverBackground",
  "terminalCursor.foreground",
  "inputOption.activeForeground",
  "focusBorder",
  "quickInputList.focusForeground",
  "statusBarItem.hoverForeground",
  "statusBarItem.activeForeground",
  "breadcrumb.focusForeground",
  "breadcrumb.activeSelectionForeground",
  "breadcrumbPicker.focusForeground",
  "statusBarItem.prominentForeground",
  "menu.selectionForeground",
  "menu.selectionBorder",
  "menubar.selectionForeground",
  "menubar.selectionBorder",
  "panelTitle.activeForeground",
  "editorSuggestWidget.selectedForeground",
  "editorSuggestWidget.highlightForeground",
  "button.foreground",
  "button.border",
  "badge.background",
  "commandCenter.activeForeground",
  "terminal.selectionForeground",
  "statusBar.debuggingBorder",
  "panelTitle.activeBorder",
  "commandCenter.activeBorder",
  "editorLineNumber.activeForeground",
  "editorCursor.foreground",
  "list.activeSelectionForeground",
  "terminal.selectionBackground",
  "inputOption.activeBackground",
  "quickInputList.focusBackground",
  "statusBarItem.hoverBackground",
  "statusBarItem.activeBackground",
  "breadcrumbPicker.focusBackground",
  "statusBarItem.prominentBackground",
  "menu.selectionBackground",
  "menubar.selectionBackground",
  "editorSuggestWidget.selectedBackground",
  "button.background",
  "commandCenter.activeBackground",
  "editor.selectionBackground",
  "list.activeSelectionBackground",
  "terminal.inactiveSelectionBackground",
  "editor.inactiveSelectionBackground",
  "list.inactiveSelectionBackground",
  "terminal.ansiBlack",
  "input.background",
  "tab.inactiveBackground",
  "badge.foreground",
  "tab.unfocusedActiveBackground",
  "tab.unfocusedInactiveBackground",
  "editor.background",
  "editorGroupHeader.noTabsBackground",
  "terminal.ansiRed",
  "terminal.ansiBrightRed",
  "terminal.ansiGreen",
  "terminal.ansiBrightGreen",
  "terminal.ansiYellow",
  "terminal.ansiBrightYellow",
  "terminal.ansiBlue",
  "terminal.ansiBrightBlue",
  "terminal.ansiMagenta",
  "terminal.ansiBrightMagenta",
  "terminal.ansiCyan",
  "terminal.ansiBrightCyan",
  "terminal.ansiBrightBlack",
  "input.placeholderForeground",
  "statusBarItem.prominentHoverBackground",
  "menubar.inactiveForeground",
  "tab.inactiveForeground",
  "panelTitle.inactiveForeground",
  "button.hoverBackground",
  "keybindingLabel.border",
  "titleBar.inactiveForeground",
  "tab.unfocusedActiveForeground",
  "tab.unfocusedInactiveForeground",
  "tab.unfocusedActiveBorder",
  "tab.unfocusedActiveBorderTop",
  "tab.unfocusedHoverBorder",
  "statusBar.noFolderForeground",
  "commandCenter.inactiveForeground",
  "editorLineNumber.foreground",
  "terminal.ansiBrightWhite",
  "statusBarItem.prominentHoverForeground",
  "minimapSlider.background",
  "scrollbarSlider.background",
  "minimapSlider.hoverBackground",
  "scrollbarSlider.hoverBackground",
  "terminal.findMatchBackground",
  "minimapSlider.activeBackground",
  "scrollbarSlider.activeBackground",
  "titleBar.inactiveBackground"
];

const DEFAULT_BASE_COLOR = '#1F1F1F';

function getThemeScope(configuration) {
  const themeName = configuration.get('themeName', '').trim();
  return themeName ? '[' + themeName + ']' : undefined;
}

function hexToHsl(hex) {
  const value = hex.replace(/^#/, '');
  if (!/^[0-9a-fA-F]{6}$/.test(value)) {
    throw new Error('颜色必须是 #RRGGBB 格式');
  }
  const r = parseInt(value.slice(0, 2), 16) / 255;
  const g = parseInt(value.slice(2, 4), 16) / 255;
  const b = parseInt(value.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return { h: 0, s: 0, l };
  const s = l < 0.5 ? d / (max + min) : d / (2 - max - min);
  let h;
  if (max === r) h = ((g - b) / d) % 6;
  else if (max === g) h = ((b - r) / d) + 2;
  else h = ((r - g) / d) + 4;
  h *= 60;
  if (h < 0) h += 360;
  return { h, s, l };
}

function hueToRgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

function hslToHex(h, s, l) {
  let r;
  let g;
  let b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const hue = h / 360;
    r = hueToRgb(p, q, hue + 1 / 3);
    g = hueToRgb(p, q, hue);
    b = hueToRgb(p, q, hue - 1 / 3);
  }
  const byte = (number) => Math.round(number * 255).toString(16).padStart(2, '0').toUpperCase();
  return '#' + byte(r) + byte(g) + byte(b);
}

function derive(baseHsl, lightness, saturation = -1) {
  return hslToHex(baseHsl.h, saturation < 0 ? baseHsl.s : saturation, lightness);
}

function withAlpha(hex, alpha) {
  return hex + alpha;
}

function buildPalette(base) {
  const baseHsl = hexToHsl(base);
  const selection = derive(baseHsl, 0.30, 0.40);
  const accent = derive(baseHsl, 0.80, 0.65);
  return {
    windowSurface: base,
    surface: derive(baseHsl, Math.min(baseHsl.l + 0.04, 0.95)),
    editorSurface: derive(baseHsl, Math.max(baseHsl.l - 0.03, 0.02)),
    inactiveWindow: derive(baseHsl, Math.max(baseHsl.l - 0.08, 0.01)),
    border: derive(baseHsl, Math.min(baseHsl.l + 0.14, 0.80), Math.min(baseHsl.s + 0.08, 0.70)),
    textPrimary: derive(baseHsl, 0.88, Math.min(baseHsl.s + 0.12, 0.65)),
    textMuted: derive(baseHsl, 0.55, Math.min(baseHsl.s + 0.08, 0.60)),
    accent,
    selection,
    inactiveSelection: derive(baseHsl, 0.22, 0.30),
    white: '#FFFFFF',
    selectionAlpha: withAlpha(selection, '80'),
    accentAlphaHover: withAlpha(accent, '80'),
    accentAlphaActive: withAlpha(accent, 'A0'),
    ansiRed: '#F14C4C',
    ansiGreen: '#23D18B',
    ansiYellow: '#F5D76E',
    ansiBlue: '#3B8EEA',
    ansiMagenta: '#D670D6',
    ansiCyan: '#29B8DB'
  };
}

const SETTING_GROUPS = {
  "windowSurface": [
    "activityBar.background",
    "titleBar.activeBackground",
    "statusBar.background",
    "sideBarSectionHeader.background",
    "editor.lineHighlightBackground",
    "panelSectionHeader.background",
    "statusBar.debuggingBackground",
    "statusBar.noFolderBackground"
  ],
  "textPrimary": [
    "activityBar.foreground",
    "titleBar.activeForeground",
    "statusBar.foreground",
    "editor.foreground",
    "sideBar.foreground",
    "sideBarSectionHeader.foreground",
    "list.inactiveSelectionForeground",
    "terminal.foreground",
    "terminal.ansiWhite",
    "input.foreground",
    "quickInput.foreground",
    "widget.foreground",
    "statusBarItem.foreground",
    "breadcrumb.foreground",
    "breadcrumbPicker.foreground",
    "menu.foreground",
    "tab.activeForeground",
    "tab.hoverForeground",
    "panel.foreground",
    "panelSectionHeader.foreground",
    "sideBarTitle.foreground",
    "editorWidget.foreground",
    "editorSuggestWidget.foreground",
    "notifications.foreground",
    "commandCenter.foreground",
    "keybindingLabel.foreground",
    "tab.unfocusedHoverForeground",
    "statusBar.debuggingForeground"
  ],
  "surface": [
    "panel.background",
    "terminal.background",
    "quickInput.background",
    "widget.background",
    "statusBarItem.background",
    "breadcrumb.background",
    "breadcrumbPicker.background",
    "editorGutter.background",
    "menu.background",
    "tab.activeBackground",
    "sideBarTitle.background",
    "minimap.background",
    "editorWidget.background",
    "editorSuggestWidget.background",
    "notifications.background",
    "commandCenter.background",
    "editorGroupHeader.tabsBackground",
    "sideBar.background"
  ],
  "border": [
    "panel.border",
    "input.border",
    "widget.border",
    "menu.border",
    "menu.separatorBackground",
    "tab.hoverBackground",
    "tab.border",
    "editor.lineHighlightBorder",
    "panelTitle.border",
    "panelSectionHeader.border",
    "sideBar.border",
    "sideBarTitle.border",
    "sideBarSectionHeader.border",
    "editorWidget.border",
    "notifications.border",
    "commandCenter.border",
    "keybindingLabel.background",
    "terminal.border",
    "titleBar.border",
    "tab.unfocusedHoverBackground",
    "editorGroup.border",
    "editorGroupHeader.tabsBorder",
    "editorGroupHeader.border",
    "sideBySideEditor.horizontalBorder",
    "sideBySideEditor.verticalBorder",
    "statusBar.border",
    "statusBar.noFolderBorder",
    "commandCenter.inactiveBorder",
    "list.hoverBackground"
  ],
  "accent": [
    "terminalCursor.foreground",
    "inputOption.activeForeground",
    "focusBorder",
    "quickInputList.focusForeground",
    "statusBarItem.hoverForeground",
    "statusBarItem.activeForeground",
    "breadcrumb.focusForeground",
    "breadcrumb.activeSelectionForeground",
    "breadcrumbPicker.focusForeground",
    "statusBarItem.prominentForeground",
    "menu.selectionForeground",
    "menu.selectionBorder",
    "menubar.selectionForeground",
    "menubar.selectionBorder",
    "panelTitle.activeForeground",
    "editorSuggestWidget.selectedForeground",
    "editorSuggestWidget.highlightForeground",
    "button.foreground",
    "button.border",
    "badge.background",
    "commandCenter.activeForeground",
    "terminal.selectionForeground",
    "statusBar.debuggingBorder",
    "panelTitle.activeBorder",
    "commandCenter.activeBorder",
    "editorLineNumber.activeForeground",
    "editorCursor.foreground",
    "list.activeSelectionForeground"
  ],
  "selection": [
    "terminal.selectionBackground",
    "inputOption.activeBackground",
    "quickInputList.focusBackground",
    "statusBarItem.hoverBackground",
    "statusBarItem.activeBackground",
    "breadcrumbPicker.focusBackground",
    "statusBarItem.prominentBackground",
    "menu.selectionBackground",
    "menubar.selectionBackground",
    "editorSuggestWidget.selectedBackground",
    "button.background",
    "commandCenter.activeBackground",
    "editor.selectionBackground",
    "list.activeSelectionBackground"
  ],
  "inactiveSelection": [
    "terminal.inactiveSelectionBackground",
    "editor.inactiveSelectionBackground",
    "list.inactiveSelectionBackground"
  ],
  "editorSurface": [
    "terminal.ansiBlack",
    "input.background",
    "tab.inactiveBackground",
    "badge.foreground",
    "tab.unfocusedActiveBackground",
    "tab.unfocusedInactiveBackground",
    "editor.background",
    "editorGroupHeader.noTabsBackground"
  ],
  "ansiRed": [
    "terminal.ansiRed",
    "terminal.ansiBrightRed"
  ],
  "ansiGreen": [
    "terminal.ansiGreen",
    "terminal.ansiBrightGreen"
  ],
  "ansiYellow": [
    "terminal.ansiYellow",
    "terminal.ansiBrightYellow"
  ],
  "ansiBlue": [
    "terminal.ansiBlue",
    "terminal.ansiBrightBlue"
  ],
  "ansiMagenta": [
    "terminal.ansiMagenta",
    "terminal.ansiBrightMagenta"
  ],
  "ansiCyan": [
    "terminal.ansiCyan",
    "terminal.ansiBrightCyan"
  ],
  "textMuted": [
    "terminal.ansiBrightBlack",
    "input.placeholderForeground",
    "statusBarItem.prominentHoverBackground",
    "menubar.inactiveForeground",
    "tab.inactiveForeground",
    "panelTitle.inactiveForeground",
    "button.hoverBackground",
    "keybindingLabel.border",
    "titleBar.inactiveForeground",
    "tab.unfocusedActiveForeground",
    "tab.unfocusedInactiveForeground",
    "tab.unfocusedActiveBorder",
    "tab.unfocusedActiveBorderTop",
    "tab.unfocusedHoverBorder",
    "statusBar.noFolderForeground",
    "commandCenter.inactiveForeground",
    "editorLineNumber.foreground"
  ],
  "white": [
    "terminal.ansiBrightWhite",
    "statusBarItem.prominentHoverForeground"
  ],
  "selectionAlpha": [
    "minimapSlider.background",
    "scrollbarSlider.background"
  ],
  "accentAlphaHover": [
    "minimapSlider.hoverBackground",
    "scrollbarSlider.hoverBackground",
    "terminal.findMatchBackground"
  ],
  "accentAlphaActive": [
    "minimapSlider.activeBackground",
    "scrollbarSlider.activeBackground"
  ],
  "inactiveWindow": [
    "titleBar.inactiveBackground"
  ]
};

function buildCustomizations(base) {
  const palette = buildPalette(base);
  const colors = {};
  for (const [group, keys] of Object.entries(SETTING_GROUPS)) {
    if (!Object.prototype.hasOwnProperty.call(palette, group)) {
      throw new Error('未定义颜色组: ' + group);
    }
    for (const key of keys) colors[key] = palette[group];
  }
  return colors;
}

function targetFor(configuration) {
  return configuration.get('configurationTarget') === 'global'
    ? vscode.ConfigurationTarget.Global
    : vscode.ConfigurationTarget.Workspace;
}

let colorPickerPanel;

function createNonce() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let nonce = '';
  for (let index = 0; index < 32; index += 1) {
    nonce += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return nonce;
}

function colorPickerHtml(initialColor, nonce) {
  const safeColor = /^#[0-9a-fA-F]{6}$/.test(initialColor) ? initialColor.toUpperCase() : DEFAULT_BASE_COLOR;
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'nonce-${nonce}';">
  <style>
    :root { color-scheme: light dark; }
    body { color: var(--vscode-foreground); background: var(--vscode-editor-background); font-family: var(--vscode-font-family); margin: 0; padding: 24px; }
    .container { max-width: 440px; margin: 0 auto; }
    h1 { font-size: 18px; font-weight: 600; margin: 0 0 18px; }
    .picker { display: grid; grid-template-columns: 1fr 18px; gap: 14px; align-items: stretch; }
    #sv { position: relative; height: 260px; border-radius: 6px; cursor: crosshair; background: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent), #f00; box-shadow: inset 0 0 0 1px #0005; touch-action: none; }
    #sv-thumb { position: absolute; width: 14px; height: 14px; border: 2px solid #fff; border-radius: 50%; box-shadow: 0 0 0 1px #000; transform: translate(-50%, 50%); pointer-events: none; }
    #hue { appearance: none; width: 260px; height: 18px; transform: rotate(-90deg) translateX(-100%); transform-origin: top left; margin: 0; border-radius: 9px; background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%); cursor: pointer; }
    #hue::-webkit-slider-thumb { appearance: none; width: 22px; height: 22px; border: 2px solid #fff; border-radius: 50%; background: transparent; box-shadow: 0 0 0 1px #000; }
    #hue::-moz-range-thumb { width: 18px; height: 18px; border: 2px solid #fff; border-radius: 50%; background: transparent; box-shadow: 0 0 0 1px #000; }
    .preview-row { display: flex; align-items: center; gap: 10px; margin-top: 18px; }
    #preview { width: 34px; height: 34px; border-radius: 5px; border: 1px solid var(--vscode-contrastBorder, #888); }
    #hex { flex: 1; box-sizing: border-box; color: var(--vscode-input-foreground); background: var(--vscode-input-background); border: 1px solid var(--vscode-input-border, #888); padding: 8px 10px; font: inherit; text-transform: uppercase; }
    input:focus, button:focus { outline: 1px solid var(--vscode-focusBorder); outline-offset: 1px; }
    .actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 20px; }
    button { border: 0; border-radius: 2px; padding: 7px 14px; color: var(--vscode-button-foreground); background: var(--vscode-button-background); cursor: pointer; font: inherit; }
    button:hover { background: var(--vscode-button-hoverBackground); }
    #cancel { color: var(--vscode-button-secondaryForeground); background: var(--vscode-button-secondaryBackground); }
    #error { min-height: 18px; color: var(--vscode-errorForeground); font-size: 12px; margin-top: 8px; }
  </style>
</head>
<body>
  <main class="container">
    <h1>设置窗口基础色</h1>
    <div class="picker">
      <div id="sv" role="slider" aria-label="饱和度和明度"><div id="sv-thumb"></div></div>
      <input id="hue" type="range" min="0" max="360" step="1" aria-label="色相">
    </div>
    <div class="preview-row">
      <div id="preview" aria-hidden="true"></div>
      <input id="hex" type="text" maxlength="7" spellcheck="false" aria-label="HEX 颜色值">
    </div>
    <div id="error" role="alert"></div>
    <div class="actions"><button id="cancel">取消</button><button id="apply">应用</button></div>
  </main>
  <script nonce="${nonce}">
    const vscode = acquireVsCodeApi();
    const sv = document.getElementById('sv');
    const thumb = document.getElementById('sv-thumb');
    const hue = document.getElementById('hue');
    const hex = document.getElementById('hex');
    const preview = document.getElementById('preview');
    const error = document.getElementById('error');
    let hsv = { h: 0, s: 0, v: 0 };

    function hexToHsv(value) {
      const r = parseInt(value.slice(1, 3), 16) / 255;
      const g = parseInt(value.slice(3, 5), 16) / 255;
      const b = parseInt(value.slice(5, 7), 16) / 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
      let h = 0;
      if (d) {
        if (max === r) h = ((g - b) / d) % 6;
        else if (max === g) h = (b - r) / d + 2;
        else h = (r - g) / d + 4;
        h *= 60;
        if (h < 0) h += 360;
      }
      return { h, s: max ? (max - min) / max : 0, v: max };
    }

    function hsvToHex(h, s, v) {
      const c = v * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = v - c;
      let r = 0, g = 0, b = 0;
      if (h < 60) [r, g, b] = [c, x, 0];
      else if (h < 120) [r, g, b] = [x, c, 0];
      else if (h < 180) [r, g, b] = [0, c, x];
      else if (h < 240) [r, g, b] = [0, x, c];
      else if (h < 300) [r, g, b] = [x, 0, c];
      else [r, g, b] = [c, 0, x];
      return '#' + [r, g, b].map(channel => Math.round((channel + m) * 255).toString(16).padStart(2, '0')).join('').toUpperCase();
    }

    function render() {
      const color = hsvToHex(hsv.h, hsv.s, hsv.v);
      sv.style.background = 'linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent), hsl(' + hsv.h + ' 100% 50%)';
      thumb.style.left = (hsv.s * 100) + '%';
      thumb.style.bottom = (hsv.v * 100) + '%';
      hue.value = hsv.h;
      hex.value = color;
      preview.style.background = color;
      error.textContent = '';
    }

    function updateSv(event) {
      const rect = sv.getBoundingClientRect();
      hsv.s = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      hsv.v = Math.max(0, Math.min(1, 1 - (event.clientY - rect.top) / rect.height));
      render();
    }

    sv.addEventListener('pointerdown', event => { sv.setPointerCapture(event.pointerId); updateSv(event); });
    sv.addEventListener('pointermove', event => { if (event.buttons) updateSv(event); });
    hue.addEventListener('input', () => { hsv.h = Number(hue.value); render(); });
    hex.addEventListener('input', () => {
      const value = hex.value.trim();
      if (/^#[0-9a-fA-F]{6}$/.test(value)) { hsv = hexToHsv(value); render(); }
      else error.textContent = '请输入 #RRGGBB 格式';
    });
    document.getElementById('cancel').addEventListener('click', () => vscode.postMessage({ type: 'cancel' }));
    document.getElementById('apply').addEventListener('click', () => {
      const value = hex.value.trim();
      if (!/^#[0-9a-fA-F]{6}$/.test(value)) { error.textContent = '请输入 #RRGGBB 格式'; return; }
      vscode.postMessage({ type: 'apply', color: value.toUpperCase() });
    });
    hex.addEventListener('keydown', event => { if (event.key === 'Enter') document.getElementById('apply').click(); });
    hsv = hexToHsv('${safeColor}');
    render();
  </script>
</body>
</html>`;
}

async function applyBaseColor() {
  const configuration = vscode.workspace.getConfiguration('mamecolour');
  const base = configuration.get('baseColor', DEFAULT_BASE_COLOR).trim();
  const colors = buildCustomizations(base);
  const target = targetFor(configuration);
  const workbench = vscode.workspace.getConfiguration();
  const current = workbench.get('workbench.colorCustomizations') || {};
  const themeKey = getThemeScope(configuration);
  const next = { ...current };
  if (themeKey) next[themeKey] = { ...(current[themeKey] || {}), ...colors };
  else Object.assign(next, colors);
  await workbench.update('workbench.colorCustomizations', next, target);
  vscode.window.showInformationMessage('Mamecolour 已应用基础色 ' + base + '（' + Object.keys(colors).length + ' 项）');
}

async function setBaseColor() {
  const configuration = vscode.workspace.getConfiguration('mamecolour');
  const current = configuration.get('baseColor', DEFAULT_BASE_COLOR);
  if (colorPickerPanel) {
    colorPickerPanel.reveal(vscode.ViewColumn.Active);
    return;
  }
  colorPickerPanel = vscode.window.createWebviewPanel(
    'mamecolour.colorPicker',
    'Mamecolour: Set Window Base Color',
    vscode.ViewColumn.Active,
    { enableScripts: true, retainContextWhenHidden: true }
  );
  const nonce = createNonce();
  colorPickerPanel.webview.html = colorPickerHtml(current, nonce);
  colorPickerPanel.webview.onDidReceiveMessage(async message => {
    if (message.type === 'cancel') {
      colorPickerPanel.dispose();
      return;
    }
    if (message.type !== 'apply' || !/^#[0-9a-fA-F]{6}$/.test(message.color || '')) return;
    try {
      await configuration.update('baseColor', message.color.toUpperCase(), targetFor(configuration));
      await applyBaseColor();
      colorPickerPanel.dispose();
    } catch (error) {
      showError(error);
    }
  });
  colorPickerPanel.onDidDispose(() => { colorPickerPanel = undefined; });
}

async function resetColors() {
  const configuration = vscode.workspace.getConfiguration('mamecolour');
  const target = targetFor(configuration);
  const workbench = vscode.workspace.getConfiguration();
  const current = workbench.get('workbench.colorCustomizations') || {};
  const next = { ...current };
  const themeKey = getThemeScope(configuration);
  if (themeKey) {
    const theme = { ...(current[themeKey] || {}) };
    for (const key of GENERATED_KEYS) delete theme[key];
    if (Object.keys(theme).length === 0) delete next[themeKey];
    else next[themeKey] = theme;
  } else {
    for (const key of GENERATED_KEYS) delete next[key];
  }
  await workbench.update('workbench.colorCustomizations', next, target);
  vscode.window.showInformationMessage('Mamecolour 已移除生成的颜色设置');
}

function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand('mamecolour.setBaseColor', () => setBaseColor().catch(showError)),
    vscode.commands.registerCommand('mamecolour.applyBaseColor', () => applyBaseColor().catch(showError)),
    vscode.commands.registerCommand('mamecolour.resetColors', () => resetColors().catch(showError))
  );
}

function showError(error) {
  const message = error && error.message ? error.message : String(error);
  vscode.window.showErrorMessage('Mamecolour: ' + message);
}

function deactivate() {}

module.exports = { activate, deactivate };
