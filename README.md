# Minecraft RPG 26.2

A playable starter project for a Minecraft fantasy RPG inspired by Cisco's RPG style: progression, classes, quests, combat, magic, and kingdom-building.

This repository is structured as a real modpack planning project and includes a validation script so the project can be checked before expansion.

## What is included

- A complete RPG concept for the pack
- Class and skill data
- Modpack planning and feature roadmap
- Starter manifest for a Forge/Fabric based modpack
- Validation script to ensure project integrity

## Quick start

1. Review the design docs in `docs/`.
2. Inspect the starter pack manifest in `modpack/manifest.json`.
3. Add your preferred mod list and config files when ready.
4. Validate the project:

```bash
python3 scripts/validate_project.py
```

## Repository layout

- `docs/` — design docs and gameplay plan
- `data/` — JSON game data
- `modpack/` — modpack manifest and config blueprint
- `scripts/` — automation and validation

## Current goal

This is an original project starter and can be expanded into a full modpack, plugin system, or custom RPG feature set.

## Notes

This repository is intentionally structured so it can be extended into:

- a Forge modpack
- a Fabric + custom datapack project
- a plugin-based survival RPG
- a game design document for a larger team

---

If you want a full playable pack next, the next step is to add actual mod IDs and config files for the chosen Minecraft version.
