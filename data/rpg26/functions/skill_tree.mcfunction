# Skill tree framework
# Allows allocation of skill points and class-based enhancement routes.

scoreboard players add @a rpg_skill_points 0

# Class-specific skill headers
execute as @a[scores={rpg_class=1}] run tellraw @s {"text":"Knight skill tree: Shield Bash, Guard Stance, Stamina Burst, Armor Mastery","color":"red"}
execute as @a[scores={rpg_class=2}] run tellraw @s {"text":"Mage skill tree: Arcane Nova, Mana Flow, Firebolt, Arcane Ward","color":"blue"}
execute as @a[scores={rpg_class=3}] run tellraw @s {"text":"Ranger skill tree: Precision Shot, Volley, Tracking, Trap Setting","color":"green"}
execute as @a[scores={rpg_class=4}] run tellraw @s {"text":"Rogue skill tree: Backstab, Quick Step, Ambush, Poison Edge","color":"dark_red"}
execute as @a[scores={rpg_class=5}] run tellraw @s {"text":"Paladin skill tree: Radiant Heal, Holy Smite, Shield Wall, Aura of Protection","color":"yellow"}

# Reward skill points by level progression
execute as @a if score @s rpg_level matches 2.. run scoreboard players add @s rpg_skill_points 1
execute as @a if score @s rpg_level matches 5.. run scoreboard players add @s rpg_skill_points 1

# Cap skill points
execute as @a[scores={rpg_skill_points=10..}] run scoreboard players set @s rpg_skill_points 10
