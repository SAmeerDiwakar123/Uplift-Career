import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Plus, Edit2, Trash2, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {

  useGetAllCompanies()
  
  const { companies, searchCompanyByText } = useSelector(store => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSearchCompanyByText(search))
  }, [search]);

  useEffect(() => {
    const filterCompany = companies.length > 0 && companies.filter((company) => {
      if(!searchCompanyByText){
        return true;
      } 
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase()) || company?.location?.toLowerCase().includes(searchCompanyByText.toLowerCase())
    })  
    setFilterCompany(filterCompany)
  },[companies, searchCompanyByText]) 


  const navigate = useNavigate()
  const [open, setOpen] = useState(false)   
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [updateLoading, setUpdateLoading] = useState(false)
  const [input, setInput] = useState({    
    name: "", description: "", location: "", website: "", file: null,
  })

  const handleEdit = (company) => {
    setSelectedCompany(company)   
    setInput({ name: company.name || "", description: company.description || "", location: company.location || "", website: company.website || "", file: null })  
    setOpen(true)
  }

  const changeHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value })  

  const updateHandler = async (e) => {
    e.preventDefault()
    try {
      setUpdateLoading(true)
      const formData = new FormData()
      formData.append("name", input.name)
      formData.append("description", input.description)
      formData.append("location", input.location)
      formData.append("website", input.website)
      if (input.file) formData.append("file", input.file)

      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${selectedCompany._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      })
      if (res.data.success) {
        toast.success("Company updated!")
        setOpen(false)
        window.location.reload()
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
    } finally {
      setUpdateLoading(false)
    }
  }

  const deleteCompany = async (id) => {
    if (!confirm("Are you sure?")) return
    try {
      await axios.delete(`${COMPANY_API_END_POINT}/delete/${id}`, { withCredentials: true });
      toast.success("Company deleted!");
      window.location.reload();
    } catch (error) {
      toast.error("Could not delete!");
    }
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />
      <div className='max-w-6xl mx-auto p-6'>

        <div className='flex items-center justify-between mb-6'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>Manage Companies</h1>
            <p className='text-sm text-gray-400 mt-1'>{companies?.length} companies registered</p>
          </div>
          <button onClick={() => navigate('/admin/create-company')}
            className='flex items-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-indigo-700 transition'>
            <Plus size={15} /> Add Company
          </button>
        </div>

        <div className='relative mb-4'>
          <Search size={15} className='absolute left-3 top-3 text-gray-400' />
          <input
            type="text"
            onChange={(e) => setSearchJobByText(e.target.value)}
            placeholder='Search your job'
            className='w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white'
          />
        </div>

        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='border-b border-gray-100'>
                <th className='text-left py-3 px-4 text-xs text-gray-400 font-semibold'>#</th>
                <th className='text-left py-3 px-4 text-xs text-gray-400 font-semibold'>Logo</th>
                <th className='text-left py-3 px-4 text-xs text-gray-400 font-semibold'>Name</th>
                <th className='text-left py-3 px-4 text-xs text-gray-400 font-semibold'>Location</th>
                <th className='text-left py-3 px-4 text-xs text-gray-400 font-semibold'>Website</th>
                <th className='text-left py-3 px-4 text-xs text-gray-400 font-semibold'>Date</th>
                <th className='text-left py-3 px-4 text-xs text-gray-400 font-semibold'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterCompany?.length === 0 ? (
                <tr><td colSpan={7} className='text-center py-16 text-gray-400'>Koi company nahi mili</td></tr>
              ) : filterCompany?.map((company, i) => (
                <tr key={company._id} className='border-b border-gray-50 hover:bg-gray-50 transition'>
                  <td className='py-3 px-4 text-gray-400'>{i + 1}</td>
                  <td className='py-3 px-4'>
                    {company.logo ? (
                      <img src={company.logo} alt="logo" className='h-8 w-8 rounded-lg object-cover' />
                    ) : (
                      <div className='h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm'>
                        {company.name?.charAt(0)}
                      </div>
                    )}
                  </td>
                  <td className='py-3 px-4 font-medium text-gray-800'>{company.name}</td>
                  <td className='py-3 px-4 text-gray-500'>{company.location}</td>
                  <td className='py-3 px-4 text-indigo-500'>
                    <a href={company.website} target='_blank'>{company.website}</a>
                  </td>
                  <td className='py-3 px-4 text-gray-400'>
                    {new Date(company.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className='py-3 px-4'>
                    <div className='flex gap-2'>
                      <button onClick={() => handleEdit(company)}
                        className='p-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition'>
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => deleteCompany(company._id)}
                        className='p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition'>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-[500px] bg-white rounded-2xl' aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className='text-lg font-bold text-gray-900'>Edit Company</DialogTitle>
          </DialogHeader>
          <form onSubmit={updateHandler}>
            <div className='flex flex-col gap-3 py-4'>
              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-gray-700'>Company Name</label>
                <input type="text" name='name' value={input.name} onChange={changeHandler}
                  className='border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300' required />
              </div>
              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-gray-700'>Description</label>
                <textarea name='description' value={input.description} onChange={changeHandler} rows={3}
                  className='border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none' />
              </div>
              <div className='grid grid-cols-2 gap-3'>
                <div className='flex flex-col gap-1'>
                  <label className='text-sm font-medium text-gray-700'>Location</label>
                  <input type="text" name='location' value={input.location} onChange={changeHandler}
                    className='border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300' />
                </div>
                <div className='flex flex-col gap-1'>
                  <label className='text-sm font-medium text-gray-700'>Website</label>
                  <input type="text" name='website' value={input.website} onChange={changeHandler}
                    className='border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300' />
                </div>
              </div>
              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-gray-700'>Logo</label>
                <input type="file" accept='image/*'
                  onChange={(e) => setInput({ ...input, file: e.target.files[0] })}
                  className='border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300' />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={updateLoading}
                className='w-full bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl py-2.5'>
                {updateLoading ? "Updating..." : "Update Company"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default Companies