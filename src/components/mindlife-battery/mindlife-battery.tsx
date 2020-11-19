import { Component, h, Element, Prop, State, Event, EventEmitter, Watch } from '@stencil/core';
import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

const batteryImage =
  'data:image/png;base64,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';
const containerImage =
  'data:image/png;base64,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QCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAcLT3ly20eW/ZwiEEAKd6tmy39vayhTZvLdut/bJs4X8SAJzqh2W7Nd+CaDXr6teszyo3RgDwEDO+WbgFQKsZ+/6sK3VAuW/G/Dph3Aag0dpn4dz5dgycxBUAHmLWpcUPly20+HjZbs3lf04mAHiIn5ft1j5ZttBiVvTO+owC5bJgb+2y4xZjLQAt3h2z9hnYYiyqBaZ5OmbtwHPuPBkDDR6PWfsMnDse/wOm+mrM2sFni3EVgFuXfXxt399iRDQPYg0ADzVzlfEXyxZu1WfLdgZPAABTzbx/mfnHGLhFOfmv7fNbTT6bAFPNeh/A8/FUALcm+/Tavr7V+PYP7CLPMK8dhLYc6wG4FVmZP2vx7PMRzcAu8ua+tYPQlpMVzSKAa7fHyT+fFW/TBHYz61GmF8c3G65V9t3ZJ/+MxbPArmYvBvztWBjItck+u7YvzxiL/4Dd7XUVIJNXnLolwKXLPvr9mLV9eMb49g8cYs+rAM8nq52FAJcmn4WcjNf22Znj2z9wmNnPNr9sEgK5x2rxE0fJvpd9cPZjsS8bt8Y4y+vLFl5VDoI/LdujfDcmQZA/hZoV0Z6JZoas6M837mxzFerRmKM8G5P/L97/zysTAGwh7wVwLxL289cxPnOcRQCwlVwGdW8e5ssVL581ziYA2EouR2b1s3vyME8u/ecWRJ6KgbP4a4BsJQekXJYE5smiQyd/NvHmsoUt/HtMrgD86e43YEufj7Hyn824BcAMX4358P5HYANfj/GZYlMCgBlyFSCLAnOvEjjPj2Oy6M8jf2xKADCLCIDzOfkzjQBgJhEAr87Jn6kEALOJAHg4J3+m8xggs+UA9ucxXs8Lp8mCPyd/pvMYIHv4z5h/jnlnjEcE4eXyqF+e9c9nBqZyC4C95VGmx2NyawC4lzf85cT/5O432IEA4Ah5bXAiIJc5oV3e7e8Nf0CVHPSejln7W+fG3PrkHn8+AwCVcisgf9Z07QBpzK1OXunrNhjAkNsCQsDc+mQfz74OwAuEgLnFceLn4lgEyKXK5dE8MfDxGIsFuUZZ3JcTf1b2e6afiyMAuAb55pQYSAg8GuPeKZcoj/LlhVeZnPSt6ueiCQCuUV4rnCBIGGT+OEYUsKec7H8Yk5N8tjnpZwtXQwBwS9wqYA9eaw0AAAAAAAAAAAAAAAAAAAAAAAAAwIO89tp/AbuGBAAiQ1TOAAAAAElFTkSuQmCC';

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
  @Prop() singleColor: boolean = true;
  @Prop() reversed: boolean = false;
  @Prop() container: string = 'battery';
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
  private containerImage;


  componentWillLoad() {
    this.containerImage = this.container === 'container' ? containerImage : batteryImage;
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
    let IntFromFloat = Math.floor(Number(event[0]) / 10);
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
        <img class="battery-img" src={this.containerImage}></img>
        <div class={`slider ${this.disabled && 'slider-disabled'}`}></div>
        <div class="fill-rect-container">
          {this.numFillRect.map((value, index) => (
            <div
              class={`fill-rect fill-rect-color-${
                !this.singleColor
                  ? (this.reversed ? 11 - index : index) - (this.reversed ? 11 - (index % this.colorSteps) : index % this.colorSteps)
                  : (this.reversed ? 11 - value : value) - 1 - (((this.reversed ? 11 - value : value) - 1) % this.colorSteps)
              }`}
              style={{ bottom: `${index * 10}%` }}
            ></div>
          ))}
        </div>
      </div>,
    ];
  }
}
