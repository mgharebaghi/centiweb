"use client";

import {
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Col, Row } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { BsBack } from "react-icons/bs";
import { GrValidate } from "react-icons/gr";
import { IoReorderThree } from "react-icons/io5";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { PulseLoader } from "react-spinners";
import CustomDrawer from "./components/drawer";

function Menu() {
  const tabsClass =
    "transition duration-190 text-slate-500 hover:bg-slate-100 rounded-[25px]";

  const [value, setValue] = useState(Number);
  const pathname = usePathname();
  const router = useRouter();
  const [coins, setCoins] = useState(null);
  const screenMatch = useMediaQuery("(min-width: 1366px)");
  const [toggle, setToggle] = useState(Boolean);

  useEffect(() => {
    remainingCoins(); //get coins from server

    if (pathname === "/") {
      setValue(-1);
    }
    if (pathname === "/login") {
      setValue(-1);
    }
    if (pathname === "/admin") {
      setValue(-1);
    }
    if (pathname === "/scan") {
      setValue(0);
    }
    if (pathname === "/articles/666c1c7dad6166e10de349d4") {
      setValue(1);
    }
    if (pathname === "/articles/666c1f2ead6166e10de349d5") {
      setValue(2);
    }
    if (pathname === "/articles/666d578ca47c55a489719a16") {
      setValue(3);
    }
    if (pathname === "/download") {
      setValue(4);
    }
    if (pathname === "/dev") {
      setValue(5);
    }
  }, [pathname]);

  const remainingCoins = async () => {
    await fetch("/api/coins")
      .then((res) => res.json())
      .then((data) => setCoins(data.message))
      .catch(() => setCoins(null));
  };

  return (
    <Toolbar className="w-full backdrop-blur bg-white/70 h-[75px] fixed z-10 flex items-center shadow-md">
      {screenMatch ? (
        <>
          <Col xs={4} sm={4} md={4} lg={7} xl={7} xxl={7}>
            <img
              src="/images/Logo.png"
              onClick={() => {
                router.push("/");
                setValue(-1);
              }}
              className="w-[60px] h-[60px] cursor-pointer"
            />
          </Col>
          <Col xs={5} sm={5} md={5} lg={10} xl={10} xxl={10}>
            <Tabs
              key={0}
              value={value >= 0 ? value : null}
              sx={{
                marginLeft: "auto",
                "& button.Mui-selected": {
                  color: "#1F313F",
                  backgroundColor: "#DCE9F3",
                  zIndex: "1",
                  borderRadius: "25px",
                },
              }}
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#DCE9F3",
                  color: "#34424E",
                  height: "100%",
                  borderRadius: "25px",
                },
              }}
              className="w=[100%] grid justify-center"
            >
              <Tab
                key={1}
                label={<Typography>scan</Typography>}
                className={tabsClass}
                onClick={() => {
                  window.scroll(0, 0);
                  router.push("/scan");
                  setValue(0);
                }}
                // icon={<MdOutlineDocumentScanner />}
              />
              <Tab
                key={2}
                label={<Typography>validator</Typography>}
                className={tabsClass}
                onClick={() => {
                  window.scroll(0, 0);
                  router.push("/articles/666c1c7dad6166e10de349d4");
                  setValue(1);
                }}
                // icon={<GrValidate />}
              />
              <Tab
                key={3}
                label={<Typography>relay</Typography>}
                className={tabsClass}
                onClick={() => {
                  window.scroll(0, 0);
                  router.push("/articles/666c1f2ead6166e10de349d5");
                  setValue(2);
                }}
                // icon={<SiRelay />}
              />
              <Tab
                key={4}
                label={<Typography>whitepaper</Typography>}
                className={tabsClass}
                onClick={() => {
                  window.scroll(0, 0);
                  router.push("/articles/666d578ca47c55a489719a16");
                  setValue(3);
                }}
                // icon={<IoMdPaper />}
              />
              <Tab
                key={4}
                label={<Typography>download</Typography>}
                className={tabsClass}
                onClick={() => {
                  window.scroll(0, 0);
                  router.push("/download");
                  setValue(4);
                }}
                // icon={<IoDownloadOutline />}
              />
              <Tab
                key={5}
                label={<Typography>dev</Typography>}
                className={tabsClass}
                onClick={() => {
                  window.scroll(0, 0);
                  router.push("/dev");
                  setValue(5);
                }}
                // icon={<LiaLaptopCodeSolid />}
              />
            </Tabs>
          </Col>
          <Col
            xs={15}
            sm={15}
            md={15}
            lg={7}
            xl={7}
            xxl={7}
            className="text-slate-600 select-none text-right"
          >
            {coins ? (
              <Typography fontWeight="bold">
                Remaining CENTIs: {Number(coins).toLocaleString()}
              </Typography>
            ) : (
              <PulseLoader size="5" />
            )}
          </Col>
        </>
      ) : (
        <>
          <Col xs={3} sm={3} md={2} lg={2} className="grid justify-center">
            <img
              src="/images/Logo.png"
              onClick={() => {
                router.push("/");
                setValue(-1);
              }}
              className="w-[100%] h-[100%] cursor-pointer"
            />
          </Col>
          <Col xs={18} sm={18} md={20} lg={20}>
            {coins ? (
              <>Remaining CENTIs: {Number(coins).toLocaleString()}</>
            ) : null}
          </Col>
          <Col xs={3} sm={3} md={2} lg={2}>
            <div className="text-slate-600 float-right">
              {coins ? (
                <IoReorderThree
                  className="w-8 h-8"
                  onClick={() => setToggle(!toggle)}
                />
              ) : (
                <PulseLoader size={5} />
              )}
              <CustomDrawer toggle={toggle} setToggle={setToggle} router={router} setValue={setValue} />
            </div>
          </Col>
        </>
      )}
    </Toolbar>
  );
}

export default Menu;
