import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function CreateUserform() {
  // provided internface for outline of type checking

  const UserSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Must be a valid email"),
    phone: z
      .string()
      .length(10, "Phone number must be exactly 10 digits")
      .regex(/^\d{10}$/, "Phone number must contain only digits"),
    username: z.string().min(3, "At least 3 character"),
    street: z.string().min(1, "Please enter a valid Name"),
    city: z.string().min(1, "Please enter a valid city"),
    suit: z.string().min(3, "Please enter a valid Apt. value").optional(),
    zipcode: z
      .string()
      .min(3, "Please enter a valid zip code must be minimum 3 character")
      .regex(/^\d+$/, "Latitude must be a numeric value")
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
    website: z.string().url("should start with http:// or https://").optional(),
    companyName: z
      .string()
      .min(3, "Company Name must be at least 3 characters long")
      .optional(),
  });
  const navigation =useNavigate()
  type UserFormInputs = z.infer<typeof UserSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormInputs>({
    resolver: zodResolver(UserSchema),
  });
  const handleCreateUser = async (newUser: UserFormInputs) => {
   
    try {

      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        newUser
      );
       let data =newUser
      console.log(data);
      
      alert("User Created")
      navigation("/")
      document.querySelector(".form")?.classList.toggle("hidden")
      
      // Access localStorage
      const storedElements = localStorage.getItem("Elements");
      if (storedElements) {
        let temp = JSON.parse(storedElements);
        console.log(temp);
        
        let newdata = [...temp,data];
        localStorage.setItem("Elements", JSON.stringify(newdata));
      }

   
    } catch (error) {
      alert("Error creating user:");
   
    }
  };
  const onSubmit: SubmitHandler<UserFormInputs> = (data) => {
    handleCreateUser(data);
  };

  return (
    <div className="text-[1.5vw] max-sm:text-[5vw]  w-4/5 m-auto  text-white rounded-[10px] sm:py-20 max-sm:py-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* firstName input */}
        <p>Note * the user created by this form  will not reflect the original database bcause the API is only have Fetch Functionality so it won't give the details onidividual  </p>
        <p className="border-b-2 max-sm:border-b-[1px] border-gray-300  p-5 max-sm:p-1">
          Basic Information
        </p>
        <br />
        <div className=" grid grid-cols-2 max-sm:grid-cols-1 gap-10 max-sm:gap-5 ">
          <div className=" p-2 sm:m-auto">

            <label htmlFor="username">User - &nbsp;</label>
            <input   {...register("username")} className="datainput " name="username" placeholder="username" />
            {errors.username && (
              <p className="text-red-700 font-semibold sm:text-[1vw]">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="p-2 sm:m-auto">
            <label htmlFor="name">Name : </label>
            <input
              {...register("name")}
              className="datainput"
              name="name"
              placeholder="Name"
            />
            {errors.name && (
              <p className="text-red-700 font-semibold sm:text-[1vw]">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="p-2 sm:m-auto">
            <label htmlFor="email">Email : </label>
            <input
              {...register("email")}
              className="datainput"
              name="email"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-700 font-semibold sm:text-[1vw]">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="p-2 sm:m-auto">
            <label htmlFor="phone">Phone : </label>
            <input
              {...register("phone")}
              className="datainput"
              name="phone"
              placeholder="Phone"
            />
            {errors.phone && (
              <p className="text-red-700 font-semibold sm:text-[1vw]">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>
        <br />
        <p className="border-b-2 max-sm:border-b-[1px] border-gray-300 ">
          Address Section
        </p>
        <br />
        <div className=" grid grid-cols-2 max-sm:grid-cols-1">
          <div className="p-2 sm:m-auto">
            <label htmlFor="street">Street : </label>
            <input
              {...register("street")}
              className="datainput"
              name="street"
              placeholder="Street"
            />
            {errors.street && (
              <p className="text-red-700 font-semibold sm:text-[1vw]">
                {errors.street.message}
              </p>
            )}
          </div>
          <div className="p-2 sm:m-auto">
            <label htmlFor="city">City : </label>
            <input
              {...register("city")}
              className="datainput"
              name="city"
              placeholder="city"
            />
            {errors.city && (
              <p className="text-red-700 font-semibold sm:text-[1vw]">
                {errors.city.message}
              </p>
            )}
          </div>
          <div className="p-2 sm:m-auto">
            <label htmlFor="suit">Suit : </label>
            <input
              {...register("suit")}
              className="datainput"
              name="suit"
              placeholder="Suit"
            />
            {errors.suit && (
              <p className="text-red-700 font-semibold sm:text-[1vw]">
                {errors.suit.message}
              </p>
            )}
          </div>
          <div className="p-2 sm:m-auto">
            <label htmlFor="zipcode">Zipcode : </label>
            <input
              {...register("zipcode")}
              className="datainput"
              name="zipcode"
              placeholder="Zipcode"
            />
            {errors.zipcode && (
              <p className="text-red-700 font-semibold sm:text-[1vw]">
                {errors.zipcode.message}
              </p>
            )}
          </div>
          <div className="p-2 sm:m-auto">
            <label htmlFor="lat">lat : </label>
            <input
              {...register("lat")}
              className="datainput"
              name="lat"
              placeholder="latitude"
            />
            {errors.lat && (
              <p className="text-red-700 font-semibold sm:text-[1vw]">
                {errors.lat.message}
              </p>
            )}
          </div>
          <div className="p-2 sm:m-auto">
            <label htmlFor="lng">lng : </label>
            <input
              {...register("lng")}
              className="datainput"
              name="lng"
              placeholder="longitude"
            />
            {errors.lng && (
              <p className="text-red-700 font-semibold sm:text-[1vw]">
                {errors.lng.message}
              </p>
            )}
          </div>
        </div>
        <br />
        <p className="border-b-2 max-sm:border-b-[1px] border-gray-300 ">
          Other Information
        </p>
        <br />
        <div className="grid grid-cols-2 max-sm:grid-cols-1">
          <div className="p-2 sm:m-auto">
            <label htmlFor="website">Website : </label>
            <input
              {...register("website")}
              className="datainput"
              name="website"
              placeholder="Website"
            />
            {errors.website && (
              <p className="text-red-700 font-semibold sm:text-[1vw]">
                {errors.website.message}
              </p>
            )}
          </div>
          <div className="p-2 sm:m-auto">
            <label htmlFor="companyName">Compnay Name : </label>
            <input
              {...register("companyName")}
              className="datainput"
              name="companyName"
              placeholder="Company"
            />
            {errors.companyName && (
              <p className="text-red-700 font-semibold sm:text-[1vw]">
                {errors.companyName.message}
              </p>
            )}
          </div>
        </div>
        <br />
        <input
          type="submit"
          className="block w-4/5 p-2 hover:transition-all hover:duration-200 m-auto bg-gray-200 hover:bg-white text-black cursor-pointer"
        />
      </form>
    </div>
  );
}

export default CreateUserform;
