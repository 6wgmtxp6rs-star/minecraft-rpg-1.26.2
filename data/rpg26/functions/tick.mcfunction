# RPG 26.2 Tick function (runs every game tick)

# XP and leveling
execute as @a if score @s rpg_xp matches 100.. run function rpg26:level_up

# Class-specific effects
execute as @a if score @s rpg_class matches 1 run function rpg26/classes:knight_tick
execute as @a if score @s rpg_class matches 2 run function rpg26/classes:mage_tick
execute as @a if score @s rpg_class matches 3 run function rpg26/classes:ranger_tick
execute as @a if score @s rpg_class matches 4 run function rpg26/classes:rogue_tick
execute as @a if score @s rpg_class matches 5 run function rpg26/classes:paladin_tick
