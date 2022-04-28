/**
 * @description Footer
 * @returns {JSX.Element}
 * @constructor
 */
const Footer = () => (
	<footer className='flex items-center justify-center py-6 bg-white shadow'>
		<p>
			Copyright &copy; {new Date().getFullYear()} by
			<a
				className='font-bold text-indigo-500 hover:text-indigo-800 transition-all sm:text-base'
				target='_blank'
				href='https://github.com/logicalOak/'
			>
				{' '}
				logicalOak
			</a>
		</p>
	</footer>
);

export default Footer;
