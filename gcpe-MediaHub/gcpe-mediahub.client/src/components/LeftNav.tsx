import React, { useState, useEffect } from 'react';
import {
    makeStyles,
    tokens,
    Tooltip,
} from '@fluentui/react-components';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    NavCategory,
    NavCategoryItem,
    NavDrawer,
    NavDrawerBody,
    NavItem,
    NavItemValue,
    NavSubItem,
    NavSubItemGroup,
    OnNavItemSelectData,
    Hamburger,
} from '@fluentui/react-nav-preview';

// --- Navigation Item Configuration ---
const navConfig = {
    mediaRequests: { path: '/requests', value: 'mediaRequests', categoryValue: null }, // Updated path
    mediaContactsCategory: { value: 'mediaContactsCategory' },
    contacts: { path: '/contacts', value: 'contacts', categoryValue: 'mediaContactsCategory' },
    outlets: { path: '/outlets', value: 'outlets', categoryValue: 'mediaContactsCategory' },
    distributionList: { path: '/', value: 'distributionList', categoryValue: 'mediaContactsCategory' },
} as const;

const useStyles = makeStyles({
    navContainer: {
        width: '240px',
        height: '100vh',
        flexShrink: 0,
        display: 'flex',
        '& button': {
            fontSize: `calc(${tokens.fontSizeBase400})`,
        },
        '& [role="treeitem"]': {
            fontSize: `calc(${tokens.fontSizeBase400})`,
        },
        '& [role="group"]': {
            fontSize: `calc(${tokens.fontSizeBase400})`,
        },
        '& span': {
            fontSize: `calc(${tokens.fontSizeBase400})`,
        }
    },
    appTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        paddingTop: '50px',
        marginLeft: tokens.spacingHorizontalM,
    },
});

const LeftNav = () => {
    const styles = useStyles();
    const location = useLocation();
    const navigate = useNavigate();

    // Initialize state with default values
    const [selectedValue, setSelectedValue] = useState<string>(navConfig.mediaRequests.value);
    const [selectedCategoryValue, setSelectedCategoryValue] = useState<string>(navConfig.mediaContactsCategory.value);
    const [openCategories, setOpenCategories] = useState<NavItemValue[]>([navConfig.mediaContactsCategory.value]);

    useEffect(() => {
        const currentPath = location.pathname;
        let foundMatch = false;

        for (const key in navConfig) {
            const item = navConfig[key as keyof typeof navConfig];
            if ('path' in item && item.path === currentPath) {
                setSelectedValue(item.value);
                setSelectedCategoryValue(item.categoryValue || '');
                if (item.categoryValue) {
                    setOpenCategories([item.categoryValue as NavItemValue]);
                }
                foundMatch = true;
                break;
            }
        }

        if (!foundMatch) {
            setSelectedValue('');
            setSelectedCategoryValue('');
        }
    }, [location.pathname]);

    const handleCategoryToggle = (
        ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
        data: OnNavItemSelectData
    ) => {
        const categoryValue = data.categoryValue as string;
        if (!categoryValue) return;

        setOpenCategories((prevOpenCategories) => {
            if (prevOpenCategories.includes(categoryValue)) {
                return prevOpenCategories.filter((cat) => cat !== categoryValue);
            } else {
                return [...prevOpenCategories, categoryValue];
            }
        });
    };

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <div className={styles.navContainer}>
            <NavDrawer
                open={true}
                type={"inline"}
                selectedValue={selectedValue}
                selectedCategoryValue={selectedCategoryValue}
                openCategories={openCategories}
                onNavCategoryItemToggle={(ev, data) => handleCategoryToggle(ev as React.MouseEvent<HTMLElement>, data)}
            >
                <NavDrawerBody style={{ paddingTop: '30px' }}>
                    <NavItem
                        value={navConfig.mediaRequests.value}
                        onClick={() => handleNavigation(navConfig.mediaRequests.path)}
                    >
                        Media Requests
                    </NavItem>

                    <NavCategory value={navConfig.mediaContactsCategory.value}>
                        <NavCategoryItem>
                            Media Contacts
                        </NavCategoryItem>
                        <NavSubItemGroup>
                            <NavSubItem
                                value={navConfig.contacts.value}
                                onClick={() => handleNavigation(navConfig.contacts.path)}
                            >
                                Contacts
                            </NavSubItem>
                            <NavSubItem
                                value={navConfig.outlets.value}
                                onClick={() => handleNavigation(navConfig.outlets.path)}
                            >
                                Outlets
                            </NavSubItem>
                            <NavSubItem
                                value={navConfig.distributionList.value}
                                onClick={() => handleNavigation(navConfig.distributionList.path)}
                            >
                                Distribution List
                            </NavSubItem>
                        </NavSubItemGroup>
                    </NavCategory>
                </NavDrawerBody>
            </NavDrawer>
        </div>
    );
};

export default LeftNav;