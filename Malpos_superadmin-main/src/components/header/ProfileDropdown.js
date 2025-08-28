// import React from "react";
// import { Dropdown } from "react-bootstrap";
// import { DuelText, RoundAvatar } from "..";
// import { Anchor } from "../elements";

// export default function ProfileDropdown({ name, username, image, dropdown }) {
//   return (
//     <Dropdown className="mc-header-user">
//       <Dropdown.Toggle className="mc-dropdown-toggle">
//         {/* <RoundAvatar src={image} alt="avatar" size="xs" /> */}
//         {/* <DuelText title={name} descrip={username} size="xs" /> */}
//         <DuelText title={name} />
//       </Dropdown.Toggle>
//       <Dropdown.Menu align="end" className="mc-dropdown-paper">
//         {dropdown.map((item, index) => (
//           <Anchor
//             key={index}
//             href={item.path}
//             icon={item.icon}
//             text={item.text}
//             className="mc-dropdown-menu"
//           />
//         ))}
//       </Dropdown.Menu>
//     </Dropdown>
//   );
// }

import React, { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { DuelText, RoundAvatar } from "..";
import { Anchor } from "../elements";
import { AuthContext } from "../../context/Auth";

export default function ProfileDropdown({ name, image, dropdown }) {
  const { user, logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };

  const modifiedDropdown = dropdown.map((item) => {
    if (item.text === "logout") {
      return { ...item, onClick: handleLogout };
    }
    return item;
  });

  return (
    <Dropdown className="mc-header-user">
      <Dropdown.Toggle className="mc-dropdown-toggle">
        {/* <RoundAvatar src={image} alt="avatar" size="xs" /> */}
        <DuelText title={name} />
      </Dropdown.Toggle>
      <Dropdown.Menu align="end" className="mc-dropdown-paper">
        {modifiedDropdown.map((item, index) => (
          <Anchor
            key={index}
            href={item.path}
            icon={item.icon}
            text={item.text}
            className="mc-dropdown-menu"
            onClick={item.onClick}
          />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
