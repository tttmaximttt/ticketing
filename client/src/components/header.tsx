import Link from "next/link";

const Header = ({ user }) => {
  const links = [
    user && {
      label: 'Sign Out',
      href: '/auth/signout'
    },
    !user && {
      label: 'Sign In',
      href: '/auth/signin'
    },
    !user && {
      label: 'Sign Up',
      href: '/auth/signup'
    }
  ]
    .filter((linkConf) => linkConf)
    .map(({ label, href }) => (
      <li key={href}>
        <Link href={href} className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-violet-600 from-sky-400">{label}</span>
        </Link>
      </li>
    ));

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="https://github.com/tttmaximttt" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 rtl:space-x-reverse">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-black md:text-3xl lg:text-4xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-violet-600 from-sky-400">
              GitHub
            </span>
          </h1>
        </Link>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
          <ul
            className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {links}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
