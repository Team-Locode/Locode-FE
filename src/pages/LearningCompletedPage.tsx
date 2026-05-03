import PrizeIcon from "../assets/PrizeIcon.svg"
import STARICON from "../assets/STARICON.svg"
import ROTATEARROW from "../assets/ROTATEARROW.svg"
import WordCard from "../component/LearningCompleted/WordCard"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { StudyComplete } from "../types/dto/card"
import { postCompleteStudy } from "../services/cardService"

const LearningCompletedPage = () => {
    const [learningCompleted, setLearningCompleted] = useState<StudyComplete>()
    const navigate = useNavigate()
    
    useEffect(() => {
        const fetchLearningCompleted = async () => {
            const response = await postCompleteStudy()
            setLearningCompleted(response.result)
        }
        fetchLearningCompleted()
    }, [])

    const handleMoveToHome = () => {
        navigate("/home")
    }

    if (!learningCompleted) {
        return (
            <div className="flex w-full h-screen justify-center items-center bg-linear-to-t from-[#0F52B0] to-[#1575FB]">
                <div className="text-white text-semibold-24">로딩 중...</div>
            </div>
        )
    }

    const totalCount = learningCompleted.correctCount + learningCompleted.wrongTerms.length
    const accuracyRate = totalCount > 0 ? Math.round((learningCompleted.correctCount / totalCount) * 100) : 0

    return (
        <div className="flex w-full h-screen justify-center items-center bg-linear-to-t from-[#0F52B0] to-[#1575FB] overflow-y-auto">
            <div className="flex flex-col w-2xl h-full justify-center items-center gap-5 mt-20">
                <div className="flex flex-col gap-3">
                    <img src={PrizeIcon} className="animate-bounce"/>
                    <div className="flex flex-col text-gray-9 justify-center items-center">
                        <span className="text-semibold-20">학습완료</span>
                        <span className="text-medium-18">잘하셨어요!</span>
                    </div>
                </div>
                <div className="flex w-full">
                    <div className="flex flex-col w-full justify-center items-center bg-primary-3 p-5 rounded-l-2xl">
                        <span className="text-semibold-32 text-primary-6">{accuracyRate}%</span>
                        <span className="text-medium-15 text-gray-1">정답률</span>
                    </div>
                    <div className="flex flex-col w-full justify-center items-center bg-primary-4 p-5 rounded-r-2xl">
                        <span className="text-semibold-32 text-primary-6">+{learningCompleted.gainedXp}</span>
                        <span className="text-medium-15 text-gray-1">XP획득</span>
                    </div>
                </div>
                <div className="flex flex-col w-full px-10 py-5 bg-primary-2 rounded-2xl">
                    <div className="flex w-full justify-between items-center ">
                        <span className="text-medium-15 text-gray-9">정답</span>
                        <span className="text-medium-15 text-[#6AF2E2]">{learningCompleted.correctCount}/{totalCount}</span>
                    </div>
                    <div className="flex w-full justify-between items-center">
                        <span className="text-medium-15 text-gray-9">오답</span>
                        <span className="text-medium-15 text-[#EEA9A1]">{learningCompleted.wrongTerms.length}/{totalCount}</span>
                    </div>
                </div>
                {learningCompleted.correctTerms.length > 0 && (
                    <div className="flex flex-col w-full px-10 py-5 bg-primary-2 rounded-2xl gap-3">
                        <div className="flex w-full justify-start items-center gap-2">
                            <img src={STARICON}/>
                            <span className="text-medium-18 text-gray-9">새로 익힌 용어</span>
                        </div>
                        <div className="flex w-full justify-start items-center gap-2">
                            {learningCompleted.correctTerms.map((word) => (
                                <WordCard key={word} content={word} />
                            ))}
                        </div>
                    </div>
                )}
                {learningCompleted.wrongTerms.length > 0 && (
                    <div className="flex flex-col w-full px-10 py-5 bg-primary-2 rounded-2xl gap-3.5">
                        <div className="flex w-full justify-start items-center gap-2">
                            <img src={ROTATEARROW}/>
                            <span className="text-medium-18 text-gray-9">복습 추천</span>
                            <span className="text-medium-15 text-secondary">{learningCompleted.wrongTerms.length}개 용어를 복습하면 더 확실히 익힐 수 있어요!</span>
                        </div>
                        <div className="flex w-full justify-start items-center gap-2">
                            {learningCompleted.wrongTerms.map((word) => (
                                <WordCard key={word} WordCardClassName="bg-secondary-4" content={word} />
                            ))}
                        </div>
                    </div>
                )}
                <button
                    className="w-full bg-white text-semibold-28 text-primary py-5 rounded-2xl mt-10 cursor-pointer"
                    onClick={handleMoveToHome}
                >
                    홈으로 돌아가기
                </button>
            </div>
        </div>
    )
}

export default LearningCompletedPage