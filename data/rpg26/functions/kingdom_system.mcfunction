# Kingdom system framework
# This system tracks town level, raid state, and economy for kingdom-building gameplay.

scoreboard players add @a rpg_town_level 0
scoreboard players add @a rpg_raid_state 0

# Town progression
execute as @a if score @s rpg_gold matches 200.. run scoreboard players add @s rpg_town_level 1
execute as @a if score @s rpg_gold matches 500.. run scoreboard players add @s rpg_town_level 1

# Raid activity
execute as @a if score @s rpg_raid_state matches 1 run tellraw @s {"text":"The town is under attack! Defend your realm.","color":"red"}
execute as @a if score @s rpg_raid_state matches 2 run tellraw @s {"text":"Raid successfully repelled. Town defense improved.","color":"green"}

# Increment gold over time as a kingdom economy loop
execute as @a run scoreboard players add @s rpg_gold 1
