import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import EditUserModal from './components/EditUserModal';
import Loader from './components/Loader';
function App() {
  const [usersdata,setUsersData]=useState([]);
  const [iswishlist,setWishList]=useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEditid, setUserEditId] = useState('');
  const [loading,setLoad]=useState(true)
  const fetchData=async()=>{
try{
  const {data}=await axios.get('https://jsonplaceholder.typicode.com/users');
  setUsersData(data)
}catch(error){
  console.log(error)
}
  }
  useEffect(()=>{
    fetchData();
    setTimeout(()=>{
setLoad(false)
    },1500)
  },[])
  //////////add wishlist///////////
  const addtowishlist=(id)=>{
setWishList([...iswishlist,id]);
  }
  //////////Remove wishlist///////////
  const removeWishList=(id)=>{
const newRes=iswishlist.filter(ele=>{
  return ele!==id;
})
setWishList(newRes);
  }
  //////////Delete user//////////
  const deleteUser=(id)=>{
    const newRes=usersdata.filter(ele=>{
      return ele.id!==id;
    })
    setUsersData(newRes);
      }

      if(loading){
        return <Loader/>
      }
  return (
    <>
 <div className='w-full p-8 bg-white'>
<div className='w-full grid grid-cols-4 gap-8 xs:grid-cols-1 md:grid-cols-2'>
{usersdata.map((ele,i)=>{
  return <div className='w-full border shadow rounded-lg' key={ele?.id}>
     <div className='w-full bg-gray-50 flex justify-center rounded-t-lg'>
      <img className='mt-2 h-40' src={`https://avatars.dicebear.com/v2/avataaars/${ele?.username}.svg?options[mood][]=happy`} alt="" />
     </div>
     {/* /////////////////// */}
     <div className='p-4 w-full'>
 <h1 className=' text-lg font-semibold'>{ele?.name}</h1>
<div className=' flex items-center gap-2 text-gray-500 mt-1'>
  <div><i className="fa-regular text-lg fa-envelope"></i></div>
  <p>{ele?.email}</p>
</div>
<div className=' flex items-center gap-2 text-gray-500 mt-1'>
  <div><i className="fa-solid fa-phone"></i></div>
  <p>{ele?.phone}</p>
</div>
<div className=' flex items-center gap-2 text-gray-500 mt-1 '>
  <div><i className="fa-solid fa-globe"></i></div>
  <p>{ele?.website}</p>
</div>
     </div>
     {/* Actions_div */}
     <div className='flex py-2 border-t bg-gray-50 rounded-b-lg'>
      <div className='flex-1 text-center'>
        {iswishlist.includes(ele?.id)? <i className=" text-red-500 text-lg cursor-pointer fa-solid fa-heart"
       onClick={()=>removeWishList(ele?.id)}></i>:<i onClick={()=>addtowishlist(ele?.id)} className=" text-red-500 text-lg cursor-pointer fa-regular fa-heart"
       ></i>}
      </div>
      <div className='flex-1 text-center'><i className=" text-gray-500 text-lg cursor-pointer fa-solid fa-pencil hover:text-blue-500" onClick={()=>{setIsModalOpen(true); setUserEditId(ele?.id)}}></i></div>
      <div className='flex-1 text-center'><i className=" text-gray-500 text-lg cursor-pointer fa-solid fa-trash-can hover:text-red-500" onClick={()=>deleteUser(ele?.id)}></i></div>
     </div>
  </div>
})}
</div>
 </div>
 
<EditUserModal setUsersData={setUsersData} isModalOpen={isModalOpen} usersdata={usersdata} id={userEditid} setIsModalOpen={setIsModalOpen}/>
 </>
  );
}

export default App;
