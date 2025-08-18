이 프로젝트는 대한민국 의안내용을 손쉽게 확인할 수 있도록 해주는 react native 어플리케이션입니다.

## [개발환경]

- android studio
  
- react native (JavaScript, TypeScript)
  
- 기준 휴대폰 기종 : (android) Galuxy s24, (ios)

## [OpenAPI 요청주소]

- 의안 제안자정보 https://open.assembly.go.kr/portal/openapi/BILLINFOPPSR
- 법률안 심사 및 처리(의안검색) https://open.assembly.go.kr/portal/openapi/TVBPMBILL11
- 법률안 심사 및 처리(계류의안) https://open.assembly.go.kr/portal/openapi/nwbqublzajtcqpdae
- 법률안 심사 및 처리(본회의부의안건) https://open.assembly.go.kr/portal/openapi/nayjnliqaexiioauy
- 법률안 심사 및 처리(최근 본회의처리 의안) https://open.assembly.go.kr/portal/openapi/nxjuyqnxadtotdrbw
- 의안별 표결현황 https://open.assembly.go.kr/portal/openapi/ncocpgfiaoituanbr
- 의안 상세정보 https://open.assembly.go.kr/portal/openapi/BILLINFODETAIL
- 의안 접수목록 https://open.assembly.go.kr/portal/openapi/BILLRCP
- 의안정보 통합 API https://open.assembly.go.kr/portal/openapi/ALLBILL

## [실행방법]

android
``` npx react-native run-android ```

ios
``` npx react-native run-ios```

## [폴더 구조]

/app.json : 앱 이름 정보

/APP.tsx: 페이지 이동 설계


/src/screens : 기본적인 화면 배치 구현

/src/screens/Processing : 처리중입니다 화면

/src/screens/Received : 접수되었습니다 화면

/src/components : 화면에서 여러번 사용할 가능성이 있는 요소들

/src/config: OpenAPI 키/링크 정보, 상수 변수 선언

/src/styles : UI 디자인 구현

/src/styles/lib : 여러번 사용하는 ui 스타일
