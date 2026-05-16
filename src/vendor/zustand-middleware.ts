const middleware = require("zustand/middleware") as typeof import("zustand/middleware");

export const createJSONStorage = middleware.createJSONStorage;
export const persist = middleware.persist;

export type StateStorage = import("zustand/middleware").StateStorage;
