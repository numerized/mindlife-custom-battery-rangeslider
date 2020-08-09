import { Component, h, Element, State } from '@stencil/core';
import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: false,
})
export class MyComponent {
  @Element() private el: HTMLElement;

  @State() numFillRect = new Array(7).fill(7);
  private slider;

  componentDidLoad() {
    this.slider = this.el.querySelector('div.slider');
    console.log(this.numFillRect);

    noUiSlider.create(this.slider, {
      start: [7],
      orientation: 'vertical',
      range: {
        min: 1,
        max: 10,
      },
      keyboardSupport: true, // Default true
      keyboardDefaultStep: 1, // Default 10
    });

    this.initEvents();
  }

  initEvents() {
    this.slider.noUiSlider.on('slide', event => {
      this.onSlide(event);
    });
  }

  onSlide(event) {
    let reverseIntFromFloat = Number((11 - event[0]).toFixed(0));
    this.numFillRect = new Array(reverseIntFromFloat).fill(reverseIntFromFloat);
    this.numFillRect = [...this.numFillRect];
    console.log(this.numFillRect);
  }

  render() {
    return (
      <div class="container">
        <div class="slider"></div>
        {this.numFillRect.map((value, index) => (
          <div class={`fill-rect fill-rect-color-${value}`} style={{ bottom: `${index * 10}%` }}></div>
        ))}
      </div>
    );
  }
}
