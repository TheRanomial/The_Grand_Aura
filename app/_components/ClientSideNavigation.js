'use client';

import { useState } from 'react';
import Link from 'next/link';
import SignOutButton from './SignOutButton';

export default function ClientSideNavigation({ navLinks }) {
  const [activeLink, setActiveLink] = useState('/account');

  return (
    <ul className='flex flex-col gap-2 h-full text-lg'>
      {navLinks.map((link) => (
        <li key={link.name}>
          <Link
            className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold ${
              activeLink === link.href ? 'bg-primary-900 text-primary-100' : 'text-primary-200'
            }`}
            href={link.href}
            onClick={() => setActiveLink(link.href)}
          >
            {link.icon}
            <span>{link.name}</span>
          </Link>
        </li>
      ))}
      <li className='mt-auto'>
        <SignOutButton />
      </li>
    </ul>
  );
}
