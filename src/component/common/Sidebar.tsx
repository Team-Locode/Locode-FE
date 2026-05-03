import { HomeIcon, Library, RotateCcw, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";


const Sidebar = () => {
    
    const location = useLocation();
    const navigation = useNavigate();
    
    const NavigationList = [
        { name: "홈", icon: <HomeIcon className="w-7 h-7" />, path: "/home" },
        { name: "복습", icon: <RotateCcw className="w-7 h-7" />, path: "/review" },
        { name: "라이브러리", icon: <Library className="w-7 h-7" />, path: "/library" },
        { name: "프로필", icon: <User className="w-7 h-7" />, path: "/profile" },
    ];
        
    return (
        <footer className="flex flex-col w-76 h-full p-10 bg-gray-400 text-gray-900">
            <div className="flex flex-col gap-5">
                {
                NavigationList.map((navItem) => (
                    <nav
                        key={navItem.name}
                        className={`flex items-center h-12 gap-4 cursor-pointer ${location.pathname === navItem.path ? 'text-blue-500 font-bold' : 'text-gray-900'}`}
                        onClick={() => {
                            navigation(navItem.path);}
                        }
                    >
                        {navItem.icon}
                        <span className="text-2xl">{navItem.name}</span>
                    </nav>
                ))
                }
            </div>
        </footer>
    );
}

export default Sidebar;