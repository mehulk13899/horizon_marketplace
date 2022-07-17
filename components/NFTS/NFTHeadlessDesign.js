import React from 'react'
import { useRouter } from 'next/router';

export default function NFTHeadlessDesign({ nft, title: openDialogTitle, price = true }) {
    const router = useRouter()
    return (
        <div className="col-md-6 col-xl-3 mb-4">
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
                    <button type='button' className='default-btn border-radius-5' onClick={() => {
                        if (openDialogTitle == "Open NFT") {
                            router.push(`/nft/${nft?.id}`)
                        }
                        else if (openDialogTitle == "Mint NFT") {
                            router.push(`/nft/create-new-nft?nft_id=${nft?.id}`)
                        }
                    }
                    }
                    >
                        {openDialogTitle ? openDialogTitle : "Open NFT"}
                    </button>
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
                    {price ?
                        <>
                            <div className="itemtitlePrice">
                                <h2 className="textgraycolor">Price</h2>
                                <h3 className="textwhitecolor">
                                    <img src="../images/priceicon.svg" /> <strong>0,006</strong></h3>
                            </div>
                        </> : <></>}

                </div>
            </div>
        </div >
    )
}
