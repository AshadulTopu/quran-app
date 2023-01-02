import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function QurenApp() {

    const [Shura, setShura] = useState([])
    const [ShuraInfo, setShuraInfo] = useState(null)
    const [audio, setAudio] = useState([])
    const [Recitation, setRecitation] = useState([])
    const [Changing, setChanging] = useState(1)
    const [Language, setLanguage] = useState([])
    const [FullContent, setFullContent] = useState([])
    const [changAudio, setChangAudio] = useState(1)
    const [changLanguage, setChangLanguage] = useState(1)



    const ChangeData =(e)=>{
        // console.log(e.target.value);
        setChanging(e.target.value)
    }
    const ChangeAudioFile =(e)=>{
        // console.log(e.target);
        setChangAudio(e.target.value)
    }

    const selectLanguage = (e)=>{
        setChangLanguage(e.target.value)
    }

    // calling shura list using useEffect and axios 
    useEffect(() =>{ 
        axios.get('https://api.quran.com/api/v4/chapters?language=en')
        
        .then(data=>{
            // console.log(data);
            setShura(data.data.chapters)
        })
    },[])

    // calling shura info using useEffect and axios
    useEffect(() =>{ 
        axios.get(`https://api.quran.com/api/v4/chapters/${Changing}?language=en`)
        .then(data2=>{
            // console.log(data2);
            setShuraInfo(data2.data.chapter)
        })
    },[Changing])
    
    // calling shura audio using useEffect and axios
    useEffect(()=>{
        axios.get(`https://api.quran.com/api/v4/chapter_recitations/${changAudio}/${Changing}`)
        .then(response =>{
            // console.log(response);
            setAudio(response.data.audio_file)
            
        })
    },[changAudio,Changing])


        // calling Reciter name using useEffect and axios
        useEffect(()=>{
            axios.get('https://api.quran.com/api/v4/resources/recitations?language=en')
            .then((recitation)=>{
                // console.log(recitation);
                setRecitation(recitation.data.recitations)
            })
        },[])

        // calling language using useEffect and axios
        useEffect(()=>{
            axios.get('https://api.quran.com/api/v4/resources/translations')
            .then((language)=>{
            // console.log(language);
            setLanguage(language.data.translations)
            })
        },[])

        // calling full shura using useEffect and axios
        useEffect(()=>{
            axios.get(`https://api.quran.com/api/v4/verses/by_chapter/${Changing}?language=en&words=false&translations=162&fields=text_uthmani&page=1&per_page=300`)
            .then((FullShura)=>{
                console.log(FullShura);
                setFullContent(FullShura.data.verses)
            })
        },[Changing,changLanguage]);

  return (
    <div className='w-[1200px] h-[900px] m-auto flex gap-8'>
        <div className='w-300px bg-slate-400 p-4  p-3 border-2 border-gray-900 text-center'>
            <div className='my-5'>
            <h3 className='text-2xl p-2 font-bold font-mono'>Select Shura</h3>

            {/* Select Shura name  */}
            <select name="" id="" className='w-[250px]' value={Changing} onChange={ChangeData}>
            {
                Shura.map(ab=>(
                    <option value={ab.id}> {ab.id} - {ab.name_arabic} - {ab.name_simple} </option>
                ))
            }
            </select>
            </div>

            <div>
            <h3 className='text-2xl p-2 font-bold font-mono'>Reciter Name</h3>
            {/* select reciter name  */}
            <select name="" id="" className='w-[250px]'  value={changAudio} onChange={ChangeAudioFile}>
            {
                Recitation.map(recitation=>(
                <option value={recitation.id} >{recitation.id} - {recitation.reciter_name}</option>

                ))
            }
            </select>
            </div>

            <div className='my-5'>
            <h1 className='text-2xl p-2 font-bold font-mono '>Play Audio </h1>
            { //show audio output
                audio?.audio_url && (
                    <audio src={audio.audio_url} className='w-[270px]  p-2 ' controls />
                )
            }
            
            </div>

            <div>
            <h3 className='text-2xl p-2 font-bold font-mono'>Translation</h3>
            <select name="" id="" className='w-60' value={changLanguage} onClick={selectLanguage}>
            {/* select language */}
            {
                Language.map(translation=>(
                    <option value={translation.id} key={translation.id}> {translation.id} {translation.author_name} -- {translation.language_name} </option>
                ))
            }
                
            </select>
            </div>
           
        </div>


        <div className='w-4/5'>
        <div className=''>
            <h3 className='text-3xl font-semibold font-mono text-center'>Shura Info</h3>
            <div>
                <table className=' w-[1000px] text-center'>
                    <tr className='text-sm font-normal p-3 border-2'>
                        <th className='p-3 border-2'>SL No</th>
                        <th className='p-3 border-2'>Arabic Name</th>
                        <th className='p-3 border-2'>English Name</th>
                        <th className='p-3 border-2'>English Meaning</th>
                        <th className='p-3 border-2'>Revelation Place</th>
                        <th className='p-3 border-2'>Revelation Order</th>
                        <th className='p-3 border-2'>Verses Number</th>
                    </tr>
                    
                    {ShuraInfo &&(
                    <tr>
                    
                        <td className='p-3 border-2' >{ShuraInfo.id}</td>
                        <td className='p-3 border-2' >{ShuraInfo.name_arabic}</td>
                        <td className='p-3 border-2' >{ShuraInfo.name_simple}</td>
                        <td className='p-3 border-2' >{ShuraInfo.translated_name.name}</td>
                        <td className='p-3 border-2' >{ShuraInfo.revelation_place}</td>
                        <td className='p-3 border-2' >{ShuraInfo.revelation_order}</td>
                        <td className='p-3 border-2' >{ShuraInfo.verses_count}</td> 
                    
                    </tr>
                    )}
                    
                </table>
            </div>
        </div>
            <div className='w-[1000px] overflow-hidden overflow-y-scroll'>
            {
                FullContent.map(content=>(
                    <div key={content.id} className='p-2 '>
                    <p  className='text-right p-1'> {content.text_uthmani} {content.verse_number}</p>
                    <p  className='p-1'> {content.verse_number} {content.translations[0].text}</p>
                    </div>
                ))
            }

            </div>
        </div>
        

    </div>
  )
}
