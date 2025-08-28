// import React from "react";
// import { List, Item, Anchor, Button } from "../elements";

// export default function MenuItem({ item }) {
//     const [active, setActive] = React.useState(false);
//     return (
//         <Item className={`mc-sidebar-menu-item ${active ? "active" : ""}`} onClick = {()=> setActive(!active)}>
//             {item.submenu ?
//                 <>
//                     <Button 
//                         icon = { item.icon } 
//                         text = { item.text } 
//                         badge = { item.badge }
//                         arrow = "expand_more"
//                         className = "mc-sidebar-menu-btn" 
//                     />
//                     <List className="mc-sidebar-dropdown-list">
//                         {item.submenu.map((item, index) => (
//                             <Item key={ index } className="mc-sidebar-dropdown-item" onClick = {()=> setActive(!active)}>
//                                 <Anchor href={ item.href } className="mc-sidebar-dropdown-link">
//                                     { item.text } 
//                                 </Anchor>
//                             </Item>
//                         ))}
//                     </List>
//                 </>
//             :
//                 <Anchor 
//                     href={ item.href }
//                     icon = { item.icon } 
//                     text = { item.text } 
//                     badge = { item.badge }
//                     className = "mc-sidebar-menu-btn" 
//                 />
//             }
//         </Item>
//     )
// }

// import React from "react";
// import { List, Item, Anchor, Button } from "../elements";
// import { Link } from "react-router-dom";

// export default function MenuItem({ item }) {
//     const [active, setActive] = React.useState(false);

//     const handleClick = (href) => {
//     if (href === "/Workflow") {
//       localStorage.removeItem("docUpdateId");
//         localStorage.removeItem("UpdateBtn")
//     }
//   };

//     return (
//         <Item className={`mc-sidebar-menu-item ${active ? "active" : ""}`} >
//             {item.submenu ?
//                 <>
//                     <Button 
//                         icon = { item.icon } 
//                         text = { item.text } 
//                         badge = { item.badge }
//                         arrow = "expand_more"
//                         className = "mc-sidebar-menu-btn" 
//                         onClick = {()=> setActive(!active)}
//                     />
//                     <List className="mc-sidebar-dropdown-list">
//                         {item.submenu.map((item, index) => (
//                             <Item key={ index } className="mc-sidebar-dropdown-item">
//                                 {/* <Anchor href={ item.href } className="mc-sidebar-dropdown-link" onClick={() => handleClick(item.href)}>
//                                     { item.text } 
//                                 </Anchor> */}
//                                 <Link to={ item.href } className="mc-sidebar-dropdown-link" onClick={() => handleClick(item.href)}>
//   {item.text}
// </Link>

//                             </Item>
//                         ))}
//                     </List>
//                 </>
//             :
//                 <Anchor 
//                     href={ item.href }
//                     icon = { item.icon } 
//                     text = { item.text } 
//                     badge = { item.badge }
//                     className = "mc-sidebar-menu-btn" 
//                     onClick={() => handleClick(item.href)}
//                 />
//             }
//         </Item>
//     )
// }
import React, { useEffect, useState } from "react";
import { List, Item, Anchor, Button } from "../elements";
import { Link, useLocation } from "react-router-dom";

export default function MenuItem({ item }) {
  const [active, setActive] = useState(false);
  const location = useLocation(); // detect URL change

  const key = `submenu-${item.text}`; // unique key per menu item

  useEffect(() => {
    // Load active state from localStorage
    const saved = localStorage.getItem(key);
    setActive(saved === "true");
  }, []);

  useEffect(() => {
    // Optionally, close submenu on route change (if you want)
    // But in your case, you want to keep it open
  }, [location]);

  const handleToggle = () => {
    const newState = !active;
    setActive(newState);
    localStorage.setItem(key, newState);
  };

  const handleClick = (href) => {
    if (href === "/inventory_request" || href === "/viewDocuments" || href === "/pending-approvals" || href === "/inventory" || href === "/user") {
      localStorage.removeItem("EditAPPDocId");
      localStorage.removeItem("EditDocId");
      localStorage.removeItem("UpdateUserId");
      localStorage.removeItem("UpdateUserBtn");
      localStorage.removeItem("DuplicateDocId");

    }
  };

  return (
    <Item className={`mc-sidebar-menu-item ${active ? "active" : ""}`}>
      {item.submenu ? (
        <>
          <Button
            icon={item.icon}
            text={item.text}
            badge={item.badge}
            arrow="expand_more"
            className="mc-sidebar-menu-btn"
            onClick={handleToggle}
          />
          <List className={`mc-sidebar-dropdown-list ${active ? "show" : "hide"}`}>
            {item.submenu.map((sub, index) => (
              <Item key={index} className="mc-sidebar-dropdown-item">
                <Link to={sub.href} className="mc-sidebar-dropdown-link" onClick={() => handleClick(sub.href)}>
                  {sub.text}
                </Link>
              </Item>
            ))}
          </List>
        </>
      ) : (
        <Anchor
          href={item.href}
          icon={item.icon}
          text={item.text}
          badge={item.badge}
          className="mc-sidebar-menu-btn"
          onClick={() => handleClick(item.href)}
        />
      )}
    </Item>
  );
}