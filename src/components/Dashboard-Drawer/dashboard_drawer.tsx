import "./_dashboard_drawer.scss";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

// COMPONENTS
import { Avatar } from "@mui/material";

// ACTIONS
import { setToast, logout } from "@/libs/slices/common-slice";

// ICONS
import { BsFillHouseAddFill, BsFillHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa6";
import { IoMdHeart, IoMdSettings } from "react-icons/io";
import { RiLogoutCircleRFill } from "react-icons/ri";

const DashboardDrawer = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { user } = useAppSelector((state) => state.common);

	const logoutUser = () => {
		signOut({ redirect: false })
			.then(() => {
				router.replace("/");
				dispatch(logout());

				dispatch(
					setToast({ type: "success", message: "Successfully logged out" })
				);
			})
			.catch(() =>
				dispatch(setToast({ type: "error", message: "Error logging out" }))
			);
	};
	return (
		<div className="dashboardDrawer__component">
			<Link className="logo" href="/">
				<Image
					className="light"
					src="/logo-light-theme.png"
					quality={100}
					width={80}
					height={70}
					alt=""
				/>
				<Image
					className="dark"
					src="/logo-dark-theme.png"
					quality={100}
					width={80}
					height={70}
					alt=""
				/>
			</Link>

			<div className="drawer__menu">
				<div className="menu__item">
					<BsFillHouseFill className="icon" /> My Properties
				</div>

				<div className="menu__item">
					<BsFillHouseAddFill className="icon" /> List Property
				</div>

				<div className="menu__item">
					<IoMdHeart className="icon" /> Liked
				</div>
			</div>

			<div className="drawer__menu">
				<div className="menu__item">
					<FaUser className="icon" /> Profile
				</div>

				<div className="menu__item">
					<IoMdSettings className="icon" /> Settings
				</div>

				<div className="menu__item" onClick={logoutUser}>
					<RiLogoutCircleRFill className="icon" /> Logout
				</div>
			</div>

			{user && (
				<div className="user">
					<Avatar className="avatar" src="/images/user-image.jpg" />

					<div className="user__detail">
						<div className="name">
							{user.firstName} {user.lastName}
						</div>

						<div className="email">{user.email}</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DashboardDrawer;
