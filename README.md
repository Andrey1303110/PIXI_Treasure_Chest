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

#### Chest loses

<img src="/readme_assets/3.png" width="100%">

#### Chest winning

<img src="/readme_assets/4.png" width="100%">

#### Chest winning animation

<img src="/readme_assets/5.png" width="100%">

#### Chest bonus winning animation

<img src="/readme_assets/6.png" width="100%">

#### Chest bonus winning badge

<p>
    The animation itself of coins and gold bars falling is generated randomly by duration, by the intensity of the fall, by the speed of rotation of each object. Each object contains several frames, which gives the impression of being three-dimensional.
</p>

<img src="/readme_assets/7.png" width="100%">

<p>
    If you are lucky enough to open the chest with a bonus win you will receive a corresponding badge that says you have won $100,000.
</p>

<img src="/readme_assets/8.png" width="100%">

<p>
    This badge will move to the upper right corner as the animation progresses. Where it will be all the time until the chest run out.
</p>

### When all chests are open - game re-create new chests

<img src="/readme_assets/9.png" width="100%">

<p>
    An animation of the appearance of new boxes on the screen will be played.
</p>

## About the project.

<p>
The following libraries were used in the creation of the game:
<br/>
- tween.js: 18.6.4,
<br/>
- howler: 2.2.3
</p>

<p>The game was compiled using Webpack 5.74.0</p>

## Project setup

```
npm install
npm run build
```

## Future

- Add bets or keys for open chests.
