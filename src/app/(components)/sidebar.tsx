import Image from 'next/image'
import React from 'react'
import logo from '../../../public/logo.png'
import { usePathname } from "next/navigation";
import Link from 'next/link';
import { Diagram, Home, LampCharge, NotificationBing, Setting2, TaskSquare } from 'iconsax-react';

interface SidebarLinkProps {
  href: string;
  Icon: React.ReactNode;
  Icon2: React.ReactNode;
  label: string;
}

const SidebarLink = ({
  href,
  Icon,
  Icon2,
  label,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/home");


  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center justify-start h-[48px] w-[228px] text-base font-semibold  p-4 rounded-[8px]  hover:bg-blue-400  00 gap-3 transition-colors ${
          isActive ? "bg-[#0359E0] text-white" : "bg-[#F6F6F6] text-[#474747] "
        }
      }`}
      >
        {isActive? Icon2 : Icon}

        <span
          className={""}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  return (
    <div className='flex flex-col w-[300px] items-center border-border border-[1px] bg-white'>
      <div className='flex flex-row w-full items-center whitespace-nowrap justify-center h-[72px] border-b-border border-b-[1px] text-[20px] font-semibold text-[#1C1C1C]'>
      <Image src={logo} height={40} width={40} alt='logo'/>
        Code94 Labs
      </div>

      <div className="flex flex-col gap-4 mt-16 " >
        <SidebarLink
          href="/"
          Icon={<Home size="24" color="#1C1C1C" />}
          Icon2={<Home size="24" color="#ffffff" />}
          label="Home"
        />
        <SidebarLink
          href="/tasks"
          Icon={<TaskSquare size="24" color="#1C1C1C" />}
          Icon2={<TaskSquare size="24" color="#ffffff" />}
          label="Tasks"
        />
        <SidebarLink
          href="/report"
          Icon={<Diagram size="24" color="#1C1C1C" />}
          Icon2={<Diagram size="24" color="#ffffff" />}
          label="Report"
        />
        <SidebarLink
          href="/insights"
          Icon={<LampCharge size="24" color="#1C1C1C" />}
          Icon2={<LampCharge size="24" color="#ffffff" />}
          label="Insights"
        />
        <SidebarLink
          href="/inbox"
          Icon={<NotificationBing size="24" color="#1C1C1C" />}
          Icon2={<NotificationBing size="24" color="#ffffff" />}
          label="Inbox"
        />
        <SidebarLink
          href="/settings"
          Icon={<Setting2 size="24" color="#1C1C1C" />}
          Icon2={<Setting2 size="24" color="#ffffff" />}
          label="Settings"
        />
        </div>
    </div>
  )
}

export default Sidebar