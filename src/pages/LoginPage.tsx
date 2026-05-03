import ECONFLIPLOGO from "../assets/ECONFLIPLogo.svg";
import NAVERLOGO from "../assets/NaverLogo.svg";
import KAKAOLOGO from "../assets/KakaoLogo.svg";


const LoginPage = () => {
    return (
        <div className="flex w-full h-screen justify-center items-center bg-linear-to-t from-[#0F52B0] to-[#1575FB] overflow-y-auto">
            <div className="flex flex-col w-113 min-h- rounded-4xl bg-white px-10 py-17 my-10">
                <header className="flex flex-col justify-center items-start gap-1">
                    <div className="flex flex-col gap-">
                        <h3 className="text-semibold-28 text-gray-1 -mb-2">경제용어,</h3>
                        <h3 className="text-semibold-28 text-gray-1">카드플립으로 쉽고 재밌게!</h3>
                    </div>
                    <div className="flex justify-start items-end gap-1">
                        <span className="text-bold-40 text-primary ">이콘플립</span>
                        <span className="text-semibold-20 text-primary-3 pb-1">ECONFLIP</span>
                    </div>
                    <div className="flex w-full justify-end">
                        <img src={ECONFLIPLOGO} alt="ECONFLIP Logo" className="mt-10" />
                    </div>
                </header>
                <div className="flex flex-col justify-center items-center px-6 py-4 gap-7">
                    <div className="w-full h-1 border-b border-gray-400"></div>
                    <span className="text-medium-15 text-gray-4">SNS로 간편하게 시작하기</span>
                    <div className="flex gap-5">
                        <button className="flex justify-center items-center cursor-pointer">
                            <img src={NAVERLOGO} alt="Naver Logo" className="mr-2" />
                        </button>
                        <button className="flex justify-center items-center cursor-pointer">
                            <img src={KAKAOLOGO} alt="Kakao Logo" className="mr-2" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        );
}

export default LoginPage;