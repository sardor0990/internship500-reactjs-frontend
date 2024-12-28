import React, { useState, Suspense, FormEvent, useEffect, ChangeEvent } from "react";
import Arrow from "../../assets/icons/arrow-right-white.svg";
import ArrowBlack from "../../assets/icons/arrow-right.svg";
import { useNavigate } from "react-router-dom";
import VerificationInput from "react-verification-input";
import request from "../../services/api/index";
import { Button, CustomInput, Select } from "../Customs";
import { message } from "antd";

interface LoginData {
  login: string;
  password: string;
}


const Login: React.FC = () => {
  const Spline = React.lazy(() => import("@splinetool/react-spline"));

  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [data, setLoginData] = useState<LoginData>({
    login: "",
    password: ""
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const target = e.target as HTMLInputElement;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await request.post("admin/auth/sign-in", {data});
      if(res.status === 200){
        setLoginData(res.data);
        const accessToken = res.data.data.accessToken;
        localStorage.setItem("token", accessToken);
        navigate("/admin/tadbirlar");
        message.success('Boshqaruv paneli muvaffaqqiyatli ochildi!');
      } else {
        alert('Login yoki parol xato');
        message.error('Login yoki parol xato');
      }
        
    } catch (error) {
      message.error('Login yoki parol xato');
    }
  };

 useEffect(() => {
 }, []);


  const splineStyles = {
    width: "100%",
    height: "100%",
  };

  const steps = [
    {
      title: "First",
      content: (
        <div className="w-full min-w-[685px] max-w-[685px] h-[535px] rounded-[24px] flex flex-col items-center
        py-[30px] gap-[24px]  border border-solid z-10 border-1 border-[#E3E3E7] max-[750px]:border-none"
        >
          <p className="text-[#18181B]  text-[24px] font-[600]">Kirish</p>
          <div className="w-full max-w-[625px] flex flex-col gap-[25px]">
            <div className="flex items-center gap-[5px]">
            
             
            </div>
            <CustomInput placeholder="Login" value={data.login} onChange={handleChange}  name="login"/>
            <CustomInput placeholder="Parol*" password value={data.password} onChange={handleChange} name="password"/>
           
            {/* <p
              onClick={() => setCurrent((v) => v + 1)}
              className="text-[#161616]  text-end cursor-pointer text-[14px] font-[400] opacity-50"
            >
              Parolni unutdingizmi?
            </p> */}
            <div className="flex gap-[10px] w-full">
              <Button
                style={{ width: "100%" }}
                height={50}
                // onClick={() => setCurrent((v) => v + 1)}
                onClick={handleSubmit}
              >
                <div className="flex gap-[10px]">
                  <p className="text-[#fff]  text-[14px] font-[500] ">
                    Profilga kirish
                  </p>
                  <img src={Arrow} alt="" width={20} height={20} />
                </div>
              </Button>
            </div>           
          </div>
        </div>
      ),
    },
    // {
    //   title: "Second",
    //   content: (
    //     <div className="flex flex-col gap-[20px] mt-[100px] max-[400px]:mt-[0px]">
    //       <div
    //         className="flex gap-[10px] cursor-pointer px-[10px]"
    //         onClick={() => setCurrent((v) => v - 1)}
    //       >
    //         <img
    //           src={ArrowBlack}
    //           width={20}
    //           height={20}
    //           className="rotate-180"
    //         />
    //         <p className="text-[#161616]  text-[14px] font-[600] ">
    //           Ortga qaytish
    //         </p>
    //       </div>

    //       <div
    //         className="w-full max-w-[685px] h-[300px] px-[30px]  rounded-[24px] flex flex-col items-center  max-[400px]:mt-[100px]
    //     py-[30px] gap-[24px]  border border-solid z-10 border-1 border-[#E3E3E7] max-[750px]:border-none"
    //       >
    //         <p className="text-[#18181B] text-[24px] font-[600] ">
    //           Parolni qayta o’rnatish
    //         </p>
    //         <p className="text-[#161616]  text-start text-[14px] font-[400] opacity-50">
    //           Parolni qayta o’rnatish bo’yicha ko’rsatmalarni jo’natishimiz
    //           uchun Telefon raqamingiz yoki E-mailingizni kiriting
    //         </p>
    //         <div className="w-full max-w-[625px] flex flex-col gap-[25px]">
    //           <div className="flex items-center gap-[5px]">
    //             <div className="max-[750px]:hidden">
    //               <Select
    //                 options={[
    //                   { value: "Telefon raqam", label: "Telefon raqam" },
    //                   { value: "Email", label: "Email" },
    //                 ]}
    //                 width="210px"
    //                 placeholder="Telefon raqam"
    //               />
    //             </div>
    //             <div className="min-[750px]:hidden">
    //               <Select
    //                 options={[
    //                   { value: "Telefon raqam", label: "Telefon raqam" },
    //                   { value: "Email", label: "Email" },
    //                 ]}
    //                 width="120px"
    //                 placeholder="Telefon raqam"
    //               />
    //             </div>
    //             <div className="w-full">
    //               <CustomInput placeholder="+998" />
    //             </div>
    //           </div>

    //           <div className="flex gap-[10px] w-full">
    //             <Button
    //               style={{ width: "100%" }}
    //               height={50}
    //               onClick={() => setCurrent((v) => v + 1)}
    //             >
    //               <div className="flex gap-[10px]">
    //                 <p className="text-[#fff]  text-[14px] font-[500] ">
    //                   Ro’yxatdan o’tish
    //                 </p>
    //                 <img src={Arrow} alt="" width={20} height={20} />
    //               </div>
    //             </Button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   ),
    // },
    {
      title: "Last",
      content: (
        <div className="flex flex-col gap-[20px] mt-[200px] max-[400px]:mt-[0px]">
          <div
            className="flex gap-[10px] cursor-pointer"
            onClick={() => setCurrent((v) => v - 1)}
          >
            <img
              src={ArrowBlack}
              width={20}
              height={20}
              className="rotate-180"
            />
            <p className="text-[#161616]  text-[14px] font-[600] ">
              Ortga qaytish
            </p>
          </div>

          <div
            className="w-[685px] h-[237px] rounded-[24px]  flex flex-col items-center max-[700px]:w-full max-[400px]:mt-[100px]
        py-[30px] gap-[24px]  border border-solid z-10 border-1 border-[#E3E3E7] max-[700px]:border-none"
          >
            <p className="text-[#18181B]  text-[24px] font-[600] ">
              Parolni qayta o’rnatish
            </p>
            <p className="text-[#161616]  text-[14px] font-[400] opacity-50">
              **1216 raqamingizga yuborilgan kodni kiriting
            </p>
            <div className="w-full max-w-[310px]">
              <VerificationInput
                length={5}
                classNames={{
                  container: "container",
                  character: "character",
                  characterInactive: "character--inactive",
                  characterSelected: "character--selected",
                  characterFilled: "character--filled",
                }}
              />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full mb-[40px] flex  justify-center items-start gap-[100px]">
      <div className="h-full w-fit flex flex-col py-[30px] justify-start items-center">
        <div className="w-full flex justify-center">
          {steps[current].content}
        </div>
      </div>
    </div>
  );
};

export default Login;
