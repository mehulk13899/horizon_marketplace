import React, { useEffect, useState } from 'react';
import Loader from '../../components/Common/Loader';
import Layout from '../../components/Layout/Layout';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { useWeb3 } from '../../providers/Web3Context';
import { useGetCollectionByID } from '../../hooks/Web2/useCollections';
import { useRouter } from 'next/router';
import Link from "next/link";
import http from '../../utils/http'
import { ethers } from "ethers";
import ABI from './../../contracts_abi/NFT.json';
import bytecode from './../../contracts_abi/bytecode.json';
import toast from 'react-hot-toast';
const notify = (message) => toast(message);

const Collection = ({ collection }) => {

  const router = useRouter();
  const { Moralis, isWeb3Enabled, isAuthenticated } = useMoralis();
  const { state: { walletAddress, networkId } } = useWeb3();
  const [collectionData, setCollectionData] = useState({
    totalItems: 0,
    totalOwners: 0,
    totalvolumes: 0,
    floorprice: 0
  })

  const { data: nftBalance, isLoading
  } = useGetCollectionByID({
    id: collection
  })
  const onSubmit = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const factory = new ethers.ContractFactory(ABI, bytecode, signer);
    console.log(process.env.NEXT_PUBLIC_MARKETPLACE_MUMBAI_CONTRACT_ADDRESS, nftBalance?.collection_name, nftBalance?.collection_symbol)
    const contract = await factory.deploy(process.env.NEXT_PUBLIC_MARKETPLACE_MUMBAI_CONTRACT_ADDRESS, nftBalance?.collection_name, nftBalance?.collection_symbol);
    try {
      const payload = {
        "collection_address": contract?.address,
        "metmask_created": true
      };
      console.log(payload);
      await http.put(`/collection/${nftBalance?.id}`, payload).then(async (res) => {
        if (res?.status == 201) {
          notify(res?.data?.message)
        }
        else {
          notify(res?.data?.message)
        }
      })
        .catch((err) => {
          notify(err?.response?.data?.message)
        });

    } catch (error) {
      console.log(error);
      const { data } = error.response.data;
      if (data) {
        notify(data[0].messages[0].message);
      }
    }
  };

  if (isLoading) {
    return (
      <Loader />
    )
  }
  return (
    <Layout>
      <div className='container'>
        <div className="authoreprofile authoSm mt-0 mt-md-5 pt-0 pt-md-2">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="authoreproimg">
                  <div className="authoreproimgBox">
                    <img className="img-fluid d-none d-md-block"

                      src="../images/authoprofilebannerimg.jpeg" alt="img" />
                    <img className="img-fluid d-block d-md-none"
                      src="../images/authprobannersm01.jpeg" alt="img" />
                  </div>
                  <div className="authoreproicon"><img className="img-fluid"
                    style={{
                      borderRadius: "50%"
                    }}
                    src="../images/authorproicon01.jpeg" alt="img" /></div>
                </div>
                <div className="auProfileDetail">
                  <div className="joincommunity auSocial">
                    <ul>
                      <li><a href="#"><img className="img-fluid" src="../images/activityicon.svg" alt="img" /></a></li>
                      <li><a href="#"><img className="img-fluid" src="../images/discordbutton.svg" alt="img" /></a></li>
                      <li><a href="#"><img className="img-fluid" src="../images/insta.svg" alt="img" /></a></li>
                      <li><a href="#"><img className="img-fluid" src="../images/twitter.svg" alt="img" /></a></li>
                    </ul>

                  </div>
                  <div className="prCnt">
                    <h2 className="textwhitecolor">{
                      nftBalance && nftBalance?.collection_name
                    }</h2>
                    <h3 className="textgraycolor mt-3 mb-4"><span className="textbluecolor">Last updated:</span> {nftBalance?.updated_at}</h3>
                    <p className="textgraycolor">{nftBalance?.description}</p>
                    {nftBalance?.collection_address == undefined ?
                      !isAuthenticated ?
                        (
                          <>
                            <p className="textgraycolor">Your Collection is Not Created Yet Please Deploy Collection to Blockchain</p>
                            <Link href="/add-wallet">
                              <a className="default-btn border-radius-50">
                                Connect Wallet
                              </a>
                            </Link>
                          </>

                        ) : (
                          <>
                            <p className="textgraycolor">Your Collection is Not Created Yet Please Deploy Collection to Blockchain</p>
                            <a className="default-btn border-radius-50"
                              onClick={() => onSubmit()}
                            >
                              {"Mint Now"}
                            </a>
                          </>
                        ) : null
                    }
                  </div>

                </div>
                <div className="showResultTop">
                  <ul>
                    <li>
                      <span className="textgraycolor">Items</span>
                      <strong className="textwhitecolor">{collectionData?.totalItems}</strong>
                    </li>

                    <li>
                      <span className="textgraycolor">Owners</span>
                      <strong className="textwhitecolor">{collectionData?.totalOwners}</strong>
                    </li>

                    <li>
                      <span className="textgraycolor">Floor Price</span>
                      <strong className="textwhitecolor">
                        <img className="img-fluid" src="../images/priceicon.svg" alt="img" />
                        {collectionData?.floorprice}</strong>
                    </li>

                    <li>
                      <span className="textgraycolor">Volume Traded</span>
                      <strong className="textwhitecolor">
                        <img className="img-fluid" src="../images/priceicon.svg" alt="img" />
                        {collectionData?.totalvolumes}</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="popularCollection mt-3 pt-3 mt-md-4 pt-md-4">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="row d-none d-md-flex">
                  <div className="col-md-6 col-xl-3 mb-3 mb-xl-0">
                    <button className="filterbtn dropdown-toggle text-start" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                      Price
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <li><a className="dropdown-item" href="#">Highest price</a></li>
                      <li><a className="dropdown-item" href="#">Lowest Price</a></li>
                    </ul>
                  </div>

                  <div className="col-md-6 col-xl-3 mb-3 mb-xl-0">
                    <button className="filterbtn dropdown-toggle text-start" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                      Newest
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <li><a className="dropdown-item" href="#">Newest</a></li>
                      <li><a className="dropdown-item" href="#">Oldest</a></li>
                    </ul>
                  </div>

                  <div className="col-md-6 col-xl-3">
                    <button className="filterbtn dropdown-toggle text-start" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                      All items
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <li><a className="dropdown-item" href="#">Single items</a></li>
                      <li><a className="dropdown-item" href="#">Bundles</a></li>
                    </ul>
                  </div>

                  <div className="col-md-6 col-xl-3">
                    <button className="filterbtn dropdown-toggle text-start" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                      Currency
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <li><a className="dropdown-item" href="#">USD</a></li>
                      <li><a className="dropdown-item" href="#">Ethereum</a></li>
                    </ul>
                  </div>
                </div>
                <div className="row mt-2 mt-md-5">
                  {
                    nftBalance?.nfts?.map((nft) => (
                      <>
                        <div className="col-md-6 col-xl-3 mb-4" key={nft?.token_uri}>
                          <div className="aboutitem">
                            <div className="aboutitemImg">
                              <img
                                src={nft?.image_url}
                                style={{
                                  width: "100%",
                                  objectFit: "cover",
                                  height: "250px",
                                  cursor: "pointer"
                                }}
                                onClick={() => {
                                  router.push(`/nft/${nft?.id}`)
                                }
                                }
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null; // prevents looping
                                  currentTarget.src = "../images/notfoundimage.png";
                                }}
                              />
                            </div>
                            <div className="bgdarkbluecolor aboutitemcnt">
                              <div className="itemtitlecode">
                                <h2 className="textgraycolor">{nft?.name}</h2>
                                <h3 className="textwhitecolor">
                                  {
                                    nft?.metadata?.name ? nft?.metadata?.name :
                                      nft?.token_id ? nft?.token_id : ""
                                  }
                                </h3>
                              </div>
                              <div className="itemtitlePrice">
                                <h2 className="textgraycolor">Price</h2>
                                <h3 className="textwhitecolor">
                                  <img src="../images/priceicon.svg" /> <strong>0,006</strong></h3>
                                <h4 className="textgraycolor"><span>
                                  <img src="../images/hearticon.svg" /></span> 0</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const { collection } = ctx.query;
  return {
    props: { collection }, // will be passed to the page component as props
  };
}
export default Collection;

// const { resolveLink } = useIPFS();

// const nftBalanceJson = async (data) => {
//   if (data?.result) {
//     let NFTs = data?.result;
//     for (let NFT of NFTs) {
//       if (NFT?.metadata) {
//         NFT.metadata = JSON.parse(NFT.metadata);
//         NFT.image_url = resolveLink(NFT.metadata?.image);
//       } else if (NFT?.token_uri) {
//         try {
//           await fetch(NFT.token_uri)
//             .then(async (response) => await response.json())
//             .then((data) => {
//               NFT.image_url = resolveLink(data.image);
//             });
//         } catch (error) {
//         }
//       }
//     }
//     return NFTs;
//   }
// };

// const setData = async () => {
//   const options = { chain: networkId, address: walletAddress, token_address: collection };
//   const polygonNFTs = await Moralis.Web3API.account.getNFTs(options);
//   const data = await nftBalanceJson(polygonNFTs);
//   var dataTemp = [...data];
//   var finalObjec = {
//     totalItems: data?.length ? data.length : 0,
//     totalvolumes: 0,
//     floorprice: 0
//   }
//   var ownerList = [];
//   dataTemp.map((nft) => {
//     if (!ownerList.includes(nft?.owner_of)) {
//       ownerList.push(nft?.owner_of)
//     }

//   })
//   finalObjec.totalOwners = ownerList.length;
//   setCollectionData(finalObjec);
//   return data;
// };
// const { data: nftBalance, isLoading, refetch } = useQuery([`collectionnft_${collection}`], setData, {
//   keepPreviousData: true,
//   enabled: false
// });
// useEffect(() => {
//   if (isWeb3Enabled && isAuthenticated) {
//     refetch()
//   }
// }, [isWeb3Enabled, networkId, walletAddress]);
