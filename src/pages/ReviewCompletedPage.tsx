import { useEffect } from "react";
import CheckLogo from "../assets/CheckLogo.png"
import { useNavigate } from "react-router-dom";

const ReviewCompletedPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
        navigate("/home", { replace: true });
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex flex-col w-full h-full justify-center items-center gap-5">
            <img src={CheckLogo} className="w-30 h-30"/>
            <span className="text-bold-32 text-gray">복습이 완료되었습니다.</span>
        </div>
    )
}

export default ReviewCompletedPage