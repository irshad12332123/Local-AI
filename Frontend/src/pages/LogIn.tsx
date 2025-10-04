import { useEffect, useState } from "react"
import CustomInput from "../components/CustomInput"
import CustomButtton from "../components/CustomButtton"
import { useAuth } from "../context/authProvider"
import { Navigate, useNavigate } from "react-router-dom";

function LogIn() {
      const {login} = useAuth();
      const navigate = useNavigate();
      const [name, setName] = useState<string>("")
      const [password, setPassword] = useState<string>("")
      const accessToken = localStorage.getItem("accessToken");

      const handleSubmit =async(e: React.FormEvent) => {
          e.preventDefault();
          console.log("Submit clicked");
          try {
            await login(name, password);
            navigate('/')
          } catch (error) {
            alert("Invalid credentials");
          }
      }

  useEffect(() => {
    console.log('FROM LOGIN ',accessToken);
    if (accessToken) {
      navigate("/", { replace: true });
    }
  }, [accessToken, navigate]);

    return(
    <main className="flex bg-[#0b0219] h-screen w-screen justify-center items-center">
      <form action="/submit" onSubmit={handleSubmit} method="post" className="w-[50%] md:w-120 h-150 border-1 border-[rgba(153,140,175,0.35)] shadow-[0_0_10px_rgba(153,140,175,0.35)] flex flex-col p-5 rounded-4xl items-center justify-between">
        <p className="text-2xl pb-5 w-full text-white text-center border-b-1 border-[rgba(153,140,175,0.19)] ">Stay Local 🔐</p>
        <div  className="w-[70%] flex flex-col gap-5 " >
          <CustomInput placeholder="enter name" value={name} inputType="text" setValue={setName}/>
          <CustomInput placeholder="enter password" value={password} inputType="password" setValue={setPassword}/>
        </div>
          <div className="w-full  flex flex-col gap-5 justify-center items-center">
          <CustomButtton value="Log In" type="secondary" btnType="submit"/>
        </div>
      </form>
    </main>
  )
}

export default LogIn
