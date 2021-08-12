import { Component, h, Element, Prop, State, Event, EventEmitter, Watch } from '@stencil/core';
import * as noUiSlider from 'nouislider';

// import('nouislider/distribute/nouislider.css')
// declare var noUiSlider

// import 'nouislider/distribute/nouislider.css';

const batteryImage =
  'data:image/png;base64,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';
const containerImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOwAAAIACAYAAACByoDEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAtGSURBVHhe7d0/khzlHcZxYVJXAVUOHHIDEzpDPoFxpgx8A9/AvgHmBECmDMicASdAZM7gBojMGe5nt5eSlp7d+dPvzDwzn0/Vr2blQkJ4+6t+++2e0RMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4zBvz6zl6e5r35snXd+7/+CDPnj17f/5yVc+fP385f3l1pv9PV/v+3Df9//rt/OUa8j16cfvljbsfZ87y+3cuweYb/HSeBDkkIthR/nBIvN/Mc/KITxnsu9N8MM2H0yRSOHcJ+Mt5fsz/cGynCPajaRLqX29+BJ2+mibhfnbzowuTJe+/pvlpml+MuaDJMjnH9rDr9mMSqrmWqQ83y94fpln6jzPmUifXtjn2hxhxDZvNpE+nyY4vXKtsUGW/ZtXNqd/Nr2vJb/C7acTKtcutydwSShNnJ+v2nFWXlgjGXPtkJ3mVa9s1lsS5h5pY3UuFzb6fJmfbV5+s2tmhwSbSr6e5iC1tGOznaXK5uHe0h1zD5l8sVtjeW9PkEce993j2DTandrHC7hJt2tlrM2qfJbFlMBxur+XxrsGKFdazc7S7BJsHInKPVaywnkSbE+FWD1jsEmxidesG1pdbPlu19eb8+piPpxn2fCRcuT9O8840/7n50QO2OcMm1C9uvwQG+ts0eY/tRo8Fm+vVvOPGdSuMl+vZ7BVt/Ciax4LNUvgft1+eXNb5p/hMnd9P84fbL2/uobG+HKiR7+8pvsf5vp7L/swn0+zVXP4Dlh5kPtZkaZDfuI0ujiVntxxzOfaWjsljzV7HfHaFl36xkZOt7TwBYgnOqeUYzLF4ig9hyOOLO8kHpC39QqPmLlQ4R6cId6e7MnmaaekXGTEX8wFWXLwcq0vH8IjZ+iybR6WWfoG1J5sLe79rAU4k15fHOttu1ccxzq55dtJZlVY5do+xx/PoWTa7ZEs/cc0RK5fgWNGmyY3+Oc3ST1prxMolOUa0uW7eaOTaPNesD/5pAYVyTI/8oPyN7+IZ/aCENw9wqXJsLx3za83igxQjl8MX+RcGwStGfszv4rJ41Fo8S2HXrVy6HOOjlsa/2S3Ov2zpH1xjHrxohgsycpX62klv1KOIzq5ck5Fn2Zs9oLuPOR31jpi86+EUb5eCU8ix/uAb0A9w0+joYG02cW3yftYRXgt2xLI1b0re+W1CUC4PB636V0zOXmt0ac186IxaGsC5G3WL56C/W+cxW384MlyYYcd+gs1fPDuC5TDXalSwT0eeYUes46FBPjBwCMHC+obdyhwZLLAywUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUIRwUKRkcE+nV/h2rw3v64uwf58++Xq3p5f4dq8Nb+u7WWCfXH79eqG/SkDZ27U6vLF3ZL45fy6JktirtWIY/+1lfDX0/wyYCyLuUZLLRw630zz66bTqGXxB/MrXIsP59e13TR6F+yP8+vaPppf4VqMOkm91mg2iJZOw2uMa1muxbvTLDWwxvxmE/enaZb+wUPny2ngGnw6zVIDh87ipvAX0yz9w2uMsyyXLsf40rG/xvx60ru7ho2bXahBPptf4VJ9PL+OsNjmyPV35t/TwCVKrEvH/FqTNheNuh97N3aNuTQ5ppeO9bXmwZVv7iEt/aQ1x/UslyI7t6M2a+/mwZNcnkxa+klrTna8REu7Y8SaVh59WnDU1vT9sTymVY7d0bFmttqsHb359OrYiKJNjtmlY3nEbNxsuu9YZ9lMHrmyRObc5Rj9bpqlY3jE7HQr9Jhn2bvJbphwOTdpIfEsHbMjZ+uz653R95Y2TcLNNYK35nEqOfZyDI6+zblpNl4qvjG/Lslv+of59VS+nSYB561F2TF78J4U7Ck7vjmj5TWrvPenOZW8UT2/l8Xnhx8KNnJf1mOFcDx/n2Zjc48FG1kWuLaE8bKifLC1bYLN6Tm7Y64pYZwshbMkf/DDJF59t84m+QVymgbGySbXo5/88ub8+pj/TpMz7J9vfgSs6ZNptnqIaJsl8avyJncfrAbr+WqarZvaNdicZbMJlbU2cJjvp8km0+ItnCW7BhuihcPtHGvsE2yIFva3V6yxb7AhWtjd3rHGNrd1Nsm/8C/TeFwQtpMNpr1jjW1v62zyv2k+n+adadzygc1y6yb3WtPM3g5ZEt+Xrem8jzZLZeBWnmBKqKt8oP6awUYeY0y0Oe3DtcuzwVs9wXRq+U0e4zNvjDnHyTVqGqiSpfEp3qlvzCknjxhWXxZmmSxcc+mTYzzH+sUQrrnEOWqoa286bSPLhewo59MsbE7RKJtJCTU7v3vfU93HKYJ9Vf5kSrwJN5+j45YQ5yi3ZvKAUCaRnmzX99TB3pfHHBNwQs78aRoRc0yJMx/6lyjzevchgGfh3ILdxNKZY/CYLQAAAAAAAAAAwIGePPk/fJQEABCNCgsAAAAASUVORK5CYII=';

@Component({
  tag: 'mindlife-battery',
  styleUrls: ['mindlife-battery.css'],
  shadow: true,
})
export class mindlifeBattery {
  @Prop() value: number;
  @Watch('value')
  watchValueHandler(newValue: number) {
    this.slider && this.slider.noUiSlider.set(newValue);
  }

  @Prop() animatedHint: boolean;
  @Prop() disabled: boolean;
  @Prop() colorSteps: number = 1;
  @Prop() singleColor: boolean = false;
  @Prop() reversed: boolean = false;
  @Prop() container: string;
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

    console.log('value', this.value)
    this.containerImage = this.container === 'container' ? containerImage : batteryImage;
    this.numFillRect = new Array(this.value).fill(this.value);

    this.percentValue = this.value;
  }

  componentDidLoad() {

    this.slider = this.el.shadowRoot.querySelector('div.slider');

    this.slider.querySelectorAll('div.slider').forEach((child)=>{
      child.classList.add('sc-mindlife-battery')
    })

    this.disabled && this.slider.setAttribute('disabled', true);

    noUiSlider.create(this.slider, {
      start:this.percentValue,
      direction: 'rtl',
      orientation: 'vertical',
      range: {
        min: 0,
        max: 100,
      },
      keyboardSupport: true, // Default true
      keyboardDefaultStep: 10, // Default 10
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
