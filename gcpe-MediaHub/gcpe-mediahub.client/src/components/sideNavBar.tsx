import { DrawerProps, makeStyles, Tooltip } from "@fluentui/react-components";
import * as React from "react";
import {
    AppItem,
    Hamburger,
    NavCategory,
    NavCategoryItem,
    NavDivider,
    NavDrawer,
    NavDrawerBody,
    NavDrawerHeader,
    NavDrawerProps,
    NavItem,
    NavSectionHeader,
    NavSubItem,
    NavSubItemGroup,
} from "@fluentui/react-nav-preview";
import {
    Label,
    Radio,
    RadioGroup,
    Switch,
    tokens,
    useId,
    useRestoreFocusTarget,
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
type DrawerType = Required<DrawerProps>["type"];

export const SideNavbar = (props: Partial<NavDrawerProps>) => {
    const styles = useStyles();
    const [isOpen, setIsOpen] = React.useState(true);
    const [enabledLinks, setEnabledLinks] = React.useState(true);

    return (
        <div className={styles.root}>
            <NavDrawer
                open={isOpen}
                type={'inline'}
                className={styles.nav}
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
                    {/*<NavItem href={linkDestination} icon={<Dashboard />} value="1">*/}
                    {/*    Dashboard*/}
                    {/*</NavItem>*/}
                    <NavItem href={'./Media'}  value="1">
                        Media Requests
                    </NavItem>
                    <NavItem href={'./Contacts'}  value="2">
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

