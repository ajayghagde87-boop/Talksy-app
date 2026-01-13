import { ArrowLeft, Sparkle, TextIcon, Upload } from 'lucide-react'
import React, { use, useState } from 'react'
import toast from 'react-hot-toast'

const StoryModel = ({setShowModel,fetchStories}) => {
    const bgColors = ["#4f46e5","#7c3aed","#db2777","#e11d48","#ca8a04","#0d9488"]
    const [mode,setModel]=useState("text")
    const [background,setBackground]=useState(bgColors[0])
    const [text,setText]=useState("")
    const [media,setMedia]=useState(null)
    const [previewUrl,setPreviewUrl]=useState(null)

    const handleMediaUpload=(e)=>{
        const file=e.target.files?.[0]
        if(file){
            setMedia(file)
            setPreviewUrl(URL.createObjectURL(file))
        }
    }
    const handleCreateStory= async()=>{
    }
  return (
    <div className='fixed inset-0 z-110 min-h-screen bg-black/80 backdrop-blur text-white flex items-center justify-center p-4'>
    <div className='w-full max-w-md'>
    <div>
        <button onClick={()=>setShowModel(false)} className='text-white p-2 cursor-pointer'>
            <ArrowLeft />
        </button>
        <h1 className='text-lg font-semibold'>Create Story</h1>
        <span className='w-10'></span>
    </div>
    <div className='rounded-lg h-96 flex items-center justify-center relative' style={{backgroundColor:background}}>
    {
        mode==='text' ? (
            <textarea 
            value={text}
            onChange={(e)=>setText(e.target.value)}
            className='w-full h-full bg-transparent p-4 resize-none text-white'
            placeholder='Write your story here...'
            />
        ) : (
            <div className='w-full h-full flex items-center justify-center'>
                {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                    <input type="file" accept="image/*,video/*" onChange={handleMediaUpload} className="w-full h-full" />
                )}
            </div>
        )
    }

    </div>
    <div className='flex mt-4 gap-2'>
    {bgColors.map((color)=>(
            <button key={color} onClick={()=>setBackground(color)} className='w-6 h-6  rounded-full ring cursor-pointer' style={{backgroundColor:color}}></button>
        ))}

    </div>
    <div className='flex gap-2 mt-4'>
    <button onClick={()=>{setModel('text');setMedia(null);setPreviewUrl(null)}} className={`flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer ${mode === 'text' ? "bg-white text-black":"bg-zinc-800 text-white"}`}>
        <TextIcon size={18}/> Text
    </button>
    <label className={`flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer ${mode === 'media' ? "bg-white text-black":"bg-zinc-800"}`}>
        <input type="file" accept="image/*,video/*" onChange={(e)=>{setModel('media');handleMediaUpload(e)}} className="hidden" />
        <Upload size={18}/> Photo/Video
    </label>

    </div>
    <button onClick={()=> toast.promise(handleCreateStory(),{
        loading:'Saving....',
        success: <p>Story Added </p>,
        error: e=><p>{e.message}</p>,
    })} className="flex items-center justify-center gap-2 text-white py-3 mt-4 w-full rounded bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition cursor-pointer">
        <Sparkle size={18}/> Create Story
    </button>

    </div>

    </div>
  )
}

export default StoryModel;