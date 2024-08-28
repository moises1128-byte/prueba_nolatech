import React, { useState, useEffect } from "react";
import Styles from "./styles.module.scss";
import Menu from "../../assets/images/menu.svg";
import Logout from "../../assets/images/logout.svg";
import Home from "../../assets/images/home.svg";
import Messages from "../../assets/images/messages.svg";
import Resources from "../../assets/images/resources.svg";
import Search from "../../assets/images/search.svg";
import Settings from "../../assets/images/settings.svg";
import Star from "../../assets/images/star.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { loginSuccess } from "../../state/reducer/userReducer";

const Sidebar = () => {
  const user = useSelector(loginSuccess);
  const userType = user?.payload?.auth?.user?.type;

  const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      const listener = () => setMatches(media.matches);
      window.addEventListener("resize", listener);
      return () => window.removeEventListener("resize", listener);
    }, [matches, query]);

    return matches;
  };
  let userItems = [
    {
      name: "Menu",
      iconName: Menu,
      route: "/dashboard",
    },
    {
      name: "Home",
      iconName: Home,
      type: "solid",
      route: "/dashboard",
    },
    {
      name: "Formulario",
      iconName: Resources,
      type: "solid",
      route: "/form",
    },
    {
      name: "Administation",
      iconName: Star,
      type: "solid",
      route: "/result",
    },
    {
      name: "Results",
      iconName: Settings,
      type: "solid",
      route: "/profile",
    },
    {
      name: "Log Out",
      iconName: Logout,
      color: "red",
      rotate: "180",
      route: "/",
    },
  ];

  let adminItems = [
    {
      name: "Menu",
      iconName: Menu,
      route: "/dashboard",
    },
    {
      name: "Home",
      iconName: Home,
      type: "solid",
      route: "/dashboard",
    },
    {
      name: "User List",
      iconName: Search,
      type: "solid",
      route: "/usersList",
    },
    {
      name: "Messages",
      iconName: Messages,
      type: "solid",
      route: "/dashboard",
    },
    {
      name: "Form",
      iconName: Resources,
      type: "solid",
      route: "/form",
    },
    {
      name: "Starred",
      iconName: Star,
      type: "solid",
      route: "/result",
    },
    {
      name: "Profile",
      iconName: Settings,
      type: "solid",
      route: "/profile",
    },
    {
      name: "Log Out",
      iconName: Logout,
      color: "red",
      rotate: "180",
      route: "/",
    },
  ];

  const [hovered, setHovered] = useState(null);
  const [active, setActive] = useState(1);
  const [animate, setAnimate] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const changeSmall = useMediaQuery("(max-height: 550px)");
  const navigate = useNavigate();

  let delay = 1;
  useEffect(() => {
    setAnimate(true);
    let timer = setTimeout(() => setAnimate(false), delay * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [active, delay]);

  return (
    <div className={Styles.homeContainer}>
      <div className={`${Styles.sidebar} ${expanded && Styles.expanded}`}>
        {(userType === "admin" ? adminItems : userItems).map((item, index) => {
          let middle = false;
          if (
            !(
              index === 0 ||
              index ===
                (userType === "admin" ? adminItems.length : userItems.length) -
                  1
            )
          ) {
            middle = true;
          }
          return (
            <div
              className={`${Styles.boxicon_container} ${
                expanded && `${Styles.expanded} ${Styles.boxicon_container}`
              }`}
              onMouseEnter={() => {
                if (middle) {
                  setHovered(index);
                }
              }}
              onMouseLeave={() => {
                if (middle) {
                  setHovered(null);
                }
              }}
              onClick={() => {
                if (middle) {
                  setActive(index);
                }
                if (index === 0) {
                  setExpanded(!expanded);
                }
                if (item.name !== "Menu") {
                  navigate(item.route);
                }
              }}
              key={index}
            >
              <box-icon
                class={`${middle && Styles.boxicon} 
                      ${!middle && Styles.first_and_last_trash_fix}
                      ${active === index && "active"}
                      `}
                size={changeSmall ? "sm" : "md"}
                name={item.iconName}
                type={item.type}
                color={
                  hovered === index || active === index ? "white" : item.color
                }
                animation={active === index && animate ? "tada" : ""}
                rotate={item.rotate}
              >
                <img alt={item.iconName} src={item.iconName} />
              </box-icon>
              <p
                className={`${Styles.description} 
              ${expanded && Styles.show_description}
              ${active === index && Styles.active_description}`}
              >
                {item.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;

// ReactDOM.render(
//   <div className="container">
//     <Sidebar />
//     <p className="text">THIS IS MY SIDEBAR!</p>
//   </div>,
//   document.getElementById("root")
// );
