# Main game loop
function rpg26:setup_scores
function rpg26:combat_system
function rpg26:magic_system
function rpg26:quest_system
function rpg26:skill_tree
function rpg26:kingdom_system
function rpg26:difficulty_system

# Level-up checks
execute as @a if score @s rpg_xp matches 100.. run function rpg26:level_up
