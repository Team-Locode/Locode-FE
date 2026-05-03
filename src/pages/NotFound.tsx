import { useNavigate } from "react-router-dom";
import bellIcon from "../assets/bell.png"

const NotFound = () => {
    const navigate = useNavigate();
    
    return (
        <div className="flex flex-col w-screen h-screen bg-gray-8 justify-center items-center font-[Pretendard]">
            <div className="flex flex-col justify-center items-center gap-8">
                <div className="w-30 h-30 object-fill">
                    <img src={bellIcon} className="o"/>
                </div>
               
                <div className="flex text-8xl font-bold">
                    <span className="text-primary">4</span>
                    <span className="text-gray-2">0</span>
                    <span className="text-primary">4</span>
                </div>
                <div className="text-[32px] font-semibold">
                    페이지를 찾을 수 없습니다.
                </div>
                <button
                    className="flex justify-center items-center text-2xl px-10 py-4 text-white bg-primary-2 rounded-xl cursor-pointer"
                    onClick={() => navigate("/home", { replace: true })}
                >
                    홈으로 이동하기
                </button>
            </div>
        </div>
    );
}

export default NotFound;