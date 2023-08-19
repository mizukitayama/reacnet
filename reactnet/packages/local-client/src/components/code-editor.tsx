import "./code-editor.css"
import { useRef } from "react"
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel"
import "bulmaswatch/superhero/bulmaswatch.min.css";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
	const editorRef = useRef<any>();

  //first displayed on screen
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
	editorRef.current = monacoEditor;
	//create an event listener which is called on change on editor
	monacoEditor.onDidChangeModelContent(() => {
		onChange(getValue());
	});
	monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
  };

  const onClickFormat = () => {
	const unformatted = editorRef.current.getModel().getValue();
	const formatted = prettier.format(unformatted, {
		parser: "babel",
		plugins: [parser],
		semi: true,
		singleQuote: false
	}).replace(/\n$/, "");
	editorRef.current.setValue(formatted);
  }

  return (
	<div className="editor">
		<button className="button button-format is-small" onClick={onClickFormat}>Prettier</button>
    <MonacoEditor
      editorDidMount={onEditorDidMount}
      value={initialValue}
      height="100%"
      language="javascript"
      theme="dark"
      options={{
        minimap: {enabled: false},
        wordWrap: "on",
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 12,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
	</div>
  );
};

export default CodeEditor;
