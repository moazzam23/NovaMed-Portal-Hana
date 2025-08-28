import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import UsedModifier from "../Tabs/UsedModifier";
import InUse from "./InUseTab";
import ReciepePreparationTab from "./ReciepePreparationTab";
import data from "../../data/master/preparationList.json";

export default function PreparationTabs() {
  const [key, setKey] = useState("tab1");
  const location = useLocation();
  const { id } = location.state;
  return (
    <>
      {data?.preparation.tbody
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
            <Tab eventKey="tab1" title="Receipe">
              <div className="tabContent">
                <ReciepePreparationTab data={item} />
              </div>
            </Tab>
            <Tab eventKey="tab2" title="In use (0)">
              <div className="tabContent">
                <InUse data={item} />
              </div>
            </Tab>
            <Tab eventKey="tab3" title="Used by Modifier (0)">
              <div className="tabContent">
                <UsedModifier data={item} />
              </div>
            </Tab>
          </Tabs>
        ))}
    </>
  );
}
