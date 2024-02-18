import type { Color } from "./Color";
import type { IconProps } from "./Icon";

export type BannerGroupProps = {
    readonly type: 'editableControl' | 'editableField'
    readonly content: string | number,
    readonly designation?: string,
    readonly contentType: "text" | "number";
    readonly maxLength?: string
    readonly color: Color;
    readonly isEditable: boolean;
    readonly onBlur?: Function;
}

export type BannerProps = {
    readonly headerContent: string;
    readonly icons: Array<IconProps & { isVisible: boolean }>
    readonly groups: Array<BannerGroupProps>
    readonly color: Color;
    readonly isEditable: boolean;
    readonly onBlur?: Function;
}