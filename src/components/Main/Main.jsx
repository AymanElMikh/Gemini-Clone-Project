import {React, useContext} from 'react';
import './Main.css';
import {assets} from '../../assets/assets';
import { Context } from '../../context/context';

const Main = () => {

    const {
        onSent,
        recentPrompt,
        setShowResult,
        showResult,
        loading,
        resultData,
        input,
        setInput
    } = useContext(Context);
    

  return (
        <div className='main'>
            <div className= 'nav'>
                <p>Gemini</p>
                <img src={assets.user_icon} alt="User Icon" />
            </div>
            <div className="main-container">

                {!showResult ? 
                <>
                    <div className="greet">
                        <p><span>Hello, Dev.</span></p>
                        <p>How can I help you today ? </p>
                    </div>
                    <div className="cards">
                        <div className="card">
                            <p>Suggest beautiful places to see on an upcoming road trip</p>
                            <img src={assets.compass_icon} alt="" />
                        </div>
                        <div className="card">
                            <p>Brieflly summarize this concept: urban planning</p>
                            <img src={assets.bulb_icon} alt="" />
                        </div>
                        <div className="card">
                            <p>Brainstorming team bonding activities for our work retreat</p>
                            <img src={assets.message_icon} alt="" />
                        </div>
                        <div className="card">
                            <p>Improve the readability of the following code</p>
                            <img src={assets.code_icon} alt="" />
                        </div>
                    </div> 
                </> : 
                
                <div className="result">
                    <div className="result-title">
                        <img src={assets.user_icon} alt="" />
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="result-data">
                        <img src={assets.gemini_icon} alt="" />
                        {   loading ? 
                                <div className='loader'>
                                    <hr></hr>
                                    <hr></hr>
                                    <hr></hr>
                                </div> :
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p> 
                        }
                        
                    </div>

                </div>
                }

                <div className='main-buttom'>
                    <div className='search-box'>
                        <input onChange={(e) => setInput(e.target.value)} value={input}  type="text" placeholder='Enter a prompt here'/>
                        <div>
                            <img src={assets.gallery_icon} alt=""/>
                            <img src={assets.mic_icon} alt=""/>
                            <img onClick={()=> { onSent(); setShowResult(true);} } src={assets.send_icon} alt=""/>
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so please check
                    </p>
                </div>
            </div>
        </div>
  )
}

export default Main;