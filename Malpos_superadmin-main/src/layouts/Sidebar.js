import React, { useContext, useEffect, useState } from "react";
import { MultipleMenu } from "../components/sidebar";
import { DrawerContext } from "../context/Drawer";
import Section from "../components/elements/Section";
import data from "../data/master/sidebar.json";
import axios from "axios";
import { BASE_URL } from "../apis/NodeApiUrl";
import SelectField from "../components/fields/SelectField";
import { toast } from "react-toastify";

export default function Sidebar() {
  const { drawer } = useContext(DrawerContext);
  const [permissions, setPermissions] = useState([]);

  const roleId = localStorage.getItem("roleId");

 
const CompanyDB = localStorage.getItem("companyDB");
 const [company, setCompany] = useState([]);
const [selectedCompany, setSelectedCompany] = useState(CompanyDB || null);
if (!roleId || !CompanyDB) {
  // toast.error("Missing role or CompanyDB in localStorage");
}

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
     fetchCompany();
    const fetchPermissions = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/roles/${roleId}/permissions?companyDB=${CompanyDB}`);
        setPermissions(res.data.permissions || []);
      } catch (error) {
        console.error("Error fetching permissions", error);
        setPermissions([]);
      }
    };

    if (roleId) {
      fetchPermissions();
    }
  }, [roleId]);
const filteredNavs = data?.navs.map((navGroup) => {
  const filteredMenu = navGroup.menu
    .map((menuItem) => {
      const filteredSubmenu = (menuItem.submenu || []).filter((submenuItem) =>
        permissions.includes(submenuItem.permission)
      );

      if (filteredSubmenu.length > 0) {
        return {
          ...menuItem,
          submenu: filteredSubmenu,
        };
      }
      if (!menuItem.submenu ) {
        return {
          ...menuItem,
          submenu: [], // or omit submenu if your component allows
        };
      }

      return null;
    })
    .filter(Boolean);

  return {
    ...navGroup,
    menu: filteredMenu,
  };
});


   return (
    <Section as="aside" className={`mc-sidebar thin-scrolling ${drawer ? "active" : ""}`}>
      <MultipleMenu data={filteredNavs} />

      <div className="mt-4" >
    {/* <SelectField style={{marginTop:"10px"}}
         options={company}
         label={"Select Company"}
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
          /> */}
          </div>
    </Section>
  );

}