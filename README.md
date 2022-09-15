<h1 align="center">Treasure Chest Game</h1>
<h2 align="center">

This game created on PixiJS — The HTML5 Creation Engine

</h2>

![pixi.js logo](https://pixijs.download/pixijs-banner-no-version.png)

<p align="center">
[![npm version](https://badge.fury.io/js/pixi.js.svg)](https://badge.fury.io/js/pixi.js)
</p>

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

<img src="/readme_assets/lose.png" width="45%">

<p>
    Win chest
</p>

<img src="/readme_assets/win.png" width="45%">


<p align="center">
<img src="https://media.giphy.com/media/7OWdOQupgCClrZb19P/giphy.gif" width="80%"></p>

Solitaire implemented by scratch on vue.js. It contains 3 types of solitaire namely spider(which was made famous by microsoft back when I was a kid) ,spider 4 suit and klondike. I've learned web development myself without any course or coaching so don't expect too much from the source code xD.

**This project is inspired by [AadumKhor](https://github.com/AadumKhor) Go check out his flutter implementation of the same [Here](https://github.com/AadumKhor/Solitaire_Flutter)** .

## How to play

### Drag and Drop [__Chrome,Opera__]:-

- **Drag** the card or the card pile you want to move.
- **Drop** the dragged card pile on the target and if the move is legal card will move
- Note:- Drag and Drop doesn't work for properly for **firefox** due to their lack of support to html Drag and drop API - https://bugzilla.mozilla.org/show_bug.cgi?id=505521 .

### Click edition [__Mobile,Firefox,Chrome,Safari,Opera__]-

- **Click** on the card or card pile you want to move .The pile turns to **blue**.
- **Click** on the
  destination card and if the move is legal the cards will
  stack below the target.

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
