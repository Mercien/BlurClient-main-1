import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import blur from "../assets/blurLogo.png";
import images from "../assets";
import axios from "axios";

import localFont from "next/font/local";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

const myFont = localFont({
  src: "../ProtoMonoFont/Proto Mono Light.ttf",
});

const MenuItems = ({ isMobile, active, setActive, setIsOpen }) => {
  const address = useAddress();
  const [isHideClaim, setIsHideClaim] = useState(false);

  useEffect(() => {
    const handleIsClaim = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SHEET_URI}`
        );

        const FilterWalletAddresses = await response?.data?.filter((data) => {
          const dataWalletAddress = data?.Wallet_Address?.toLowerCase();
          const currentAddressLowerCase = address.toLowerCase();
          return dataWalletAddress === currentAddressLowerCase;
        });

        if (FilterWalletAddresses.length > 0) {
          setIsHideClaim(true);
        } else {
          setIsHideClaim(false);
        }
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    };
    handleIsClaim();
  }, [address]);

  const generateLink = (i) => {
    switch (i) {
      case 0:
        return "/";
      case 1:
        return "/listed-nfts";
      case 2:
        return "/my-nfts";
      case 3:
        return "/create-nft";
      default:
        return "/";
    }
  };

  return (
    <ul
      className={`list-none flexCenter flex-row ${
        isMobile && "flex-col h-full"
      }`}
    >
      <li
        style={myFont.style}
        onClick={() => {
          setActive("Explore Market NFTs");

          if (isMobile) setIsOpen(false);
        }}
        className={`flex flex-row items-center  font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3
          ${
            active === "Explore Market NFTs"
              ? "dark:text-white text-nft-black-1"
              : "dark:text-nft-white text-nft-white"
          } 
          ${isMobile && "my-5 text-xl"}`}
      >
        <Link href={generateLink(0)}>Explore Market NFTs</Link>
      </li>
      <li
        style={myFont.style}
        onClick={() => {
          setActive("Listed NFTs Market");

          if (isMobile) setIsOpen(false);
        }}
        className={`flex flex-row items-center  font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3
          ${
            active === "Listed NFTs Market"
              ? "dark:text-white text-nft-black-1"
              : "dark:text-nft-white text-nft-white"
          } 
          ${isMobile && "my-5 text-xl"}`}
      >
        <Link href={generateLink(1)}>Listed NFTs Market</Link>
      </li>
      <li
        style={myFont.style}
        onClick={() => {
          setActive("My NFTs");

          if (isMobile) setIsOpen(false);
        }}
        className={`flex flex-row items-center  font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3
          ${
            active === "My NFTs"
              ? "dark:text-white text-nft-black-1"
              : "dark:text-nft-white text-nft-white"
          } 
          ${isMobile && "my-5 text-xl"}`}
      >
        <Link href={generateLink(2)}>My NFTs</Link>
      </li>
      {address && isHideClaim ? (
        <li
          style={myFont.style}
          onClick={() => {
            setActive("Create NFT");

            if (isMobile) setIsOpen(false);
          }}
          className={`flex flex-row items-center  font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3
          ${
            active === "Create NFT"
              ? "dark:text-white text-nft-black-1"
              : "dark:text-nft-white text-nft-white"
          } 
          ${isMobile && "my-5 text-xl"}`}
        >
          <Link href={generateLink(3)}>Create NFT</Link>
        </li>
      ) : null}
    </ul>
  );
};

const ButtonGroup = ({ setActive, router }) => {
  return (
    <>
      <div style={myFont.style}></div>
      <ConnectWallet
        btnTitle="Claim"
        style={{
          fontSize: "0.875rem",
          minWidth: "64px",
          paddingTop: "0.7rem",
          paddingBottom: "0.7rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          fontWeight: 600,
          color: "white",
          marginRight: "0.3rem",
          marginLeft: "0.5rem",
          borderRadius: "0.75rem",
          background:
            "linear-gradient(101.12deg, #f9a825 27.35%, #c62828 99.99%, #f9a825 100%, #c62828 100%)",
        }}
      />
    </>
  );
};

const checkActive = (active, setActive, router) => {
  switch (router.pathname) {
    case "/":
      if (active !== "Explore Market NFTs") setActive("Explore Market NFTs");
      break;
    case "/created-nfts":
      if (active !== "Listed NFTs Market") setActive("Listed NFTs Market");
      break;
    case "/my-nfts":
      if (active !== "My NFTs") setActive("My NFTs");
      break;
    case "/create-nft":
      if (active !== "Create NFT") setActive("Create NFT");
      break;
    case "/create-nft":
      if (active !== "") setActive("");
      break;
    default:
      setActive("");
  }
};

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState("Explore Market NFTs");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTheme("dark");
  }, []);

  useEffect(() => {
    checkActive(active, setActive, router);
  }, [router.pathname]);

  useEffect(() => {
    // disable body scroll when navbar is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [isOpen]);

  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
      <div className="flex flex-1 flex-row justify-start">
        <Link href="/">
          <div
            className="flexCenter md:hidden cursor-pointer"
            onClick={() => setActive("Explore Market NFTs")}
          >
            <Image
              src={blur}
              objectFit="contain"
              width={90}
              height={90}
              alt="logo"
            />
            <p
              style={myFont.style}
              className=" dark:text-white text-nft-black-1 font-semibold text-lg ml-1"
            >
              NFT Market
            </p>
          </div>
        </Link>
        <Link href="/">
          <div
            className="hidden md:flex"
            onClick={() => {
              setActive("Explore Market NFTs");
              setIsOpen(false);
            }}
          >
            <Image
              src={blur}
              objectFit="contain"
              width={90}
              height={90}
              alt="logo"
            />
          </div>
        </Link>
      </div>

      <div className="flex flex-initial flex-row justify-end">
        <div className="flex items-center mr-2 sm:hidden">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            onChange={() => setTheme(theme === "light" ? "dark" : "light")}
          />
          <label
            htmlFor="checkbox"
            className="flexBetween w-8 h-4 bg-black rounded-2xl p-1 relative label"
          >
            <i className="fas fa-moon" />
            <i className="fas fa-sun" />

            <div className="w-3 h-3 absolute bg-white rounded-full ball" />
          </label>
        </div>

        <div className="md:hidden flex">
          <ul className="list-none flexCenter flex-row">
            <MenuItems active={active} setActive={setActive} />
          </ul>
        </div>
        {/* <div className="sm:hidden">
          <ButtonGroup setActive={setActive} router={router} />
        </div> */}
        <div className="">
          <ButtonGroup setActive={setActive} router={router} />
        </div>
      </div>

      <div className="hidden md:flex ml-2">
        {!isOpen ? (
          <Image
            src={images.menu}
            objectFit="contain"
            width={25}
            height={25}
            alt="menu"
            onClick={() => setIsOpen(!isOpen)}
            className={theme === "light" ? "filter invert" : undefined}
          />
        ) : (
          <Image
            src={images.cross}
            objectFit="contain"
            width={20}
            height={20}
            alt="close"
            onClick={() => setIsOpen(!isOpen)}
            className={theme === "light" ? "filter invert" : undefined}
          />
        )}

        {isOpen && (
          <div className="fixed inset-0 top-65 dark:bg-nft-dark bg-white  flex justify-between flex-col">
            <div className=" p-4">
              <MenuItems
                active={active}
                setActive={setActive}
                isMobile
                setIsOpen={setIsOpen}
              />
            </div>
            {/* <span className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1 md:hidden sm:flex justify-center">
              <ButtonGroup setActive={setActive} router={router} />
            </span> */}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
