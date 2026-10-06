#!/usr/bin/env python3
"""Validate the Minecraft RPG 26.2 starter project."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

required_paths = [
    ROOT / "README.md",
    ROOT / "docs" / "game-design.md",
    ROOT / "docs" / "modpack-plan.md",
    ROOT / "modpack" / "manifest.json",
    ROOT / "data" / "classes.json",
]

missing = [str(p.relative_to(ROOT)) for p in required_paths if not p.exists()]
if missing:
    raise SystemExit(f"Missing required files: {', '.join(missing)}")

with (ROOT / "modpack" / "manifest.json").open("r", encoding="utf-8") as f:
    manifest = json.load(f)

if manifest.get("manifestType") != "minecraftModpack":
    raise SystemExit("manifestType is not 'minecraftModpack'")

if manifest.get("name") != "Minecraft RPG 26.2":
    raise SystemExit("Project name mismatch")

with (ROOT / "data" / "classes.json").open("r", encoding="utf-8") as f:
    classes_data = json.load(f)

classes = classes_data.get("classes", [])
if not classes:
    raise SystemExit("No classes defined")

required_class_ids = {"knight", "mage", "ranger", "rogue", "paladin"}
actual_ids = {entry.get("id") for entry in classes}
missing_classes = sorted(required_class_ids - actual_ids)
if missing_classes:
    raise SystemExit(f"Missing class entries: {missing_classes}")

print("Project validation passed.")
print(f"Detected {len(classes)} classes in the RPG roster.")
print(f"Pack name: {manifest.get('name')} version {manifest.get('version')}")
