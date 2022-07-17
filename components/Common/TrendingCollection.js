import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useGetTopCollection } from "../../hooks/Web2/useMeQuery";
import CollectionDetails from "../Collection/CollectionDetails";
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
		"<i className='ri-arrow-left-s-line'></i>",
		"<i className='ri-arrow-right-s-line'></i>",
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

const TrendingCollection = ({ bg }) => {
	const [display, setDisplay] = useState(false);
	const [isMounted, setisMounted] = useState(false);
	const { data } = useGetTopCollection();
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
								<h2>Trending Collection</h2>
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
								{data?.filter((d) => d.collection_cover_image != undefined)?.map((nft) => {
									return (
										< CollectionDetails
											collection={nft}
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

export default TrendingCollection;
