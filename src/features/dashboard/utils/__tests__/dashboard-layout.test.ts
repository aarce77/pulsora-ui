import {
  getMarketTileColumns,
  getMarketTileWidth,
} from "@/features/dashboard/utils/dashboard-layout";

describe("dashboard market layout utils", () => {
  it("uses four columns on desktop widths", () => {
    expect(getMarketTileColumns(1280)).toBe(4);
    expect(getMarketTileWidth(1280, 4, 20, 16)).toBe(298);
  });

  it("uses two columns on medium and phone widths", () => {
    expect(getMarketTileColumns(768)).toBe(2);
    expect(getMarketTileColumns(430)).toBe(2);
    expect(getMarketTileWidth(430, 2, 20, 16)).toBe(187);
  });

  it("falls back to one column on very narrow widths", () => {
    expect(getMarketTileColumns(320)).toBe(1);
    expect(getMarketTileWidth(320, 1, 20, 16)).toBe(280);
  });
});
