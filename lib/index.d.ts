import { CheckboxChangeEvent } from "antd/es/checkbox";
import { Component, ReactNode } from "react";
import "../style/index.scss";
export interface Option {
    value: string | number;
    label: string;
    render?: ReactNode;
    /** 如果传了defaultValue，设置此值无效 */
    checked?: boolean;
    hidden?: boolean;
    extra?: any;
}
/** 分组 */
export interface Group {
    title?: string;
    list: Option[];
}
export declare type Mode = "radio" | "multi";
interface UltraSelectorProps {
    dataSource?: Option[] | Group[];
    onSelected?: (selected: Option[]) => void;
    defaultValue?: string[] | number[] | number | string;
    request?: () => Promise<Option[] | Group[]>;
    placeholder?: string;
    clearText?: string;
    /** 单选/多选，默认多选 */
    mode?: Mode;
    suffix?: string | ReactNode;
    disabled?: boolean;
    originData?: Array<{
        id: string;
        name: string;
    }>;
}
interface UltraSelectorState {
    selectorId: number;
    optionsVisible: boolean;
    dataSource: Group[];
    /** 选中项 */
    selected: Option[];
    keywords: string;
    /** 搜索没有匹配 */
    noSearchData: boolean;
}
/** 将dataSource转成统一的分组形式 */
export declare function dataSourceFormat(dataSource: Option[] | Group[]): Group[];
/** 借鉴jira选择器的多功能选择器 */
export default class UltraSelector extends Component<UltraSelectorProps, UltraSelectorState> {
    state: UltraSelectorState;
    componentDidMount(): Promise<void>;
    componentDidUpdate(prevProps: UltraSelectorProps, prevState: UltraSelectorState): void;
    /** 初始化点击监听事件 */
    initClickListener(): void;
    /** 初始化dataSource */
    initDataSource(dataSource?: Option[] | Group[]): void;
    /** 根据defaultValue设置默认选中项 */
    setDefaultChecked(): void;
    /** 设置当前选中项 */
    setSelected(): void;
    onChange(e: CheckboxChangeEvent): void;
    /** 清除全部选择项 */
    onClear(): void;
    /** 点击分组标题，修改名下所有项 */
    onClickTitle(title: string): void;
    onSearch(): void;
    getContent: () => any;
    render(): any;
}
export {};
