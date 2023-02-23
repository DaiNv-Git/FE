import { ROLE_ADMIN } from "../@app/constants/roles";
import SignInPage from "../@app/pages/login";
import AdminRoomBookingRequest from "../admin/pages/AdminRoomBookingRequest";
import { CampusMap } from "../pages/CampusMap";
import Customers from "../pages/Customers";
import Dashboard from "../pages/Dashboard";
import EventRegistration from "../pages/EventRegistration";
import Exam from "../pages/Exam";
import Grade from "../pages/Grade";
import addGrade from "../pages/addGrade";
import eidtGrade from "../pages/EditGrade";

import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Notification from "../pages/Notification";
import NotificationDetail from "../pages/NotificationDetail";
import PaperRequest from "../pages/PaperRequest";
import RoomBooking from "../pages/RoomBooking";
import Subject from "../pages/Subject";
import TimeTable from "../pages/TimeTable";

const routers = [
    {
        component: Grade,
        path: "/grade",
        roles: [""],
    },
    {
        component: addGrade,
        path: "/addGrade",
        roles: [""],
    },
    {
        component: eidtGrade,
        path: "/eidtGrade/:id?",
        roles: [""],
    },
    {
        component: RoomBooking,
        path: "/room-booking",
        roles: [""],
    },
    {
        component: PaperRequest,
        path: "/paper-request",
        roles: [""],
    },
    {
        component: Notification,
        path: "/",
        roles: [""],
    },
    {
        component: Customers,
        path: "/customers",
        roles: [""],
    },
    {
        component: SignInPage,
        path: "/sign-in",
        roles: [""],
    },
    {
        component: Logout,
        path: "/sign-out",
        roles: [""],
    },
    {
        component: AdminRoomBookingRequest,
        path: "/admin/room-booking-request",
        roles: [ROLE_ADMIN],
    },
    {
        component: Subject,
        path: "/subject",
        roles: [],
    },
    {
        component: Notification,
        path: "/notification",
        roles: [],
    },
    {
        component: Exam,
        path: "/exam",
        roles: [],
    },
    {
        component: NotificationDetail,
        path: "/notification-detail/:id",
        roles: [],
    },
    {
        component: TimeTable,
        path: "/time-table",
        roles: [],
    },
    {
        component: CampusMap,
        path: "/campus-map",
        roles: [],
    },
];
export default routers;
