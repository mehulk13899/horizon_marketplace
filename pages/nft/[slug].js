import baseUrl from "../../utils/baseUrl";
import ItemDetailsHistory from "../../components/ItemDetails/ItemDetailsHistory";
import ItemDetailsDescription from "../../components/ItemDetails/ItemDetailsDescription";

const ItemDetails = ({ data }) => {
	return (
		<>
			<div className="item-details-area pt-100 pb-70">
				<div className="container">
					<div className="row">
						<div className="col-lg-6">
							<div className="item-details-left-side pr-20">
								<div className="item-details-img">
									<img
										src={data?.image_url}
										alt="Images"
									/>
								</div>
								<ItemDetailsHistory />
							</div>
						</div>

						<div className="col-lg-6">
							<div className="item-details-dsce">
								<ItemDetailsDescription data={data} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export async function getServerSideProps(ctx) {
	const { slug } = ctx.query;
	const response = await fetch(`${baseUrl}/nfts/${slug}`);
	const data = await response.json();
	return {
		props: { data }, // will be passed to the page component as props
	};
}

export default ItemDetails;
