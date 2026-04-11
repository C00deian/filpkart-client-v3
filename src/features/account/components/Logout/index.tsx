
import { FaSignOutAlt } from 'react-icons/fa';

interface LogoutButtonProps {
    onLogout: () => void;
}

const Logout = ({ onLogout }: LogoutButtonProps) => {

    return (
        <div className="flex items-center gap-2 px-4 py-3">
            <FaSignOutAlt className="w-5 h-5 text-blue-500" />
            <button
                onClick={onLogout}
                className="w-full text-left px-4 py-3 text-sm font-bold uppercase tracking-wide text-slate-600 hover:text-blue-500 transition-colors"
            >
                Logout
            </button>
        </div>
    );
};

export default Logout;