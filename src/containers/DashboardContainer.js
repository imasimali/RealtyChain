import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import withFirebaseAuth from 'react-with-firebase-auth';
import firebaseConfig from '../firebaseConfig';
import { useHistory } from 'react-router-dom';

import { Dashboard } from '../components';
import { adminurls } from '../constants/routes/adminurls';

const firebaseApp = !firebase.apps.length
	? firebase.initializeApp(firebaseConfig)
	: firebase.app();

const DashboardContainer = ({ title, children, user, signOut }) => {
	const [show, setShow] = useState(false);
	const [pro, setPro] = useState(true);
	const history = useHistory();

	useEffect(() => {
		checkUser(user);
	}, []);

	useEffect(
		() => {
			checkUser(user);
		},
		[user]
	);

	function checkUser(user) {
		setTimeout(() => {
			if (user === null) {
				history.push('/login');
			}
		}, 5);
	}

	const handleDashboardNavigationOpen = () => {
		setShow(true);
		setPro(false);
	};

	const handleDashboardNavigationClose = () => {
		setShow(false);
		setPro(true);
	};
	return (
		<Dashboard>
			<Dashboard.Header>
				<Dashboard.Title>Dashboard</Dashboard.Title>
				<Dashboard.SideNav>
					<Dashboard.Button onClick={handleDashboardNavigationOpen}>
						<Dashboard.Icon name="fa fa-bars" />
					</Dashboard.Button>
				</Dashboard.SideNav>
			</Dashboard.Header>
			<Dashboard.Content>
				<Dashboard.Left show={show} pro={pro}>
					<Dashboard.Close>
						<Dashboard.Icon
							onClick={handleDashboardNavigationClose}
							name="fas fa-times"
						/>
					</Dashboard.Close>
					<Dashboard.LeftHeader>
						<Dashboard.Image source="default.jpg" alt="" />
						<Dashboard.Text>
              {user != null? user.email : "Emad Zaheer"} {/*<Dashboard.Span>(Admin)</Dashboard.Span>*/}
						</Dashboard.Text>
					</Dashboard.LeftHeader>
					<Dashboard.LeftContent>
						<Dashboard.List>
							{adminurls.map(url => {
								if (url.subUrl) {
									return <LinksWithSubLinks key={url.name} url={url} />;
								}
								return <Links url={url.name} url={url} signOut={signOut} />;
							})}
						</Dashboard.List>
					</Dashboard.LeftContent>
				</Dashboard.Left>
				<Dashboard.Right>
					<Dashboard.RightHeader>
						<Dashboard.Title>{title}</Dashboard.Title>
					</Dashboard.RightHeader>
					<Dashboard.RightContent>{children}</Dashboard.RightContent>
				</Dashboard.Right>
			</Dashboard.Content>
		</Dashboard>
	);
};

const LinksWithSubLinks = function({ url }) {
	const [subLinksShown, setSublinksShown] = useState(false);

	const handleClick = () => setSublinksShown(prevState => !prevState);

	return (
		<Dashboard.ListItem onClick={handleClick}>
			<Dashboard.Anchor to={url.url}>
				<Dashboard.Icon name={url.icon} />
				<Dashboard.Text>{url.name}</Dashboard.Text>
				<Dashboard.SublinkIcon name="fas fa-chevron-down " />
			</Dashboard.Anchor>
			<Dashboard.SubList>
				{url.subUrls.map(
					url => subLinksShown && <Links key={url.name} url={url} />
				)}
			</Dashboard.SubList>
		</Dashboard.ListItem>
	);
};

const Links = function({ url, signOut }) {
	if (url.url == 'leaving') {
		return (
			<Dashboard.ListItem>
				<Dashboard.Anchor
					onClick={e => {
						e.preventDefault();
						signOut();
					}}
				>
					<Dashboard.Icon name={url.icon} />
					<Dashboard.Text>{url.name}</Dashboard.Text>
				</Dashboard.Anchor>
			</Dashboard.ListItem>
		);
	}
	return (
		<Dashboard.ListItem>
			<Dashboard.Anchor to={url.url}>
				<Dashboard.Icon name={url.icon} />
				<Dashboard.Text>{url.name}</Dashboard.Text>
			</Dashboard.Anchor>
		</Dashboard.ListItem>
	);
};

// export default DashboardContainer;

const firebaseAppAuth = firebaseApp.auth();

export default withFirebaseAuth({ firebaseAppAuth })(DashboardContainer);
