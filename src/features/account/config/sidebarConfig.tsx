

import { FaUser } from "react-icons/fa";
import { MdAccountBalanceWallet } from "react-icons/md";
import { IconType } from "react-icons"; // If you are using TypeScript

export type SidebarLink = {
  to: string;
  label: string;
  rightElement?: React.ReactNode; 
};

export type SidebarSection = {
  title: string;
  icon: IconType; 
  links: SidebarLink[];
};

// 2. Export your configuration
export const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    title: "Account Settings",
    icon: FaUser,
    links: [
      { to: "/account/profile", label: "Profile Information" },
      { to: "/account/addresses", label: "Manage Addresses" },
      { to: "/account/pan", label: "PAN Card Information" },
    ],
  },
  {
    title: "Payments",
    icon: MdAccountBalanceWallet,
    links: [
      {
        to: "/account/gift-cards",
        label: "Gift Cards",
        // Because this file is .tsx, this JSX works perfectly here
        rightElement: <span className="text-green-600 font-medium">₹0</span>,
      },
      { to: "/account/upi", label: "Saved UPI" },
      { to: "/account/cards", label: "Saved Cards" },
    ],
  },
];