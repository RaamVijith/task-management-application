import Image from 'next/image'
import React from 'react'
import logo from '../../../public/logo.png'
import { usePathname } from "next/navigation";
import Link from 'next/link';
import { HambergerMenu } from 'iconsax-react';

interface SidebarLinkProps {
  href: string;
  Icon: React.ReactNode;
  label: string;
}

const SidebarLink = ({
  href,
  Icon,
  label,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");


  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center justify-start px-8 py-4  hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
          isActive ? "bg-blue-200 text-white" : ""
        }
      }`}
      >
       <div>{Icon}</div>
        <span
          className={"block font-medium text-gray-700"}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  return (
    <div className='flex flex-col w-[276px] border-border border-[1px] bg-white'>
      <div className='flex flex-row items-center whitespace-nowrap justify-center h-[72px] border-b-border border-b-[1px] text-[20px] font-semibold text-[#1C1C1C]'>
      <Image src={logo} height={40} width={40} alt='logo'/>
        Code94 Labs
      </div>

      <div className="flex-grow mt-8">
        <SidebarLink
          href="/tasks"
          Icon={<HambergerMenu size="20" color="#1C1C1C" />}
          label="tasks"
        />
        <SidebarLink
          href="/board"
          Icon={<HambergerMenu size="20" color="#1C1C1C" />}
          label="board"
        />
        </div>
    </div>
  )
}

export default Sidebar