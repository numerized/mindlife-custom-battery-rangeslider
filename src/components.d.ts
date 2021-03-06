/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface MindlifeBattery {
        "animatedHint": boolean;
        "colorSteps": number;
        "container": string;
        "disabled": boolean;
        "reversed": boolean;
        "singleColor": boolean;
        "value": number;
    }
}
declare global {
    interface HTMLMindlifeBatteryElement extends Components.MindlifeBattery, HTMLStencilElement {
    }
    var HTMLMindlifeBatteryElement: {
        prototype: HTMLMindlifeBatteryElement;
        new (): HTMLMindlifeBatteryElement;
    };
    interface HTMLElementTagNameMap {
        "mindlife-battery": HTMLMindlifeBatteryElement;
    }
}
declare namespace LocalJSX {
    interface MindlifeBattery {
        "animatedHint"?: boolean;
        "colorSteps"?: number;
        "container"?: string;
        "disabled"?: boolean;
        "onMindlife-battery-value"?: (event: CustomEvent<any>) => void;
        "reversed"?: boolean;
        "singleColor"?: boolean;
        "value"?: number;
    }
    interface IntrinsicElements {
        "mindlife-battery": MindlifeBattery;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "mindlife-battery": LocalJSX.MindlifeBattery & JSXBase.HTMLAttributes<HTMLMindlifeBatteryElement>;
        }
    }
}
