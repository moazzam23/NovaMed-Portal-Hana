import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";

import UsedModifier from "../Tabs/UsedModifier";
import DishesTabs from "./DishesTabs";
import IngredientPreTab from "./IngredientPreTab";
import data from "../../data/master/ingredients.json";
import { useLocation } from "react-router-dom";

export default function IngredientsTabs() {
  const [key, setKey] = useState("tab1");
  const location = useLocation();
  const { id } = location.state;
  return (
    <>
      {data.ingredients.tbody
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
            <Tab eventKey="tab1" title="Dishes">
              <div className="tabContent">
                <DishesTabs data={item} />
              </div>
            </Tab>
            <Tab eventKey="tab2" title="Preparations (0)">
              <div className="tabContent">
                <IngredientPreTab data={item} />
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
