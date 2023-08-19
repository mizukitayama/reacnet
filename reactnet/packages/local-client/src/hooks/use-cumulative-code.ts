import { useTypedSelector } from "./use-typed-selector";

export const useCumulativeCode = (cellId: string) => {
	return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map(id => data[id]);
    // make show() function
    // value.$$typeof => to show JSX element
    const showFunc = `
    import _React from "react"
    import _ReactDOM from "react-dom"
    var show = (value) => {
      const root = document.querySelector("#root");
      if (typeof value === "object") {
        if (value.$$typeof && value.props) {
          _ReactDOM.render(value, root)
        } else {
          root.innerHTML = JSON.stringify(value)
        }
      } else {
        root.innerHTML = value;
      }
    }
    `
    const showFuncNoOperation = 'var show = () => {}'
    const cumulativeCode = [];
    for (let c of orderedCells){
      if (c.type === "code" || c.type === "ai") {
        // to disable show() of cells above
        if (c.id === cellId) {
          cumulativeCode.push(showFunc) //current cell
        } else {
          cumulativeCode.push(showFuncNoOperation) //other cells
        }
        cumulativeCode.push(c.content);
      }
      if (c.id === cellId) { // add codes until current cell
        break;
      }
    }
    return cumulativeCode;
  }).join('\n')
}