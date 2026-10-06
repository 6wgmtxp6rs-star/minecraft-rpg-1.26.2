# Minecraft RPG 26.2

A Minecraft fantasy RPG starter inspired by the progression, combat, loot, exploring, class identity, and kingdom-building loops that made Cisco-style RPG packs memorable.

This repository is now expanded into a functional RPG foundation for a Minecraft datapack project. It includes class selection, combat scaffolding, magic gameplay hooks, quest progression, skill tree logic, kingdom systems, and dynamic difficulty planning.

## Features included

- 5 fantasy classes: Knight, Mage, Ranger, Rogue, Paladin
- Leveling and XP tracking
- Class-specific starter gear and passive effects
- Combat system framework with dodge, stamina, combo, and crit hooks
- Magic system framework with mana, spellbook, and casting support
- Quest progression logic
- Skill tree and talent point allocations
- Kingdom building and town progression framework
- Dynamic difficulty scaling and region progression hooks
- pack.mcmeta for Minecraft datapack compatibility

## Quick start

1. Place the repository folder in a world datapacks directory.
2. Run `/reload` in-game.
3. Execute `/function rpg26:init` if needed.
4. Use `/function rpg26:class_select` to begin.
5. Progress through the starter questline and class build path.

## Core structure

- `data/rpg26/functions/` — gameplay systems and triggers
- `data/rpg26/loot_tables/` — loot and reward materials
- `data/rpg26/advancements/` — progression milestones
- `docs/` — design and feature documentation
- `pack.mcmeta` — required datapack metadata

## Notes

This project is structured as a real RPG foundation and can be expanded into a larger Forge/Fabric modpack or a full datapack-driven survival RPG. It is not a full production game by itself, but it is now a much more complete gameplay framework than a simple concept pack.
