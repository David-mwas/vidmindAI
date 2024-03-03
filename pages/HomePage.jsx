import { useState, useEffect } from "react";
import { BackgroundBeamsDemo } from "../components/BackgroundBeamsDemo";
import SideBar from "../components/SideBar";
import { Auth } from "./Login";

function HomePage() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    setIsAuth(JSON.parse(localStorage.getItem("isAuth")));
    // if (!isAuth) {
    //   window.location.href = "/";
    // }
  }, []);
  return (
    <>
      {isAuth ? (
        <>
          <div className="text-3xl font-bold bg-black w-full h-full flex flex-col ">
            <div className="flex flex-row">
              <SideBar />
              <BackgroundBeamsDemo />
            </div>
          </div>
        </>
      ) : (
        <Auth />
      )}
    </>
  );
}

export default HomePage;
