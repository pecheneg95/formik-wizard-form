'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _StepTabs = require('./StepTabs');

var _StepTabs2 = _interopRequireDefault(_StepTabs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Wizard = function (_React$Component) {
  _inherits(Wizard, _React$Component);

  function Wizard(props) {
    _classCallCheck(this, Wizard);

    var _this = _possibleConstructorReturn(this, (Wizard.__proto__ || Object.getPrototypeOf(Wizard)).call(this, props));

    _this.onPreviousStep = function () {
      _this.setState({
        activeStepIndex: _this.state.activeStepIndex - 1
      });
    };

    _this.onNextStep = function () {
      _this.setState({
        activeStepIndex: _this.state.activeStepIndex + 1
      });
    };

    _this.onSubmit = function () {
      console.log('submitted the form');
    };

    _this.updateStepTabs = function (stepTabs) {
      _this.setState({
        stepTabs: stepTabs
      });
    };

    _this.state = {
      activeStepIndex: 0,
      totalSteps: _this.getTotalSteps(props.children),
      stepTabs: []
    };
    return _this;
  }

  _createClass(Wizard, [{
    key: 'getTotalSteps',
    value: function getTotalSteps(children) {
      var totalSteps = 0;
      _react.Children.forEach(children, function (child) {
        if (child.type.displayName === 'StepsList') {
          totalSteps = child.props.children.length - 1;
        }
      });
      return totalSteps;
    }
  }, {
    key: 'getInitialComponents',
    value: function getInitialComponents() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          props = _objectWithoutProperties(_props, ['children']);

      var validators = [];

      return _react.Children.map(children, function (child) {
        if (child.type.displayName === 'StepsList') {
          if (child.props.validators) {
            // eslint-disable-next-line prefer-destructuring
            validators = child.props.validators;
          }
          return (0, _react.cloneElement)(child, _extends({
            activeStepIndex: _this2.state.activeStepIndex,
            updateStepTabs: _this2.updateStepTabs
          }, props));
        }
        return (0, _react.cloneElement)(child, _extends({
          activeStepIndex: _this2.state.activeStepIndex,
          totalSteps: _this2.state.totalSteps,
          onSubmit: _this2.onSubmit,
          onNextStep: _this2.onNextStep,
          onPreviousStep: _this2.onPreviousStep,
          validators: validators
        }, props));
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var className = this.props.className;

      var childrenWithProps = this.getInitialComponents();
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('react-formik-wizard', _defineProperty({}, className, !!className))
        },
        _react2.default.createElement(_StepTabs2.default, {
          tabs: this.state.stepTabs,
          activeStepIndex: this.state.activeStepIndex
        }),
        childrenWithProps
      );
    }
  }]);

  return Wizard;
}(_react2.default.Component);

Wizard.propTypes = {
  className: _propTypes2.default.string,
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node])
};

Wizard.displayName = 'Wizard';

exports.default = Wizard;