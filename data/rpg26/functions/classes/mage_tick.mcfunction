# Mage class effects (passive abilities)

# Passive: Gradual mana regeneration
execute if score @s rpg_mana matches ..-1 run scoreboard players add @s rpg_mana 1
execute if score @s rpg_mana matches 151.. run scoreboard players set @s rpg_mana 150

# Visual effect for mages
execute at @s run particle end_rod ~ ~1.5 ~ 0.1 0.2 0.1 0.05 1 normal
