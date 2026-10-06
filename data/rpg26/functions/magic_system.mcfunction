# Magic system framework
# Adds mana, spellbook, cooldowns, and elemental spell ideas.

scoreboard players add @a rpg_mana 0
scoreboard players add @a rpg_spell_cooldown 0

# Spellbook UI
execute as @a[scores={rpg_class=2}] run tellraw @s {"text":"Arcane Spellbook: Firebolt, Sparkfield, Healwave","color":"aqua"}
execute as @a[scores={rpg_class=5}] run tellraw @s {"text":"Divine Spellbook: Radiant Heal, Holy Smite, Aura Shield","color":"yellow"}

# Mana regeneration
execute as @a[scores={rpg_class=2}] run scoreboard players add @s rpg_mana 1
execute as @a[scores={rpg_class=5}] run scoreboard players add @s rpg_mana 1
execute as @a[scores={rpg_mana=101..}] run scoreboard players set @s rpg_mana 100

# Spell casting hooks
execute as @a if score @s rpg_spell_cooldown matches 1.. run scoreboard players remove @s rpg_spell_cooldown 1

# Example spells
execute as @a if score @s rpg_class matches 2 if score @s rpg_mana matches 25.. if score @s rpg_spell_cooldown matches 0 run function rpg26:magic/firebolt
execute as @a if score @s rpg_class matches 2 if score @s rpg_mana matches 25.. if score @s rpg_spell_cooldown matches 0 run function rpg26:magic/healwave
execute as @a if score @s rpg_class matches 5 if score @s rpg_mana matches 25.. if score @s rpg_spell_cooldown matches 0 run function rpg26:magic/holy_smite
