export function getMarketTileColumns(viewportWidth: number) {
  if (viewportWidth >= 1180) {
    return 4;
  }

  if (viewportWidth >= 360) {
    return 2;
  }

  return 1;
}

export function getMarketTileWidth(
  viewportWidth: number,
  columns: number,
  horizontalPadding: number,
  gap: number,
) {
  const availableWidth =
    viewportWidth - horizontalPadding * 2 - gap * (columns - 1);

  return Math.floor(availableWidth / columns);
}
