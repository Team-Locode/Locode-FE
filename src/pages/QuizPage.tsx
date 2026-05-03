import { useQuiz } from "../hooks/useQuiz";
import Header from "../component/common/Header";
import AnswerFeedback from "../component/Quiz/AnswerFeedback";
import SelectIconPng from "../assets/circle_select.png";
import RightIconPng from "../assets/circle_right.png";
import WrongIconPng from "../assets/circle_wrong.png";
import QuizTitleSection from "../component/Quiz/QuizConrent";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { QuizQuestion } from "../types/dto/card";
import { postSubmitQuizAnswer } from "../services/cardService";

const QuizPage=()=>{
    const { quizzes } = useLocation().state as { quizzes: QuizQuestion[] };
    const [quizAnswers, setQuizAnswers] = useState<Map<number, { isCorrect: boolean; commentary: string; correctAnswer: string }>>(new Map());

    console.log("quizzes", quizzes);

    const { 
        currentQuiz, currentIndex, progress, selectedIdx, 
        handleSelect, handleNext: originalHandleNext, correctCount, isAnswered, isRight
    } = useQuiz(quizzes || []);

    // API를 통해 정답 제출 및 결과 받기
    const handleSubmitAnswer = async () => {
        if (selectedIdx === null || !currentQuiz) return;
        
        const selectedTerm = currentQuiz.choices[selectedIdx]?.term || "";
        
        try {
            const response = await postSubmitQuizAnswer(currentQuiz.cardId, { 
                selectedTerm: selectedTerm 
            });
            
            // API 응답 저장
            setQuizAnswers(prev => {
                const newMap = new Map(prev);
                newMap.set(currentQuiz.cardId, {
                    isCorrect: response.result.isCorrect,
                    commentary: response.result.commentary,
                    correctAnswer: response.result.correctAnswer
                });
                return newMap;
            });
            
            return response.result;
        } catch (error) {
            console.error("Error submitting answer", error);
            return null;
        }
    };

    // handleNext를 오버라이드하여 API 호출 포함
    const handleNext = async () => {
        if (selectedIdx === null) return;
        
        if (!isAnswered) {
            // 정답 제출
            const result = await handleSubmitAnswer();
            if (result) {
                // API 응답 기반으로 정답 여부 전달
                originalHandleNext(result.isCorrect);
            }
        } else {
            // 다음 문제로 이동
            originalHandleNext();
        }
    };

    // 현재 문제의 정답 정보 가져오기
    const currentQuizAnswer = currentQuiz 
        ? quizAnswers.get(currentQuiz.cardId) 
        : undefined;
    
    // isRight를 API 응답 기반으로 설정
    const actualIsRight = currentQuizAnswer?.isCorrect ?? isRight;

  
    return(
        <div className="min-h-screen w-full min-w-o flex flex-col items-center bg-gray-7">
            <Header>
                <div className="flex flex-col justify-center w-full max-w-3xl px-4 gap-2 py-4 ">
                    <div className="flex justify-between">
                        <span className="text-gray-2 text-medium-20">퀴즈 {currentIndex + 1}/{quizzes?.length || 0}</span>
                        <span className="text-primary text-medium-20">{correctCount}개 정답</span>
                    </div>
                    {/* 진행률바 */}
                    <div className="w-full bg-primary-5 h-2 rounded-full overflow-hidden">
                        <div 
                        className="bg-primary h-full rounded-full transition-all duration-300" 
                        style={{ width: `${progress}%` }} 
                        />
                    </div>
                </div>
            </Header>
            
            {/* --- 메인 콘텐츠 --- */}
            <main className="w-full max-w-2xl p-6 mt-0 flex-1">
                {currentQuiz && (
                    <>
                        <QuizTitleSection type="blank" problem={currentQuiz.question} />

                        <ul className="flex flex-col gap-3">
                            {currentQuiz.choices.map((choice, idx) => {
                        const isSelected = selectedIdx === idx;
                    
                    return (
                        <li    
                            key={idx}
                            className={` flex items-center gap-4 p-4 rounded-2xl border-3 border-primary
                                transition-all cursor-pointer shadow-md group
                                ${isSelected
                                    ?(isAnswered
                                        ?(actualIsRight ?  'border-lime-500 bg-lime-50' : 'border-red-500 bg-red-50' )
                                        : 'border-primary bg-primary-5 hover:border-primary')
                                : 'border-gray-7 bg-gray-9'}`}
                            onClick={() => handleSelect(idx)}
                        >
                            {/* --- 내부 동그라미(외곽선) --- group-hover:border-blue-500 border-4*/}
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center 
                                ${!isSelected?' border-gray-7 border-4':''}
                                ${!isSelected && !isAnswered? 'group-hover:border-blue-500 border-5':''}
                                }`}>
                                {isSelected && (<img 
                                    src={isAnswered
                                                ? (actualIsRight ? RightIconPng : WrongIconPng) // 1. 제출 후 정답/오답 아이콘
                                                    : SelectIconPng                     // 2. 제출 전 클릭된 상태 아이콘
                                    }
                                    alt="icon"
                                    className={`w-full h-full object-contain `}
                                />)}
                            </div>
                            
                            <span className="text-gray-2 text-medium-24">{choice.term}</span>
                        </li>

                    )
                        
                    })}
                </ul>
                        {/* 피드백 컴포넌트 호출 */}
                        <AnswerFeedback 
                            isAnswered={isAnswered} 
                            isRight={actualIsRight ?? false} 
                            correctAnswer={currentQuizAnswer?.correctAnswer || currentQuizAnswer?.commentary || currentQuiz.commentary} 
                            selectedIdx={selectedIdx}
                            optionDescriptions={currentQuiz.choices.map(() => currentQuiz.commentary)}
                        />
                    </>
                )}
            </main>

            {/* --- 하단 버튼 --- */}
            <footer className="w-full  bg-white  ">
                <div className="max-w-2xl mx-auto p-8 flex justify-end">
                    <button 
                        className={`px-16 py-3 rounded-xl text-medium-24 flex transition-all
                        ${selectedIdx === null ? 'bg-gray-7 text-gray-5' : 'bg-primary text-white'}`}
                        disabled={selectedIdx === null}
                        onClick={handleNext}
                    >
                        {isAnswered ? "다음" : "확인"}
                    </button>

                </div>
            </footer>

        </div>

    )
}
export default QuizPage;