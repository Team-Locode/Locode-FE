import { useLocation, useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/auth/useLogout";
import ECONFLIPICON1 from "../../assets/ECONGLIPICON1.svg"
import homeIcon from "../../assets/sidebar/home.svg"
import libraryIcon from "../../assets/sidebar/library.svg"
import mypageIcon from "../../assets/sidebar/mypage.svg"
import reviewIcon from "../../assets/sidebar/review.svg"
import homeSelectedIcon from "../../assets/sidebar/homeSelected.svg"
import librarySelectedIcon from "../../assets/sidebar/librarySelected.svg"
import mypageSelectedIcon from "../../assets/sidebar/mypageSelected.svg"
import reviewSelectedIcon from "../../assets/sidebar/reviewSelected.svg"
import { LogOut } from "lucide-react";

const Sidebar = () => {
    
    const location = useLocation();
    const navigation = useNavigate();
    const { logout, isLoggingOut } = useLogout();

    const handleLogout = () => {
        logout();
    };
    
    const NavigationList = [
        { name: "홈", icon: [homeIcon, homeSelectedIcon], path: "/home" },
        { name: "복습", icon: [reviewIcon, reviewSelectedIcon], path: "/review" },
        { name: "라이브러리", icon: [libraryIcon, librarySelectedIcon], path: "/library" },
        { name: "프로필", icon: [mypageIcon, mypageSelectedIcon], path: "/profile" },
    ];
        
    return (
        <div className="flex flex-col w-74 h-screen justify-between p-10 bg-gray-7 text-gray-900">
            <div className="flex flex-col gap-10">
                <div className="flex items-end gap-1">
                    <div className="flex justify-center items-center w-[55px] h-[55px] p-1">
                        <img src={ECONFLIPICON1} className="" />
                    </div>
                    <span className="text-semibold-28 text-gray mb-1">이콘플립</span>
                </div>
                <div className="flex flex-col gap-6">
                    {
                        NavigationList.map((navItem) => {
                            const isSelected = location.pathname === navItem.path 
    
                            return (
                            <nav
                                key={navItem.name}
                                className={`flex items-center h-12 gap-4 cursor-pointer ${isSelected ? 'text-blue-500 font-bold' : 'text-gray-900'}`}
                                onClick={() => {
                                    navigation(navItem.path);}
                                }
                            >
                                <div className="flex justify-center items-center w-12 h-12 p-2">
                                    <img src={isSelected ? navItem.icon[1] : navItem.icon[0]} className=""/>
                                </div>
                                <span className="text-2xl">{navItem.name}</span>
                            </nav>)
                        })
                    }
                </div>
            </div>
            <button
                className="flex justify-start items-center gap-4 text-medium-24 text-gray-3 rounded-2xl px-4 py-2 cursor-pointer disabled:cursor-not-allowed"
                onClick={handleLogout}
                disabled={isLoggingOut}
            >
                <LogOut/>
                {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
            </button>
        </div>
    );
}

export default Sidebar;