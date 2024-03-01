import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import SearchBar from './SearchBar';
import { NavLink } from 'react-router-dom';

const navigation = [
  { name: 'Fiction', to: '/fiction', current: true },
  { name: 'Non-Fiction', to: '/non-fiction', current: false },
  { name: 'Mystery', to: '/mystery', current: false },
  { name: 'Educational', to: '/educational', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  return (
    <div className="flex justify-between items-center py-[1rem]">
      <div className="font-bold text-5xl font-serif">LOGO</div>

      <div className="flex gap-4 bg-gray-50 px-4 rounded-md">
        <div className="py-[0.5rem] h-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="h-full fill-slate-500"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="py-2 px-4 rounded-md bg-transparent focus:ring-none"
        />
      </div>
      <div className=" bg-red-600 w-10 aspect-square rounded-md"></div>
    </div>
  );
}

// <div className="flex justify-between gap-10">
//         {navigation.map((item) => (
//           <NavLink
//             key={item.name}
//             to={item.to}
//             className={classNames(
//               item.current
//                 ? 'text-[#4DAC96]'
//                 : ' text-slate-600 hover:text-[#4DAC96]',
//               'rounded-md px-3 py-2 text-m font-medium'
//             )}
//             aria-current={item.current ? 'page' : undefined}
//           >
//             {item.name}
//           </NavLink>
//         ))}
//       </div>
