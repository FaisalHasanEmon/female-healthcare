import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  // Quick Links
  const quickLinks = [
    { text: "Home", link: "/home" },
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
      text: "Instagram",
      link: "#",
    },
    {
      text: "Facebook",
      link: "#",
    },
  ];
  return (
    <div className="container mx-auto px-5 font-inter border border-red-500">
      <div className="flex py-[60px]">
        {/* Fenyx Femme */}
        <div className="border border-green-600">
          <h3 className="uppercase font-bold text-2xl">fenyx femme</h3>
          <p className="text-[18px] font-normal mt-[18px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare
            cursus sed nunc eget dictum Sed ornare cursus sed nunc eget dictumd
            nunc eget dictum Sed ornare cursus sed nunc eget dictum{" "}
          </p>
          <div></div>
        </div>
        {/* Quick Links Starts*/}
        <div className="border border-black min-w-[112px]">
          <h3 className="font-semibold text-[20px] text-textGray">
            Quick Links
          </h3>
          <ul>
            {quickLinks?.map((link, index) => (
              <li key={index}>
                <Link to={link?.link}>
                  <button className="flex items-center justify-center font-medium gap-2.5 text-[16px] mt-[18px] mb-[22px] text-[#090909]">
                    <MdOutlineKeyboardArrowRight size={18} /> {link?.text}
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Starts */}
        <div className="border border-orange-500">
          <h3 className="font-semibold text-[20px] text-textGray">Legal</h3>
          <ul>
            {legal?.map((link, index) => (
              <li
                key={index}
                className=" font-medium text-[16px] mt-[18px] mb-[22px] text-[#090909]"
              >
                <Link to={link?.link}>{link?.text}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Links Starts */}
        <div className="border border-blue-500 min-w-[115px]">
          <h3 className="font-semibold text-[20px] text-textGray">
            Social Links
          </h3>
          <ul>
            {socialLinks?.map((link, index) => (
              <li key={index}>
                <Link to={link?.link}>
                  <button className="flex items-center justify-center font-medium gap-2.5 text-[16px] mt-[18px] mb-[22px] text-[#090909]">
                    <MdOutlineKeyboardArrowRight />
                    {link?.text}
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Social Links Ends */}
      </div>
    </div>
  );
};

export default Footer;
