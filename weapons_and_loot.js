// pre-defined weapons and loot

// define weapons and loot here
// for weapons, syntax:
// var weapon_name=new weapon("weapon_name", min_damage, max_damage, "attack_type (physical or magic)", "item_class (all, warrior, mage or rogue)");
// for loot, syntax:
// var loot_name=new loot("loot_name");
// loot requires custom logic to perform any function in game, otherwise it's just a static item

// initialise weapons and weapon array

var dagger=new weapon("Dagger", 1, 2, "physical", "all");
var sword=new weapon("Sword", 3, 6, "physical", "all");
var sniperrifle=new weapon("Sniper rifle", 3, 6, "physical", "rogue");
var psychicstrike=new weapon("Psychic strike", 3, 6, "magic", "mage");
var psychicblast=new weapon("Psychic blast", 4, 8, "magic", "mage");
var autorifle=new weapon("Auto-rifle", 4, 8, "physical", "all");
var minihowitzer=new weapon("Mini-howitzer", 8, 12, "physical", "warrior");
var shockwave=new weapon("Psychic shockwave", 6, 10, "magic", "mage");
var supersniperrifle=new weapon("Super-calibre sniper rifle", 7, 9, "physical", "rogue");
var weapons=[dagger, sword, sniperrifle, psychicstrike, psychicblast, autorifle, minihowitzer, shockwave, supersniperrifle];

// define default weapon for each class

var warrior_default_weapon=sword;
var mage_default_weapon=psychicstrike;
var rogue_default_weapon=dagger;

// initialise loot

var medikit=new loot("Medikit");