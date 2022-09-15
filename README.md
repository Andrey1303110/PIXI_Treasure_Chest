<h1 align="center">Treasure Chest Game</h1>
<h2 align="center">

This game created on PixiJS — The HTML5 Creation Engine

</h2>

![pixi.js logo](https://pixijs.download/pixijs-banner-no-version.png)

[![npm version](https://badge.fury.io/js/pixi.js.svg)](https://badge.fury.io/js/pixi.js)

## Live Demo

<h2 align="center"><a  href="https://treasure-chest-game.netlify.app/">Play NOW!</a></h2>

## Description
**Start screen**

<img src="/readme_assets/1.png" width="100%">

<p>
    On the start screen we have just one button, which will display the chest on our screen.
</p>

**Screen with chests**

<img src="/readme_assets/2.png" width="100%">

<p>
    Now we have the initialization of 6 chests on our screen. Their number vertically and horizontally can be changed, through the configuration file.
</p>

## How to play

<p>
    To play, we just need to click on one chest, after which it will be opened.
    <br/>
    There are two variants of chests - winning and losing.
</p>

<p>
    Lose chest
</p>
<p align="center">
    <img src="/readme_assets/lose.gif" width="30%">
</p>

<p>
    Win chest
</p>
<p align="center">
    <img src="/readme_assets/win.gif" width="30%">
</p>

**When chest was opened**

<p>
    There are three options for the scenario
    <br/>
    1) The Chest loses - Then nothing happens and the chest just returns to its place on the screen
    <br/>
    2) The Chest winning - Starts a coin drop animation
    <br/>
    3) The Chest bonus winning - Starts a gold bars drop animation
</p>

###### Chest loses

<img src="/readme_assets/3.png" width="100%">

###### Chest winning

<img src="/readme_assets/4.png" width="100%">


###### Chest winning animation

<img src="/readme_assets/5.png" width="100%">

###### Chest bonus winning animation

<img src="/readme_assets/6.png" width="100%">



## About the project.

### Drag and Drop

- Drag and drop is implemented with native html5 drag and drop api with @drag, @dragend, @dragenter eventlisteners on the Card.vue component.
- Libraries like Vue.draggable were not used as i had to write most of the drag and drop logic according to the solitaire game type and I also had to **MOVE** the stack of cards.
- Ghost image in drag is removed instead the **whole stack** of card moves with cursor change.

### CSS

- Each and every card is 100% css except the SVG of the suit in the center of the card,which is made by illustrator tool.

  <p align="center"><img  src="./readme_assets/4.png" width="30%"></p>

### 3 mode menu

Choose from 3 variants of solitaire form the main menu

<p align="center"><img  src="./readme_assets/menu.png" width="70%"></p>

# Variants

## **Klondike**

<p align="center">
<img  src="./readme_assets/3.png" width="80%">
</p>
<!-- <img src="./readme_assets/3.png" width="50%"> -->

## **Spider 4 Suit**

<p align="center">
<img  src="./readme_assets/5.png" width="80%">
</p>

## **Spider 1 Suit**

<p align="center">
<img  src="./readme_assets/1.png" width="80%">
</p>

## Project setup

```
npm install
npm run serve
```

## Future scope

- Add winning animation.

## Support on Beerpay

Hey dude! Help me out for a couple of :beers:!

[![Beerpay](https://beerpay.io/silent-lad/VueSolitaire/badge.svg?style=beer-square)](https://beerpay.io/silent-lad/VueSolitaire) [![Beerpay](https://beerpay.io/silent-lad/VueSolitaire/make-wish.svg?style=flat-square)](https://beerpay.io/silent-lad/VueSolitaire?focus=wish)
