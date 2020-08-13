import { Component, h, Element, Prop, State, Event, EventEmitter } from '@stencil/core';
import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

const batteryImage =
  'data:image/png;base64,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';

@Component({
  tag: 'mindlife-battery',
  styleUrl: 'mindlife-battery.css',
  shadow: true,
})
export class mindlifeBattery {
  @Prop() value: number = 30;
  @Prop() animatedHint: boolean;
  @Prop() disabled: boolean;

  @Event({
    eventName: 'mindlifeSliderMoved',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  mindlifeSliderMoved: EventEmitter;

  @Element() private el: HTMLElement;

  @State() numFillRect = [];
  @State() percentValue;
  
  private slider;

  componentWillLoad() {
    this.numFillRect = new Array(this.value).fill(this.value);

    this.percentValue = this.value;
  }

  componentDidLoad() {
    this.slider = this.el.shadowRoot.querySelector('div.slider');

    this.disabled && this.slider.setAttribute('disabled', true);


    noUiSlider.create(this.slider, {
      start: [10],
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

    if (this.animatedHint === true && !this.disabled) {
      setTimeout(() => {
        this.slider.noUiSlider.set(this.value - 10);
      }, 700);
      setTimeout(() => {
        this.slider.noUiSlider.set(this.value);
      }, 800);
      setTimeout(() => {
        this.slider.noUiSlider.set(this.value - 10);
      }, 900);
      setTimeout(() => {
        this.slider.noUiSlider.set(this.value);
      }, 1000);
      setTimeout(() => {
        this.slider.noUiSlider.set(this.value - 10);
      }, 1100);
      setTimeout(() => {
        this.slider.noUiSlider.set(this.value);
      }, 1200);
    } else {
      this.setBattery(this.value);
    }
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
    let IntFromFloat = Math.round(Number(event[0]) / 10);
    this.numFillRect = new Array(IntFromFloat).fill(IntFromFloat);
    this.numFillRect = [...this.numFillRect];
    this.mindlifeSliderMoved.emit(IntFromFloat);
    this.percentValue = Number(Math.round(Number(event[0])).toFixed(0));
  }

  setBattery(value) {
    if (this.percentValue < value) {
      for (let i = Number(this.percentValue) / 10; i <= value / 10; i++) {
        let k = i;
        setTimeout(() => {
          this.slider.noUiSlider.set(k * 10);
        }, k * 50);
      }
    } else {
      for (let i = Number(this.percentValue) / 10; i >= value / 10; i--) {
        let k = i;
        console.log(k);
        setTimeout(() => {
          console.log(i);
          this.slider.noUiSlider.set(k * 10);
        }, (10 - k) * 50);
      }
    }
  }

  render() {
    return [
      <h1 style={{ 'text-align': 'center' }}>{this.percentValue}%</h1>,
      <div class="container">
        <img class="battery-img" src={batteryImage}></img>
        <div class={`slider ${this.disabled && 'slider-disabled'}`}></div>
        {this.numFillRect.map((value, index) => (
          <div class={`fill-rect fill-rect-color-${value}`} style={{ bottom: `${index * 10}%` }}></div>
        ))}
      </div>,
      // <div class="buttons">
      //   <button
      //     onClick={() => {
      //       this.setBattery(90);
      //     }}
      //   >
      //     SET TO 90
      //   </button>
      //   <button
      //     onClick={() => {
      //       this.setBattery(20);
      //     }}
      //   >
      //     SET TO 20
      //   </button>
      // </div>,
    ];
  }
}
