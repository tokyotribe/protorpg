protoRPG is a JavaScript library for building role-playing games containing objects and methods for the following game features:

1. Character system
	- 3 races
		- human
		- elf
		- orc
	- 3 character classes 
		- warrior: +10% health, +10% strength
		- mage: -10% health, +30% intelligence
		- rogue: +20% dexterity

2. Character attribute system
	- strength - increases damage
	- dexterity - increases chances of attack first and hit
	- intelligence - increases chances of hit and damage for magic attacks
	- health

3. Event system
	- Encounters
		- each move 40% chance of encounter
	- Find loot
		- each move 10% chance of finding loot
		- generate loot
		- add loot to inventory

4. Combat system
	- Roll to see who attacks first
		- chance of attack first = 50%+dexterity modifier
		- dex mod = (playerdex-enemydex)/(playerdex+enemydex)\*50%
	- Attacker rolls to see if hit
		- chance of hit = 50%+dexterity modifier
		- if magic attack, use intelligence modifier instead of dex mod (same calculation as dex mod)
	- If hit, attacker rolls for damage
		- depends on weapon
		- depends on strength modifier
		- if magic attack, use intelligence modifier instead of str mod
		- player str mod = (1+((this.strength-enemy.strength)/(this.strength+enemy.strength))\*0.5)%
		- enemy str mod = (1+((enemy.strength-this.strength)/(this.strength+enemy.strength))\*0.5)%
	- continue until someone dies or runs away
	- Run away
		- chance of getting away = 30%+dexterity modifier
		- if fail, enemy gets free attack first
	- If win
		- Find loot
		- Gain XP

5. Weapon system
	- weapon object
		- minimum damage
		- damage range
		- type - physical or magic
	- weapon determines damage
	- class-specific weapons
		- warrior
			- mini-howitzer 8-12 damage
		- mage
			- psychic strike 3-6 (magic)
			- psychic blast 4-8 (magic)
		- rogue
			- sniper rifle 3-6
		- all
			- dagger 1-2
			- sword 3-6
			- auto-rifle 4-8

6. Inventory system
	- Must arm main weapon
	- medikits
	- use item
	- drop item
	- equip weapon in main hand

7. Leveling system
	- xp gained converts to ap (attribute points) which can be assigned to attributes
	- xp:ap conversion function (10:1)
	- xp converts to level which determines level of enemy encountered
	- xp:level conversion function (10:1)


Released under MIT License

Copyright (C) 2011 Shannon Low

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.