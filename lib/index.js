"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceFormat = void 0;
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var classnames_1 = __importDefault(require("classnames"));
var lodash_1 = __importStar(require("lodash"));
var react_1 = __importStar(require("react"));
require("../style/index.scss");
/** 将dataSource转成统一的分组形式 */
function dataSourceFormat(dataSource) {
    var _a;
    return ((_a = dataSource[0]) === null || _a === void 0 ? void 0 : _a.list)
        ? dataSource
        : [{ list: dataSource }];
}
exports.dataSourceFormat = dataSourceFormat;
/** 借鉴jira选择器的多功能选择器 */
var UltraSelector = /** @class */ (function (_super) {
    __extends(UltraSelector, _super);
    function UltraSelector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            selectorId: Math.random(),
            optionsVisible: false,
            dataSource: [],
            selected: [],
            keywords: "",
            noSearchData: false
        };
        _this.getContent = function () {
            var _a, _b;
            if ((_a = _this.state.selected) === null || _a === void 0 ? void 0 : _a.length)
                return (_b = _this.state.selected) === null || _b === void 0 ? void 0 : _b.map(function (e) { return e.label; }).join(",");
            else if (!((0, lodash_1.isUndefined)(_this.props.placeholder) || (0, lodash_1.isNull)(_this.props.placeholder)))
                return _this.props.placeholder;
            else
                return "全部";
        };
        return _this;
    }
    UltraSelector.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.props.request) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.props.request()];
                    case 1:
                        data = _a.sent();
                        this.initDataSource(data);
                        return [3 /*break*/, 3];
                    case 2:
                        this.initDataSource(this.props.dataSource);
                        _a.label = 3;
                    case 3:
                        this.initClickListener();
                        return [2 /*return*/];
                }
            });
        });
    };
    UltraSelector.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _a, _b;
        if (!lodash_1.default.isEqual(prevProps.dataSource, this.props.dataSource)) {
            this.initDataSource(this.props.dataSource);
        }
        if (!lodash_1.default.isEqual(prevState.keywords, this.state.keywords)) {
            this.onSearch();
        }
        if (!lodash_1.default.isEqual(prevState.selected, this.state.selected)) {
            (_b = (_a = this.props).onSelected) === null || _b === void 0 ? void 0 : _b.call(_a, this.state.selected);
        }
        if (!lodash_1.default.isEqual(prevProps.defaultValue, this.props.defaultValue)) {
            this.setDefaultChecked();
        }
    };
    /** 初始化点击监听事件 */
    UltraSelector.prototype.initClickListener = function () {
        var _this = this;
        document.addEventListener("click", function (e) {
            if (e.cancelBubble)
                return;
            if (_this.state.optionsVisible) {
                // 关闭
                _this.setState({ optionsVisible: false });
            }
            else if (
            // @ts-ignore
            e.target.offsetParent &&
                // @ts-ignore
                e.target.offsetParent.className.indexOf(_this.state.selectorId) !== -1 &&
                !_this.state.optionsVisible) {
                // 打开
                _this.setState({ optionsVisible: true, keywords: "" });
            }
        });
    };
    /** 初始化dataSource */
    UltraSelector.prototype.initDataSource = function (dataSource) {
        var _this = this;
        this.setState({ dataSource: dataSourceFormat(dataSource !== null && dataSource !== void 0 ? dataSource : []) }, function () {
            if (_this.props.defaultValue !== undefined &&
                _this.props.defaultValue !== null) {
                _this.setDefaultChecked();
            }
            else {
                _this.setSelected();
            }
        });
    };
    /** 根据defaultValue设置默认选中项 */
    UltraSelector.prototype.setDefaultChecked = function () {
        var _this = this;
        var defaultValue = Array.isArray(this.props.defaultValue)
            ? this.props.defaultValue.join(",").split(",")
            : String(this.props.defaultValue).split(",");
        var dataSource = __spreadArray([], this.state.dataSource, true).map(function (group) {
            var _a;
            var tempGroupList = group.list;
            /** 保存原来的值---删除或者禁用或者离职 */
            (_a = _this.props.originData) === null || _a === void 0 ? void 0 : _a.map(function (item) {
                var _a;
                if (item.id && !group.list.find(function (v) { return v.value === item.id; })) {
                    tempGroupList = tempGroupList.concat({
                        value: item.id,
                        label: (_a = item.name) !== null && _a !== void 0 ? _a : ""
                    });
                }
            });
            group.list = tempGroupList.map(function (option) {
                option.checked = defaultValue.includes(String(option.value));
                return option;
            });
            return group;
        });
        this.setState({ dataSource: dataSource }, this.setSelected);
    };
    /** 设置当前选中项 */
    UltraSelector.prototype.setSelected = function () {
        var selected = [];
        this.state.dataSource.forEach(function (group) {
            group.list.forEach(function (option) {
                option.checked &&
                    selected.push({ value: option.value, label: option.label });
            });
        });
        this.setState({ selected: selected });
    };
    UltraSelector.prototype.onChange = function (e) {
        var _this = this;
        var dataSource = __spreadArray([], this.state.dataSource, true).map(function (group) {
            group.list = group.list.map(function (option) {
                if (_this.props.mode === "radio")
                    option.checked = false;
                if (option.value === e.target.value) {
                    option.checked = e.target.checked;
                }
                return option;
            });
            return group;
        });
        this.setState({ dataSource: dataSource, optionsVisible: this.props.mode !== "radio" }, this.setSelected);
    };
    /** 清除全部选择项 */
    UltraSelector.prototype.onClear = function () {
        var dataSource = __spreadArray([], this.state.dataSource, true).map(function (group) {
            group.list = group.list.map(function (option) {
                option.checked = false;
                return option;
            });
            return group;
        });
        this.setState({ dataSource: dataSource, optionsVisible: this.props.mode !== "radio" }, this.setSelected);
    };
    /** 点击分组标题，修改名下所有项 */
    UltraSelector.prototype.onClickTitle = function (title) {
        if (this.props.mode === "radio")
            return;
        var dataSource = __spreadArray([], this.state.dataSource, true).map(function (group) {
            if (group.title === title) {
                var checked_1 = group.list.some(function (e) { return !e.checked; });
                group.list = group.list.map(function (option) {
                    option.checked = checked_1;
                    return option;
                });
            }
            return group;
        });
        this.setState({ dataSource: dataSource }, this.setSelected);
    };
    UltraSelector.prototype.onSearch = function () {
        var _this = this;
        var noSearchData = true;
        var dataSource = __spreadArray([], this.state.dataSource, true).map(function (group) {
            group.list = group.list.map(function (option) {
                option.hidden =
                    option.label
                        .toLowerCase()
                        .indexOf(_this.state.keywords.toLowerCase()) === -1;
                if (!option.hidden && noSearchData)
                    noSearchData = false;
                return option;
            });
            return group;
        });
        this.setState({ dataSource: dataSource, noSearchData: noSearchData });
    };
    UltraSelector.prototype.render = function () {
        var _this = this;
        var disabled = this.props.disabled;
        return (react_1.default.createElement("div", { className: (0, classnames_1.default)("ultra-seletor", this.state.selectorId) },
            react_1.default.createElement("div", { className: (0, classnames_1.default)({
                    active: this.state.optionsVisible,
                    "ultra-seletor-disabled": disabled
                }, "assignee") },
                react_1.default.createElement("div", { className: "criteria-wrap" }, this.getContent()),
                react_1.default.createElement("div", { className: "right" },
                    react_1.default.createElement("div", { className: "suffix" }, this.props.suffix),
                    react_1.default.createElement(icons_1.DownOutlined, { className: "icon" }))),
            this.state.optionsVisible && !disabled && (react_1.default.createElement("div", { className: "box-shadow", onClick: function (e) { return e.stopPropagation(); } },
                this.state.dataSource.reduce(function (total, group) { return total + group.list.length; }, 0) > 3 && (react_1.default.createElement("div", { className: "search-wrap" },
                    react_1.default.createElement(antd_1.Input, { className: "search-input", value: this.state.keywords, onChange: function (e) { return _this.setState({ keywords: e.target.value }); }, autoFocus: true, suffix: this.state.keywords ? (react_1.default.createElement(icons_1.CloseCircleOutlined, { onClick: function () { return _this.setState({ keywords: "" }); } })) : (react_1.default.createElement(icons_1.SearchOutlined, null)), placeholder: "\u67E5\u627E" }))),
                react_1.default.createElement("div", { className: "context-wrap" }, this.state.noSearchData ? (react_1.default.createElement("div", { className: "no-suggestion" }, "\u6CA1\u6709\u5339\u914D\u7684")) : (__spreadArray([
                    (!!this.state.selected.length || this.props.clearText) && (react_1.default.createElement("a", { className: "clear-selected", onClick: function () { return _this.onClear(); } }, this.props.clearText || "清除选择的内容"))
                ], this.state.dataSource.map(function (group, groupIdx) { return (react_1.default.createElement("div", { key: groupIdx, className: (0, classnames_1.default)("group-wrap", {
                        radio: _this.props.mode === "radio"
                    }) },
                    !!group.title && group.list.some(function (e) { return !e.hidden; }) && (react_1.default.createElement("div", { className: "group-title", onClick: function () { return _this.onClickTitle(group.title); } }, group.title)),
                    react_1.default.createElement("div", { className: "group-list" }, group.list.map(function (option, optionIdx) {
                        return !option.hidden && (react_1.default.createElement("div", { className: "checkbox-wrap", title: option.label, key: optionIdx },
                            react_1.default.createElement(antd_1.Checkbox, { value: option.value, checked: option.checked, onChange: function (e) { return _this.onChange(e); } }, option.render || option.label)));
                    })))); }), true)))))));
    };
    return UltraSelector;
}(react_1.Component));
exports.default = UltraSelector;
