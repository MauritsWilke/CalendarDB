import { t } from "i18next";

export const monthNames = new Array(12).fill("").map((_, i) => t(`generic.months.${i + 1}`));
export const dayNames = new Array(7).fill("").map((_, i) => t(`generic.days.${i + 1}`));
export const dayAbbreviations = new Array(7).fill("").map((_, i) => t(`generic.dayAbbreviations.${i + 1}`));
export const dayLetterAbbreviations = new Array(7).fill("").map((_, i) => t(`generic.dayLetterAbbreviations.${i + 1}`));