# Initialize Minecraft RPG 26.2

scoreboard objectives add rpg_level dummy "RPG Level"
scoreboard objectives add rpg_xp dummy "RPG XP"
scoreboard objectives add rpg_class dummy "Class ID"
scoreboard objectives add rpg_gold dummy "Gold"
scoreboard objectives add rpg_health dummy "Max Health"
scoreboard objectives add rpg_mana dummy "Mana"
scoreboard objectives add rpg_strength dummy "Strength"
scoreboard objectives add rpg_defense dummy "Defense"
scoreboard objectives add rpg_agility dummy "Agility"
scoreboard objectives add rpg_intellect dummy "Intellect"
scoreboard objectives add rpg_faith dummy "Faith"

# Set initial values
scoreboard players set @a rpg_level 1
scoreboard players set @a rpg_xp 0
scoreboard players set @a rpg_gold 100

tellraw @a {"text":"\n=== Minecraft RPG 26.2 Initialized ===","color":"gold"}
tellraw @a {"text":"Welcome to the fantasy realm. Choose your class to begin your adventure!","color":"yellow"}
tellraw @a {"text":"Run: /function rpg26:class_select","color":"aqua"}
tellraw @a {"text":"\n"}
