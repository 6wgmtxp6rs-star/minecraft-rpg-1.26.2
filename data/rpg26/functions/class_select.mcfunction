# Class Selection Menu

tellraw @a {"text":"\n=== Choose Your Class ===","color":"gold"}
tellraw @a [
  {"text":"[Knight] ","color":"red","clickEvent":{"action":"run_command","value":"/function rpg26/classes:select_knight"}},
  {"text":"[Mage] ","color":"blue","clickEvent":{"action":"run_command","value":"/function rpg26/classes:select_mage"}},
  {"text":"[Ranger] ","color":"green","clickEvent":{"action":"run_command","value":"/function rpg26/classes:select_ranger"}},
  {"text":"[Rogue] ","color":"dark_gray","clickEvent":{"action":"run_command","value":"/function rpg26/classes:select_rogue"}},
  {"text":"[Paladin]","color":"yellow","clickEvent":{"action":"run_command","value":"/function rpg26/classes:select_paladin"}}
]
tellraw @a {"text":"\n"}
