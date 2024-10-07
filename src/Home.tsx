import { useEffect, useState } from "react";
import TableSkeletonLoader from "./Components/TableSkeletonLoader";
import axios from "axios";
import "./Components/components.css";
import {  useNavigate } from "react-router-dom";
function App() {
  interface User {
    id: String;
    name: String;
    username: String;
    email: String;
    address: String;
    phone: String;
    website: String;
    company: String;
  }
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<boolean>(false);
  const [search ,setSearch ]=useState<string>('')
  const handlnavigate = (id: String): void => {
    navigate(`/user/${id}`);
  };
  const fetchData = async (): Promise<void> => {
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUserdata(data);
       localStorage.setItem("Elements",JSON.stringify(data))
      setLoading(false);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const createUser=():void=>{
     navigate("/createuser")
     
  }

  const RenderUi =()=>{
    let data =localStorage.getItem("Elements")
    if (data) {
        let local = JSON.parse(data)
        if (local.length!==0) {
          setUserdata(local)  
          setLoading(false) 
        }
        else{
          setTimeout(() => {
            fetchData();
          }, 2000);
        }
    
    }
    else{
      setTimeout(() => {
        fetchData();
      }, 2000);
    }
  }
  useEffect(() => {
    // here i use settime out becasue the data is low so it can render fast then the skeleton loading screen will not seeing because it is fast.
    window.addEventListener("storage", ()=>{
      
    });
    RenderUi()
    return () => {
      window.removeEventListener("storage", ()=>{
      
      });
    };
  }, []);
  return (
    <div className="min-h-screen bg-[#111111] text-[3vw] max-sm:text-[4.5vw] relative ">

      <h1 className="  text-white py-[1em] px-[2em] max-sm:text-center">

        User Management Application
      </h1>
      {/* search bar code */}
      <div className="m-auto  text-[0.5em] px-[1em] rounded-full w-max border-2 max-sm:w-4/5 bg-white">
         <input type="text" className="outline-none bg-white p-2 "  onChange={(e)=>{setSearch(e.target.value)   
         }} placeholder="User-name" />
      </div>
      <br />
    
      <div className="px-[2em]" >
        <button onClick={():void=>{createUser()}} className="bg-[#161515]  border-2 text-[#ffffff] block rounded-xl sm:text-[1.2vw] max-sm:text-[2vw] sm:px-[1em] sm:py-[0.5em]     max-sm:p-1 ">
          Create User
        </button>
      </div>

<br />
      {loading ? (
        <TableSkeletonLoader />
      ) : (
        <div className="text-[1.7vw] min-w-[200px] m-auto max-sm:w-full  flex justify-center tablehome">
          <table className="text-[0.7em] Atable  bg-slate-200 ">
            <thead>
              <tr>
                <th>
                  <div className="headings"> User Name</div>
                </th>
                <th>
                  <div className="headings"> Name</div>
                </th>
                <th>
                  <div className="headings"> Email </div>
                </th>
                <th>
                  <div className="headings"> Phone </div>
                </th>
                <th>
                  <div className="headings"> Website</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {userdata.filter((items:User)=>{
                 
                 return search.toLowerCase()===''?items:items.username.toLowerCase().includes(search)
               
              }).map((element: User, index: number) => {
                return (
                  <tr
                    key={index}
                    className="p-5 cursor-pointer row2"
                    onClick={(): void => {
                      handlnavigate(element.id);
                    }}
                  >
                    <td className="td">
                      <div>{element.username}</div>
                    </td>
                    <td className="td">
                      <div>{element.name}</div>
                    </td>
                    <td className="td">
                      <div>{element.email}</div>
                    </td>
                    <td className="td">
                      <div>{element.phone}</div>
                    </td>
                    <td className="td">
                      <div>{element.website}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

     
    </div>
  );
}

export default App;
