![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# MINDLIFE BATTERY

This is a custom element that lets users slide up and down a battery level with options such as animated hint at startup or read-only (disabled) mode to just display a value.

The following link demonstrate how to use the project in Angular

[demo](https://mindlife-ui-toolkit.web.app/components/BatterySlider)

[private demo repo for authorised people](https://github.com/Mindlife-UK/mindlife-custom-uikit)

# Installation

```bash
npm install mindlife-custom-battery-rangeslider
```

## Angular

Using a Stencil built web component collection within an Angular CLI project is a two-step process. We need to:

Include the CUSTOM_ELEMENTS_SCHEMA in the modules that use the components.
Call defineCustomElements() from main.ts (or some other appropriate place).

Please read: https://stenciljs.com/docs/angular

## Usage

```app.component.ts
import 'mindlife-custom-battery-rangeslider';
```

```[componentName].page.html
<mindlife-battery></mindlife-battery>
```

# Events

The only emitted event is the value of the slider when it moves `mindlife-battery-value` it will be between 0 and 100.

```
  document.addEventListener("mindlife-battery-value",(e)=>{console.log(e)})
```

# Properties

Example

```
      <mindlife-battery value="40" reversed="false" animated-hint="false" disabled="false" single-color="true" color-steps="2" container="battery"></mindlife-battery>
```

`value` is the value set by the component at initialisation, it's watched at all time so the slider updates itself upon change.

`animated-hint` is a boolean value to enable the UX hint that will shake the handle of the slider to hint user that it can be moved.

`disabled` is a boolean value to make the slider read only through the `value` property defined above.

`single-color` is a boolean value to make the slider show only one color at a time, when true all segments will be the color of the highest value, if false, each segment color will be its own color level.

`reversed` boolean, if true, green is the color at the bottom and goes to red at the top.

`color-steps` 1 or 2, this is the number of steps where a segment color changes to another shade

`container` 'battery' or 'container' a battery or a simple container is used

`container-opacity` number from 0 to 1, 0 being fully transparent and 1 being fully opaque

`hue-rotation` number from 0 to 360 following HSL convention like this: 

![HSL Color wheel](https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2015/01/hsl-color-wheel.png)

