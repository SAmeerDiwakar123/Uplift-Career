import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'


const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.bio,
        skills: user?.profile?.skills?.join(', '),
        file: null
    });
 
    const dispatch = useDispatch();
    const changeEventHandler = (e) => {

        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const fileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file)
        }
        
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                console.log("Clicked");
                dispatch(setUser(res.data.user));
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong")
        }
        finally {
            setLoading(false);
        }
        setOpen(false);
        console.log(input);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px] bg-white" aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>

                <form onSubmit={submitHandler}>
                    <div className='grid gap-4 py-4'>
                        {/* Name Field */}
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <label htmlFor='fullname' className='text-right text-sm font-medium'>Name</label>
                            <Input name="fullname" id="fullname" value={input.fullname} onChange={changeEventHandler} className="col-span-3" />
                        </div>

                        {/* Email Field */}
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <label htmlFor='email' className='text-right text-sm font-medium'>Email</label>
                            <Input name="email" value={input.email} onChange={changeEventHandler} className="col-span-3" />
                        </div>

                        <div className='grid grid-cols-4 items-center gap-4'>
                            <label htmlFor='phoneNumber' className='text-right text-sm font-medium'>PhoneNumber</label>
                            <Input id="phoneNumber" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} className="col-span-3" />
                        </div>

                        <div className='grid grid-cols-4 items-center gap-4'>
                            <label className='text-right text-sm font-medium'>Bio</label>
                            <Input id="bio" name="bio" value={input.bio} onChange={changeEventHandler} className="col-span-3" />
                        </div>

                        {/* Skills Field */}
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <label htmlFor='skills' className='text-right text-sm font-medium'>Skills</label>
                            <Input id="skills" name="skills" value={input.skills} onChange={changeEventHandler} className="col-span-3" />
                        </div>

                        {/* File Field */}
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <label htmlFor='file' className='text-right text-sm font-medium'>Resume</label>
                            <Input type="file" accept="application/pdf" onChange={fileHandler} value={input.resume} className="col-span-3" />
                        </div>
                    </div>

                    <DialogFooter>
                        {loading ? (
                            <Button className="w-full my-4 bg-blue-600 text-white hover:bg-blue-700 transition">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4 bg-blue-600 text-white hover:bg-blue-700 transition">
                                Update
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialog;