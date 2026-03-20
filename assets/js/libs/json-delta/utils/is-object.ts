import { JsonObject } from "../types";

export const isObject = ( value: unknown ): value is JsonObject => {
    return typeof value === "object" && value !== null;

};
