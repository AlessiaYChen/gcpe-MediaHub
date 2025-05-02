import React from 'react';
import PageHeading from './pageHeading';
import { makeStyles } from '@fluentui/react-components';
import Header from './header';
import SideNavbar from './sideNavBar';

const useStyles = makeStyles({
	mainContainer: {
		display: "inline-flex",
	},
	pageContent: {
		marginLeft: "40px",
	}
}
);

interface LayoutProps {
	title: String;
	children: any;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
	const styles = useStyles();

	return (
		<div>
			<Header />
			<div className={styles.mainContainer} >
				<SideNavbar />
				<main className={styles.pageContent} >
				<PageHeading title={title} />
					{children}
				</main>
			</div>
		</div>
	);
}

export default Layout;