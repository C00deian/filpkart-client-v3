
import { FaUser } from 'react-icons/fa';

interface ProfileProps {
    displayName: string;
}

const Profile = ({ displayName }: ProfileProps) => {
    return (
        <div className="p-4 flex items-center gap-3 border-b border-slate-100">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                {displayName ? (
                    <span className="text-primary font-bold text-xl">
                        {displayName[0].toUpperCase()}
                    </span>
                ) : (
                    <FaUser className="w-6 h-6 text-primary" />
                )}
            </div>
            <div>
                <p className="text-xs text-slate-700">Hello,</p>
                <p className="font-bold text-slate-800 text-base leading-tight">
                    {displayName ? displayName : "User"}
                </p>
            </div>
        </div>
    );
};

export default Profile;