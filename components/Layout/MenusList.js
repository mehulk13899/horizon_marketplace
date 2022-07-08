import { useMoralis } from "react-moralis";
import Chains from "../Common/Chains";
import toast, { Toaster } from "react-hot-toast";
import React, { useState } from "react";
import { useWeb3 } from "../../providers/Web3Context/index";
import useChain from "../../hooks/Web3/useChain";
import { Actions } from "../../providers/Web3Context/reducer";
import { menuItems } from "../../utils/constants";
import Layout from "../../components/Layout/Layout";
import { useRegisterMutation } from "../../hooks/Web2/mutations/useRegisterMutation";
import { useRouter } from "next/router";
import { handleLogin, handleLogout } from "../../utils/auth";
import { Button, Form, Modal } from "react-bootstrap";

import Link from "next/link";

const MenusList = ({ user }) => {
	const { isAuthenticated: web3Authentication } = useMoralis();
	const avatarStyle = {
		padding: "0px 5px",
		borderRadius: "25px",
		marginRight: "8px",
		backgroundColor: "lightgray",
	};

	const router = useRouter();
	const { mutate, isLoading: loading } = useRegisterMutation();
	const [selectchain, setSelectchain] = useState();
	console.log(selectchain);
	const { authenticate, authError, isAuthenticated, logout } = useMoralis();
	const {
		state: { networkId },
	} = useWeb3();
	const { switchNetwork } = useChain();
	const { dispatch } = useWeb3();

	React.useEffect(() => {
		const newSelected = menuItems.find((item) => item.key === networkId);
		setSelectchain(newSelected?.value);
	}, []);
	const handleConnect = async () => {
		if (!selectchain && !isAuthenticated) {
			toast.error("Please Choose Blockchain");
			return;
		}
		if (!isAuthenticated && selectchain) {
			await switchNetwork(selectchain);
			await authenticate({
				signingMessage: "Horizon Marketplace Want to Access your account.",
			}).then(async (user) => {
				if (authError) toast.error(authError.message);
				else {
					await dispatch({
						type: Actions.SET_NETWORK_ID,
						networkId: selectchain,
					});
					mutate(
						{ walletAddress: user?.get("ethAddress") },
						{
							onSuccess: (res) => {
								if (res?.data?.statusCode == 200) {
									handleLogin(res?.data);
									router.replace("/profile");
									dispatch({ type: Actions.SET_USER, user: res?.data?.user });
								} else {
									toast.error(res?.data?.message);
								}
							},
							onError: (error) => {
								const { data } = error.response;

								if (data) {
									toast.error(data?.message);
								}
							},
						}
					);
					toast.success("Wallet Connected.");
				}
			});
		} else {
			await logout();
			handleLogout();
			toast.success("Wallet Disconnected.");
		}
	};
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<div className="container-fluid">
				<nav className="navbar navbar-expand-md navbar-light">
					<Link href="/">
						<a className="navbar-brand">
							<img
								src="/images/logo-2.png"
								style={{
									objectFit: "contain",
									width: "50%",
									height: 100,
								}}
								alt="Logo"
								className="black-logo"
							/>
						</a>
					</Link>
					<div
						className="collapse navbar-collapse mean-menu"
						id="navbarSupportedContent"
					>
						<ul className="navbar-nav m-auto">
							{/* <li className="nav-item">
							<Link
								href="/discover"
								activeClassName="active"
							>
								<a className="nav-link">
									Discover
								</a>
							</Link>
						</li>
						<li className="nav-item">
							<Link
								href="/activity"
								activeClassName="active"
							>
								<a className="nav-link">Activity</a>
							</Link>
						</li>


						<li className="nav-item">
							<a href="#" className="nav-link">
								Community
								<i className="ri-arrow-down-s-line"></i>
							</a>
							<ul className="dropdown-menu">
								<li className="nav-item">
									<Link
										href="/authors"
										activeClassName="active"
									>
										<a className="nav-link">Authors</a>
									</Link>
								</li>
								<li className="nav-item">
									<Link
										href="/blogs"
										activeClassName="active"
									>
										<a className="nav-link">
											Blogs
										</a>
									</Link>
								</li>
							</ul>
						</li> */}
							{/* <li className="nav-item">
							<a className="nav-link">Crypto Game
								<i className="ri-arrow-down-s-line"></i>
							</a>
							<ul className="dropdown-menu">
								<li className="nav-item">
									<Link
										href={"/game"}
										activeClassName="active"
									>
										<a className="nav-link">How It's Work?</a>
									</Link>
								</li>
								<li className="nav-item">
									<Link
										href={"/play-nft-game"}
										activeClassName="active"
									>
										<a className="nav-link">Generate Avatar</a>
									</Link>
								</li>
							</ul>
						</li> */}

							{web3Authentication && (
								<li className="nav-item" style={{ display: "flex" }}>
									<a href="#" className="nav-link" style={avatarStyle}>
										<i className="ri-user-3-line"></i>
									</a>
									<span style={{ color: "white" }}>{user?.username}</span>
									<ul className="dropdown-menu">
										<li className="nav-item">
											<Link href="/profile" activeClassName="active">
												<a className="nav-link">Profile</a>
											</Link>
										</li>
										<li className="nav-item">
											<Link
												href={
													!web3Authentication ? "/add-wallet" : "/collection"
												}
												activeClassName="active"
											>
												<a className="nav-link">My Collection</a>
											</Link>
										</li>

										<li className="nav-item">
											<Link
												href={
													!web3Authentication
														? "/add-wallet"
														: "/create-new-collection"
												}
												activeClassName="active"
											>
												<a className="nav-link">Create Collection</a>
											</Link>
										</li>
										<li className="nav-item">
											<Link
												href={
													!web3Authentication
														? "/add-wallet"
														: "/nft/create-new-nft"
												}
												activeClassName="active"
											>
												<a className="nav-link">Create New NFT</a>
											</Link>
										</li>
									</ul>
								</li>
							)}
						</ul>
						<div className="others-options">
							<ul className="optional-item-list">
								{/* {!web3Authentication && (
								<li>
									<Link
										href="/login"
										activeClassName="active"
									>
										<a>Login</a>
									</Link>
								</li>
							)} */}
								<li>
									<a className="btnnew" onClick={handleShow}>
										{web3Authentication == false
											? "Connect Wallet"
											: "MeataMask Connected"}
									</a>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</div>
			<Modal show={show} onHide={handleClose} >
				
				<Modal.Header closeButton >
					<Modal.Title>Connect Your wallet</Modal.Title>
				</Modal.Header>
				<Modal.Body >
					<Form>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<div class="container">
							{menuItems?.map((item, index) => {
										return (
											<>
												{/* <div class="" key={index}>{item?.icon}<br />{item?.value}</div> */}
												<li class="list-item selected-coin"  key={index}>
													<div className="icon-pop">{item?.icon}</div>
												

										<h5 class="coin-name my-2">{item?.value}</h5>
									</li>
											</>
										);
									})}
								
								
							</div>
							{/* <div className="collection-widget-area pt-70 pb-70">
								<div className="container">
									<div className="row height d-flex justify-content-center align-items-center">
										<div className="text-center">
                <h2 style={{ color: "white" }}>Connect Your wallet</h2>
                <p style={{ color: "white" }}>
                  Connect with one of available wallet providers.
                </p>
                <p style={{ color: "white" }}>
                  Select available Chains
                </p>
              </div>
										<div className="col-md-10 search-engine">
											<div className="collection-category text-center pt-3 pb-3">
												<ul>
													{menuItems?.map((item, index) => {
														return (
															<li
																key={index}
																style={{
																	backgroundColor:
																		selectchain == item?.key
																			? "#f6f6f6"
																			: "#0c0d23",
																	border:
																		selectchain == item?.key
																			? "1px solid white"
																			: "1px solid white",
																}}
															>
																<div
																	style={{
																		cursor: "pointer",
																	}}
																	onClick={() => setSelectchain(item?.key)}
																>
																	{item?.icon}
																	<a
																		className="ml-2"
																		style={{
																			color:
																				selectchain == item?.key
																					? "#0c0d23"
																					: "#8d99ff",
																		}}
																	>
																		{item?.value}
																	</a>
																</div>
															</li>
														);
													})}
												</ul>
											</div>
											<div className="text-center">
												<button
													className="btnnew"
													onClick={() => handleConnect()}
												>
													{isAuthenticated ? "Disconnect" : "Connect"}
												</button>
											</div>
										</div>
									</div>
								</div>
							</div> */}
						</Form.Group>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default MenusList;
