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
    ansiRed: '#F38BA8',
    ansiGreen: '#A6E3A1',
    ansiYellow: '#F9E2AF',
    ansiBlue: '#89B4FA',
    ansiMagenta: '#CBA6F7',
    ansiCyan: '#94E2D5'
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

async function applyBaseColor() {
  const configuration = vscode.workspace.getConfiguration('mamecolour');
  const base = configuration.get('baseColor', '#2b1e2e').trim();
  const themeName = configuration.get('themeName', 'Catppuccin Mocha').trim() || 'Catppuccin Mocha';
  const colors = buildCustomizations(base);
  const target = targetFor(configuration);
  const workbench = vscode.workspace.getConfiguration();
  const current = workbench.get('workbench.colorCustomizations') || {};
  const themeKey = '[' + themeName + ']';
  const next = { ...current, [themeKey]: { ...(current[themeKey] || {}), ...colors } };
  await workbench.update('workbench.colorCustomizations', next, target);
  vscode.window.showInformationMessage('Mamecolour 已应用基础色 ' + base + '（' + Object.keys(colors).length + ' 项）');
}

async function setBaseColor() {
  const configuration = vscode.workspace.getConfiguration('mamecolour');
  const current = configuration.get('baseColor', '#2b1e2e');
  const value = await vscode.window.showInputBox({
    title: 'Mamecolour：设置窗口基础色',
    prompt: '输入 #RRGGBB，其他界面颜色将从此颜色自动派生',
    value: current,
    validateInput: (input) => /^#[0-9a-fA-F]{6}$/.test(input.trim()) ? undefined : '请输入 #RRGGBB 格式'
  });
  if (!value) return;
  const target = targetFor(configuration);
  await configuration.update('baseColor', value.trim().toUpperCase(), target);
  await applyBaseColor();
}

async function resetColors() {
  const configuration = vscode.workspace.getConfiguration('mamecolour');
  const themeName = configuration.get('themeName', 'Catppuccin Mocha').trim() || 'Catppuccin Mocha';
  const target = targetFor(configuration);
  const workbench = vscode.workspace.getConfiguration();
  const current = workbench.get('workbench.colorCustomizations') || {};
  const themeKey = '[' + themeName + ']';
  const theme = { ...(current[themeKey] || {}) };
  for (const key of GENERATED_KEYS) delete theme[key];
  const next = { ...current };
  if (Object.keys(theme).length === 0) delete next[themeKey];
  else next[themeKey] = theme;
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

