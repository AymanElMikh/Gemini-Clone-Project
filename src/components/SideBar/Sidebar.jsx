import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';

const Sidebar = () => {
    const [extended, setExtended] = useState(true);
    const { onSent, prevPrompt, setRecentPrompt, newChat} = useContext(Context); // Include setInput

    const loadPrompt = async(prompt) => {
        setRecentPrompt(prompt);
        await await onSent(prompt);
    }

    

    return (
        <div className='sidebar'>
            <div className="top">
                <img onClick = { () => {setExtended(prev => !prev )}} className='menu' src={assets.menu_icon} alt="Menu Icon" />
                <div className="new-chat" onClick={() => newChat()}>
                    <img src={assets.plus_icon} alt="Plus Icon" />
                    {extended && <p>New Chat</p>}
                </div>
                {extended && (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompt.map((item, index) => (
                            <div 
                                className="recent-entry" 
                                key={index}
                                onClick={() => loadPrompt(item)}
                            >
                                <img src={assets.message_icon} alt="Message Icon" />
                                <p>{item.slice(0, 18)} ...</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="bottom">
                <div className="button-item recent-entry">
                    <img src={assets.question_icon} alt="Question Icon" />
                    {extended && <p>Help</p>}
                </div>
                <div className="button-item recent-entry">
                    <img src={assets.history_icon} alt="History Icon" />
                    {extended && <p>Activity</p>}
                </div>
                <div className="button-item recent-entry">
                    <img src={assets.setting_icon} alt="Setting Icon" />
                    {extended && <p>Setting</p>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
