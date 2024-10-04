import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({children}) => {
    
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const onSent = async () => {
        setLoading(true);
        try {
            const response = await run(input);
            setResultData(response);
            setShowResult(true);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const contextValue = {
    prevPrompt: [],
    setPrevPrompt: () => {},
    onSent: () => {},
    recentPrompt: "",
    setRecentPrompt: () => {},
    showResult: false,
    loading: false,
    resultData: "",
    input: "",
    setInput: () => {},
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;
