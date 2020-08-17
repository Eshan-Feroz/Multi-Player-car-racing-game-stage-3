class Game {
    constructor(){}

    getState(){
      // read the gameState from the database
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      // update the gameState to the data field
      database.ref('/').update({
        gameState: state
      });
    }

    
    async start(){
      // if gameState is 0
      if(gameState === 0){
        // create the player
        player = new Player();
        // take the value of the playerCount for each player
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        // form is created for every player and displayed
        form = new Form()
        form.display();
      }

      // sprites of cars
      car1 = createSprite(100, 200);
      car1.addImage("car1", car1_img);
      car2 = createSprite(300, 200);
      car2.addImage("car2", car2_img);
      car3 = createSprite(500, 200);
      car3.addImage("car3", car3_img);
      car4 = createSprite(700, 200);
      car4.addImage("car4", car4_img);
      cars = [car1, car2, car3, car4];

    }

  
    play(){
      // hide the form and say that the game started
      form.hide();
      textSize(30);
      text("Game Start", 120, 100)
      Player.getPlayerInfo();
  
      if(allPlayers !== undefined){
        background("#c68767");
        image(track, 0, -displayHeight*4, displayWidth, displayHeight *5)
        //Index of the array
        var index = 0;

        //X and y position of the cars
        var x = 175;
        var y;


        //var display_position = 130;
        for(var plr in allPlayers){
          // Add one to the index for every loop 
          index = index + 1;

          //position the cars little away from each other on x axis
          x = x + 200;

          //Use data from database to display cars in y-direction
          y = displayHeight - allPlayers[plr].distance;
          cars[index - 1].x = x;
          cars[index - 1].y = y;
          if(index === player.index){
            cars[index - 1].shapeColor = "red";
            camera.position.x = displayWidth/2;
            camera.position.y = cars[index - 1].y;
          }

          // mark the sprite as red if that is the player in the server, otherwise mark as black
          if (plr === "player" + player.index)
            fill("red")
          else
            fill("black");
  
          //display_position+=20;
          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
      }
      
      // increment the distance and update position of the player when up arrow is pressed.
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance +=50
        player.update();
      }

      if(player.distance > 3860){
        gameState = 2;

      }
      
      drawSprites();

    }

    end(){
      console.log("Game Over")
      game.update(2);
    }
  }