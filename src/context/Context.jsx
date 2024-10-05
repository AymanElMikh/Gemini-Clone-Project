import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [activeTab, setActiveTab] = useState("general");

    const formatToHTML = (input) => {
        let output = input
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\* (.*?)\n/g, '<li>$1</li>');

        const listRegex = /(<li>.*?<\/li>)/g;
        output = output.replace(listRegex, (match) => `<ul>${match}</ul>`);
        output = output.replace(/\n/g, '<br/>');
        return output;
    };

    const displayWithDelay = (html, delay) => {
        const parts = html.split(/(<br\/>|<ul>|<\/ul>|<li>|<\/li>)/g).filter(part => part.trim() !== "");
    
        setResultData("");
    
        let index = 0;
    
        const displayNext = () => {
            if (index < parts.length) {
                const currentPart = parts[index];

                if (currentPart) {
                    setResultData(prev => prev + currentPart);
                }
    
                index++;
                setTimeout(displayNext, delay);
            }
        };
    
        displayNext();
    };
    
    const newChat = () => {
        setShowResult(false);
        setLoading(false);
    }

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        
        try {
            let response;
            
            if(prompt !== undefined){
                response = await run(prompt)
            } else {
                response = await run(input);
                setPrevPrompt(prev=> [...prev, input]);
                setRecentPrompt(input);
            }

            const formattedResponse = formatToHTML(response);
            displayWithDelay(formattedResponse, 10);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
            setInput("");
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        recentPrompt,
        setRecentPrompt,
        showResult,
        setShowResult,
        loading,
        resultData,
        input,
        setInput,
        activeTab,
        handleTabChange,
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;