// Sample adventure script

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

// pre-defined boss enemy

var boss=new character("Boss", "", "enemy", 30, 30, 30, 30, 20); boss.mainhand=autorifle;

// adventure script card deck

cards[0]=new card("story", "This is the beginning of the adventure.", 1);
cards[1]=new card("loot", dagger, 2);
cards[2]=new card("encounter", null, 3);
cards[3]=new card("story", "Will you go left (loot) or right (encounter)?", { "Left" : 4, "Right" : 5} );
cards[4]=new card("loot", autorifle, 6);
cards[5]=new card("encounter", null, 6);
cards[6]=new card("story", "This is the end of the adventure.", 7);
cards[7]=new card("story", "Fight the boss?", { "Yes" : 8, "No" : 11} );
cards[8]=new card("loot", null, 9);
cards[9]=new card("loot", medikit, 10);
cards[10]=new card("encounter", boss, 11);
cards[11]=new card("end");