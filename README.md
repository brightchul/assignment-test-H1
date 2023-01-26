
## Summary

- 뉴스 기사 리스트
- 모바일 웹 사이즈 기준
- 오늘 할 일 리스트 뷰, 추가, 수정, 삭제
- localstorage을 통해 새로고침 시에도 상태 유지

<br />

## Tech
Typescript, React, Next.js, Recoil, Tailwindcss, 

<br/>       

## Getting Started

```bash
git clone https://github.com/brightchul/assignment-test-H1.git
cd assignment-test-H1
yarn
yarn build
yarn start
```
<br/>

## Directory Structure
```
src
├── components
│   ├── Container
│   ├── HomeTitle
│   ├── NewsList
│   ├── SelectWeekDay
│   ├── SyncLocalStorage
│   └── TodoListView
├── pages
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── add-todo
│   ├── api
│   ├── index.tsx
│   └── update-todo
├── stores
│   ├── atoms.ts
│   ├── memoryLocalStorage.ts
│   ├── selectors.ts
│   └── types.ts
└── styles
    └── globals.css

```