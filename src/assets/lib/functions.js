const evaluate = ({ currentOperand, previousOperand, operation }) => {
  let prvO = parseFloat(previousOperand);
  let currO = parseFloat(currentOperand);
  if (isNaN(prvO) || isNaN(currO)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prvO + currO;
      break;
    case "-":
      computation = prvO - currO;
      break;
    case "*":
      computation = prvO * currO;
      break;
    case "÷":
      computation = prvO / currO;
      break;
  }
  return computation.toString();
};
export default evaluate;