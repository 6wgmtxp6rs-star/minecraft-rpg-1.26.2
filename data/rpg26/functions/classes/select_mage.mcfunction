# Select Mage class

scoreboard players set @s rpg_class 2
scoreboard players set @s rpg_intellect 15
scoreboard players set @s rpg_mana 150
scoreboard players set @s rpg_health 60

give @s oak_staff{display:{Name:'{"text":"Apprentice\'s Staff","color":"blue"}'},Enchantments:[{id:"minecraft:power",lvl:2}]}
give @s leather_chestplate{display:{Name:'{"text":"Apprentice Robes","color":"blue"}'}}

tellraw @s {"text":"You have chosen the Mage class!","color":"blue"}
tellraw @s {"text":"Role: Caster - High intellect and mana pool","color":"gray"}
tellraw @s {"text":"Skills: Arcane Burst, Spell Shield, Elemental Spells","color":"gray"}
