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
    const [activeTab, setActiveTab] = useState("general"); // New state for tabs

    const formatToHTML = (input) => {
        let output = input
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Bold
            .replace(/\* (.*?)\n/g, '<li>$1</li>'); // List items

        const listRegex = /(<li>.*?<\/li>)/g;
        output = output.replace(listRegex, (match) => `<ul>${match}</ul>`);
        output = output.replace(/\n/g, '<br/>');
        return output;
    };

    const displayWithDelay = (html, delay) => {
        const parts = html.split(/(<br\/>|<ul>|<\/ul>|<li>|<\/li>)/g).filter(part => part.trim() !== "");
    
        // Clear previous content
        setResultData("");
    
        let index = 0;
    
        const displayNext = () => {
            if (index < parts.length) {
                const currentPart = parts[index];
    
                // Ensure we only add defined and non-empty parts
                if (currentPart) {
                    setResultData(prev => prev + currentPart);
                }
    
                index++;
                setTimeout(displayNext, delay);
            }
        };
    
        // Start displaying the first part immediately
        displayNext();
    };
    

    const onSent = async () => {
        setResultData("");
        setLoading(true);
        setPrevPrompt(prev=> [...prev, input])
        try {
            setRecentPrompt(input);
            const response = await run(input);
            const formattedResponse = formatToHTML(response);
            displayWithDelay(formattedResponse, 10); // Display each part with a 1-second delay
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
            setInput("");
        }
    };

    // Function to switch tabs
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
        handleTabChange // Expose the tab change function
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;