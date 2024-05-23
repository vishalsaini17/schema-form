import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import navData from "./menuData";

const NavMenu = () => {
  return (
    <>
      {navData.map((nav, i) => (
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          disablePadding
          key={`${nav.label}-${i}`}
        >
          <NavMenuItem navItem={nav} />
        </List>
      ))}
    </>
  );
};

export default NavMenu;

const NavMenuItem = ({ navItem }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!!navItem?.link && (
        <NavLink to={navItem.link}>
          {({ isActive, isPending, isTransitioning }) => (
            <ListItemButton sx={{ px: 2 }} selected={isActive}>
              {/* <ListItemIcon>
              <InboxIcon />
            </ListItemIcon> */}
              <ListItemText primary={navItem.label} />
            </ListItemButton>
          )}

        </NavLink>
      )}
      {navItem?.submenu && (
        <>
          <ListItemButton
            onClick={() => {
              setOpen(!open);
            }}
            sx={{ px: 2 }}
          >
            {/* <ListItemIcon>
              <InboxIcon />
            </ListItemIcon> */}
            <ListItemText primary={navItem.label} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={open} timeout="auto" unmountOnExit sx={{ pl: 1 }}>
            {navItem.submenu.map((submenuItem, i) => {
              return <NavMenuItem navItem={submenuItem} key={`${submenuItem.label}-${i}`} />;
            })}
          </Collapse>
        </>
      )}
    </>
  );
};
