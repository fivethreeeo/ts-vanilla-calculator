import "./style.css";

type InputType = string | null;
type OperatorType = "+" | "-" | "÷" | "×" | "=" | null;
type AnswerType = string | null;

let isClear: boolean;
let input1: InputType;
let input2: InputType;
let operator: OperatorType;
let answer: AnswerType;

const element = {
  view: document.querySelector("#result") as HTMLDivElement,
  numberBtns: document.querySelector(".numbers") as HTMLElement,
  operatorBtns: document.querySelector(".operators") as HTMLElement,
  acBtn: document.querySelector(".ac") as HTMLElement,
} as const;

const setClear = (value: boolean) => (isClear = value);
const setInput1 = (value: InputType) => (input1 = String(Number(value)));
const setInput2 = (value: InputType) => {
  if (value === null) {
    input2 = null;
    return;
  }
  input2 = String(Number(value));
};

const setOperator = (value: OperatorType) => (operator = value);
const setAnswer = (value: AnswerType) => (answer = value);

const calculate = (
  input1: InputType,
  input2: InputType,
  operator: OperatorType
): number => {
  const [number1, number2] = [Number(input1), Number(input2)];
  switch (operator) {
    case "+":
      return number1 + number2;
    case "-":
      return number1 - number2;
    case "×":
      return number1 * number2;
    case "÷":
      return number1 / number2;
    default:
      return 0;
  }
};

const renderView = (value: string | null) => {
  element.view.innerText = value === null ? "0" : value;
};

const handleOperatorBtn = ({ target }: MouseEvent) => {
  if (!(target instanceof HTMLButtonElement)) return;

  const inputOperator: OperatorType = target.innerText;

  if (inputOperator !== "=") {
    input2 || setOperator(inputOperator);
    setClear(false);
    return;
  }

  if (operator === null) {
    const newAnswer = input1;
    setAnswer(newAnswer);
    renderView(answer);

    setClear(false);

    setInput2(null);
    setAnswer(null);
    setOperator(null);
    return;
  }

  if (input2 !== null) {
    const newAnswer = String(calculate(input1, input2, operator));
    setAnswer(newAnswer);
    renderView(answer);

    setClear(false);

    setInput1(answer);
    setInput2(null);
    setAnswer(null);
    setOperator(null);
    return;
  }
};

const handleNumberBtn = ({ target }: MouseEvent) => {
  if (!(target instanceof HTMLButtonElement)) return;
  if (target.className !== "number") return;

  if (operator === null) {
    setInput1(input1 + target.innerText);
    renderView(input1);
    setClear(false);
    return;
  }
  setInput2((input2 ? input2 : "") + target.innerText);
  renderView(input2);
  setClear(false);
};

const clearAll = () => {
  if (isClear) return;

  setInput1("0");
  setInput2(null);
  setOperator(null);

  setClear(true);

  setAnswer(null);
  renderView(answer);
};

const addHandlers = () => {
  element.numberBtns.addEventListener("click", handleNumberBtn);
  element.operatorBtns.addEventListener("click", handleOperatorBtn);
  element.acBtn.addEventListener("click", clearAll);
};

const init = () => {
  clearAll();
  addHandlers();
};

window.addEventListener("DOMContentLoaded", init);
