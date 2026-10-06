# Select Paladin class

scoreboard players set @s rpg_class 5
scoreboard players set @s rpg_faith 15
scoreboard players set @s rpg_defense 10
scoreboard players set @s rpg_health 90

give @s iron_axe{display:{Name:'{"text":"Holy Mace","color":"yellow"}'},Enchantments:[{id:"minecraft:sharpness",lvl:1}]}
give @s shield{display:{Name:'{"text":"Holy Shield","color":"yellow"}'}}
give @s chainmail_chestplate{display:{Name:'{"text":"Holy Chainmail","color":"yellow"}'}}

tellraw @s {"text":"You have chosen the Paladin class!","color":"yellow"}
tellraw @s {"text":"Role: Support and Hybrid Melee - High faith and defense","color":"gray"}
tellraw @s {"text":"Skills: Radiant Heal, Holy Strike, Aura of Protection","color":"gray"}
