// protoRPG
// A prototype role-playing game Javascript library by tokyotribe/Shannon Low
// Open-sourced on 26 Dec 2011

function addoption(selectbox, optionobject)	// add option to a  select object
{
	var optn=document.createElement("option");
	optn.text=optionobject.iname;
	optn.value=optionobject.iname;
	selectbox.options.add(optn);
}
function enable_char_generator()
{
	document.getElementById("generate").disabled=false;
	document.getElementById("changename").disabled=false;
	document.getElementById("changerace_h").disabled=false;
	document.getElementById("changerace_e").disabled=false;
	document.getElementById("changerace_o").disabled=false;
	document.getElementById("changeclass_w").disabled=false;
	document.getElementById("changeclass_p").disabled=false;
	document.getElementById("changeclass_r").disabled=false;	
}
function disable_char_generator()
{
	document.getElementById("generate").disabled=true;
	document.getElementById("changename").disabled=true;
	document.getElementById("changerace_h").disabled=true;
	document.getElementById("changerace_e").disabled=true;
	document.getElementById("changerace_o").disabled=true;
	document.getElementById("changeclass_w").disabled=true;
	document.getElementById("changeclass_p").disabled=true;
	document.getElementById("changeclass_r").disabled=true;
}
function newgame()
{
	player=new character("", "", "", 0, 0, 0, 0, 0, 0, 1, 0, false, false, "");
	enemy=new character("Enemy", "", "enemy", 0, 0, 0, 0, 0);
	document.getElementById("playerinfo").innerHTML="";
	document.getElementById("playerstats").innerHTML="";
	document.getElementById("inventory").innerHTML="";
	document.getElementById("status").innerHTML="";
	document.getElementById("enemystats").innerHTML="";
	document.getElementById("debug").innerHTML="";
	document.getElementById("debug2").innerHTML="";
	document.getElementById("inventory").innerHTML="";	// clear inventory list
	card_idx=0;
	var c=document.getElementById("mycanvas");
	var cxt=c.getContext("2d");
	cxt.clearRect(0,0,444,319);
	// enable next, generate and character gen buttons
	document.getElementById("nextcard").disabled=false;
	enable_char_generator();
	document.getElementById("choose").disabled=true;	// disable choose button
	document.getElementById("choices").style.display="none";	// hide choices element (dropdown+button)
	document.getElementById("inventoryelement").style.display="none";	// hide inventory element (dropdown+buttons)
}
function xp_to_ap(xp)
{
	// substitute with xp to ap function
	return(xp/10);
}
function xp_to_level(xp)
{
	// substitute with xp to level function
	return(Math.floor(xp/10)+1);
}
function generateloot()
{
	// substitute with loot generating function
	return(medikit);
}
function character(cname, race, cclass, strength, intelligence, dexterity, health, xp, ap, level, kills, encounter, ambushed, mainhand)
{
	// character attributes
	this.cname=cname;
	this.race=race;
	this.cclass=cclass;
	this.strength=strength;
	this.intelligence=intelligence;
	this.dexterity=dexterity;
	this.health=health;
	this.xp=xp;
	this.ap=ap;
	this.level=level;
	this.kills=kills;
	this.mainhand=mainhand; // main-hand weapon
	// character inventory
	this.inventory=[];
	// character states
	this.encounter=false;
	this.ambushed=false;
	// character methods
	this.changename=changename;
	this.changerace=changerace;
	this.changeclass=changeclass;
	this.drawcharacter=drawcharacter;
	this.generate=generate;
	this.fight=fight;
	this.runaway=runaway;
	this.nextcard=nextcard;
	this.save=save;
	this.load=load;
	this.showstats=showstats;
	this.incrementattribute=incrementattribute;
	this.use=use;
	this.drop=drop;
}
function changename(newname)
{
	this.cname=newname;
	document.getElementById("playerinfo").innerHTML=this.cname+" the "+this.race+" "+this.cclass;
}
function changerace(newrace)
{
	this.race=newrace;
	document.getElementById("playerinfo").innerHTML=this.cname+" the "+this.race+" "+this.cclass;
}
function changeclass(newclass)
{
	this.cclass=newclass;
	document.getElementById("playerinfo").innerHTML=this.cname+" the "+this.race+" "+this.cclass;
}
function incrementattribute(attribute)
{
	if (attribute=="str") this.strength++;
	if (attribute=="int") this.intelligence++;
	if (attribute=="dex") this.dexterity++;
	if (attribute=="hea") this.health++;
	this.ap-=1;
	this.showstats();
}
function showstats()
{
	if (this.cclass!="enemy")
	{
		// show player attributes with + buttons
		document.getElementById("playerstats").innerHTML=
		"Strength: "+this.strength+"<button type='button' id='incstr' onclick='player.incrementattribute(\"str\")'>+</button><br />"+
		"Intelligence: "+this.intelligence+"<button type='button' id='incint' onclick='player.incrementattribute(\"int\")'>+</button><br />"+
		"Dexterity: "+this.dexterity+"<button type='button' id='incdex' onclick='player.incrementattribute(\"dex\")'>+</button><br />"+
		"Health: "+this.health+"<button type='button' id='inchea' onclick='player.incrementattribute(\"hea\")'>+</button><br />"+
		"XP: "+this.xp+"<br />"+
		"AP: "+Math.round(this.ap*10)/10+"<br />"+
		"Level: "+this.level+"<br />"+
		"Main hand equipped with "+this.mainhand.iname;
		// disable increment buttons unless player has AP to convert
		if (this.ap < 1)	// convert available xp to attribute points
		{
			document.getElementById("incstr").disabled=true;
			document.getElementById("incint").disabled=true;
			document.getElementById("incdex").disabled=true;
			document.getElementById("inchea").disabled=true;
		}
	}
	else
	{
		document.getElementById("enemystats").innerHTML="Enemy: "+this.cname+" - Strength: "+this.strength+", Intelligence: "+this.intelligence+", Dexterity: "+this.dexterity+", Health: "+this.health+", XP reward: "+this.xp+", "+this.mainhand.iname;
	}
}
function drawcharacter()
{
	var c=document.getElementById("mycanvas");
	var cxt=c.getContext("2d");
	var imageobj=new Image();
	imageobj.onload=function()
	{
		cxt.drawImage(imageobj,0,0,444,319);
	}
	if (this.race=="human")
	{
		if (this.cclass=="warrior") imageobj.src="images/human_warrior.jpeg";
		if (this.cclass=="mage") imageobj.src="images/human_mage.jpeg";
		if (this.cclass=="rogue") imageobj.src="images/human_rogue.jpeg";
	}
	if (this.race=="elf")
	{
		if (this.cclass=="warrior") imageobj.src="images/elf_warrior.jpeg";
		if (this.cclass=="mage") imageobj.src="images/elf_mage.jpeg";
		if (this.cclass=="rogue") imageobj.src="images/elf_rogue.jpeg";
	}
	if (this.race=="orc")
	{
		if (this.cclass=="warrior") imageobj.src="images/orc_warrior.jpeg";
		if (this.cclass=="mage") imageobj.src="images/orc_mage.jpeg";
		if (this.cclass=="rogue") imageobj.src="images/orc_rogue.jpeg";
	}
}
function generate()
{
	var mult_s=1, mult_i=1, mult_d=1, mult_h=1
	// character class bonuses
	if (this.cclass=="warrior")
	{
		mult_s=1.1;	// +10% strength
		mult_h=1.1;	// +10% health
		this.mainhand=warrior_default_weapon;	// equip main hand
		addoption(document.getElementById("inventory"), warrior_default_weapon);
		this.inventory.push(warrior_default_weapon);
	}
	if (this.cclass=="mage")	// +30% intelligence, -10% health
	{
		mult_i=1.3;
		mult_h=0.9;
		this.mainhand=mage_default_weapon;	// equip main hand
		addoption(document.getElementById("inventory"), mage_default_weapon);
		this.inventory.push(mage_default_weapon);
	}
	if (this.cclass=="rogue")	// +20% dexterity
	{
		mult_d=1.2;
		this.mainhand=rogue_default_weapon;	// equip main hand
		addoption(document.getElementById("inventory"), rogue_default_weapon);
		this.inventory.push(rogue_default_weapon);
	}
	if (this.cclass!="enemy")
	{
		// generte player attributes
		this.strength=Math.round((10+Math.random()*10)*mult_s);
		this.intelligence=Math.round((10+Math.random()*10)*mult_i);
		this.dexterity=Math.round((10+Math.random()*10)*mult_d);
		this.health=Math.round((10+Math.random()*10)*mult_h);

		this.ap=3;	// give player 3 ap
		addoption(document.getElementById("inventory"), medikit);	// give player medikit
		this.inventory.push(medikit);
		document.getElementById("inventoryelement").style.display="inline";	// show inventory element
		this.drawcharacter();
	}
	if (this.cclass=="enemy")
	{
		// generate enemy attributes depending on player's level, based on +1 ap per level (spread  over 4 attributes)
		this.strength=Math.round((10+Math.random()*10+0.25*player.level)*mult_s);
		this.intelligence=Math.round((10+Math.random()*10+0.25*player.level)*mult_i);
		this.dexterity=Math.round((10+Math.random()*10+0.25*player.level)*mult_d);
		this.health=Math.round((10+Math.random()*10+0.25*player.level)*mult_h);

		this.xp=Math.round(Math.random()*10);	// enemy xp kill reward
		this.mainhand=weapons[Math.floor(Math.random()*weapons.length)];	// equip main hand with weapon
	}
	this.showstats();
	// disable generate and character gen buttons
	disable_char_generator();
}
function fight()
{
	var attack_first=false, hit=false, damage=0; status_string="";
	var dex_mod=((this.dexterity-enemy.dexterity)/(this.dexterity+enemy.dexterity))*0.5;	// dexterity modifier
	var str_mod=1+((this.strength-enemy.strength)/(this.strength+enemy.strength))*0.5;	// strength modifier
	var int_mod=((this.intelligence-enemy.intelligence)/(this.intelligence+enemy.intelligence))*0.5;	// intelligence modifier
	if (this.encounter)	// enable if encounter enemy
	{
		if (this.health>0)	// check if player is not dead
		{
			attack_first=(Math.random()<=0.5+dex_mod) ? true : false;
			if (this.ambushed) attack_first=false;
			if (attack_first)
			{
				status_string="You attack first.";
				if (this.mainhand.atype=="magic")
				{
					hit=(Math.random()<=0.5+int_mod) ? true : false;
					debug2_string="player magic attack! hit chance "+(0.5+int_mod);	//magic attack debug
				}
				else
				{
					hit=(Math.random()<=0.5+dex_mod) ? true : false;
					debug2_string="player physical attack! hit chance "+(0.5+dex_mod);	//physical attack debug
				}
				if (hit)
				{
					status_string+=" You hit with "+this.mainhand.iname+" and caused ";
					if (this.mainhand.atype=="magic")
					{
						damage=Math.round(this.mainhand.min_dmg+(Math.random()*this.mainhand.dmg_range)*(1+int_mod));
						debug2_string+=" player magic damage! dmg bonus "+(1+int_mod);	//magic attack debug
					}
					else
					{
						damage=Math.round(this.mainhand.min_dmg+(Math.random()*this.mainhand.dmg_range)*str_mod);	// damage depends on weapon and str_mod
						debug2_string+=" player physical damage! dmg bonus "+str_mod;	//physical attack debug
					}
					status_string+=damage+" damage.";
					enemy.health-=damage;	// damage to enemy
					if (enemy.health<=0)	// check if enemy is dead
					{
						status_string+=" You killed Kenny!";
						this.encounter=false;	// end encounter
						document.getElementById("nextcard").disabled=false;	// enable next card button
						// rewards
						this.xp+=enemy.xp;
						this.ap+=xp_to_ap(enemy.xp);
						this.level=xp_to_level(this.xp);
						this.kills++;
						// find loot (enemy's weapon)
						status_string+=" You found "+enemy.mainhand.iname;
						if (this.inventory.length<8)
						{
							addoption(document.getElementById("inventory"), enemy.mainhand);
							this.inventory.push(enemy.mainhand);
						}
						else status_string+= ". But you can't carry any more items";
						status_string+=". Total loot: "+this.inventory.length;
					}
				}
				else
				{
					status_string+=" You missed.";
				}
			}
			else
			{
				status_string="Enemy attacks first.";
				if (enemy.mainhand.atype=="magic")
				{
					hit=(Math.random()<=0.5-int_mod) ? true : false;
					debug2_string="enemy magic attack! hit chance "+(0.5-int_mod);	//magic attack debug
				}
				else
				{
					hit=(Math.random()<=0.5-dex_mod) ? true : false;
					debug2_string="enemy physical attack! hit chance "+(0.5-dex_mod);	//physical attack debug
				}
				if (hit)
				{
					status_string+=" Enemy hit with "+enemy.mainhand.iname+" and caused ";
					if (enemy.mainhand.atype=="magic")
					{
						damage=Math.round(enemy.mainhand.min_dmg+(Math.random()*enemy.mainhand.dmg_range)*(1-int_mod));
						
						debug2_string+=" enemy magic damage! dmg bonus "+(1-int_mod);	//magic attack 
					}
					else
					{
						damage=Math.round(enemy.mainhand.min_dmg+(Math.random()*enemy.mainhand.dmg_range)*(2-str_mod));	// damage depends on weapon and inverse of player str_mod
						debug2_string+=" enemy physical damage! dmg bonus "+(2-str_mod);	//physical attack debug
					}
					status_string+=damage+" damage.";
					this.health-=damage
					if (this.health<=0) status_string+=" You died.";	// check if player is dead
				}
				else
				{
					status_string+=" Enemy missed.";
				}
			}
			document.getElementById("status").innerHTML=status_string;
			this.showstats();
			enemy.showstats();
			this.ambushed=false;
		}
		else
		{
			document.getElementById("status").innerHTML="You died.";
		}
		debug_string="Dexterity mod = "+Math.round(dex_mod*100)+"% increased chance of hit<br />"+"Intelligence mod = "+Math.round(int_mod*100)+"% increased chance of hit<br />"+"Player strength mod = "+Math.round(str_mod*100)+"% damage<br />"+"Enemy strength mod = "+Math.round((2-str_mod)*100)+"% damage<br />"+"Player intelligence damage mod = "+Math.round((1+int_mod)*100)+"% damage<br />"+"Enemy intelligence damage mod = "+Math.round((1-int_mod)*100)+"% damage";
		document.getElementById("debug").innerHTML=debug_string;
		document.getElementById("debug2").innerHTML=debug2_string;
	}
	else
	{
		document.getElementById("status").innerHTML="Nothing to fight.";
	}
}
function runaway()
{
	var run_away=false; status_string="";
	var dex_mod=((this.dexterity-enemy.dexterity)/(this.dexterity+enemy.dexterity))*0.5;	// dexterity modifier
	if (this.encounter)	// enable if encounter enemy
	{
		run_away=(Math.random()<=0.3+dex_mod) ? true : false
		if ((run_away) && !this.ambushed)
		{
			this.encounter=false;
			document.getElementById("nextcard").disabled=false;	// enable next card button
			status_string="You ran away."
		}
		else
		{
			status_string="You couldn't get away."
			this.ambushed=true;	// enemy gets free attack first
		}
	}
	else status_string="Nothing to run from."
	document.getElementById("status").innerHTML=status_string;
}
function save()
{
	localStorage.savegame=JSON.stringify(this);
	document.getElementById("status").innerHTML="Game saved";
}
function load()
{
	var loadgame=JSON.parse(localStorage.savegame);
	var i;
	this.cname=loadgame.cname;
	this.race=loadgame.race;
	this.cclass=loadgame.cclass;
	this.strength=loadgame.strength;
	this.intelligence=loadgame.intelligence;
	this.dexterity=loadgame.dexterity;
	this.health=loadgame.health;
	this.xp=loadgame.xp;
	this.ap=loadgame.ap;
	this.level=loadgame.level;
	this.mainhand=loadgame.mainhand;
	this.inventory=loadgame.inventory;
	// need to reload  inventory select list
	document.getElementById("inventory").innerHTML="";	// clear inventory list
	for (i=0; i<this.inventory.length; i++)
	{
		addoption(document.getElementById("inventory"), this.inventory[i]);
	}
	document.getElementById("status").innerHTML="Saved game loaded";
	document.getElementById("playerinfo").innerHTML=this.cname+" the "+this.race+" "+this.cclass;
	this.showstats();
	document.getElementById("inventoryelement").style.display="inline";	// show inventory element
	this.drawcharacter();
	// disable generate and character gen buttons
	disable_char_generator();
}
function addchoice(selectbox, choice_text, choice_value)	// add option to a  select object
{
	var optn=document.createElement("option");
	optn.text=choice_text;
	optn.value=choice_value;
	selectbox.options.add(optn);
}
function nextcard()	// adventure card processor
{
	var card_now;
	var random_event;
	var key;
	// clear enemy stats and debug  displays
	document.getElementById("enemystats").innerHTML="";
	document.getElementById("debug").innerHTML="";
	document.getElementById("debug2").innerHTML="";
	card_now=JSON.parse(JSON.stringify(cards[card_idx]));	// clone array element to assign variable instead of assigning reference
	status_string="card #"+card_idx+", "+card_now.ctype+": ";
	if (card_now.ctype=="random")
	{
		// randomly assign card as story, encounter or loot
		random_event=Math.random();
		if (random_event<=0.5) card_now.ctype="story";
		if (random_event>0.5 && random_event<=0.6) card_now.ctype="loot";
		if (random_event>0.6) card_now.ctype="encounter";
	}
	if (card_now.ctype=="story")
	{
		// show story text
		if (card_now.ccontent==null) card_now.ccontent="Nothing happened.";	// random story card if card content is null
		status_string+=card_now.ccontent;
		if (typeof card_now.nextcard_idx != "number")	// check if this is a choice card
		{
			// render choice UI
			document.getElementById("choices").style.display="inline";	// show choices element (dropdown+button)
			document.getElementById("choose").disabled=false;	// enable choose button
			document.getElementById("choice").innerHTML="";	// clear choice dropdown
			for (key in card_now.nextcard_idx)	// add choices to choice dropdown
			{
				addchoice(document.getElementById("choice"), key, card_now.nextcard_idx[key]);
			}
			//  card_idx is assigned (outside of this function) based on selected choice once player chooses from the choice dropdown
		}
		else card_idx=card_now.nextcard_idx	// non-choice card, progress linearly
	}
	if (card_now.ctype=="encounter")
	{
		status_string+="Encounter!";
		this.encounter=true;
		if (card_now.ccontent==null) enemy.generate();	// generate random encounter if card content is null
		else
		{
			// enemy=card_now.ccontent;
			// to make this work, create new enemy object with requisite methods, then copy card_now.ccontent appropriate attributes into new enemy object, else card_now.ccontent doesn't have requisite methods
			enemy=new character();
			enemy.cname=card_now.ccontent.cname;
			enemy.race=card_now.ccontent.race;
			enemy.cclass=card_now.ccontent.cclass;
			enemy.strength=card_now.ccontent.strength;
			enemy.intelligence=card_now.ccontent.intelligence;
			enemy.dexterity=card_now.ccontent.dexterity;
			enemy.health=card_now.ccontent.health;
			enemy.xp=card_now.ccontent.xp;
			enemy.mainhand=card_now.ccontent.mainhand;
			enemy.showstats();
		}
		document.getElementById("nextcard").disabled=true;	// disable next button until enemy killed or player runs away
		card_idx=card_now.nextcard_idx
	}
	if (card_now.ctype=="loot")
	{
		if (card_now.ccontent==null) card_now.ccontent=generateloot();	// generate random loot if card content is null
		foundloot=card_now.ccontent;
		// add loot to inventory
		status_string+="Found loot! You found "+foundloot.iname;
		if (this.inventory.length<8)
		{
			addoption(document.getElementById("inventory"), foundloot);
			this.inventory.push(foundloot);
		}
		else status_string+= ". But you can't carry any more items";
		status_string+=". Total loot: "+this.inventory.length;
		card_idx=card_now.nextcard_idx
	}
	if (card_now.ctype=="end")
	{
		// end of adventure
		status_string+="The end."
		document.getElementById("nextcard").disabled=true;	// disable next button
	}
	document.getElementById("status").innerHTML=status_string;	
}
function use(x)
{
	var i=0, j=0;
	while (this.inventory[i].iname!=x) i++	// identify the inventory object selected
	if (this.inventory[i].iname=="Medikit")
	{
		this.health+=10
		this.inventory.splice(i,1);
		document.getElementById("inventory").options[i]=null;
		this.showstats();
	}
	while (weapons[j].iname!=x) j++	// check if inventory object selected is a weapon
	if (j<weapons.length)
	{
		if ((weapons[j].iclass==this.cclass) || (weapons[j].iclass=="all"))	// check weapon class
		{
			this.mainhand=weapons[j];
			this.showstats();
		}
		else document.getElementById("status").innerHTML="You can't use a "+weapons[j].iclass+"-class weapon.";
	}
}
function drop(x)
{
	var i=0;
	while (this.inventory[i].iname!=x) i++
	this.inventory.splice(i,1);
	document.getElementById("inventory").options[i]=null;
	this.showstats();
}
function weapon(iname, min_dmg, max_dmg, atype, iclass)
{
	this.iname=iname; // item name
	this.min_dmg=min_dmg;
	this.max_dmg=max_dmg;
	this.dmg_range=max_dmg-min_dmg;
	this.atype=atype; // attack type, i.e. physical or magic
	this.iclass=iclass; // item class, i.e. usable by which character class(es)
}
function loot(iname)
{
	this.iname=iname;
}
function card(ctype, ccontent, nextcard_idx)	// adventure script card object
{
	this.ctype=ctype;	// card type (story, encounter, loot or random)
	this.ccontent=ccontent;	// card content
	this.nextcard_idx=nextcard_idx;	// next card
}
function choose(x)
{
	card_idx=x;
	document.getElementById("choice").innerHTML="";	// clear choice dropdown once player has chosen
	document.getElementById("choose").disabled=true;	// disable choose button once player has chosen
	document.getElementById("choices").style.display="none";	// hide choices element (dropdown+button) once player has chosen
	player.nextcard();	// advance to next card based on choice
}
// initialise characters
var player=new character("", "", "", 0, 0, 0, 0, 0, 0, 1, 0, false, false, "");
var enemy=new character("Enemy", "", "enemy", 0, 0, 0, 0, 0);	// enemy defined by cclass=enemy
// initialise adventure cards
var card_idx=0;
var cards=[];