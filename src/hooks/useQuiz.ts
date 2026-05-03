import { useState } from 'react';
import { QuizQuestion } from '../types/dto/card';
import { useNavigate } from 'react-router-dom';

export const useQuiz = (questions: QuizQuestion[]) => {
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 문제 번호
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null); // 사용자가 클릭한 답
  const [correctCount, setCorrectCount] = useState(0); // 맞춘 개수
  const [isAnswered,setIsAnswered]=useState(false);
  const [isRight, setIsRight] = useState<boolean | null>(null); // 정답 여부
  const currentQuiz = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const navigate = useNavigate()

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedIdx(idx);
  }

  const handleMoveLearningCompleted = () => {
    navigate("/learningCompleted", { state: { correctCount, totalProblemCount: questions.length } })
  }

  const handleNext = (apiIsCorrect?: boolean) => {
    if (selectedIdx === null) return;
    
    
    // 정답 체크 - API 응답이 있으면 사용
    if (!isAnswered) {
        const right = apiIsCorrect !== undefined ? apiIsCorrect : false;
        setIsRight(right);
        setIsAnswered(true);
        if (right) {
            setCorrectCount(prev => prev + 1);
        }
        return;
    }

    // 다음 문제로 이동
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedIdx(null); // 선택 초기화
      setIsAnswered(false);
      setIsRight(null);
    } else {
      handleMoveLearningCompleted()
    }
  };

  return {
    currentQuiz,
    currentIndex,
    selectedIdx,
    correctCount,
    progress,
    handleSelect,
    handleNext,
    isAnswered, 
    isRight
  };
};