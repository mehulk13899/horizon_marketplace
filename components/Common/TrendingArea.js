import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import NftCardWithoutTime from "./NftCardWithoutTime";
import { useGetTopNFT } from "../../hooks/Web2/useMeQuery";
const OwlCarousel = dynamic(import("react-owl-carousel3"));

const options = {
	loop: true,
	margin: 0,
	nav: true,
	mouseDrag: false,
	dots: false,
	autoplay: true,
	smartSpeed: 500,
	navText: [
		"<",
		" >",
	],
	responsive: {
		0: {
			items: 1,
		},
		576: {
			items: 2,
		},
		1000: {
			items: 3,
		},
		1200: {
			items: 4,
		},
	},
};

const TrendingArea = ({ bg }) => {
	const [display, setDisplay] = useState(false);
	const [isMounted, setisMounted] = useState(false);
	const { data } = useGetTopNFT();
	useEffect(() => {
		setisMounted(true);
		setDisplay(true);
	}, []);
	return (
		<>
			<div className={`trending-area ${bg} pt-100 pb-70`}>
				<div className="container">
					<div className="row">
						<div className="col-lg-8 col-md-6">
							<div className="section-title">
								<h2>Trending NFTs</h2>
							</div>
						</div>

						<div className="col-lg-4 col-md-6">
							<div className="trending-btn text-end">
								<Link href="/collection">
									<a className="default-btn border-radius-5">
										Explore More
									</a>
								</Link>
							</div>
						</div>
					</div>
					<div className="trending-slider pt-45">
						{display ? (
							<OwlCarousel {...options}>
								{data?.map((nft) => {
									return (
										<NftCardWithoutTime
											data={nft}
											key={nft.id}
										/>
									);
								})}
							</OwlCarousel>
						) : (
							""
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default TrendingArea;
