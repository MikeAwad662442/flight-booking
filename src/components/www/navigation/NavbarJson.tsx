/*******************************
 * @author: Mike Awad
 * @description: Website Navbar
 * =====================
 * All links that are used in Navbar Headers
 * and Footer in (www) Folder
 * [x] Website Links = NavLinkJson
 * [x] Social Media = SocialMediaJson
 * [x] Contact Us = ContactUsJson
 *******************************/

import {
  Facebook,
  Instagram,
  Linkedin,
  LucideIcon,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";

export type NavBarItemsType = {
  label: string;
  href?: string;
  icon?: LucideIcon;
  groupLinks?: NavBarItemsType[];
};

/*******************************
 * =====================
 * = Social Media Json
 * =====================
 * = Social Media Json
 *******************************/
export const NavLinksJson: NavBarItemsType[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/flight-booking",
    label: "FlightBooking",
  },
  // {
  //   href: "/our-services",
  //   label: "OurServices",
  // },

  // {
  //   href: "/about-us",
  //   label: "AboutUs",
  // },
  {
    href: "/contact-us",
    label: "ContactUs",
  },
  // {
  //   href: "/dashboard",
  //   label: "DashBoard",
  // },
];
/*******************************
 * =====================
 * = Social Media Json
 * =====================
 * = Social Media Json
 *******************************/

export const SocialMediaJson: NavBarItemsType[] = [
  {
    href: "https://www.facebook.com/",
    label: "Facebook",
    icon: Facebook,
  },
  {
    href: "https://x.com/",
    label: "Twitter",
    icon: Twitter,
  },
  {
    href: "https://www.instagram.com/",
    label: "Instagram",
    icon: Instagram,
  },
  {
    href: "https://www.linkedin.com",
    label: "Linkedin",
    icon: Linkedin,
  },
  {
    href: "https://www.youtube.com/",
    label: "Youtube",
    icon: Youtube,
  },
];

/*******************************
 * =====================
 * = Social Media Json
 * =====================
 * = Contact Us Json
 *******************************/

export const ContactUsJson: NavBarItemsType[] = [
  {
    label: "mikeawad@mike-awad.com",
    href: "mailto:mikeawad@mike-awad.com",
    icon: Mail,
  },
  {
    label: "+963-933-662-442",
    href: "tel:00963933662442",
    icon: Phone,
  },
  {
    label: "Latakia , syria",
    href: "https://maps.app.goo.gl/wS8c4dPSXDXRrST56",
    icon: MapPin,
  },
];

/*******************************
 * Notes:
 * ============================
 * I use .tsx file to save this JSON because of
 * import { LucideIcon } from "lucide-react";
 *******************************/
