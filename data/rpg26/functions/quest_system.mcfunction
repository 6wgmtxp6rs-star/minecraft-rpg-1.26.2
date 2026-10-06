# Quest system framework
# Tracks quest stage and issue progression based on world events.

scoreboard players add @a rpg_quest_stage 0

# Starter questline
execute as @a[scores={rpg_quest_stage=1}] run tellraw @s {"text":"Quest 1: Reach the first dungeon entrance and survive the first encounter.","color":"green"}
execute as @a[scores={rpg_quest_stage=2}] run tellraw @s {"text":"Quest 2: Defeat the dungeon guardian and claim your weapon upgrade.","color":"gold"}
execute as @a[scores={rpg_quest_stage=3}] run tellraw @s {"text":"Quest 3: Return to town, upgrade your class, and begin the kingdom build.","color":"aqua"}

# Advance quest stage when player reaches certain thresholds
execute as @a if score @s rpg_level matches 3.. run scoreboard players set @s rpg_quest_stage 2
execute as @a if score @s rpg_town_level matches 2.. run scoreboard players set @s rpg_quest_stage 3

# Reward logic
execute as @a[scores={rpg_quest_stage=2}] run give @s diamond 1
execute as @a[scores={rpg_quest_stage=3}] run give @s emerald 2
