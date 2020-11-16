import { Component, h, Element, Prop, State, Event, EventEmitter, Watch } from '@stencil/core';
import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

const batteryImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAMAAADDpiTIAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABaUExURQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAItJXlEAAAAddFJOUwBAP+/AECAw8GCAkFDP0LCg4L9wn9+Pf69fb0/MO2WCQgAAAAlwSFlzAAAOwwAADsMBx2+oZAAAB6BJREFUeNrt3e2WmjgAgOE6gAKiwuhMZ9vN/d/m/uk5+2PB4UNcEp/3AtpCHkMSPPbHD0mSJEmSJEmKscNupQ7u7fbbHz/CanXHvTu87Y5h5Y7u8YYrTmH1zoX7vNmeMP4hnN3nrfYZnpKnwFbXf+FJWQlus9uzALTu9Sb7eBaAzr3e5PlPeFpOhLbY2/MA7NxtAASAABAAAkAACAABIAAEgADQVgAs/VMBAAAAAAAAAAAAAAAAAAAAAAAAAASAABAAAkAACAABIAAEgAAQAAJAK1TsrnVdX/L/du4dq2xh/b8U1/PXX+q6vu78iOCaY98c87D58mNDwQrtr6cQTfnVL8k9tuoSIutSGbWHTf11FiKsrD0KXnj4EXhQzUeIuK4xgsuWfu8h8nLLwSVrvyxEX2k1OPvpfwtJ1FoJzOpwCol09tvCc8Y/C8lUEjC5XULjH0Lp9dHU5V9ILEvBl53/PQWMPwETj38SHP8QSkdCYzuFJPMfDo7sMySa/3Bw3OufkGxeDY05AM7SBVA6FH7IA6DvO5n/9nfXZavUdff/4pOHwCN2gN991eq64e3U/vrdV9fsBRftALpq83NoUd39BktuhO/3++7wR3KM/WEdOLs73wCK6At2tSlgZrtE3qcdhicB7wVnTQDnyDZQxckUMGcVncr43xPglcBwP5MZ/zsCauM82EdK79GG3ml2xnnqIVCkW6fGYdBjngBtrNdz8wyY1imxNygD77XsA4buV3IfmIEpzTvB/n4n9wp1YApwHDzl89LGfEk3i4AJfaV3dNq/r7kY6956z4HLBE82rAL7S/HT0v8MMNbjAUT+vPwFwOjeUnx7+uaV8MJ7Ffm7swKAhQCSfK4BAIAAEAACQAAIAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAABIAAEgAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAEAACQAAIAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAABIAAEgAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAEAACQAAIAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArwkg8nt1AGDhvWpSVH0w2qNnyzrua/qZ5HNtpbK+e5XHfU3vfddUGuvxNysU6c1qubHu7bP3blUxX9JfvZd0NNa9/Urv4/LVe0lXYz1hGxDznmkfbAIWrwLDJd4LugVrwOUTZrxTwC6kJvp/WQSELtbrOQVLgEc8MmNdNX8OXM7eSE87CYh0K1gNXIxTgKnb5jiXAYcsJc1PqhgCUO6SGf+yMM5T900Rfm6qofEPrVGesQyMbSV4HL4OS8CZU0DoonkM7E7DV2ECmD0FhJBHQWDf3rsGE8DMzfMfAtXGl1BF9X73ArwI/PYOZuF+ed1sdCI4NHX+zT/eFmDBWUAKOQMY0Xu64+8QcNQiKkt1/EsrwFE1qQJojO0jdgLRZgcwuq8Ux9/3QCbsBU/pjf/ZDvClBRj/1xZg/F9bgPGfISChA6GL8Z/T0f7v1U+EkjgTLJ3/zD8VTuAxkDv/XVIV+SRQev+3dC3YRv30t/p7wHMgWgKt2f+VCRj+Rz4IqsiWg5v/8mKE08D1EsmCsLxcffjX6VC3+aYVlHl79fsfa7fbbMZGkiRJkiRJ0ib7B8eds77jeQ3zAAAAAElFTkSuQmCC';

@Component({
  tag: 'mindlife-battery',
  styleUrl: 'mindlife-battery.css',
  shadow: true,
})
export class mindlifeBattery {
  @Prop() value: number = 30;
  @Watch('value')
  watchValueHandler(newValue: number) {
    this.slider && this.slider.noUiSlider.set(newValue);
  }

  @Prop() animatedHint: boolean;
  @Prop() disabled: boolean;
  @Prop() colorSteps: number = 1;
  @Watch('disabled')
  watchDisabledHandler(newValue: boolean) {
    if (newValue) {
      this.slider && this.slider.setAttribute('disabled', newValue);
    } else {
      this.slider && this.slider.removeAttribute('disabled');
    }
  }

  @Event({
    eventName: 'mindlife-battery-value',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  mindlifeSliderMoved: EventEmitter;

  @Element() private el: HTMLElement;

  @State() numFillRect = [];
  @State() percentValue;
  @State() colorIndex;
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
    this.percentValue = Number(Math.round(Number(event[0])).toFixed(0));
    this.mindlifeSliderMoved.emit(this.percentValue);
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
        setTimeout(() => {
          this.slider.noUiSlider.set(k * 10);
        }, (10 - k) * 50);
      }
    }
  }

  render() {
    return [
      <div class="container">
        <img class="battery-img" src={batteryImage}></img>
        <div class={`slider ${this.disabled && 'slider-disabled'}`}></div>
        <div class="fill-rect-container">
          {this.numFillRect.map((value, index) => (
            <div class={`fill-rect fill-rect-color-${this.colorSteps !== 0 ? (index -  index % this.colorSteps) : value - 1 }`} style={{ bottom: `${index * 10}%` }}></div>
          ))}
        </div>
      </div>,
    ];
  }
}
