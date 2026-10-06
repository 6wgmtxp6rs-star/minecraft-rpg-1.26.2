# Setup and initialization

scoreboard objectives add rpg_level dummy "RPG Level"
scoreboard objectives add rpg_xp dummy "RPG XP"
scoreboard objectives add rpg_class dummy "Class ID"
scoreboard objectives add rpg_gold dummy "Gold"
scoreboard objectives add rpg_health dummy "Health"
scoreboard objectives add rpg_mana dummy "Mana"
scoreboard objectives add rpg_stamina dummy "Stamina"
scoreboard objectives add rpg_strength dummy "Strength"
scoreboard objectives add rpg_defense dummy "Defense"
scoreboard objectives add rpg_agility dummy "Agility"
scoreboard objectives add rpg_intellect dummy "Intellect"
scoreboard objectives add rpg_faith dummy "Faith"
scoreboard objectives add rpg_skill_points dummy "Skill Points"
scoreboard objectives add rpg_quest_stage dummy "Quest Stage"
scoreboard objectives add rpg_zone_level dummy "Zone Level"
scoreboard objectives add rpg_town_level dummy "Town Level"
scoreboard objectives add rpg_raid_state dummy "Raid State"
scoreboard objectives add rpg_combo dummy "Combo"
scoreboard objectives add rpg_crit dummy "Crit"
scoreboard objectives add rpg_dodge_cooldown dummy "Dodge Cooldown"
scoreboard objectives add rpg_spell_cooldown dummy "Spell Cooldown"

scoreboard players set @a rpg_level 1
scoreboard players set @a rpg_xp 0
scoreboard players set @a rpg_gold 100
scoreboard players set @a rpg_health 100
scoreboard players set @a rpg_mana 100
scoreboard players set @a rpg_stamina 100
scoreboard players set @a rpg_skill_points 3
scoreboard players set @a rpg_quest_stage 1
scoreboard players set @a rpg_zone_level 1
scoreboard players set @a rpg_town_level 1
scoreboard players set @a rpg_raid_state 0
scoreboard players set @a rpg_combo 0
scoreboard players set @a rpg_crit 0
scoreboard players set @a rpg_dodge_cooldown 0
scoreboard players set @a rpg_spell_cooldown 0

say Minecraft RPG 26.2 foundation initialized
