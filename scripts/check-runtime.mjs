const [major, minor, patch] = process.versions.node.split(".").map(Number);
const minimumMinor = { 22: 23, 24: 22 }[major];
const minimumPatch = major === 22 ? 4 : 1;
if (minimumMinor === undefined || minor < minimumMinor ||
    (minor === minimumMinor && patch < minimumPatch)) {
  console.error("Use patched Node.js 22.23.4+ (22.x) or 24.22.1+ (24.x).");
  process.exit(1);
}
