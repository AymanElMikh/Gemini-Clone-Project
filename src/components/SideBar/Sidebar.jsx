import React, {useState} from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
const Sidebar = () => {


    const [extended, setExtended] = useState(false);

  return (
    <div className='sidebar'>
        <div className="top">
            <img className = 'menu' src={assets.menu_icon} alt="Menu Icon" />
            <div className="new-chat">
                <img src={assets.plus_icon} alt="Plus Icon" />
                {extended ? <p>New Chat</p> : null}
        </div>
            { extended?
                <div className="recent">
                    <p className="recent-title">Recent</p>
                    <div className="recent-entry">
                        <img src={assets.message_icon} alt="Message Icon" />
                        <p>What is React ...</p>
                    </div>
                </div> : null
                
            }
            
        </div>
        <div className="bottom">
            <div className="button-item recent-entry">
                <img src={assets.question_icon} alt="Question Icon" />
                <p>Help</p>
            </div>
            <div className="button-item recent-entry">
                <img src={assets.history_icon} alt="History Icon" />
                <p>Activity</p>
            </div>
            <div className="button-item recent-entry">
                <img src={assets.setting_icon} alt="Setting Icon" />
                <p>Settings</p>
            </div>
        </div>
    </div>
  )
}

export default Sidebar;