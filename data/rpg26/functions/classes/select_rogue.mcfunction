# Select Rogue class

scoreboard players set @s rpg_class 4
scoreboard players set @s rpg_agility 18
scoreboard players set @s rpg_health 70

give @s iron_sword{display:{Name:'{"text":"Rogue\'s Dagger","color":"dark_gray"}'},Enchantments:[{id:"minecraft:sharpness",lvl:2}]}
give @s leather_chestplate{display:{Name:'{"text":"Dark Cloak","color":"dark_gray"}'}}

tellraw @s {"text":"You have chosen the Rogue class!","color":"dark_gray"}
tellraw @s {"text":"Role: Burst DPS - High speed and critical chance","color":"gray"}
tellraw @s {"text":"Skills: Ambush, Quick Step, Poison Strikes, Backstab","color":"gray"}
