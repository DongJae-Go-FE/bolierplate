import { itemsHandlers } from "./handlers/items.handlers";
import { authHandlers } from "./handlers/auth.handlers";

export const handlers = [...authHandlers, ...itemsHandlers];
