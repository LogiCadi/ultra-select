import { Checkbox, Input } from "antd";
import {
  DownOutlined,
  CloseCircleOutlined,
  SearchOutlined
} from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import classNames from "classnames";
import _, { isUndefined, isNull } from "lodash";
import React, { Component, ReactNode } from "react";
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

export type Mode = "radio" | "multi";

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
  originData?: Array<{ id: string; name: string }>;
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
export function dataSourceFormat(dataSource: Option[] | Group[]): Group[] {
  return (dataSource as Group[])[0]?.list
    ? (dataSource as Group[])
    : [{ list: dataSource as Option[] }];
}

/** 借鉴jira选择器的多功能选择器 */
export default class UltraSelector extends Component<
  UltraSelectorProps,
  UltraSelectorState
> {
  state: UltraSelectorState = {
    selectorId: Math.random(),
    optionsVisible: false,
    dataSource: [],
    selected: [],
    keywords: "",
    noSearchData: false
  };

  async componentDidMount() {
    if (this.props.request) {
      const data = await this.props.request();
      this.initDataSource(data);
    } else {
      this.initDataSource(this.props.dataSource);
    }

    this.initClickListener();
  }

  componentDidUpdate(
    prevProps: UltraSelectorProps,
    prevState: UltraSelectorState
  ) {
    if (!_.isEqual(prevProps.dataSource, this.props.dataSource)) {
      this.initDataSource(this.props.dataSource);
    }
    if (!_.isEqual(prevState.keywords, this.state.keywords)) {
      this.onSearch();
    }
    if (!_.isEqual(prevState.selected, this.state.selected)) {
      this.props.onSelected?.(this.state.selected);
    }
    if (!_.isEqual(prevProps.defaultValue, this.props.defaultValue)) {
      this.setDefaultChecked();
    }
  }

  /** 初始化点击监听事件 */
  initClickListener() {
    document.addEventListener("click", (e) => {
      if (e.cancelBubble) return;

      if (this.state.optionsVisible) {
        // 关闭
        this.setState({ optionsVisible: false });
      } else if (
        // @ts-ignore
        e.target.offsetParent &&
        // @ts-ignore
        e.target.offsetParent.className.indexOf(this.state.selectorId) !== -1 &&
        !this.state.optionsVisible
      ) {
        // 打开
        this.setState({ optionsVisible: true, keywords: "" });
      }
    });
  }

  /** 初始化dataSource */
  initDataSource(dataSource?: Option[] | Group[]) {
    this.setState({ dataSource: dataSourceFormat(dataSource ?? []) }, () => {
      if (
        this.props.defaultValue !== undefined &&
        this.props.defaultValue !== null
      ) {
        this.setDefaultChecked();
      } else {
        this.setSelected();
      }
    });
  }

  /** 根据defaultValue设置默认选中项 */
  setDefaultChecked() {
    const defaultValue: string[] = Array.isArray(this.props.defaultValue)
      ? this.props.defaultValue.join(",").split(",")
      : String(this.props.defaultValue).split(",");

    const dataSource = [...this.state.dataSource].map((group) => {
      let tempGroupList = group.list;
      /** 保存原来的值---删除或者禁用或者离职 */
      this.props.originData?.map((item) => {
        if (item.id && !group.list.find((v) => v.value === item.id)) {
          tempGroupList = tempGroupList.concat({
            value: item.id,
            label: item.name ?? ""
          });
        }
      });
      group.list = tempGroupList.map((option) => {
        option.checked = defaultValue.includes(String(option.value));
        return option;
      });
      return group;
    });

    this.setState({ dataSource }, this.setSelected);
  }

  /** 设置当前选中项 */
  setSelected() {
    let selected: Option[] = [];
    this.state.dataSource.forEach((group) => {
      group.list.forEach((option) => {
        option.checked &&
          selected.push({ value: option.value, label: option.label });
      });
    });
    this.setState({ selected });
  }

  onChange(e: CheckboxChangeEvent) {
    const dataSource = [...this.state.dataSource].map((group) => {
      group.list = group.list.map((option) => {
        if (this.props.mode === "radio") option.checked = false;
        if (option.value === e.target.value) {
          option.checked = e.target.checked;
        }

        return option;
      });
      return group;
    });

    this.setState(
      { dataSource, optionsVisible: this.props.mode !== "radio" },
      this.setSelected
    );
  }

  /** 清除全部选择项 */
  onClear() {
    const dataSource = [...this.state.dataSource].map((group) => {
      group.list = group.list.map((option) => {
        option.checked = false;
        return option;
      });
      return group;
    });

    this.setState(
      { dataSource, optionsVisible: this.props.mode !== "radio" },
      this.setSelected
    );
  }

  /** 点击分组标题，修改名下所有项 */
  onClickTitle(title: string) {
    if (this.props.mode === "radio") return;
    const dataSource = [...this.state.dataSource].map((group) => {
      if (group.title === title) {
        const checked = group.list.some((e) => !e.checked);
        group.list = group.list.map((option) => {
          option.checked = checked;
          return option;
        });
      }
      return group;
    });

    this.setState({ dataSource }, this.setSelected);
  }

  onSearch() {
    let noSearchData = true;
    const dataSource = [...this.state.dataSource].map((group) => {
      group.list = group.list.map((option) => {
        option.hidden =
          option.label
            .toLowerCase()
            .indexOf(this.state.keywords.toLowerCase()) === -1;
        if (!option.hidden && noSearchData) noSearchData = false;
        return option;
      });
      return group;
    });

    this.setState({ dataSource, noSearchData });
  }

  getContent = () => {
    if (this.state.selected?.length)
      return this.state.selected?.map((e) => e.label).join(",");
    else if (
      !(isUndefined(this.props.placeholder) || isNull(this.props.placeholder))
    )
      return this.props.placeholder;
    else return "全部";
  };

  render() {
    const { disabled } = this.props;
    return (
      <div className={classNames("ultra-seletor", this.state.selectorId)}>
        <div
          className={classNames(
            {
              active: this.state.optionsVisible,
              "ultra-seletor-disabled": disabled
            },
            "assignee"
          )}
        >
          <div className="criteria-wrap">{this.getContent()}</div>
          <div className="right">
            <div className="suffix">{this.props.suffix}</div>
            <DownOutlined className="icon" />
          </div>
        </div>

        {this.state.optionsVisible && !disabled && (
          <div className="box-shadow" onClick={(e) => e.stopPropagation()}>
            {this.state.dataSource.reduce(
              (total, group) => total + group.list.length,
              0
            ) > 3 && (
              <div className="search-wrap">
                <Input
                  className="search-input"
                  value={this.state.keywords}
                  onChange={(e) => this.setState({ keywords: e.target.value })}
                  autoFocus
                  suffix={
                    this.state.keywords ? (
                      <CloseCircleOutlined
                        onClick={() => this.setState({ keywords: "" })}
                      />
                    ) : (
                      <SearchOutlined />
                    )
                  }
                  placeholder="查找"
                />
              </div>
            )}

            {/* modal主弹窗内容 */}
            <div className="context-wrap">
              {this.state.noSearchData ? (
                <div className="no-suggestion">没有匹配的</div>
              ) : (
                [
                  (!!this.state.selected.length || this.props.clearText) && (
                    <a
                      className="clear-selected"
                      onClick={() => this.onClear()}
                    >
                      {this.props.clearText || "清除选择的内容"}
                    </a>
                  ),
                  ...this.state.dataSource.map((group, groupIdx) => (
                    <div
                      key={groupIdx}
                      className={classNames("group-wrap", {
                        radio: this.props.mode === "radio"
                      })}
                    >
                      {!!group.title && group.list.some((e) => !e.hidden) && (
                        <div
                          className="group-title"
                          onClick={() => this.onClickTitle(group.title!)}
                        >
                          {group.title}
                        </div>
                      )}

                      <div className="group-list">
                        {group.list.map(
                          (option, optionIdx) =>
                            !option.hidden && (
                              <div
                                className="checkbox-wrap"
                                title={option.label}
                                key={optionIdx}
                              >
                                <Checkbox
                                  value={option.value}
                                  checked={option.checked}
                                  onChange={(e) => this.onChange(e)}
                                >
                                  {option.render || option.label}
                                </Checkbox>
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  ))
                ]
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
