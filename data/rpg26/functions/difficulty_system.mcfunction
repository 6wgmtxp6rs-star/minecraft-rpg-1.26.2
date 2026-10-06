# Dynamic difficulty scaling framework
# Increases zone threat and boss progression across the world.

scoreboard players add @a rpg_zone_level 0

# Increase threat as player level rises
execute as @a if score @s rpg_level matches 2.. run scoreboard players add @s rpg_zone_level 1
execute as @a if score @s rpg_level matches 5.. run scoreboard players add @s rpg_zone_level 1
execute as @a if score @s rpg_zone_level matches 10.. run scoreboard players set @s rpg_zone_level 10

# Boss progression note
execute as @a[scores={rpg_zone_level=5..}] run tellraw @s {"text":"Zone danger increased: boss-tier threats are now active.","color":"dark_purple"}
