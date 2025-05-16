import { makeStyles } from "@fluentui/react-components";
import * as React from "react";
import {
    NavDrawer,
    NavDrawerBody,
    NavDrawerHeader,
    NavItem,
} from "@fluentui/react-nav-preview";
import {
    tokens,
} from "@fluentui/react-components";
/*styling goes here */
const useStyles = makeStyles({
    root: {
        overflow: "hidden",
        display: "inline-flex",
        height: "100vh",
    },
    nav: {
        minWidth: "200px",
    },
    content: {
        flex: "1",
        padding: "16px",
        display: "grid",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    field: {
        display: "flex",
        marginTop: "4px",
        marginLeft: "8px",
        flexDirection: "column",
        gridRowGap: tokens.spacingVerticalS,
    },
});
interface SideNavbarProps {
    selectedValue: string;
}

export const SideNavbar: React.FC<SideNavbarProps> = ({ selectedValue }) => {
    const styles = useStyles();
    const [isOpen] = React.useState(true);


    return (
        <div className={styles.root}>
            <NavDrawer
                open={isOpen}
                type={'inline'}
                className={styles.nav}
                selectedValue={selectedValue || "1"}
                defaultSelectedCategoryValue=""

            >
                <NavDrawerHeader>
                    <div>
                        Nav Bar Header
                    </div>
                    {/*<Tooltip content="Close Navigation" relationship="label">*/}
                    {/*    <Hamburger onClick={() => setIsOpen(!isOpen)} />*/}
                    {/*</Tooltip>*/}
                </NavDrawerHeader>

                <NavDrawerBody>
                    <NavItem href={'./'} value="1">
                        Home
                    </NavItem>
                    <NavItem href={'./Media'} value="2">
                        Media Requests
                    </NavItem>
                    <NavItem href={'./Contacts'} value="3">
                        Contacts
                    </NavItem>
                </NavDrawerBody>
            </NavDrawer>
            {/*<div className={styles.content}>*/}
            {/*    <Tooltip content="Toggle navigation pane" relationship="label">*/}
            {/*        <Hamburger*/}
            {/*            onClick={() => setIsOpen(!isOpen)}*/}
            {/*            {...restoreFocusTargetAttributes}*/}
            {/*        />*/}
            {/*    </Tooltip>*/}
            {/*</div>*/}
        </div>
    );
}


export default SideNavbar;

