import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 클래스 이름을 병합하고 충돌을 해결하는 유틸리티 함수
 * Tailwind CSS 클래스의 충돌을 자동으로 해결합니다.
 * 
 * @param inputs - 병합할 클래스 이름들
 * @returns 병합된 클래스 이름 문자열
 * 
 * @example
 * cn("px-2 py-1", "px-4") // "py-1 px-4" (px-2는 px-4로 덮어씌워짐)
 * cn("bg-red-500", { "bg-blue-500": isActive }) // 조건부 클래스 적용
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

