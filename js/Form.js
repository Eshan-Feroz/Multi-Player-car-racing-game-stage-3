class Form {
    constructor() {
      // elements of the form
      this.input = createInput("Name");
      this.button = createButton('Play');
      this.greeting = createElement('h2');
      this.title = createElement('h2');
    }
    hide(){
      // Hides following elements of form
      this.greeting.hide();
      this.input.hide();
      this.button.hide();
    }
  
    display(){
      //display the title, input, and play button
      this.title.html("Car Racing Game");
      this.title.position(displayWidth/2 - 50, 0);
      
      this.input.position(displayWidth/2 - 40, displayHeight/2 - 240);
      this.button.position(displayWidth/2 + 30, displayHeight/2);
      
      // hide input and play button if play button is pressed
      this.button.mousePressed(() => {
        this.input.hide();
        this.button.hide();
        
        // set player name to the name the user gave
        player.name = this.input.value();
        
        // increment the player count by one as each player joins
        playerCount+=1;
        player.index = playerCount;
        // update the player's info and the count of each player
        player.update()
        player.updateCount(playerCount);

        // display the greeting message for each player
        this.greeting.html("Hello " + player.name)
        this.greeting.position(displayWidth/2 - 70, displayHeight/4)
      });
  
    }
  }