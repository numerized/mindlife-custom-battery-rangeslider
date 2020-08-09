import { Component, h, Element, State, getAssetPath, Event, EventEmitter } from '@stencil/core';
import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

@Component({
  tag: 'mindlife-battery',
  styleUrl: 'mindlife-battery.css',
  assetsDirs: ['assets'],
  shadow: true,
})
export class mindlifeBattery {
  @Event({
    eventName: 'sliderSlided',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  sliderSlided: EventEmitter;

  @Element() private el: HTMLElement;

  @State() numFillRect = new Array(30).fill(30);
  @State() percentValue = '30';
  private slider;

  componentDidLoad() {
    this.slider = this.el.shadowRoot.querySelector('div.slider');

    noUiSlider.create(this.slider, {
      start: [30],
      direction: 'rtl',
      orientation: 'vertical',
      range: {
        min: 1,
        max: 100,
      },
      keyboardSupport: true, // Default true
      keyboardDefaultStep: 5, // Default 10
    });

    this.initEvents();
    setTimeout(() => {
      this.slider.noUiSlider.set(20);
    }, 700);
    setTimeout(() => {
      this.slider.noUiSlider.set(30);
    }, 800);
    setTimeout(() => {
      this.slider.noUiSlider.set(20);
    }, 900);
    setTimeout(() => {
      this.slider.noUiSlider.set(30);
    }, 1000);
    setTimeout(() => {
      this.slider.noUiSlider.set(20);
    }, 1100);
    setTimeout(() => {
      this.slider.noUiSlider.set(30);
    }, 1200);
  }

  initEvents() {
    this.slider.noUiSlider.on('slide', event => {
      this.onSlide(event);
    });
    this.slider.noUiSlider.on('update', event => {
      this.onSlide(event);
    });
  }

  onSlide(event) {
    let IntFromFloat = Math.round(Number(event[0])/10);
    this.numFillRect = new Array(IntFromFloat).fill(IntFromFloat);
    this.numFillRect = [...this.numFillRect];
    this.sliderSlided.emit(IntFromFloat);
    this.percentValue = Math.round(Number(event[0])).toFixed(0);
  }

  render() {
    return [
     
      <h1 style={{'text-align':'center'}}>{this.percentValue}%</h1>,
      <div class="container">
        <img class="battery-img" src={getAssetPath(`./assets/battery.png`)}></img>
        <div class="slider"></div>
        {this.numFillRect.map((value, index) => (
          <div class={`fill-rect fill-rect-color-${value}`} style={{ 'bottom': `${index * 10}%` }}></div>
        ))}
      </div>,
    ];
  }
}
