import { useContext } from "react";
import Image from "next/image";

import { NFTContext } from "../context/NFTcontext";
import images from "../assets";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

const CreatorCard = ({ rank, creatorImages, creatorName, creatorEths }) => {
  const { nftCurrency } = useContext(NFTContext);
  const address = useAddress();

  return (
    <div className="min-w-190 minlg:min-w-240 dark:bg-nft-black-3 bg-white border dark:border-nft-black-3 border-nft-gray-1 rounded-3xl flex flex-col p-4 m-4">
      <div className="w-8 h-8 minlg:w-10 minlg:h-10 bg-nft-red-violet flexCenter rounded-full">
        <p className=" text-white font-semibold text-base minlg:text-lg">
          {rank}
        </p>
      </div>

      <div className="flex justify-center my-2 ab">
        <div className="relative w-20 h-20 minlg:w-28 minlg:h-28">
          <Image
            src={creatorImages}
            layout="fill"
            objectFit="cover"
            alt="creator"
            className="rounded-full"
          />
          <div className="absolute w-4 h-4 minlg:w-7 minlg:h-7 bottom-2 -right-0">
            <Image
              src={images.tick}
              layout="fill"
              objectFit="contain"
              alt="tick"
            />
          </div>
        </div>
      </div>

      <div className="mt-3 minlg:mt-7 text-center flexCenter flex-col">
        <p className=" mt-1  dark:text-white text-nft-black-1 text-base minlg:text-lg font-semibold">
          {creatorEths.toFixed(2)}
          <span className="font-normal"> {nftCurrency}</span>
        </p>
        {address ? (
          <button
            className={`nft-gradient text-sm minlg:text-lg py-2 px-6 minlg:px-8  font-semibold text-white mt-2 rounded-xl`}
            // onClick={handleClaim}
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
            btnTitle="Claim"
          />
        )}
      </div>
    </div>
  );
};

export default CreatorCard;
