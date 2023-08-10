import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { NFTContext } from "../context/NFTcontext";
import images from "../assets";
import axios from "axios";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

const NFTCard = ({ nft, onProfilePage }) => {
  const { nftCurrency } = useContext(NFTContext);
  const router = useRouter();
  const address = useAddress();

  const handleIsClaim = async () => {
    if (address) {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SHEET_URI}`);
      const FilterWalletAddreses = await response?.data?.filter((data) => {
        const dataWalletAddress = data?.Wallet_Address?.toLowerCase();
        const currentAddressLowerCase = address?.toLowerCase();
        return dataWalletAddress === currentAddressLowerCase;
      });
      if (FilterWalletAddreses.length === 0) {
        router.push("/register");
      } else {
        router.push({ pathname: "/nft-details", query: nft });
      }
    }
  };

  return (
    <div className="flex-1 flex-wrap min-w-215 max-w-max xs:max-w-none sm:w-full sm:min-w-155 minmd:min-w-256 minlg:min-w-327 dark:bg-nft-black-3 bg-white rounded-xl p-4 m-4 minlg:m-8 sm:my-2 sm:mx-2 shadow-md">
      <div className="relative w-full h-52 sm:h-36 minmd:h-60 minlg:h-300 rounded-2xl overflow-hidden">
        <Image
          src={nft.image || images[`nft${nft.i}`]}
          layout="fill"
          objectFit="cover"
          alt="nft_image"
        />
      </div>

      <div className="flex flex-col mt-3">
        <p className=" dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
          {nft.name}
        </p>
        <div className="flexBetween mt-1 minlg:mt-3 flex-row xs:flex-col xs:items-start xs:mt-3">
          <p className=" dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg">
            {nft.price} <span className="normal">{nftCurrency}</span>
          </p>
        </div>
        {address ? (
          <button
            className={`nft-gradient text-sm minlg:text-lg py-2 px-6 minlg:px-8  font-semibold text-white mt-2 rounded-xl`}
            onClick={handleIsClaim}
          >
            Claim
          </button>
        ) : (
          <ConnectWallet
            style={{
              fontSize: "0.875rem",
              minWidth: "64px",
              paddingTop: "0.7rem",
              paddingBottom: "0.7rem",
              paddingLeft: "1.5rem",
              paddingRight: "1.5rem",
              fontWeight: 600,
              color: "white",
              marginTop: "0.3rem",
              borderRadius: "0.75rem",
              background:
                "linear-gradient(101.12deg, #f9a825 27.35%, #c62828 99.99%, #f9a825 100%, #c62828 100%)",
            }}
            // className="text-sm minlg:text-lg py-2 px-6 minlg:px-8  font-semibold text-white mt-2 rounded-xl"
            btnTitle="Claim"
          />
        )}
      </div>
    </div>
  );
};

export default NFTCard;
