# Select Ranger class

scoreboard players set @s rpg_class 3
scoreboard players set @s rpg_agility 15
scoreboard players set @s rpg_health 80

give @s bow{display:{Name:'{"text":"Hunter\'s Bow","color":"green"}'},Enchantments:[{id:"minecraft:power",lvl:2},{id:"minecraft:infinity",lvl:1}]}
give @s arrow 64
give @s leather_chestplate{display:{Name:'{"text":"Hunting Gear","color":"green"}'}}

tellraw @s {"text":"You have chosen the Ranger class!","color":"green"}
tellraw @s {"text":"Role: Ranged DPS - High agility and precision","color":"gray"}
tellraw @s {"text":"Skills: Precision Shot, Tracking, Trap Setting","color":"gray"}
