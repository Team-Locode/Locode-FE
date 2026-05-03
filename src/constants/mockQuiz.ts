import { Question } from '../types/quiz';

export const MOCK_QUESTIONS: Question[] = [
  {
    id: 1,
    type:"blank",
    problem: "_______ 은(는) 물가가 지속적으로 상승하는 현상이다.",
    options: ["인플레이션", "디플레이션", "스태그플레이션", "하이퍼인플레이션"],
    answer: "인플레이션", // 정답 텍스트 혹은 인덱스(0)로 관리 가능
    optionDescriptions: ['설명1','설명2','설명3','설명4']
  },
  {
    id: 2,
    type:"blank",
    problem: "국가 간의 재화와 서비스의 교환을 _______ 이라 한다.",
    options: ["정답", "답", "답", "답"],
    answer: "정답",
    optionDescriptions: ['설명1','설명2','설명3','설명4']
  },
  {
    id: 3,
    type:"blank",
    problem: "문제3",
    options: ["정답", "답", "답", "답"],
    answer: "정답",
    optionDescriptions: ['설명1','설명2','설명3','설명4']
  },
  {
    id: 4,
    type:"blank",
    problem: "문제4",
    options: ["정답", "답", "답", "답"],
    answer: "정답",
    optionDescriptions: ['설명1','설명2','설명3','설명4']
  },
  {
    id: 5,
    type:"blank",
    problem: "문제5",
   options: ["정답", "답", "답", "답"],
    answer: "정답",
    optionDescriptions: ['설명1','설명2','설명3','설명4']
  },
  {
    id: 6,
    type:"case",
    problem: "문제6",
    options: ["정답", "답", "답", "답"],
    answer: "정답",
    optionDescriptions: ['설명1','설명2','설명3','설명4']
  },
  {
    id: 7,
    type:"case",
    problem: "문제7",
    options: ["정답", "답", "답", "답"],
    answer: "정답",
    optionDescriptions: ['설명1','설명2','설명3','설명4']
  },
  {
    id: 8,
    type:"case",
    problem: "문제8",
    options: ["정답", "답", "답", "답"],
    answer: "정답",
    optionDescriptions: ['설명1','설명2','설명3','설명4']
  },
  {
    id: 9,
    type:"case",
    problem: "문제9",
    options: ["정답", "답", "답", "답"],
    answer: "정답",
    optionDescriptions: ['설명1','설명2','설명3','설명4']
  },
  {
    id: 10,
    type:"case",
    problem: "문제10",
    options: ["정답", "답", "답", "답"],
    answer: "정답",
    optionDescriptions: ['설명1','설명2','설명3','설명4']
  },

];