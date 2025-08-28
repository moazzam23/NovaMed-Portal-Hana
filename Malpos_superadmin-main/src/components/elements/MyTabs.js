import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import BasicInfo from "../Tabs/BasicInfo";
import EMenu from "../Tabs/EMenu";
import Modifier from "../Tabs/Modifier";
import Receipe from "../Tabs/Receipe";
import UsedModifier from "../Tabs/UsedModifier";
import data from "../../data/master/productList.json";

export default function MyTabs() {
  const [key, setKey] = useState("tab1");
  const location = useLocation();
  const { id } = location.state;

  return (
    <>
      {data.product.tbody
        .filter((item) => {
          return item.id == id;
        })
        .map((item, i) => (
          <Tabs
            id="my-tabs"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            key={i}
          >
            <Tab eventKey="tab1" title="Additional Information">
              <div className="tabContent additiona-infoTab">
                <BasicInfo data={item} />
              </div>
            </Tab>

            <Tab eventKey="tab4" title="Receipe">
              <div className="tabContent">
                <Receipe />
              </div>
            </Tab>
            <Tab eventKey="tab5" title="Modifier">
              <div className="tabContent">
                <Modifier />
              </div>
            </Tab>
            <Tab eventKey="tab6" title="Used by Modifier">
              <div className="tabContent">
                <UsedModifier />
              </div>
            </Tab>
            <Tab eventKey="tab7" title="eMenu">
              <div className="tabContent">
                <EMenu />
              </div>
            </Tab>
          </Tabs>
        ))}
    </>
  );
}
