import { HiMiniChevronRight } from "react-icons/hi2";
import { Link } from "react-router-dom";

export default function Footer() {
  // Quick Links
  const quickLinks = [{ text: "Home", link: "/" }];

  // Legal
  // const legal = [
  //   {
  //     text: "Privacy",
  //     link: "#",
  //   },
  //   {
  //     text: "Policy",
  //     link: "#",
  //   },
  //   {
  //     text: "Terms",
  //     link: "#",
  //   },
  // ];

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
  ];

  return (
    <footer className="bg-gradient-to-r from-[#f0f5ef] via-base-10 to-[#f0f5ef] text-gray-800 py-10">
      <div className="container px-5 mx-auto ">
        <div className="flex flex-col gap-10 md:flex-row justify-between items-start md:gap-0 ">
          {/* FENYX FEMME Section */}
          <div className="md:w-3/12 ">
            <h2 className="text-xl font-bold mb-4">FENYX FEMME</h2>
            <p className="text-sm text-gray-700 mb-4">
              Your AI-powered guide for hormone-aligned living — built to help
              women rise from burnout, chaos, and confusion with science-backed,
              soulful support.
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
          <div className="md:w-3/12  flex justify-center items-start">
            <div>
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
          </div>
          {/* Get In  Touch */}
          <div className="md:w-3/12 ">
            <h2 className="text-lg font-semibold mb-4">Get in touch</h2>
            <div className="bg-base-100 rounded-lg p-6 border border-base-300">
              <p className="text-base-content/80 text-sm leading-relaxed">
                To say hi, or connect - please email us at:{" "}
                <a
                  href="mailto:hello@fenyxfemme.com"
                  className="text-primary hover:text-primary-focus font-medium transition-colors duration-200 underline decoration-dotted underline-offset-4"
                >
                  hello@fenyxfemme.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright section */}
        <div className="grid grid-cols-1  border-t  *:text-center py-[9px] mb-0 mt-20">
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
