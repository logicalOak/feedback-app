import { MdSportsEsports } from 'react-icons/md';
import { Link } from 'react-router-dom';

/**
 * @description Header
 * @returns {JSX.Element}
 * @constructor
 */
const Header = () => (
	<header className='bg-white p-3 shadow md:py-5 lg:px-5 text-secondary relative'>
		<div className='flex flex-col items-center gap-1 sm:flex-row sm:justify-between'>
			{/* Logo */}
			<Link
				className='flex flex-col items-center gap-1 font-semibold sm:flex-row'
				to='/'
			>
				<MdSportsEsports className='text-lg' />
				FeedBack App
			</Link>

			{/* Nav */}
			<div className='flex gap-2 sm:gap-3'>
				<Link
					to='/'
					className='font-bold text-sm text-indigo-500 hover:text-indigo-800 transition-all sm:text-base'
				>
					Home
				</Link>
				<Link
					to='/about'
					className='font-bold text-sm text-indigo-500 hover:text-indigo-800 transition-all sm:text-base'
				>
					About
				</Link>
			</div>
		</div>
	</header>
);

export default Header;
