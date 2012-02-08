// Sample adventure script card deck

// Scripted as individual card objects in cards array starting from [0]
// Scripting syntax:
// cards[x]=new card ("card_type", "card_content", next_card)
// where:
// x=current card number
// card_type=story, loot, encounter or random
// card_content=story text, loot object (pre-defined), specific enemy object (pre-defined) or null
// (if null, adventure card processor will assign appropriate random content depending on card_type)
// next_card=card number of next card or set of choices and corrensponding card numbers
// choices syntax: { "option a" : card number for option a, "option b" : card number for option b }
//
// for pre-defined enemy, syntax:
// var enemy_name=character("enemy_name", "", "enemy", strength, intelligence, dexterity, health, xp_reward); enemy_name.mainhand=weapon_name;

// pre-defined enemies for this adventure

var squadcmdr=new character("Squad Commander", "", "enemy", 16, 16, 16, 16, 8); squadcmdr.mainhand=autorifle;
var eliteguard=new character("Elite Guard", "", "enemy", 20, 20, 20, 20, 10); eliteguard.mainhand=autorifle;
var guardcmdr=new character("Guard Commander", "", "enemy", 30, 30, 30, 30, 15); guardcmdr.mainhand=minihowitzer;

// adventure script card deck

cards[0]=new card("story", "Mission 1: Destroy the power core", 1);
cards[1]=new card("story", "At 0439 today, HQ Intel detected a spike in power signatures in a location thought to be an enemy base. Scouts were sent out to investigate and reported a strange power-generating installation 400km south of here. The installation bears no resemblance to existing power generators known to be used by the enemy, except for the massive power signature it's emanating. We don't know where it's getting its power from, we just know there's a lot of it. And that's not a good thing. Enemy presence is heavy but the scouts have found a way in where defenses are… less than elsewhere in the perimeter. HQ Command has decided to send a small surgical strike team to take out the installation and egress before the rest of the enemy defense can respond.", 2);
cards[2]=new card("story", "'Less than elsewhere in the perimeter?' asks Torvik, your warrior-class tank. 'CRUD! It's not like the damn scouts found us a backdoor we could walk in through. There aren't any less guards there than at the front gate. Why is Command sending us in with only a three-man squad?' 'You know Command's been itching to throw our squad in the brig since that incident with Alpha squad,' replies Raiden, your scout sniper. 'This is just their way of telling us they still care. Whatever Command wants to dish out, I say, 'Bring it!'' Your three-man squad has been tasked to take out a key power-generating installation in enemy territory. Do you accept the mission?", { "No, this sounds fishy." : 3, "Hell yeah, bring it!" : 4 });
cards[3]=new card("story", "You've just earned your squad 4 weeks in the brig for insubordination. But at least you live to fight another day.", 44);
cards[4]=new card("story", 'Enough grumbling. We ship out in 30 minutes. Arm and load up.', 5);
cards[5]=new card("story", "The dropship is within 10km of the target zone and you prepare for low altitude deployment. That means jumping off the dropship bay as the craft comes within 10 meters off the ground. Fortunately your power armor was built to withstand that kind of impact. Just about. ... 'THUMP!' Not the quietest of landings. Your perso-radar detects enemy signatures moving towards your location. It seems an enemy patrol might have noticed your landing. You quickly gather up the supplies that have low-dropped with you.", 6);
cards[6]=new card("loot", medikit, 7);
cards[7]=new card("loot", medikit, 8);
cards[8]=new card("story", "Enemy units outnumber your squad 3 to 1, with more closing in fast. 'Heads up, guys! Here they come,' you shout to your squad. 'We don't have time to recover the rest of our low-dropped gear. Pick up what you can from enemy units.'", 9);
cards[9]=new card("encounter", null, 10);
cards[10]=new card("encounter", null, 11);
cards[11]=new card("loot", medikit, 12);
cards[12]=new card("story", "Smash you way through the next wave of enemy units? Or try to flank the next wave?", { "Smash" : 13, "Flank" : 16 });
cards[13]=new card("encounter", null, 14);
cards[14]=new card("encounter", null, 15);
cards[15]=new card("encounter", null, 18);
cards[16]=new card("story", "'Torvik, keep the grunts in the centre busy! Raiden, take out the units on the left flank! I'll take the right!' You bark to your squad members as you rush right to the next cover. As your squad members draw out the enemy guards, down the right of the enemy flank, you ID the squad commander. Take him out so he doesn't call in support.", 17);
cards[17]=new card("encounter", squadcmdr, 18);
cards[18]=new card("loot", medikit, 19);
cards[19]=new card("story", "'Phew! Thought we'd never get through that,' says Raiden. 'Did anyone notice those units were fighting more ferociously than other units we'd encountered before?' You agree, but you need to push on if you don't want to run into more of them. With the perimeter guard dealt with, you and your squad are able to penetrate the installation.", 20);
cards[20]=new card("story", "You're at the main bay with access to the 3 levels of the installation. Which level do you want to try?", { "Level 1" : 21, "Level 2" : 29, "Level 3": 28 });
cards[21]=new card("story", "Looks like you found the armory and medi-bay. Pick up what you need and get moving. Remember, you can only carry 8 items at a time, so drop what you don't need or can't use.", 22);
cards[22]=new card("loot", shockwave, 23);
cards[23]=new card("loot", minihowitzer, 24);
cards[24]=new card("loot", supersniperrifle, 25);
cards[25]=new card("loot", medikit, 26);
cards[26]=new card("loot", medikit, 27);
cards[27]=new card("loot", medikit, 20);
cards[28]=new card("story", "The rooftop opens out to a helipad and a small troop carrier. It's empty, which means the troops have already deployed around the facility. Stay on your toes. As you head back down, you keep this in mind as a possible egress route. Funny that Command never said anything about the dropship picking your squad up.", 20);
cards[29]=new card("story", "Raiden spots three guards coming down the stairs. You're about the tell him to take out the first one when you notice their faces. Something isn't quite right about them. As if contorted by rage, perhaps even demonic. You distribute the targets among your squad as you prepare to ambush them.", 30);
cards[30]=new card("encounter", null, 31);
cards[31]=new card("loot", medikit, 32);
cards[32]=new card("story", "Stepping over the guards' bodies, you can't shake off the thought that all three were fighting more furiously than even the perimeter guards before. 'What are they feeding these grunts? Angry-juice?' Torvik sums it up nicely. Heading deeper into the facility, you notice a strange glow in the distance, and what looks like the refractive effect of a heat in a mirage. You know that's where you should head.", 33);
cards[33]=new card("story", "It doesn't take you long to realise that you've found the power core of the facility. But this isn't like any power core you've seen before. It's clearly streaming something out of its crystalline core and channeling it into the surrounding guards and beyond. 'What do you bet that's your angry juice, Torvik?' smirks Raiden. You don't understand what you're looking at, but mission orders are clearly to take it out. You'll have to get past the guard commander and his elite guards first though.", 34);
cards[34]=new card("encounter", eliteguard, 35);
cards[35]=new card("encounter", eliteguard, 36);
cards[36]=new card("loot", medikit, 37);
cards[37]=new card("encounter", eliteguard, 38);
cards[38]=new card("loot", medikit, 39);
cards[40]=new card("encounter", guardcmdr, 41);
cards[41]=new card("story", "Torvik watches the door while you and Raiden plant explosives around the core, timed to go off in 5 minutes. Doesn't give you a lot of time, but all the more incentive to get off this rock quickly. As if you needed more, Torvik shouts, 'Boss, fresh squads of heavies headed our way. We're gonna be swamped!' Rather than risk being overrun by heavy troopers, you opt for a quick egress instead. Will you head down to ground level or up to the roof?", { "Going down!" : 42, "To the roof!" : 43 });
cards[42]=new card("story", "As you charge down the stairs back to the main bay, your squad is surrounded by heavy troopers. With the power core about to go off in less than 2 minutes, and the heavy troopers' mini-howitzers aimed at your chests, you know you're not going to get out of this alive...", 44);
cards[43]=new card("story", "There's a small troop carrier on the roof. You and your squad climb into it with Raiden taking the controls and before long you're up in the air. Not a moment too soon, as the roof of the facility collapses to reveal a ball of fire welling up below, the aftermath of the power core meltdown you set off. As your craft flies off, all three of you are a little disturbed to see swirling thermal winds emanating from the core, containing what look like shadows of screaming faces. You'd have dismissed what you saw for adrenalin-induced hallucinations or just plain fatigue, if it weren't for the screams... (To be continued.)", 44);
cards[44]=new card("end");
