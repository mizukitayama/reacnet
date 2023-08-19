import { useState, ChangeEvent, KeyboardEvent, FormEvent } from "react";
import axios from "axios";
import { Cell } from "../state";
import "./code-cell.css";
import CodeCell from "./code-cell";
import "./openai-cell.css";

interface CodeCellProps {
  cell: Cell;
}

const AICodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [question, setQuestion] = useState("");
  const [initialValue, setInitialValue] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = process.env.REACT_APP_API_KEY;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await axios
      .post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content:
                "Write a code in React: " +
                question +
                "\nI don't need no import statement. If your code contains export statement or export default statement, then delete them. I will only need a function called App().",
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.choices[0].message.content);
        const codeResult = trimCode(response.data.choices[0].message.content);
        if (!codeResult) {
          setIsLoading(false);
          return null;
        }
        const combinedCode =
          codeResult +
          "\nshow(<App />)\n";
        setIsLoading(false);
        setInitialValue(combinedCode);

      })
      .catch((error) => {
        console.error("An error occurred:", error.response.data);
        setIsLoading(false);
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent);
    }
  };

  const trimCode = (response: string) => {
    const matches = response.match(/```(.*?)```/gs);

    if (matches == null) {
      return response;
    }
    let cleanedString = matches[0].replace(/^(.*?)\n|```$/gs, "");
    console.log(cleanedString);
    return cleanedString;
  };

  return (
    <div>
      {isLoading ? (
        <div className="progress-wrapper">
            <progress className="progress is-small is-primary" max="100">
              Loading
            </progress>
        </div>
      ) : initialValue ? (
        <CodeCell cell={cell} initialValue={initialValue} />
      ) : (
        <div className="input-wrapper">
          <div className="form__group field">
            <input
              placeholder="Name"
              className="form__field"
              type="text"
              onChange={handleChange}
              value={question}
              onKeyPress={handleKeyPress}
            />
            <label className="form__label">Ask AI</label>
          </div>
        </div>
      )}
    </div>
  );
};

export default AICodeCell;
