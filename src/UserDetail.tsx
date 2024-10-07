import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UserUpdateForm from "./Components/UserUpdateForm";
import "./Components/components.css";
function UserDetail() {
  interface Address {
    street: string;
    suite?: string;
    city: string;
    zipcode?: string;
    geo?: {
      lat: string;
      lng: string;
    };
  }
  interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company?: {
      name: string;
      catchPhrase: string;
      bs: string;
    };
  }
  const { id } = useParams<{ id: string }>();
  const [ID,setid]=useState<string>('')
  const navigate =useNavigate()
  const [userdata, setUserdata] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const fetchData = async (): Promise<void> => {
    try {
      // since we dont have more 10 person so this API will not give the response to custom that we created so we use another method
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      setUserdata(data);
      if (id) {
        setid(id)
      }
    
      setLoading(false);
      console.log(data);
    } catch (error) {
      alert("Error fetching data:");
    }
  };
  const handleupdate = (): void => {
    document.querySelector(".form2")?.classList.toggle("hidden");
  };
  const handleDelete = () => {
    document.querySelector(".delete")?.classList.toggle("hidden");
  };
  const DeleteUser = () => {
    const storedElements = localStorage.getItem("Elements");
    if (storedElements) {
      let temp = JSON.parse(storedElements);
      let newdata = temp.filter((items: User) => {
        if (id != items.id) {

          return items;
       
          
        }
        else{
          return
        }
      });
      console.log(newdata);
      
      localStorage.setItem("Elements", JSON.stringify(newdata));
      alert("user Deleted");
      navigate("/")
    }
  };
  const RenderUi = async()=>{
    let data = localStorage.getItem("Elements")
   
    
    if (data) {
        let local = await JSON.parse(data)
        
        if (local.length != 0) {
         console.log("sd");
        //  console.log(local);
         
        let newdata :User =  local.filter((items:User)=>{
          //  console.log(items);
           if (items.id==id) {
            // console.log(items);
         setUserdata(items)
           }  
          })
         
   
        // console.log(newdata);
        
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
    // used settimeout for elaying to show the actual loading state
     RenderUi()
  }, []);

  return (
    <div className="w-full  flex items-center justify-center m-auto text-[1.8vw] max-sm:text-[3.5vw] text-white  ">
      <div className="form2 hidden fixed top-0 left-0 right-0 bottom-0 overflow-y-scroll  w-full bg-white/5 z-[999] backdrop-blur-lg ">
        <div className="p-5">
          <svg
            onClick={(): void => {
              handleupdate();
            }}
            className="ml-auto mr-0 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            height="2vw"
            viewBox="0 -960 960 960"
            width="2vw"
            fill="#e8eaed"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </div>
        <UserUpdateForm personId={`${id}`} />
      </div>

      <div className="delete hidden  fixed top-0 left-0 right-0 bottom-0 overflow-y-scroll  w-full bg-white/5 z-[999] backdrop-blur-lg">
        <div>
          <svg
            onClick={(): void => {
              handleDelete();
            }}
            className="ml-auto mr-0 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            height="2vw"
            viewBox="0 -960 960 960"
            width="2vw"
            fill="#e8eaed"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </div>
        {/* delete functionality */}
        <div className="">
          <p>Are you Sure Want To delete This user</p>

          <div className="flex  sm:space-x-5 max-sm:space-x-1 justify-center  sm:text-[1.6vw] max-sm:text-[2vw] ">
            <div
              onClick={(): void => {
            
                  DeleteUser();
                
              }}
              className="border-2  bg-white"
            >
              <button className="   bg-white text-black  flex items-center  p-2 ">
                Yes
              </button>
            </div>
            {/* userform data */}

            <div className="bg-[#161515] px-3 flex items-center ">
              <button onClick={() => {handleDelete()}} className="    block  ">
                No
              </button>
            </div>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <span className="loaderer "></span>
        </div>
      ) : (
        <div className=" w-4/5 relative">
          <br />
          <div className="flex  sm:space-x-5 max-sm:space-x-1 justify-center  sm:text-[1.6vw] max-sm:text-[2vw] ">
            <div
              onClick={(): void => {
                handleupdate();
              }}
              className="border-2 rounded-full bg-[#161515] p-2"
            >
              <button className="   text-green-600 block   ">
                Update User
              </button>
            </div>
            {/* userform data */}

            <div className="bg-[#161515] border-2 rounded-full p-2">
              <button
                onClick={() => {
                  handleDelete();
                }}
                className="   text-red-600 block  "
              >
                Delete User
              </button>
            </div>
          </div>
          <br />
          <div>
            <p className="border-b-2 border-white py-[0.5em]">
              Basic Information
            </p>
            <p>
              {" "}
              <span className="rawtext"> UerName:</span> User-
              {userdata?.username}
            </p>
            <p>
              {" "}
              <span className="rawtext">Name :</span> {userdata?.name}
            </p>
            <p>
              {" "}
              <span className="rawtext">Email :</span> {userdata?.email}
            </p>
            <p>
              {" "}
              <span className="rawtext">Phone :</span> {userdata?.phone}
            </p>
          </div>
          <br />
          <div>
            <p className="border-b-2 border-white py-[0.5em]">
              Address Information
            </p>
            <p>
              {" "}
              <span className="rawtext"> Address :</span>
              {userdata?.address?.street} ,{userdata?.address?.suite}{" "}
              {userdata?.address?.city} -{userdata?.address?.zipcode}{" "}
            </p>
            <p className="text-yellow-100">Additional Data</p>
            <p>
              <span className="rawtext"> Geo :</span> lat-(
              {userdata?.address?.geo?.lat}) , lng-({userdata?.address?.geo?.lng}){" "}
            </p>
          </div>
          <br />
          <div>
            <p className="border-b-2 border-white py-[0.5em]">
              Other Information
            </p>
            <p>
              {" "}
              <span className="rawtext"> Website :</span> {userdata?.website}{" "}
            </p>
            <p>
              {" "}
              <span className="rawtext">Company name :</span>{" "}
              {userdata?.company?.name}
            </p>
            <p>
              {" "}
              <span className="rawtext"> Company catchPhrase :</span>{" "}
              {userdata?.company?.catchPhrase}
            </p>
            <p>
              {" "}
              <span className="rawtext">Company Bs :</span>{" "}
              {userdata?.company?.bs}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDetail;
