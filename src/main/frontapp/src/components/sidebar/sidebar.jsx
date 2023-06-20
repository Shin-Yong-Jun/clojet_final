import "./sidebar.scss";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import Tooltip from "@mui/material/Tooltip";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SettingsSystemDaydreamRoundedIcon from "@mui/icons-material/SettingsSystemDaydreamRounded";
import SyncAltRoundedIcon from "@mui/icons-material/SyncAltRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import ListRoundedIcon from "@mui/icons-material/ListRounded";

function Sidebar() {
  const [nowPage, setNowPage] = useState("대시보드");

  function sidebarList(link, icon, name) {
    const content = (
      <Link
        to={link}
        onClick={() => {
          setNowPage(name);
          if (window.innerWidth < 1024) {
            setSidebaropen(true);
          }
        }}
      >
        {icon}
        <span>{name}</span>
      </Link>
    );
    return (
      <li className={name === nowPage ? "check" : ""}>
        {sidebaropen ? (
          <Tooltip title={name} placement="right" arrow>
            {content}
          </Tooltip>
        ) : (
          content
        )}
      </li>
    );
  }

  const [sidebaropen, setSidebaropen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        !sidebarRef.current.contains(event.target) &&
        window.innerWidth < 1024
      ) {
        setSidebaropen(true);
      }
    }
    function handleResize() {
      if (window.innerWidth < 1024) {
        setSidebaropen(true);
      } else {
        setSidebaropen(false);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`sidebar ${sidebaropen ? "active" : "inactive"}`}
      ref={sidebarRef}
    >
      <div
        className="sidebarBtn"
        onClick={() => {
          setSidebaropen(!sidebaropen);
        }}
      >
        <ListRoundedIcon />
      </div>
      <div className="top">
        <span className="logo">CloJet</span>
      </div>
      <div className="center">
        <ul>
          <li>
            <p className="title">메인 페이지</p>
          </li>
          {sidebarList(
            ".",
            <DashboardRoundedIcon className="icon" />,
            "대시보드"
          )}
          <li>
            <p className="title">관리 리스트</p>
          </li>
          {sidebarList(
            "./user",
            <PeopleRoundedIcon className="icon" />,
            "유저관리"
          )}
          {sidebarList(
            "./product",
            <CategoryRoundedIcon className="icon" />,
            "상품관리"
          )}
          {sidebarList(
            "./prepar",
            <CreditCardRoundedIcon className="icon" />,
            "주문관리"
          )}
          {sidebarList(
            "./prepar",
            <LocalShippingRoundedIcon className="icon" />,
            "배송관리"
          )}
          <li>
            <p className="title">통계 자료</p>
          </li>
          {sidebarList(
            "./prepar",
            <QueryStatsRoundedIcon className="icon" />,
            "통계"
          )}
          {sidebarList(
            "./prepar",
            <NotificationsNoneRoundedIcon className="icon" />,
            "알림소식"
          )}
          <li>
            <p className="title">서비스 관리</p>
          </li>
          {sidebarList(
            "./prepar",
            <SettingsSystemDaydreamRoundedIcon className="icon" />,
            "시스템상태"
          )}
          {sidebarList(
            "./prepar",
            <SyncAltRoundedIcon className="icon" />,
            "로그"
          )}
          {sidebarList(
            "./prepar",
            <SettingsRoundedIcon className="icon" />,
            "설정"
          )}
        </ul>
      </div>
      <div className="bottom"></div>
    </div>
  );
}

export default Sidebar;
