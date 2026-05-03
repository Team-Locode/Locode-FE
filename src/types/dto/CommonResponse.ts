// 공통 API 응답 DTO
// 모든 API 응답의 기본 구조를 정의합니다.
export interface CommonResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}
