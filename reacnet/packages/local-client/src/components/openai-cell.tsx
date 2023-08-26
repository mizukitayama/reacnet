import { useState, ChangeEvent, KeyboardEvent, FormEvent } from "react";
import axios from "axios";
import { Cell } from "../state";
import "./code-cell.css";
import CodeCell from "./code-cell";
import "./openai-cell.css";
import { useActions } from "../hooks/use-actions";

interface CodeCellProps {
  cell: Cell;
}

const AICodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell } = useActions();
  const [question, setQuestion] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiSetError, setApiSetError] = useState(false);
  const [apiSetSuccess, setApiSetSuccess] = useState(false);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setApiSetSuccess(false);
    const chatGptApi = localStorage.getItem("chatGptApi");
    if (!chatGptApi) {
      throw new Error();
    }
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
                "\nIf your code contains export statement or export default statement, then delete them. I will only need a function called App().",
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${chatGptApi}`,
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
        const combinedCode = codeResult + "\nshow(<App />)\n";
        setIsLoading(false);
        updateCell(cell.id, combinedCode);
      })
      .catch((error) => {
        console.error("An error occurred:", error.response.data);
        setIsLoading(false);
        localStorage.removeItem('chatGptApi')
      });
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent);
    }
  };

  const registerApiKey = async (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsLoading(true);
      await axios
        .post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: "",
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
          localStorage.setItem("chatGptApi", apiKey);
          setIsLoading(false);
          setApiSetError(false);
          setApiSetSuccess(true);
        })
        .catch((error) => {
          setIsLoading(false);
          setApiSetError(true);
          setApiSetSuccess(false);
        });
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="progress-wrapper">
          <progress className="progress is-small is-primary" max="100">
            Loading
          </progress>
        </div>
      ) : cell.content ? (
        <CodeCell cell={cell} />
      ) : !localStorage.getItem("chatGptApi") ? (
        <>
          <div className="input-wrapper">
            <div className="form__group field">
              <input
                placeholder="ask something"
                className="form__field"
                type="text"
                onChange={(e) => {
                  setApiKey(e.target.value);
                }}
                value={apiKey}
                onKeyPress={registerApiKey}
              />
              <label className="form__label">OpenAI API key</label>
            </div>
            {apiSetError ? (
              <div className="error-message">Confirm the openAI API key.</div>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <div className="input-wrapper">
          {apiSetSuccess ? (
            <div className="success-message">Registered API key!</div>
          ) : (
            <></>
          )}
          <div className="form__group field">
            <input
              placeholder="ask something"
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
