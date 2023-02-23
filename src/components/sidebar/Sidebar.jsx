import React from "react";

import { Link } from "react-router-dom";

import "./sidebar.css";

import logo from "../../assets/images/logo.png";

import sidebar_items from "../../assets/JsonData/sidebar_routes.json";
import { ROLES } from "../../@app/constants/key";
import { ROLE_ADMIN, ROLE_USER } from "../../@app/constants/roles";

const SidebarItem = (props) => {
    const active = props.active ? "active" : "";

    return (
        <div className="sidebar__item">
            <div className={`sidebar__item-inner ${active}`}>
                <i className={props.icon}></i>
                <span>{props.title}</span>
            </div>
        </div>
    );
};

const Sidebar = (props) => {
    const activeItem = sidebar_items.findIndex(
        (item) => item.route === props.location.pathname
    );
    // console.log(sidebar_items);
    return (
        <div className="sidebar">
            <div className="sidebar__logo">
                <img src={logo} alt="company logo" />
                International University
            </div>
            {sidebar_items.map((item, index) =>
                item?.route?.includes("admin") &&
                localStorage.getItem(ROLES)?.includes(ROLE_ADMIN) ? (
                    <Link to={item?.route} key={index}>
                        <SidebarItem
                            title={item.display_name}
                            icon={item.icon}
                            active={index === activeItem}
                        />
                    </Link>
                ) : !item?.route?.includes("admin") &&
                  localStorage.getItem(ROLES)?.includes(ROLE_ADMIN) &&
                  !item?.route?.includes("time-table") ? (
                    <Link to={item.route} key={index}>
                        <SidebarItem
                            title={item.display_name}
                            icon={item.icon}
                            active={index === activeItem}
                        />
                    </Link>
                ) : !item?.route?.includes("admin") &&
                  !localStorage.getItem(ROLES)?.includes(ROLE_ADMIN) ? (
                    <Link to={item.route} key={index}>
                        <SidebarItem
                            title={item.display_name}
                            icon={item.icon}
                            active={index === activeItem}
                        />
                    </Link>
                ) : null
            )}
        </div>
    );
};

export default Sidebar;
