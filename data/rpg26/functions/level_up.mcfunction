# Level up function

scoreboard players add @s rpg_level 1
scoreboard players set @s rpg_xp 0

# Grant bonus stat points
scoreboard players add @s rpg_strength 1
scoreboard players add @s rpg_defense 1

# Visual effect
particle happy_villager ~ ~1 ~ 0.5 1 0.5 1 10

tellraw @s {"text":"Level Up! You are now level ","color":"gold","extra":[{"score":{"name":"@s","objective":"rpg_level"},"color":"yellow"}]}
