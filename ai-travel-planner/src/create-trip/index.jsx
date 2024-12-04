import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions,SelectTravelesList } from '@/constants/options.jsx';
import { chatSession } from '@/service/AIModal';
import React, { useState,useEffect } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { toast } from 'sonner';
import { FcGoogle } from "react-icons/fc";
function CreateTrip() {
    const [place, setPlace] = useState();
    const [formData,setFormData]=useState([]);

  const [openDialog, setOpenDialog] = useState(false); 
    const handleInputChange=(name,value)=>{
        setFormData({
            ...formData,[name]:value
        })
    }
    useEffect(()=>{
        console.log(formData);
    },[formData])

const OnGenerateTrip=async()=>{
    const user=localStorage.getItem('user');
    if(!user){
        setOpenDialog(true)
        return;
    }
    if(formData?.noOfDays > 5 && formData?.location||!formData?.budget||!formData?.traveller ){
        toast('Please fill all details')
        return ;
    }
    const FINAL_PROMPT=AI_PROMPT
    .replace('{location}',formData?.location?.label)
    .replace('{totalDays}',formData?.noOfDays)
    .replace('{traveller}',formData?.traveller)
    .replace("{budget}",formData?.budget)
    .replace('{totalDays}',formData?.noOfDays)

    console.log(FINAL_PROMPT);

    const result=await chatSession.sendMessage(FINAL_PROMPT)
    console.log(result?.response?.text())
}

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
            <h2 className='font-bold text-3xl '>Tell us your travel preferences 🏕️ 🌴</h2>
            <p className='mt-4 text-grey-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
            <div className='mt-20 flex flex-col gap-10'>
                <div>
                    <h2 className='text-xl my-3 font-medium'>What is destination of choice ?</h2>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            place,
                            onChange: (v) => {
                                setPlace(v);
                                handleInputChange('location',v)
                            }

                        }}
                    />
                </div>
                <div>
                    <h2 className='text-xl my-3 font-medium'>How many days are you trip ?</h2>
                    <Input placeholder={'Ex.3'} type='number' 
                    onChange={(e)=>handleInputChange('noOfDays',e.target.value)}
                    />

                </div>
                <div>
                    <h2 className='text-xl my-3 font-medium'>
                        What is your Budget?
                    </h2>
                    <div className='grid grid-cols-3 gap-5 mt-5'>
                        {SelectBudgetOptions.map((item) => (
                            <div key={item.id}
                            onClick={()=>handleInputChange('budget',item.title)} className={`p-4 border rounded-lg hover:shadow-lg ${formData?.budget==item.title&&'shadow-lg border-black'}`}>
                                   <div className="text-4xl">
                                    {item.icon}
                                </div>
                                <h3 className='font-bold text-lg' >{item.title}</h3>
                                <h3 className='text-sm text-grey-500'>{item.desc}</h3>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>
                        Who do you plan on travelling with on your next adventure ?
                    </h2>
                    <div className='grid grid-cols-3 gap-5 mt-5'>
                        {SelectTravelesList.map((item) => (
                            <div key={item.id} onClick={()=>handleInputChange('traveller',item.people)} className={`p-4 border rounded-lg hover:shadow-lg ${formData?.traveller==item.people&&'shadow-lg border-black'}`}>
                                   <div className="text-4xl">
                                    {item.icon}
                                    
                                </div>
                                <h3 className='font-bold text-lg' >{item.title}</h3>
                                <h3 className='text-sm text-grey-500'>{item.desc}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
           <div className='flex my-8 justify-end'>
           <Button onClick={OnGenerateTrip}>Generate Trip</Button>
           </div>
           <Dialog open={openDialog}>
  
  <DialogContent>
    <DialogHeader>
      
      <DialogDescription>
        <img src="/logo.svg" alt="" />
        <h2 className='font-bold text-lg mt-7'>Sign In with Google</h2>
        <p>Sign in to the App with Google Authetication securely </p>
        <Button className='w-full mt-5 flex gap-4 items-center'><FcGoogle className='h-9 w-9' />Sign In with Google</Button>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

        </div>
    )
}

export default CreateTrip
