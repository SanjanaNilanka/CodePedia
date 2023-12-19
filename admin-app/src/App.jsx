import "./App.css";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import Body from "./components/Body";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const lightTheme = createTheme({
  type: "light",
  theme: {
    colors: {
      error: "#dc3545",
      secondary: "#edeff1",
    },
  },
});

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      error: "#dc3545",
      secondary: "#1e2122",
    },
  },
});

function App() {
  const location = useLocation();
  const [hide, setHide] = useState("");
  const [loginPage, setLoginPage] = useState("");
  const [registerPage, setRegisterPage] = useState("");

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname === "/login") {
      setHide("sidebar-navbar-hide");
      setLoginPage("right-section-login");
    } else if(pathname === "/register"){
      setHide("sidebar-navbar-hide");
      setRegisterPage("right-section-login");
    }
    else {
      setHide("");
      setLoginPage("right-section");
    }
  });
 

  const [isDark, setIsDark] = useState();

  useEffect(() => {
    const getIsDark = localStorage.getItem("isDark");

    if (getIsDark === null) {
      setIsDark(false);
    } else if (getIsDark === "true") {
      setIsDark(true);
    } else if (getIsDark === "false") {
      setIsDark(false);
    }
  });

  return (
    <div style={{ overflowY: "hidden", height: "100vh" }}>
      <NextUIProvider theme={isDark ? darkTheme : lightTheme}>
        <div className="main">
          <section className={`left-section ${hide}`}>
            <div className={hide}>
              {" "}
              <SideBar isDark={isDark} />
            </div>
          </section>

          <section className={loginPage||registerPage}>
            <div className={hide}>
              <NavBar
                onTroggleTheme={() => setIsDark(!isDark)}
                isDark={isDark}
              />
            </div>
            <Body isDark={isDark} />
          </section>

  
        </div>
      </NextUIProvider>
    </div>
  );
}

export default App;
