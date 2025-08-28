import React, { useContext, useState, useRef, useEffect } from "react";
import {
  LanguageDropdown,
  WidgetDropdown,
  ProfileDropdown,
} from "../components/header";
import { Button, Section, Box, Input, Label } from "../components/elements";
import { DrawerContext } from "../context/Drawer";
import { ThemeContext } from "../context/Themes";
import { Logo } from "../components";
import data from "../data/master/header.json";
import { AuthContext } from "../context/Auth";
import SelectField from "../components/fields/SelectField";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../apis/NodeApiUrl";

export default function Header() {
  const { drawer, toggleDrawer } = useContext(DrawerContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const searchRef = useRef();
  const {user}= useContext(AuthContext)
  const [scroll, setScroll] = useState("fixed");
  const [search, setSearch] = useState("");
  const CompanyDB = localStorage.getItem("companyDB");
   const [company, setCompany] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(CompanyDB || null);
  

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 0) setScroll("sticky");
    else setScroll("fixed");
  });

  // console.log("user in dashboard",user.UserName);
  document.addEventListener("mousedown", (event) => {
    if (!searchRef.current?.contains(event.target)) {
      setSearch("");
    }
  });

  const fetchCompany = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/GetCompany`);
  
      // console.log("data", res);
      const formattedData = res.data.map((wh) => ({
        label: wh.dbName + "  -  " + wh.cmpName,
        value: wh.dbName,
      }));
      setCompany(formattedData);
    } catch (error) {
      console.log("Item fetch error:", error);
    }
  };

  useEffect(() => {
     fetchCompany();},[])

  return (
    <Section as="header" className={`mc-header ${scroll}`}>
      <Logo
        src={data?.logo.src}
        alt={data?.logo.alt}
        name={data?.logo.name}
        href={data?.logo.path}
      />
      <Box className="mc-header-group">
        <Box className="mc-header-left">
          {/* <Button
            icon={data?.search.icon}
            className="mc-header-icon search"
            onClick={() => setSearch("show")}
          /> */}
         
          <Button
            icon={drawer ? "menu_open" : "menu"}
            className="mc-header-icon toggle"
            onClick={toggleDrawer}
          />
          {/* <Box className={`mc-header-search-group ${search}`}>
            <form className="mc-header-search" ref={searchRef}>
              <Button className="material-icons">{data?.search.icon}</Button>
              <Input type="search" placeholder={data?.search.placeholder} />
            </form>
          </Box> */}
        </Box>
        
        <Box className="mc-header-right">
          <Label className={"llegend"} >Select Company</Label>
           <SelectField style={{marginTop:"-25px",border:"1px solid black"}}
                   options={company}
                  //  label={"Select Company"}
                   value={selectedCompany}
                   name="CompanyDB"
                   onChange={(e) => {
                     const selectedValue = e.target.value;
                     localStorage.removeItem("companyDB");
                     localStorage.setItem("companyDB", selectedValue);
                     setSelectedCompany(selectedValue);
                     toast.success(`Company switched to ${selectedValue}`);
                     window.location.reload();
                    }}
                    />
          {/* <Button
            icon={theme}
            title={data.theme.title}
            onClick={toggleTheme}
            className={`mc-header-icon ${data.theme.addClass}`}
          /> */}
          {/* <Button icon="category" className="mc-header-icon" />
          <Button icon="print" className="mc-header-icon" />
          <Button icon="refresh" className="mc-header-icon" />
          <Button icon="help" className="mc-header-icon" />
          <LanguageDropdown
            icon={data.language.icon}
            title={data.language.title}
            addClass={data.language.addClass}
            dropdown={data.language.dropdown}
          /> */}
          {/* <WidgetDropdown 
                        icon={ data.cart.icon }
                        title={ data.cart.title }
                        badge={ data.cart.badge }
                        addClass={ data.cart.addClass }
                        dropdown={ data.cart.dropdown }
                    /> */}
          {/* <WidgetDropdown
            icon={data.message.icon}
            title={data.message.title}
            badge={data.message.badge}
            addClass={data.message.addClass}
            dropdown={data.message.dropdown}
          /> */}
          {/* <WidgetDropdown
            icon={data.notify.icon}
            title={data.notify.title}
            badge={data.notify.badge}
            addClass={data.notify.addClass}
            dropdown={data.notify.dropdown}
          /> */}
          <ProfileDropdown
            name={user?.NAME || data.profile.name}
            image={data.profile.image}
            // username={data.profile.username}
            dropdown={data.profile.dropdown}
          />
        </Box>
      </Box>
    </Section>
  );
}
