import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Reports from "../views/Reports.vue";
import ManageUser from "../views/ManageUser.vue";
import GenerateBill from "../views/GenerateBill.vue";
import Profile from "../views/Profile.vue";
import UserDashboard from "../views/UserDashboard.vue";
import UserProfile from "../views/UserProfile.vue";
import BillingDetail from "../views/BillingDetail.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import AccountLog from "../views/AccountLog.vue";
import PaymentHistory from "../views/PaymentHistory.vue";
import AdminBilling from "../views/AdminBilling.vue";
import EmailVerification from "../views/EmailVerification.vue";
import UserBilling from "@/views/UserBilling.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    {
      path: "/verify/:token",
      name: "EmailVerification",
      component: EmailVerification,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
    },
    {
      path: "/reports",
      name: "Reports",
      component: Reports,
    },
    {
      path: "/manage-user",
      name: "Manage User",
      component: ManageUser,
    },
    {
      path: "/generate-bill",
      name: "Generate Bill",
      component: GenerateBill,
    },
    {
      path: "/billing-management",
      name: "Billing Management",
      component: AdminBilling,
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
    },
    {
      path: "/user/dashboard",
      name: "User Dashboard",
      component: UserDashboard,
    },
    {
      path: "/user/profile",
      name: "User Profile",
      component: UserProfile,
    },
    {
      path: "/user/billing/:id",
      name: "Billing Detail",
      component: BillingDetail,
    },
    {
      path: "/user/billing",
      name: "User Billing",
      component: UserBilling,
    },
    {
      path: "/user/account-log",
      name: "Account Log",
      component: AccountLog,
    },
    {
      path: "/user/payment-history",
      name: "Payment History",
      component: PaymentHistory,
    },
  ],
});

export default router;
