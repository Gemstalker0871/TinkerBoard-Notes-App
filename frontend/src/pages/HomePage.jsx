import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { RateLimit } from '../components/RateLimit'
import axios from "axios"
import toast from 'react-hot-toast'

const HomePage = () => {

  const [rateLimited, setRateLimited] = useState(false)

  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        //Using normal fetch
        // const res = await fetch("http://localhost:5001/api/notes")
        // const data = await res.json()
        // console.log(data);

        const res = await axios.get("http://localhost:5001/api/notes")
        setNotes(res.data)
        console.log(res.data);
        
        setRateLimited(false)
      } catch (error) {
        console.log(error);
        if(error.response?.status === 429){
          setRateLimited(true)
        }else{
          toast.error("Failed to load notes")
        }
        
      }finally{
        setLoading(false)
      }
    }
    fetchNotes()  
  }, [])


  return (
    <div className='min-h-screen'>
      <Navbar />


    {rateLimited && <RateLimit />}

    <div className='max-w-7xl mx-auto p-4mt-6'>
      {loading && <div className='text-center text-primary py-10'>Loading Notes....</div>}

      {notes.length > 0 && !rateLimited && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {notes.map(note => (
            <div>
              {note.title} | {note.content}
            </div>
          ))}
        </div>
      )}

    </div>

    </div>
  )
}

export default HomePage