# Select Knight class

scoreboard players set @s rpg_class 1
scoreboard players set @s rpg_strength 15
scoreboard players set @s rpg_defense 12
scoreboard players set @s rpg_health 100

give @s iron_sword{display:{Name:'{"text":"Knight\'s Blade","color":"red"}'},Enchantments:[{id:"minecraft:sharpness",lvl:1}]}
give @s shield{display:{Name:'{"text":"Knight\'s Shield","color":"blue"}'}}
give @s iron_chestplate

tellraw @s {"text":"You have chosen the Knight class!","color":"red"}
tellraw @s {"text":"Role: Tank - High defense and vitality","color":"gray"}
tellraw @s {"text":"Skills: Shield Bash, Guard Stance, Stamina Burst","color":"gray"}
