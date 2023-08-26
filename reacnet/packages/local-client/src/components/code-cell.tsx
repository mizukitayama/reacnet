import React, { useEffect } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";
import "./code-cell.css";
import { useCumulativeCode } from "../hooks/use-cumulative-code";


interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles?.[cell.id]);
  // take all the code of previous cells
  const cumulativeCode = useCumulativeCode(cell.id)
  useEffect(() => {
    //when the first time shows up the page
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }
    //not to load preview too much
    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 500);
    return () => {
      //clear timeout every time input was changed
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id, createBundle]);
  //createBundle is stable as in use-actions it changes only one time

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className="iframe-wrapper">
          {!bundle || bundle.loading === true ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
