import React from "react";
import Link from "next/link";
import formatDate from "../../utils/formatDate";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { useQueryClient } from "react-query";
import { useWeb3 } from './../../providers/Web3Context';
import http from './../../utils/http'
import toast from "react-hot-toast";
const ItemDetailsDescription = ({
	data,
	collectionName = "Horizon",
	size,
}) => {
	const queryClient = useQueryClient();
	const { Moralis, isAuthenticated } = useMoralis();
	const contractProcessor = useWeb3ExecuteFunction();
	const { state: { nftTokenABI } } = useWeb3()
	async function mintNFT(tokenURI) {
		let options = {
			contractAddress: data?.collection[0].collection_address,
			functionName: "createToken",
			abi: nftTokenABI,
			params: {
				tokenURI: tokenURI,
			},
		};
		await contractProcessor.fetch({
			params: options,
			onSuccess: async (res) => {
				queryClient.invalidateQueries('USER')
				queryClient.invalidateQueries('USERBlockChainNFTs')
				await http.put(`/nfts/update_nft/${data?.id}`, {
					"nft_is_minted": true,
				}).then((res) => {

					if (res.data.status_code == 200)
						toast.success("Your NFT is Created.")

				}).catch((err) => {
					console.log(err)
				})
			},
			onError: (error) => {
				console.log(error);
			},
		});
	}
	const onSubmit = async () => {

		if (data?.nft_is_minted == true) {
			toast.success("Your NFT is Already Minted");
			return;
		}
		const { attributes, created_at, description,
			edition, name, unique_string } = data;

		const nftDataJson = {
			attributes, created_at,
			description,
			created_by: data?.author?.username,
			cryptoCost: data?.final_value,
			cryptoType: data?.cryptoType,
			edition, name, unique_string,
			image: data?.image_url,
		};
		if (!isAuthenticated) {
			toast.success("Please Connect Web3.0 Wallet")
			return;
		}
		const file = new Moralis.File("file.json", {
			base64: btoa(JSON.stringify(nftDataJson, undefined, 1)),
			type: 'json'
		});
		const moralisFileJson = await file.saveIPFS();
		await mintNFT(moralisFileJson._ipfs);
	}
	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col-lg-12 pt-10">
						<div className="section-title">
							<h3>Description</h3>
							<h3 className="pt-10">{data?.description}</h3>
						</div>
						<hr></hr>
						<div className="row">
							<div className="col-lg-6 col-6">
								<div className="item-details-user">
									<h3>Creator</h3>
									<div className="content">
										<div className="images">
											<a href={`/author-profile?author_name=${data?.created_by}`}>
												<img
													src={(data?.author?.profile_photo) ? (data?.author?.profile_photo) : "../images/author/author-user13.png"}
													alt="Images"
												/>
												<i className="ri-check-line"></i>
											</a>
										</div>
										<span>{data?.author?.username ? data?.author?.username : "Unnamed"}</span>
									</div>
								</div>
							</div>
							<div className="col-lg-6 col-6">
								<div className="item-details-user">
									<h3>Collection</h3>
									<div className="content">
										<div className="images">
											<a href={`/collection-nft-details/${data?.collection[0]?.id}`}>
												<img
													src={data?.collection[0]?.collection_logo_image ? data?.collection[0]?.collection_logo_image : "../images/author/author-user13.png"}
													alt="Images"
												/>
											</a>
										</div>

										<span>{data?.collection[0]?.collection_name}</span>
									</div>
								</div>
							</div>
						</div>
						<hr></hr>

						<div className="item-details-price">
							<div className="item-details-title">
								<h3>Edition : {data?.edition}</h3>
							</div>
							<ul>
								<li>
									Size
									<b>: {size ? size : "500x500"}</b>
								</li>
								<li>
									Created
									<b>: {formatDate(data?.created_at ? new Date(data?.created_at).toDateString() : new Date())}</b>
								</li>
								<li>
									Collection
									<b>: {collectionName}</b>
								</li>
								<li>
									Category
									<b>: {data?.category ? data?.category : "Not Assign"}</b>
								</li>
								<li>
									Total Likes:
									<b>: {data?.total_like ? data?.total_like : 0}</b>
								</li>
							</ul>
						</div>
						<hr></hr>

						<div className="item-details-user-item">
							<div className="images">
								<img
									src={(data?.author?.profile_photo) ? (data?.author?.profile_photo) : "../images/author/author-user13.png"}
									alt="Images"
								/>
								<i className="ri-check-line"></i>
							</div>

							<div className="content">
								<h3>{data?.author?.username ? data?.author?.username : "Unknown"}</h3>
								<span>Item Owner</span>
							</div>
						</div>

						{/* <div className="item-details-in-content">
							<AuctionEnds auctionEnds={new Date()} />
							<div className="item-right">
								<h3 className="item-remaining">Highest Bid</h3>
								<h3 className="item-right-eth">15,00 ETH</h3>
							</div>
						</div> */}
						<div className="item-details-btn">
							{!isAuthenticated ?
								(
									<Link href="/add-wallet">
										<a className="default-btn border-radius-50">
											Connect Wallet
										</a>
									</Link>	
								) : (
									<a className="default-btn border-radius-50"
										onClick={() => onSubmit()}
									>
										{data?.nft_is_minted ? "Already Mint" : "Mint Now"}
									</a>
								)
							}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ItemDetailsDescription;
