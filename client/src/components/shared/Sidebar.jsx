import React from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { FcLike } from 'react-icons/fc';
import { HiOutlineLogout } from 'react-icons/hi';
import { SIDEBAR_LINKS, SIDEBAR_BOTTOM_LINKS } from '../../lib/constants';

const appApiUrl = process.env.REACT_APP_API_URL;

const linkClass =
    'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base';

export default function Sidebar() {

    const handleLogout = () => {
        fetch(`${appApiUrl}/logout`, {
            method: 'POST',
            credentials: 'include', // Include credentials (cookies)
        })
        .then(response => {
            if (response.ok) {
                // Redirect to login page or any other desired route
                window.location.replace('/#/');
            } else {
                throw new Error('Failed to logout.');
            }
        })
        .catch(error => {
            console.error('Error during logout:', error);
        });
    };

    return (
        <div className="bg-neutral-900 w-60 p-3 flex flex-col">
            <div className="flex items-center gap-2 px-1 py-3">
                <FcLike fontSize={24} />
                <span className="text-neutral-200 text-lg">Healthy Hub</span>
            </div>
            <div className="py-8 flex flex-1 flex-col gap-0.5">
                {SIDEBAR_LINKS.map((link) => (
                    <SidebarLink key={link.key} link={link} />
                ))}
            </div>
            <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
                {SIDEBAR_BOTTOM_LINKS.map((link) => (
                    <SidebarLink key={link.key} link={link} />
                ))}
                <button className={classNames(linkClass, 'cursor-pointer text-red-500')} onClick={handleLogout}>
                    <span className="text-xl">
                        <HiOutlineLogout />
                    </span>
                    Logout
                </button>
            </div>
        </div>
    );
}

function SidebarLink({ link }) {
    const { pathname } = useLocation();

    return (
        <Link
            to={link.path}
            className={classNames(pathname === link.path ? 'bg-neutral-700 text-white' : 'text-neutral-400', linkClass)}
        >
            <span className="text-xl">{link.icon}</span>
            {link.label}
        </Link>
    );
}
