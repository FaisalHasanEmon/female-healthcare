import { HiMiniChevronRight } from "react-icons/hi2";
import { Link } from "react-router-dom";

export default function Footer() {
  // Quick Links
  const quickLinks = [
    { text: "Home", link: "/" },
    { text: "About", link: "/about" },
    { text: "Contact", link: "/contact-us" },
  ];

  // Legal
  const legal = [
    {
      text: "Privacy",
      link: "#",
    },
    {
      text: "Policy",
      link: "#",
    },
    {
      text: "Terms",
      link: "#",
    },
  ];

  // Social Links
  const socialLinks = [
    {
      text: "Facebook",
      link: "#",
      img: "/socialMediaLogo/facebook.png",
    },
    {
      text: "Instagram",
      link: "#",
      img: "/socialMediaLogo/instagram.png",
    },
    {
      text: "LinkedIn",
      link: "#",
      img: "/socialMediaLogo/linkedin.png",
    },
    {
      text: "Twitter",
      link: "#",
      img: "/socialMediaLogo/twitter.png",
    },
  ];

  // Privacy and legal
  const privacyAndLegal = [
    {
      text: "Copyright 2025 fenyx femme",
    },
    {
      text: "Inc Terms of Service ",
      link: "#",
    },
    {
      text: "Policy",
      link: "#",
    },
    {
      text: "Legal",
      link: "#",
    },
  ];

  return (
    <footer className="bg-gradient-to-r from-[#f0f5ef] via-base-10 to-[#f0f5ef] text-gray-800 py-10">
      <div className="container px-5 mx-auto ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 ">
          {/* FENYX FEMME Section */}
          <div className="col-span-6">
            <h2 className="text-xl font-bold mb-4">FENYX FEMME</h2>
            <p className="text-sm text-gray-700 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              ornare cursus sed nunc eget dictum Sed ornare cursus sed nunc eget
              dictum nunc eget dictum Sed ornare cursus sed nunc eget dictum
            </p>
            <div className="flex space-x-3 mt-4 text-lg text-gray-600">
              {socialLinks?.map((link, index) => (
                <Link className="cursor-pointer" key={index} to={link?.link}>
                  <img className="w-4" src={link?.img} alt={link?.text} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-2">
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              {quickLinks?.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link?.link}
                    className="flex items-center gap-2 hover:text-black cursor-pointer"
                  >
                    <HiMiniChevronRight />
                    {link?.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-2">
            <h2 className="text-lg font-semibold mb-4">Legal</h2>
            <ul className="space-y-2 text-sm">
              {legal?.map((link, index) => (
                <li key={index} className="hover:text-black cursor-pointer">
                  <Link to={link?.link}>{link.text}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Icons */}
          <div className="col-span-2">
            <h2 className="text-lg font-semibold mb-4">Social Icons</h2>
            <ul className="space-y-2 text-sm">
              {socialLinks?.map((link, index) => (
                <li key={index}>
                  <Link className="flex items-center gap-2 hover:text-black cursor-pointer">
                    <HiMiniChevronRight />
                    {link?.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-1 md:grid-cols-4 md:grid-row-1  border-t  *:text-center py-[9px] mb-0 mt-20">
          {privacyAndLegal?.map((item, index) => (
            <div
              key={index}
              className="text-sm text-gray-700 hover:text-black cursor-pointer"
            >
              {item?.link ? (
                <Link to={item?.link}>{item.text}</Link>
              ) : (
                <span>{item.text}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
