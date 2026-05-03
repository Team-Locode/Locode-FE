# TEAM-C-FE
UMC 9기 해커톤 팀 C의 프론트엔드 레포지토리입니다!

## **프론트엔드 코딩 컨벤션**

## **1. 네이밍 컨벤션**

- **함수명, 변수명**은 카멜케이스(camelCase)로 작성합니다.
- 컨퍼넌트는 파스칼케이스로 작성합니다.!
- 배열 변수명은 **`List`** 접미사를 붙입니다. 예: **`userList`**
- Boolean 변수는 **`is`**, **`has`**, **`can`** 등 접두사를 붙입니다. 예: **`isActive`**
- 반환값이 Boolean인 함수는 **`is`**, **`has`**, **`can`** 접두사를 붙입니다.
- 클래스 및 생성자 함수는 파스칼케이스(PascalCase)로 작성합니다. 예: **`UserProfile`**
- 상수는 대문자 스네이크케이스(SNAKE_CASE)로 작성합니다. 예: **`MAX_COUNT`**
- Enum은 파스칼케이스, 각 값은 카멜케이스 작성합니다.
- 생성 함수는 **`create`**, 변환 함수는 **`convert`**, 값 반환 함수는 **`get`** 접두사를 붙입니다.``
- 이벤트 핸들러는 **`handle`** 접두사와 이벤트 명을 조합합니다. 예: **`handleSubmit`**
- React 커스텀 Hook은 **`use`** 접두사를 붙입니다. 예: **`useFetchData`**
- 고차 컴포넌트(HOC)는 **`with`** 접두사를 붙입니다. 예: **`withAuth`**
- Context 관련 변수는 **`Context`**, 프로바이더 컴포넌트는 **`Provider`** 접미사를 붙입니다.

## **2. 타입 네이밍 컨벤션**

- 타입은 파스칼케이스로 작성하며, **`Type`** 접미사를 붙입니다. 예: **`UserType`**
- React 컴포넌트의 Props 타입은 **`Props`** 접미사를 붙입니다. 예: **`ButtonProps`**
- React 타입은 개별 임포트하여 사용합니다.

## 3. **폴더 구조 설계 원칙**

- **최소한의 깊이와 명확한 목적**
    
    폴더는 가능한 한 깊게 중첩하지 않고, 각 폴더의 목적이 명확하게 드러나도록 설계합니다.
    
    예: 공통 컴포넌트는 src/components/common, 특정 페이지 전용 컴포넌트는 해당 페이지 폴더 하위에 위치 src/components/MainPage.
    
- **글로벌과 로컬 구분**
    
    전역에서 사용하는 리소스(예: Button, Input 등)는 src/components/**common**에, 특정 기능이나 페이지에서만 사용하는 파일은 해당 기능/페이지 폴더 하위에 둡니다.
    
- **폴더명은 파스칼케이스를 사용**
    
    폴더명은 각 단어의 시작마다 대문자로 시작해주세요. ex) UserEdit
    
- **폴더명은 내용이 명확하게 드러나도록 작성**
    
    폴더명은 폴더 안에 어떤 파일이 들어있는지 쉽게 알 수 있도록 구체적으로 작성합니다.
    
    예: assets, styles, utils, hooks, models 등.
    
- **불필요한 중복, 과도한 계층화 지양**
    
    예: Reports > Reports 2023 > Report2023.pdf처럼 불필요하게 중복된 폴더명은 피합니다.
    
- **폴더 내 역할별 하위 폴더 구분**
    
    예:
    
    - components/[페이지명] 으로 상세히 폴더를 구분하여 각 파트에 맞는 컴포넌트를 추가해주세요
    - components/common 에는 공통으로 사용할 컴포넌트들을 넣어주세요.
    - 다른 폴더 내의 컴포넌트를 참고해야 할 경우 해당 폴더의 작업자에게 알려주세요.
    회의를 거쳐 작업을 진행해주시면 될 것 같습니다. (ex 그냥 불러와서 사용해도 되나요?, 어떤 식으로 작동하는 컴포넌트일까요?)
    - services/ : API ts 파일들을 관리
    - assets/ : 이미지, 폰트 등 정적 리소스
    - components/ : 컴포넌트 관리
    - constants/ : 상수
    - context/  : 콘텍스트 관리 (상태 관리 용)
    - hooks/ : 커스텀 훅 (가져다 쓰는 용도)
    - layout/ : 전체적인 페이지의 레이아웃을 관리
    - pages/ : 각 페이지 요소들
    - store/ : 상태 관리 (ex 유저 로그인 정보 저장)
    - styles/ : CSS적 요소 관리 (ex 타이포그래프, 색상)
    - types/ : 주요 타입들을 정리
    - utils/ : 유틸리티 함수

## **4. 코드 스타일 및 문법**

- 문자열 처리 시 쌍따옴표(”)를 사용합니다.
- 문장이 종료될 때 세미콜론(;)을 반드시 붙입니다.
- **주석은 설명하려는 구문에 맞춰 들여쓰기** 합니다.
    - 함수에 대한 주석은 함수 위에 작성해주세요.
    - 주석은 함수 기능 정도로만 간단하게 작성해주시고 너무 신경쓰지 않으셔도 됩니다! 이해되게만!!
    
    ```tsx
    /* 버튼을 클릭했을때 사용하는 함수입니다.
    	 이 함수는 너무나도 대단합니다. */
    const handleClick = () => {
      console.log("Button clicked!");
      // 디버깅용 콘솔로그
      setIsButtonClicke(true);
      // IsButton 변수 true로 변환
    };
    ```
    
- **연산자 사이에는 공백**을 추가하여 가독성을 높입니다.
    
    예: **`const sum = a + b;`**
    
- **콤마(,) 다음에는 공백**을 추가합니다.
    
    예: **`const arr = ["A", "B"];`**
    
- 객체 및 배열 선언 시 리터럴 표기법(**`{}`**, **`[]`**)을 사용합니다.
- 함수 선언은 화살표 함수 방식만 사용하십시오.
    
    ## ✅ 허용되는 방식
    
    ### **화살표 함수 (Arrow Function)**
    
    ```jsx
    const handleClick = () => {
      console.log("Button clicked!");
    };
    
    ```
    
    ---
    
    ## ❌ 지양하는 방식
    
    ### 1. **함수 생성자 (Function Constructor)**
    
    ```tsx
    const sum = new Function('a', 'b', 'return a + b');
    ```
    
    - 🚫 **동적으로 문자열을 파싱** → `eval()`과 비슷하게 **보안 상 취약**
    - 🚫 최적화 어려움 → 성능 저하 발생 가능
    - 🚫 코드 가독성과 정적 분석에 불리
    
    ---
    
    ### 2. **즉시 실행 함수 표현식 (IIFE: Immediately Invoked Function Expression)**
    
    ```tsx
    
    (function () {
      console.log("즉시 실행!");
    })();
    
    ```
    

- 배열 복사는 전개 연산자(**`...`**)를 사용합니다.
- 조건문에서 불필요한 비교는 생략하고 간결하게 작성합니다.
    
    예: **`if (string)`**, **`if (array.length)`**
    
- Boolean 변수 비교 시 **`if (variable)`** 형태로 작성합니다.
- 함수 내 조건문에서 조기 반환(early return) 패턴을 권장합니다.

```jsx
function login(user) {
  if (!user) {
    return "유저 없음"; // 유저 없으면 바로 종료
  }

  if (!user.isActive) {
    return "비활성화된 계정입니다."; // 조건 맞으면 바로 종료
  }

  return "로그인 성공";
}
```

- 반복문은 **`forEach`** 또는 **`map`**을 권장하며, **`for-in`**은 지양합니다.
- 타입 체크는 **`typeof`**와 **`Array.isArray`**를 활용합니다.

- React 컴포넌트는 TSX 문법으로 작성하며, 태그는 소문자로 작성합니다.

```jsx
const element = <h1>Hello, world!</h1>;
```

- CSS는 테일윈드 사용 부탁합니다.
- https://tailwindcss.com/

<aside>
❗ **Issue**

- 이슈 한 개는 보통 뷰 하나 기준으로 만듭니다. (한 뷰에 주요 기능이 너무 많다면 쪼개기)
- Issue 제목 : **[라벨이름] (작업주제) #[숫자]**
ex) [feat] MainView 에셋 추가 #123
- 템플릿을 채워주세요!. (이때 특히, Todo를 자세하게 적어주세요! 최대한 쪼개서!)
- issue 한 개 당 한 개의 기능만 지향합니다.(너무 작으면 최대 3개까지만 묶어주세요.)

**Pull Reqeust** 
- [#이슈번호] {:깃모지:} {feat/api 등 작업 주제}: {작업 내용}
- PR 템플릿을 확인하고 작성한다
- 본인 제외 최소 한 명의 팀원들의 Approve가 있어야 merge가 가능하다.
- 리뷰어들은 단순히 approve를 한다기보다 코드 변화를 체크하고 네임컨벤션을 지키고 있는지를 확인한다.

**branch 이름**

**브랜치 이름 구조 : <타입-기능명>** 

ex. feature-main, api/-main

**Commit Message**

**(타입깃모지) 커밋메세지** 

ex. [#이슈번호] ✨ feat: 추가 mainview 

**Merge**

- 만약 작업 내용을 dev로 머지할 경우 다음을 따른다.
- ex) 공용 컴포넌트 작업 내역을 dev에 적용시킴
    - [9.17] 공용 컴포넌트 작업 내역 반영 #1
    - [머지하는 날짜] {머지하는 내용} #{횟수}

</aside>

| 작업 내용 | 이모지 | 코드 | 설명 |
| --- | --- | --- | --- |
| 새로운 기능 추가 | ✨ | `:sparkles:` | 새로운 기능 구현 (Feat) |
| 버그 수정 | 🐛 | `:bug:` | 버그 수정 (Bug) |
| CSS 등 사용자 UI 디자인 변경 | 💄 | `:lipstick:` | UI 스타일 변경 (Design) |
| 코드에 영향 없는 변경 (오타, 변수명 등) | 💬 | `:speech_balloon:` | 텍스트 및 리터럴 수정 (Text) |
| 코드 리팩토링 | ♻️ | `:recycle:` | 코드 구조 개선 (Refactor) |
| 주석 추가 및 수정 | 💡 | `:bulb:` | 주석 추가 및 수정 (Comment) |
| 문서 수정 | 📝 | `:memo:` | README 등 문서 수정 (Docs) |
| 테스트 추가, 테스트 리팩토링 | ✅ | `:white_check_mark:` | 테스트 코드 작성 및 수정 (Test) |
| 빌드 or 패키지 매니저 수정 | 📦 | `:package:` | 빌드, 의존성 관련 작업 (Build) |
| 파일/폴더명 추가수정 | 🚚 | `:truck:` | 리소스 이동 또는 이름 변경 (Renamed) |
| 파일/폴더 삭제 | 🔥 | `:fire:` | 불필요한 코드/파일 제거 (Delete) |
| 프로젝트 시작 | 🎉 | `:tada:` | 프로젝트를 시작했어요! |

https://gitmoji.dev/
