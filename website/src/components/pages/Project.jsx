import React,{useState,useEffect} from 'react';
import Button from '../reusables/Buttons';
import ApiInstance from '../Api';

const Project = () => {
 const[company, setCompany] =useState([])
 const[technology,setTechnology] =useState([])
 const[exprience,setExprience] =useState([])

 console.log(company)
 console.log(technology)
 console.log(exprience)
  const GetData =() =>{
    ApiInstance.get(`company/`).then((res)=>{
      setCompany(res.data)
    })
    ApiInstance.get(`Technologies/`).then((res) =>{
      setTechnology(res.data)
    });

    ApiInstance.get(`Exprience/`).then((res)=>{
      setExprience(res.data)
    });
  }

  useEffect(()=>{
   GetData()

  },[])
  return (
    <div className="px-4 py-6">
      <div className="border border-lime-900 rounded-xl p-4">
        <h3 className="text-lg font-bold text-lime-600">Project Panel</h3>
        <Button variant='warning'>
          All Projects
        </Button>

        <div className="bg-zinc-900/60 p-6 rounded-xl mt-6 backdrop-blur-xl">
          <form className="space-y-4">
            {/* TITLE */}
            <div>
              <label className="text-sm font-semibold text-zinc-300">
                Title
              </label>
              <input
                type="text"
                placeholder="Project title"
                className="w-full mt-2 px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-lime-500 outline-none"
              />
            </div>

            {/* COMPANY */}
            <div>
              <label className="text-sm font-semibold text-zinc-300">
                Company
              </label>
              <select className="w-full mt-2 px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-lime-500 outline-none">
                <option value="">Select company</option>
              </select>
            </div>

            {/* TECHNOLOGIES */}
            <div>
              <label className="text-sm font-semibold text-zinc-300">
                Technologies
              </label>
              <select
                multiple
                className="w-full mt-2 px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-lime-500 outline-none"
              >
                <option>React</option>
                <option>Django</option>
              </select>
            </div>

            {/* EXPERIENCE */}
            <div>
              <label className="text-sm font-semibold text-zinc-300">
                Experience
              </label>
              <select
                multiple
                className="w-full mt-2 px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-lime-500 outline-none"
              >
                <option>Backend Development</option>
                <option>Full Stack</option>
              </select>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="text-sm font-semibold text-zinc-300">
                Description
              </label>
              <textarea
                rows="4"
                placeholder="Project description"
                className="w-full mt-2 px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-lime-500 outline-none"
              />
            </div>

            {/* DETAILS */}
            <div>
              <label className="text-sm font-semibold text-zinc-300">
                Details
              </label>
              <textarea
                rows="3"
                placeholder="Project details"
                className="w-full mt-2 px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-lime-500 outline-none"
              />
            </div>

            {/* BUTTON */}
            <Button variant="primary">Create Project</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Project;