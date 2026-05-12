import { CFP_TRACKS, type CfpTrack } from "@/lib/cfp-schema";

export type FilterValue = "all" | CfpTrack;

export const FILTER_VALUES: ReadonlyArray<FilterValue> = ["all", ...CFP_TRACKS];

export function isFilterValue(value: string | undefined): value is FilterValue {
  return value === "all" || (CFP_TRACKS as readonly string[]).includes(value ?? "");
}
