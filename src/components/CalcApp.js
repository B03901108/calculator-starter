import React from 'react';

import CalcButton from './CalcButton';
// 計算機 App
class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO
      stateStack: ['0'],
      showNum: '0',
    };
    this.resetState = this.resetState.bind(this);
    this.optrClick = this.optrClick.bind(this);
    this.numClick = this.numClick.bind(this);
  }

  resetState() {
    // TODO
    this.setState({ stateStack: ['0'], showNum: '0' });
  }

  optrClick(optr) {
    const len = this.state.stateStack.length;
    const tmpStack = this.state.stateStack.slice();
    let tmpNum = this.state.showNum;
    if ((len === 1) && (optr !== '=')) tmpStack.push(optr);
    else if (len === 2) {
      if (optr === '=') tmpStack.pop();
      else tmpStack[1] = optr;
    } else if (len === 3) {
      switch (tmpStack[1]) {
        case '+':
          tmpStack[0] = tmpNum = (Number(tmpStack[0]) + Number(tmpStack[2])).toString();
          tmpStack.pop();
          tmpStack.pop();
          break;
        case '-':
          tmpStack[0] = tmpNum = (Number(tmpStack[0]) - Number(tmpStack[2])).toString();
          tmpStack.pop();
          tmpStack.pop();
          break;
        case 'x':
          tmpStack[0] = tmpNum = (Number(tmpStack[0]) * Number(tmpStack[2])).toString();
          tmpStack.pop();
          tmpStack.pop();
          break;
        case '÷':
          tmpStack[0] = tmpNum = (Number(tmpStack[0]) / Number(tmpStack[2])).toString();
          tmpStack.pop();
          tmpStack.pop();
          break;
        default:
      }
      if (optr !== '=') tmpStack.push(optr);
    }
    this.setState({ stateStack: tmpStack, showNum: tmpNum });
  }

  numClick(num) {
    const len = this.state.stateStack.length;
    const tmpStack = this.state.stateStack.slice();
    let tmpNum = this.state.showNum;
    if (len === 2) {
      tmpStack.push(num);
      tmpNum = num;
    } else if (tmpNum === '0') tmpNum = tmpStack[len - 1] = num;
    else {
      tmpNum += num;
      tmpStack[len - 1] = tmpNum;
    }
    this.setState({ stateStack: tmpStack, showNum: tmpNum });
  }

  render() {
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">{this.state.showNum}</div>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.resetState}>AC</CalcButton>
            <CalcButton>+/-</CalcButton>
            <CalcButton>%</CalcButton>
            <CalcButton className="calc-operator" onClick={this.optrClick}>÷</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.numClick}>7</CalcButton>
            <CalcButton className="calc-number" onClick={this.numClick}>8</CalcButton>
            <CalcButton className="calc-number" onClick={this.numClick}>9</CalcButton>
            <CalcButton className="calc-operator" onClick={this.optrClick}>x</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.numClick}>4</CalcButton>
            <CalcButton className="calc-number" onClick={this.numClick}>5</CalcButton>
            <CalcButton className="calc-number" onClick={this.numClick}>6</CalcButton>
            <CalcButton className="calc-operator" onClick={this.optrClick}>-</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.numClick}>1</CalcButton>
            <CalcButton className="calc-number" onClick={this.numClick}>2</CalcButton>
            <CalcButton className="calc-number" onClick={this.numClick}>3</CalcButton>
            <CalcButton className="calc-operator" onClick={this.optrClick}>+</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number bigger-btn" onClick={this.numClick}>0</CalcButton>
            <CalcButton className="calc-number">.</CalcButton>
            <CalcButton className="calc-operator" onClick={this.optrClick}>=</CalcButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CalcApp;
