import type { ComponentType } from "react";
import type { PostSection } from "@/components/blog/post-layout";
import BuildingServEye, { sections as buildingServEyeSections } from "./building-serveye";

// Post bodies by slug. To add a post: add its metadata to src/data/blog.ts, write
// src/content/blog/<slug>.tsx (default export + `sections`), and register it here.
export const postContent: Record<string, { Content: ComponentType; sections: PostSection[] }> = {
  "building-serveye": { Content: BuildingServEye, sections: buildingServEyeSections },
};
