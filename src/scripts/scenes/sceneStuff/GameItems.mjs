const GameItems = new Map();
 for (const [id, name] of [
    "Cherry",
    "Tangerine",
    "Radish",
    "Apple",
    "Green Bell-Pepper",
    "Purple fruit",
    "Carrot",
    "Kyuri Japanese Cucumber",
    "Strawberry",
    "Broccoli",
    "Ananas",
    "Watermelon",
    "Daikon / Rettiche",
    "Potato",
    "Banana",
    "Romaine Lettuce",
    "Persimmon",
    "Hot Pepper",
    "Ear of Corn",
    "????",
    "Eggplant",
    "pseudo-Celery",
    "Red Bell Pepper",
    "King Trumpet mushroom",
    "Onion",
    "Black Grapes",
    "Tomato",
    "Cabbage",
    "Unknown mushroom",
    "Lemon",
    "White Grapes",
    "Brown Beech mushrooms (Shimeji)",
    "Melon",
    "unknown 2",
    "Cantaloupe",
    "Green Onion (or Green Garlic)",
    "Rice Ball"
].entries())
{
    const frame = id > 8 ? "veg" + (id + 1) : "veg0" + (id + 1);

    const item = {name, frame, id};
  
    GameItems.set(id, item);
  
    //ary.set(name, item);
}

export default GameItems;
