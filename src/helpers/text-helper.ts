const DEFAULT_FONT_SIZE = 14;
const APPROX_CHAR_WIDTH_FACTOR = 0.6;
const ELLIPSIS = "...";

const parseFontSizeToPx = (fontSizeValue: string | undefined): number => {
  if (!fontSizeValue) {
    return DEFAULT_FONT_SIZE;
  }
  const trimmed = fontSizeValue.trim().toLowerCase();
  const numeric = parseFloat(trimmed);
  if (!Number.isFinite(numeric) || numeric <= 0) {
    return DEFAULT_FONT_SIZE;
  }
  if (trimmed.endsWith("px")) {
    return numeric;
  }
  if (trimmed.endsWith("rem") || trimmed.endsWith("em")) {
    return numeric * 16;
  }
  return numeric;
};

const approximateTextWidth = (text: string, fontSizePx: number): number => {
  return text.length * fontSizePx * APPROX_CHAR_WIDTH_FACTOR;
};

const addEllipsisIfNeeded = (
  text: string,
  maxWidth: number,
  fontSizePx: number
): string => {
  if (!text) {
    return text;
  }
  const safeFontSize = fontSizePx > 0 ? fontSizePx : DEFAULT_FONT_SIZE;
  if (maxWidth <= 0) {
    return ELLIPSIS;
  }
  const textWidth = approximateTextWidth(text, safeFontSize);
  if (textWidth <= maxWidth) {
    return text;
  }
  const ellipsisWidth = approximateTextWidth(ELLIPSIS, safeFontSize);
  if (ellipsisWidth >= maxWidth) {
    return ELLIPSIS;
  }
  const avgCharWidth = safeFontSize * APPROX_CHAR_WIDTH_FACTOR;
  if (avgCharWidth <= 0) {
    return text;
  }
  const availableForChars = maxWidth - ellipsisWidth;
  const maxChars = Math.floor(availableForChars / avgCharWidth);
  if (maxChars <= 0) {
    return ELLIPSIS;
  }
  if (maxChars >= text.length) {
    return text;
  }
  const truncated = text.slice(0, maxChars).trimEnd();
  return truncated ? `${truncated}${ELLIPSIS}` : ELLIPSIS;
};

export const TextHelper = {
  DEFAULT_FONT_SIZE,
  APPROX_CHAR_WIDTH_FACTOR,
  ELLIPSIS,
  parseFontSizeToPx,
  approximateTextWidth,
  addEllipsisIfNeeded,
};

export {
  DEFAULT_FONT_SIZE,
  APPROX_CHAR_WIDTH_FACTOR,
  ELLIPSIS,
  parseFontSizeToPx,
  approximateTextWidth,
  addEllipsisIfNeeded,
};
