var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 300, "y": groundY - 110},
                { "type": "sawblade", "x": 500, "y": groundY - 7},
                { "type": "sawblade", "x": 800, "y": groundY - 105  },
                { "type": "sawblade", "x": 1000, "y": groundY - 105},
                { "type": "sawblade", "x": 1300, "y": groundY - 7 },
                { "type": "sawblade", "x": 1500, "y": groundY - 105 },
                { "type": "sawblade", "x": 1800, "y": groundY - 105 },
                { "type": "sawblade", "x": 2000, "y": groundY - 7 },
                { "type": "sawblade", "x": 2200, "y": groundY - 105},
                { "type": "sawblade", "x": 2400, "y": groundY -7},
                { "type": "sawblade", "x": 2600, "y": groundY - 105},
                { "type": "sawblade", "x": 2700, "y": groundY - 7 },
                { "type": "sawblade", "x": 2900, "y": groundY - 7 },
                { "type": "sawblade", "x": 3100, "y": groundY - 100 },
                { "type": "sawblade", "x": 3300, "y": groundY - 7 },
                { "type": "sawblade", "x": 3500, "y": groundY - 105},
                { "type": "sawblade", "x": 3650, "y": groundY - 7 },
                { "type": "sawblade", "x": 3750, "y": groundY - 110},
                { "type": "sawblade", "x": 3800, "y": groundY - 7},
                { "type": "sawblade", "x": 3900, "y": groundY - 105  },
                { "type": "sawblade", "x": 4000, "y": groundY - 105},
                { "type": "sawblade", "x": 4100, "y": groundY - 7 },
                { "type": "sawblade", "x": 4200, "y": groundY - 105 },
                { "type": "sawblade", "x": 4300, "y": groundY - 105 },
                { "type": "sawblade", "x": 4400, "y": groundY - 7 },
                { "type": "sawblade", "x": 4500, "y": groundY - 105},
                { "type": "sawblade", "x": 4600, "y": groundY -105},
                { "type": "sawblade", "x": 4700, "y": groundY - 105},
                { "type": "sawblade", "x": 4800, "y": groundY - 7 },
                { "type": "sawblade", "x": 4900, "y": groundY - 7 },
                { "type": "sawblade", "x": 5100, "y": groundY - 100 },
                { "type": "sawblade", "x": 5200, "y": groundY - 7 },
                { "type": "sawblade", "x": 5400, "y": groundY - 105},
                { "type": "sawblade", "x": 5700, "y": groundY - 7 },

                { "type": "enemy", "x": 2560, "y": groundY  - 50},
                { "type": "enemy", "x": 800, "y": groundY - 50},

                { "type": "reward", "x": 1100, "y": groundY - 150 },
                { "type": "reward", "x": 3000, "y": groundY - 150},
                { "type": "reward", "x": 4600, "y": groundY - 10 },
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade(x, y){
            var hitZoneSize = 25; // assigns a value of 25 as the size of the hitzone
            var damageFromObstacle = 10; //assigns a value as the damage from the obstacle
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); // creates the obstacle and stores it in the variable sawBladeHitZone
            sawBladeHitZone.x = x; // stores a value as the x position for the hit zone
            sawBladeHitZone.y = y; // stores a value as the y position for the hit zone
            game.addGameItem(sawBladeHitZone); // adds the hit zone as a game item
            var obstacleImage = draw.bitmap("img/baty.png"); // draws the image and stores it in the variable obstacleImage
            sawBladeHitZone.addChild(obstacleImage); //adds obstacleImage as a child of sawBladeHitZone
            obstacleImage.x = - 20; // assigns a value to the x positon of obstacleImage
            obstacleImage.y = - 45; // assigns a value to the y positon of obstacleImage
            obstacleImage.scaleX = 0.2;
            obstacleImage.scaleY = 0.2;
        }
     
        function createEnemy(x, y){
            var enemy = game.createGameItem("enemy", 25); // create the gameItem and store it to the variable enemy
            var gameItem = draw.rect(50, 50, "red"); // draws a rectangle and stores it in the gameItem variable
            gameItem.x = -25; // stores a value as the x value of the gameItem
            gameItem.y = -25; // stores a value as the y value of the gameItem
            enemy.addChild(gameItem); //adds the gameItem as a child of enemy
            enemy.x = x; // stores the value passed as the x argument as enemy's x value
            enemy.y = y; // stores the value passed as the y argument as enemy's y value
            game.addGameItem(enemy); //adds the enemy as an item to the game
            enemy.velocityX = -2; // assigns a value to the velocityX of the enemy to make it move
    
            enemy.onPlayerCollision = function (){
                game.changeIntegrity(-10); // subtracts from the health when Halle collides with enemy
                
            }
    
            enemy.onProjectileCollision = function (){
                game.increaseScore(100); // increases the score when Halle shoots the enemy
                enemy.flyTo(600, 0); // flies the enemy out to a specific x/y location when Halle shoots the enemy
            }
        }

        function createReward(x, y){
            var reward = game.createGameItem("reward", 25);
            var gameItem = draw.bitmap("img/heart.png");
            gameItem.x = -37;
            gameItem.y = -30;
            reward.addChild(gameItem);
            reward.x = x;
            reward.y = y;
            game.addGameItem(reward);
            reward.velocityX = -2;
            gameItem.scaleX = 0.05;
            gameItem.scaleY = 0.05;

            reward.onPlayerCollision = function (){
                game.changeIntegrity(10);
                game.increaseScore(100);
                reward.shrink();
            }
    
        }


// loop for gameItems
   for (var i = 0; i < levelData.gameItems.length; i++){
    var gameItem = levelData.gameItems[i];// assigns thr current index f the gameItem
    if (gameItem.type === "sawblade"){ // cheks the type of the game item
        createSawBlade(gameItem.x, gameItem.y); // if the type is true it executes createSawblade
    }
    if (gameItem.type === "enemy"){ //if the type is true it executes createEnemy
        createEnemy(gameItem.x, gameItem.y);
    }
    if (gameItem.type === "reward"){ //if the type is true it executes createReward
        createReward(gameItem.x, gameItem.y);
    }

   }
        
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
