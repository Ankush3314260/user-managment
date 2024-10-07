import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Props {
  personId: string;
}

const UserUpdateForm: React.FC<Props> = ({ personId }) => {
  // Define the Address and Company interfaces
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

  interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
  }

  interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company?: Company;
  }
const navigate =useNavigate()
  // Define the Zod schema with consistent naming
  const UserSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Must be a valid email"),
    phone: z
      .string()
      .length(10, "Phone number must be exactly 10 digits")
      .regex(/^\d{10}$/, "Phone number must contain only digits"),
    username: z.string().min(3, "Minimum 3 characters required"),
    street: z.string().min(1, "Please enter a valid Street"),
    city: z.string().min(1, "Please enter a valid City"),
    suite: z.string().min(3, "Please enter a valid Apt. value").optional(),
    zipcode: z
      .string()
      .min(3, "Please enter a valid Zip Code (minimum 3 characters)")
      .regex(/^\d+$/, "Zip Code must be a numeric value")
      .optional(),
    lat: z
      .string()
      .min(3, "Latitude must contain at least 3 digits")
      .regex(/^\d+$/, "Latitude must be a numeric value")
      .optional(),
    lng: z
      .string()
      .min(3, "Longitude must contain at least 3 digits")
      .regex(/^\d+$/, "Longitude must be a numeric value")
      .optional(),
    website: z.string().url("Must start with http:// or https://").optional(),
    companyName: z
      .string()
      .min(3, "Company Name must be at least 3 characters long")
      .optional(),
  });

  type UserFormInputs = z.infer<typeof UserSchema>;

  const [userdata, setUserdata] = useState<User | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormInputs>({
    resolver: zodResolver(UserSchema),
  });
// here we made the put request 
  const handleUpdateUser = async (newUser: UserFormInputs) => {
    // console.log("Form Submitted with data:", newUser);

    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${personId}`,
        newUser
      );
      // console.log(newUser);
      console.log(response);
      

      
       document.querySelector(".form2")?.classList.toggle("hidden");

      // Access localStorage
      const storedElements = localStorage.getItem("Elements")
console.log(storedElements);

      if (storedElements) {
        // Parse the stored elements from localStorage
        let temp: User[] = JSON.parse(storedElements);
        console.log(temp);

        // Update the user with the specified personId
        const updatedData = temp.map((user: User) => {
          if (user.id == personId) {
            return {
              ...user,
              name: newUser.name,
              email: newUser.email,
              phone: newUser.phone,
              username: newUser.username,
              address: {
                ...user.address,
                street: newUser.street,
                suite: newUser.suite,
                city: newUser.city,
                zipcode: newUser.zipcode,
                geo: {
                  lat: newUser.lat || user.address.geo?.lat || "",
                  lng: newUser.lng || user.address.geo?.lng || "",
                },
              },
              website: newUser.website || user.website,
              company: {
                ...user.company,
                name: newUser.companyName || user.company?.name || "",
              },
            };
          }
          return user; // Return unchanged user
        });

        // Update the localStorage with the new array
        localStorage.setItem("Elements", JSON.stringify(updatedData));
        alert("User updated successfully!");
  navigate("/")
      } else {
        alert("No existing data found in localStorage.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user.");
    }
  };

  const onSubmit: SubmitHandler<UserFormInputs> = (data) => {
    handleUpdateUser(data);
  };

  const fetchData = async (): Promise<void> => {

    try {
      const { data } = await axios.get<User>(
        `https://jsonplaceholder.typicode.com/users/${personId}`
      );

      // setUserdata(data);
      // setLoading(false);

      // Set default form values
      reset({
        name: data.name,
        email: data.email,
        phone: data.phone,
        username: data.username ,
        street: data.address.street,
        city: data.address.city,
        suite: data.address.suite || "",
        zipcode: data.address.zipcode || "",
        lat: data.address.geo?.lat || "",
        lng: data.address.geo?.lng || "",
        website: data.website || "",
        companyName: data.company?.name || "",
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching user data.");
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    // Adding a delay to simulate loading
    let data =localStorage.getItem("Elements")
    if (data) {
        let local = JSON.parse(data)
        if (local.length!==0) {
          setUserdata(local)  
          setLoading(false) 
          fetchData();
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
   

     // Cleanup the timer on unmount
  }, [personId]); // Add personId as a dependency

  if (loading) {
    return (
      <div className="text-[1.5vw] max-sm:text-[5vw] flex items-center justify-center min-h-screen w-4/5 m-auto text-white rounded-[10px]">
        <span className="loaderer"></span>
      </div>
    );
  }

  if (error || !userdata) {
    return (
      <div className="text-center text-red-500">
        <p>Error loading user data.</p>
      </div>
    );
  }

  return (
    <div className="text-[1.5vw] max-sm:text-[5vw] flex items-center justify-center min-h-screen w-4/5 m-auto text-white rounded-[10px]">
      <form
        className="relative z-[99999] w-full max-w-2xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Information Sections */}
        <div className="mb-6">
          <p className="border-b-2 max-sm:border-b-[1px] border-gray-300 p-5 max-sm:p-1">
            Basic Information
          </p>
          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-10 max-sm:gap-5 mt-4">
            <div className="p-2 ">
              User-
          <input
                {...register("username")}
                id="name"
                readOnly
                className="datainput w-full"
                placeholder="Enter name"
              />
            </div>
            <div className="p-2">
              <label htmlFor="name" className="block mb-1">
                Name:
              </label>
              <input
                {...register("name")}
                id="name"
                className="datainput w-full"
                placeholder="Enter name"
              />
              {errors.name && (
                <p className="text-red-700 font-semibold text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="p-2">
              <label htmlFor="email" className="block mb-1">
                Email:
              </label>
              <input
                {...register("email")}
                id="email"
                className="datainput w-full"
                placeholder="Enter email"
              />
              {errors.email && (
                <p className="text-red-700 font-semibold text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="p-2">
              <label htmlFor="phone" className="block mb-1">
                Phone:
              </label>
              <input
                {...register("phone")}
                id="phone"
                className="datainput w-full"
                placeholder="Enter phone number"
              />
              {errors.phone && (
                <p className="text-red-700 font-semibold text-sm">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="mb-6">
          <p className="border-b-2 max-sm:border-b-[1px] border-gray-300 p-5 max-sm:p-1">
            Address Section
          </p>
          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-10 max-sm:gap-5 mt-4">
            <div className="p-2">
              <label htmlFor="street" className="block mb-1">
                Street:
              </label>
              <input
                {...register("street")}
                id="street"
                className="datainput w-full"
                placeholder="Enter street"
              />
              {errors.street && (
                <p className="text-red-700 font-semibold text-sm">
                  {errors.street.message}
                </p>
              )}
            </div>
            <div className="p-2">
              <label htmlFor="city" className="block mb-1">
                City:
              </label>
              <input
                {...register("city")}
                id="city"
                className="datainput w-full"
                placeholder="Enter city"
              />
              {errors.city && (
                <p className="text-red-700 font-semibold text-sm">
                  {errors.city.message}
                </p>
              )}
            </div>
            <div className="p-2">
              <label htmlFor="suite" className="block mb-1">
                Suite:
              </label>
              <input
                {...register("suite")}
                id="suite"
                className="datainput w-full"
                placeholder="Enter suite"
              />
              {errors.suite && (
                <p className="text-red-700 font-semibold text-sm">
                  {errors.suite.message}
                </p>
              )}
            </div>
            <div className="p-2">
              <label htmlFor="zipcode" className="block mb-1">
                Zipcode:
              </label>
              <input
                {...register("zipcode")}
                id="zipcode"
                className="datainput w-full"
                placeholder="Enter zipcode"
              />
              {errors.zipcode && (
                <p className="text-red-700 font-semibold text-sm">
                  {errors.zipcode.message}
                </p>
              )}
            </div>
            <div className="p-2">
              <label htmlFor="lat" className="block mb-1">
                Latitude:
              </label>
              <input
                {...register("lat")}
                id="lat"
                className="datainput w-full"
                placeholder="Enter latitude"
              />
              {errors.lat && (
                <p className="text-red-700 font-semibold text-sm">
                  {errors.lat.message}
                </p>
              )}
            </div>
            <div className="p-2">
              <label htmlFor="lng" className="block mb-1">
                Longitude:
              </label>
              <input
                {...register("lng")}
                id="lng"
                className="datainput w-full"
                placeholder="Enter longitude"
              />
              {errors.lng && (
                <p className="text-red-700 font-semibold text-sm">
                  {errors.lng.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Other Information Section */}
        <div className="mb-6">
          <p className="border-b-2 max-sm:border-b-[1px] border-gray-300 p-5 max-sm:p-1">
            Other Information
          </p>
          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-10 max-sm:gap-5 mt-4">
            <div className="p-2">
              <label htmlFor="website" className="block mb-1">
                Website:
              </label>
              <input
                {...register("website")}
                id="website"
                className="datainput w-full"
                placeholder="Enter website URL"
              />
              {errors.website && (
                <p className="text-red-700 font-semibold text-sm">
                  {errors.website.message}
                </p>
              )}
            </div>
            <div className="p-2">
              <label htmlFor="companyName" className="block mb-1">
                Company Name:
              </label>
              <input
                {...register("companyName")}
                id="companyName"
                className="datainput w-full"
                placeholder="Enter company name"
              />
              {errors.companyName && (
                <p className="text-red-700 font-semibold text-sm">
                  {errors.companyName.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-4/5 p-2 bg-gray-200 hover:bg-white text-black cursor-pointer transition duration-200"
          >
            Update User
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserUpdateForm;
