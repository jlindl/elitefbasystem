import rawLinks from "../_lib/useful-links.json";
import { LinkDirectory, type DirectoryItem } from "./link-directory";

export function UsefulLinks() {
  return (
    <LinkDirectory
      items={rawLinks as DirectoryItem[]}
      noun="resource"
      placeholder="Search a tool or resource…"
    />
  );
}
