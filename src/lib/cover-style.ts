const PALETTES = [
  ["#0b1d2a", "#1f6f8b", "#99c24d"],
  ["#1a0a2e", "#7b2cbf", "#e0aaff"],
  ["#1c1008", "#c44900", "#ffb703"],
  ["#06141b", "#0353a4", "#00a896"],
  ["#1b0c0c", "#9b2226", "#ee9b00"],
  ["#0d1b1e", "#3d5a80", "#98c1d9"],
  ["#140d1a", "#5a189a", "#ff6d00"],
  ["#101820", "#fee715", "#2ecc71"],
  ["#1a1423", "#ff4d6d", "#ffccd5"],
  ["#0f2027", "#203a43", "#2c5364"],
  ["#2b061e", "#a4133c", "#ff4d6d"],
  ["#022c22", "#059669", "#a7f3d0"],
  ["#111827", "#2563eb", "#93c5fd"],
  ["#1c1917", "#ea580c", "#fdba74"],
  ["#042f2e", "#0f766e", "#5eead4"],
  ["#18081a", "#be123c", "#fda4af"],
  ["#0c1222", "#4338ca", "#a5b4fc"],
  ["#1a120b", "#b45309", "#fcd34d"],
  ["#0a1628", "#0369a1", "#7dd3fc"],
] as const;

export function coverPalette(seed: string): readonly [string, string, string] {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return PALETTES[hash % PALETTES.length];
}
