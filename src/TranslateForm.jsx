// src/components/TranslateForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css'
import down from './img/Expand_down.svg'
import sound from './img/sound_max_fill.svg'
import sort from './img/Sort_alfa.svg'
import copy from './img/Copy.svg'
import hori from './img/Horizontal_top_left_main.svg'

const TranslateForm = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [number,setNuber] = useState(0)
  const [lang,setLang] = useState('en')
  const [translate,setTranslate] = useState('th')
  const [openTrans,setOpenTrans] = useState(false)
  const [openLang,setOpenLang] = useState(false)
  const [lastbtnLang,setLastbtnLang] = useState(true)
  const [lastbtnTrans,setLastbtnTrans] = useState(true)

  const translateText = async () => {
    try {
      const response = await axios.get(
        'https://api.mymemory.translated.net/get', {
          params: {
            q: inputText,
            langpair: `${lang}|${translate}`, // เปลี่ยนเป็นภาษาที่ต้องการแปลได้ตามที่ต้องการ
          },
        }
      );
      setTranslatedText(response.data.responseData.translatedText);
    } catch (error) {
      console.error('Error fetching translation:', error);
    }
  };

  const clickOpenLang = () =>{
    setLastbtnLang(false)
    setOpenLang(true)
  }

  const clickOpenTrans = () =>{
    setLastbtnTrans(false)
    setOpenTrans(true)
  }

  const btnSelect = (e) =>{
    setLang(e.target.value)
    setOpenLang(false)
    setLastbtnLang(true)
  }

  const btnTransSelect = (e) =>{
    setTranslate(e.target.value)
    setOpenTrans(false)
    setLastbtnTrans(true)
  }

  const clickToCopy = ()=>{
    navigator.clipboard.writeText(translatedText)
    .then(() => {
      alert('Copied to clipboard!');
    })
    .catch(err => {
      console.error('Unable to copy:', err);
    });
  }

  const clickToCopyLang = ()=>{
    navigator.clipboard.writeText(inputText)
    .then(()=>{
      alert('copied to clipboard!');
    })
    .catch(err=>{
      console.log('Unable to copy:',err);
    })
  }

  return (
    <div className='container'>
        <div className='input-container'>
            <div className='btn-container'>
                <h3>Detect Language</h3>
                <button onClick={()=>setLang('en')}>English</button>
                <button onClick={()=>setLang('fe')}>French</button>
                
                {lastbtnLang && (
                  <button onClick={()=>setLang('sp')} className='last-btn'
                    >{lang==='sp'?'Spanish':''||lang==='th'?'Thai':''||lang==='jp'?'Japnaese':''||lang==='br'?'Brazil':''||lang==='en'?'Spanish':''} 
                    <img src={down} alt="dowm" onClick={clickOpenLang}/>
                </button>
                )}

                {openLang && (
                  <div className='selectLang'>
                    <button value='th' onClick={btnSelect}>Thai</button>
                    <button value='it' onClick={btnSelect}>Italy</button>
                    <button value='br' onClick={btnSelect}>Brazil</button>
                  </div>
                )}
            </div>

            <div className='textarea-container'>
                <textarea
                    className='textarea'
                    value={inputText}
                    onChange={(e) => {setInputText(e.target.value);
                                    {setNuber(e.target.value.length)}
                    }}
                    placeholder="Enter text to translate..."
                />
                <h4 className='number'>{number}/500</h4>
            </div>

            <div className='footer'>
                <div className="speaker">
                    <img src={sound} alt="sound" />
                    <img src={copy} alt="copy" onClick={clickToCopyLang}/>
                </div>
                <button onClick={translateText}><img src={sort} alt="sort" />Translate</button>
            </div>
        </div>
    
    {/* -------------------------------------------------------------------------------------------------------------------------------*/}

        <div className='translate-container'>
            <div className='btns-container'>
                <div className='transbtn'>
                    <button onClick={()=>setTranslate('en')}>English</button>
                    <button onClick={()=>setTranslate('fr')}>French</button>
                   {lastbtnTrans && ( 
                    <button onClick={()=>setTranslate('sp')} className='last-btn'>
                      {translate==='sp'?'Spanish':''||translate==='th'?'Thai':''||translate==='it'?'Italy':''||translate==='br'?'Brazil':''||translate==='en'?'Spanish':''} 
                      <img src={down} alt="dowm" onClick={clickOpenTrans}/>
                    </button>)}

                    {openTrans &&(
                      <div className='selectTrans'>
                        <button value='th' onClick={btnTransSelect}>Thai</button>
                        <button value='it' onClick={btnTransSelect}>Italy</button>
                        <button value='br' onClick={btnTransSelect}>Brazil</button>
                      </div>
                    )}
                </div>
                <img src={hori} alt="hori" className='hori'/>
            </div>

            <div className='textarea-container'>
                <textarea
                    className='textarea'
                    value={translatedText}
                    onChange={(e) => {setInputText(e.target.value);
                                    {setNuber(e.target.value.length)}
                    }}
                    placeholder="Enter text to translate..."
                />
            </div>

            <div className='footer'>
                <div className="speaker">
                    <img src={sound} alt="sound" />
                    <img src={copy} alt="copy" onClick={clickToCopy}/>
                </div>
            </div>
        </div>

    </div>
  );
};

export default TranslateForm;
