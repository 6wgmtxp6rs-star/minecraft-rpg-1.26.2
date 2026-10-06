# Combat system framework
# This system provides the basic hooks for dodge, combo, stamina, and critical strikes.

# Reset stale values
scoreboard players add @a rpg_stamina 0
scoreboard players add @a rpg_combo 0
scoreboard players add @a rpg_crit 0
scoreboard players add @a rpg_dodge_cooldown 0

# Stamina decay during action
execute as @a[scores={rpg_stamina=1..}] run scoreboard players remove @s rpg_stamina 1

# Dodge trigger
execute as @a[scores={rpg_dodge_cooldown=0}] if predicate rpg26:has_dodge_key run function rpg26:combat/dodge

# Early crit system if using a melee weapon and a high strength value
execute as @a[nbt={SelectedItem:{id:"minecraft:iron_sword"}}] if score @s rpg_strength matches 15.. run scoreboard players add @s rpg_crit 1

# Combo accumulation for melee attacks
execute as @a[nbt={SelectedItem:{id:"minecraft:iron_sword"}}] run scoreboard players add @s rpg_combo 1

# Cap values
execute as @a[scores={rpg_combo=15..}] run scoreboard players set @s rpg_combo 15
execute as @a[scores={rpg_crit=5..}] run scoreboard players set @s rpg_crit 5
execute as @a[scores={rpg_stamina=..0}] run scoreboard players set @s rpg_stamina 0

# Feedback
execute as @a[scores={rpg_combo=5..}] run tellraw @s {"text":"Combo active!","color":"gold"}
