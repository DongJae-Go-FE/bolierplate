# HDC-UI

HDC LABS **Design System** - Based on Git Submodules

## 기술 스택

| 기술명 | 버전 | 설명 |
|------|------|------|
| ![React](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black) | 19.1.0 | 사용자 인터페이스 라이브러리 |
| ![TypeScript](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) | 4.1.8 | 정적 타입 검사 |
| ![Tailwind CSS](https://img.shields.io/badge/tailwind_css-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) | 4.1 | 유틸리티 기반 CSS 프레임워크 |
| ![Vite](https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) | 6.3.5 | 빌드 도구 |
| ![Radix UI](https://img.shields.io/badge/radix_ui-161618?style=for-the-badge&logo=radixui&logoColor=white) | 1.4.2 | 접근성 중심의 UI 컴포넌트 |
| ![Lucide](https://img.shields.io/badge/lucide-F56565?style=for-the-badge&logo=lucide&logoColor=white) | 0.511.0 | 아이콘 라이브러리 |
| ![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white) | 8.9.0 | 패키지 매니저 |
| ![Recharts](https://img.shields.io/badge/recharts-22B5BF?style=for-the-badge&logo=recharts&logoColor=white) | 3.1.0 | 차트 라이브러리 |
| ![ESLint](https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white) | 9.27.0 | 코드의 문제 발견 및 수정용 정적 분석 도구 |
| ![Prettier](https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black) | 3.6.2 | 코드 포맷팅 |
| ![Node.js](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) | 22.0.0 | 런타임 환경 |


## 📦 패키지 구조

```
hdc-ui/
├── public/                  # 빌드를 거치지 않는 정적 파일 보관
│   ├── fonts/              # 폰트
│   └── svgs/               # 컴포넌트용 SVG
└── src/                    # 파일 경로
    └── lib/                # 컴포넌트 및 global 스타일
        ├── components/     # 컴포넌트
        │   ├── calendar/   # 캘린더 컴포넌트 모음
        │   └── ui/         # 그외 컴포넌트 모음
        └── global.css      # 전역 스타일 css 파일
```


## 🎨 색상 시스템


### Chart Colors
| Variable | Preview | Hex |
|----------|---------|-----|
| `--chart-1` | ![#4d73ff](https://img.shields.io/badge/-%234d73ff?style=flat-square&color=4d73ff) | `#4d73ff` |
| `--chart-2` | ![#b166e5](https://img.shields.io/badge/-%23b166e5?style=flat-square&color=b166e5) | `#b166e5` |
| `--chart-3` | ![#1532d9](https://img.shields.io/badge/-%231532d9?style=flat-square&color=1532d9) | `#1532d9` |
| `--chart-4` | ![#6658c3](https://img.shields.io/badge/-%236658c3?style=flat-square&color=6658c3) | `#6658c3` |
| `--chart-5` | ![#395bb3](https://img.shields.io/badge/-%23395bb3?style=flat-square&color=395bb3) | `#395bb3` |
| `--chart-6` | ![#2581b2](https://img.shields.io/badge/-%232581b2?style=flat-square&color=2581b2) | `#2581b2` |
| `--chart-7` | ![#3f8888](https://img.shields.io/badge/-%233f8888?style=flat-square&color=3f8888) | `#3f8888` |
| `--chart-8` | ![#428c45](https://img.shields.io/badge/-%23428c45?style=flat-square&color=428c45) | `#428c45` |
| `--chart-9` | ![#638318](https://img.shields.io/badge/-%23638318?style=flat-square&color=638318) | `#638318` |
| `--chart-10` | ![#447b36](https://img.shields.io/badge/-%23447b36?style=flat-square&color=447b36) | `#447b36` |

### Primary Colors
| Variable | Preview | Hex |
|----------|---------|-----|
| `--color-primary-100` | ![#ff94a9](https://img.shields.io/badge/-%23ff94a9?style=flat-square&color=ff94a9) | `#ff94a9` |
| `--color-primary-200` | ![#ff7a94](https://img.shields.io/badge/-%23ff7a94?style=flat-square&color=ff7a94) | `#ff7a94` |
| `--color-primary-300` | ![#ff617f](https://img.shields.io/badge/-%23ff617f?style=flat-square&color=ff617f) | `#ff617f` |
| `--color-primary-400` | ![#ff476a](https://img.shields.io/badge/-%23ff476a?style=flat-square&color=ff476a) | `#ff476a` |
| `--color-primary-500` | ![#ff2d55](https://img.shields.io/badge/-%23ff2d55?style=flat-square&color=ff2d55) | `#ff2d55` |
| `--color-primary-600` | ![#f91a45](https://img.shields.io/badge/-%23f91a45?style=flat-square&color=f91a45) | `#f91a45` |
| `--color-primary-700` | ![#ed0c38](https://img.shields.io/badge/-%23ed0c38?style=flat-square&color=ed0c38) | `#ed0c38` |
| `--color-primary-800` | ![#d01136](https://img.shields.io/badge/-%23d01136?style=flat-square&color=d01136) | `#d01136` |
| `--color-primary-900` | ![#b31433](https://img.shields.io/badge/-%23b31433?style=flat-square&color=b31433) | `#b31433` |

### Gray Colors
| Variable | Preview | Hex |
|----------|---------|-----|
| `--color-gray-100` | ![#fafafa](https://img.shields.io/badge/-%23fafafa?style=flat-square&color=fafafa) | `#fafafa` |
| `--color-gray-200` | ![#eeeeee](https://img.shields.io/badge/-%23eeeeee?style=flat-square&color=eeeeee) | `#eeeeee` |
| `--color-gray-300` | ![#dddddd](https://img.shields.io/badge/-%23dddddd?style=flat-square&color=dddddd) | `#dddddd` |
| `--color-gray-400` | ![#bbbbbb](https://img.shields.io/badge/-%23bbbbbb?style=flat-square&color=bbbbbb) | `#bbbbbb` |
| `--color-gray-500` | ![#999999](https://img.shields.io/badge/-%23999999?style=flat-square&color=999999) | `#999999` |
| `--color-gray-600` | ![#777777](https://img.shields.io/badge/-%23777777?style=flat-square&color=777777) | `#777777` |
| `--color-gray-700` | ![#555555](https://img.shields.io/badge/-%23555555?style=flat-square&color=555555) | `#555555` |
| `--color-gray-800` | ![#333333](https://img.shields.io/badge/-%23333333?style=flat-square&color=333333) | `#333333` |
| `--color-gray-900` | ![#111111](https://img.shields.io/badge/-%23111111?style=flat-square&color=111111) | `#111111` |

### Gray Dimmed Effect (Black Overlay)
| Variable | Preview | Opacity |
|----------|---------|---------|
| `--color-gray-dimmed-effect-black-100D` | ![rgba(0,0,0,1)](https://img.shields.io/badge/-000000?style=flat-square&color=000000) | `rgba(0, 0, 0, 1)` |
| `--color-gray-dimmed-effect-black-95D` | ![rgba(0,0,0,0.95)](https://img.shields.io/badge/-0d0d0d?style=flat-square&color=0d0d0d) | `rgba(0, 0, 0, 0.95)` |
| `--color-gray-dimmed-effect-black-90D` | ![rgba(0,0,0,0.9)](https://img.shields.io/badge/-1a1a1a?style=flat-square&color=1a1a1a) | `rgba(0, 0, 0, 0.9)` |
| `--color-gray-dimmed-effect-black-85D` | ![rgba(0,0,0,0.85)](https://img.shields.io/badge/-262626?style=flat-square&color=262626) | `rgba(0, 0, 0, 0.85)` |
| `--color-gray-dimmed-effect-black-80D` | ![rgba(0,0,0,0.8)](https://img.shields.io/badge/-333333?style=flat-square&color=333333) | `rgba(0, 0, 0, 0.8)` |
| `--color-gray-dimmed-effect-black-75D` | ![rgba(0,0,0,0.75)](https://img.shields.io/badge/-404040?style=flat-square&color=404040) | `rgba(0, 0, 0, 0.75)` |
| `--color-gray-dimmed-effect-black-70D` | ![rgba(0,0,0,0.7)](https://img.shields.io/badge/-4d4d4d?style=flat-square&color=4d4d4d) | `rgba(0, 0, 0, 0.7)` |
| `--color-gray-dimmed-effect-black-65D` | ![rgba(0,0,0,0.65)](https://img.shields.io/badge/-595959?style=flat-square&color=595959) | `rgba(0, 0, 0, 0.65)` |
| `--color-gray-dimmed-effect-black-60D` | ![rgba(0,0,0,0.6)](https://img.shields.io/badge/-666666?style=flat-square&color=666666) | `rgba(0, 0, 0, 0.6)` |
| `--color-gray-dimmed-effect-black-55D` | ![rgba(0,0,0,0.55)](https://img.shields.io/badge/-737373?style=flat-square&color=737373) | `rgba(0, 0, 0, 0.55)` |
| `--color-gray-dimmed-effect-black-50D` | ![rgba(0,0,0,0.5)](https://img.shields.io/badge/-808080?style=flat-square&color=808080) | `rgba(0, 0, 0, 0.5)` |
| `--color-gray-dimmed-effect-black-45D` | ![rgba(0,0,0,0.45)](https://img.shields.io/badge/-8c8c8c?style=flat-square&color=8c8c8c) | `rgba(0, 0, 0, 0.45)` |
| `--color-gray-dimmed-effect-black-40D` | ![rgba(0,0,0,0.4)](https://img.shields.io/badge/-999999?style=flat-square&color=999999) | `rgba(0, 0, 0, 0.4)` |
| `--color-gray-dimmed-effect-black-35D` | ![rgba(0,0,0,0.35)](https://img.shields.io/badge/-a6a6a6?style=flat-square&color=a6a6a6) | `rgba(0, 0, 0, 0.35)` |
| `--color-gray-dimmed-effect-black-30D` | ![rgba(0,0,0,0.3)](https://img.shields.io/badge/-b3b3b3?style=flat-square&color=b3b3b3) | `rgba(0, 0, 0, 0.3)` |
| `--color-gray-dimmed-effect-black-25D` | ![rgba(0,0,0,0.25)](https://img.shields.io/badge/-bfbfbf?style=flat-square&color=bfbfbf) | `rgba(0, 0, 0, 0.25)` |
| `--color-gray-dimmed-effect-black-20D` | ![rgba(0,0,0,0.2)](https://img.shields.io/badge/-cccccc?style=flat-square&color=cccccc) | `rgba(0, 0, 0, 0.2)` |
| `--color-gray-dimmed-effect-black-15D` | ![rgba(0,0,0,0.15)](https://img.shields.io/badge/-d9d9d9?style=flat-square&color=d9d9d9) | `rgba(0, 0, 0, 0.15)` |
| `--color-gray-dimmed-effect-black-10D` | ![rgba(0,0,0,0.1)](https://img.shields.io/badge/-e6e6e6?style=flat-square&color=e6e6e6) | `rgba(0, 0, 0, 0.1)` |
| `--color-gray-dimmed-effect-black-05D` | ![rgba(0,0,0,0.05)](https://img.shields.io/badge/-f2f2f2?style=flat-square&color=f2f2f2) | `rgba(0, 0, 0, 0.05)` |
| `--color-gray-dimmed-effect-black-00D` | ![rgba(0,0,0,0)](https://img.shields.io/badge/-ffffff?style=flat-square&color=ffffff) | `rgba(0, 0, 0, 0)` |

### Base Colors
| Variable | Preview | Hex |
|----------|---------|-----|
| `--color-white` | ![#ffffff](https://img.shields.io/badge/-%23ffffff?style=flat-square&color=ffffff) | `#ffffff` |
| `--color-black` | ![#000000](https://img.shields.io/badge/-%23000000?style=flat-square&color=000000) | `#000000` |
| `--color-ring` | ![#a1a1a1](https://img.shields.io/badge/-%23a1a1a1?style=flat-square&color=a1a1a1) | `rgb(161, 161, 161)` |

### Green Colors
| Variable | Preview | Hex |
|----------|---------|-----|
| `--color-green-100` | ![#72ee90](https://img.shields.io/badge/-%2372ee90?style=flat-square&color=72ee90) | `#72ee90` |
| `--color-green-200` | ![#5fe781](https://img.shields.io/badge/-%235fe781?style=flat-square&color=5fe781) | `#5fe781` |
| `--color-green-300` | ![#4edf72](https://img.shields.io/badge/-%234edf72?style=flat-square&color=4edf72) | `#4edf72` |
| `--color-green-400` | ![#3fd564](https://img.shields.io/badge/-%233fd564?style=flat-square&color=3fd564) | `#3fd564` |
| `--color-green-500` | ![#34c759](https://img.shields.io/badge/-%2334c759?style=flat-square&color=34c759) | `#34c759` |
| `--color-green-600` | ![#34ad52](https://img.shields.io/badge/-%2334ad52?style=flat-square&color=34ad52) | `#34ad52` |
| `--color-green-700` | ![#33944b](https://img.shields.io/badge/-%2333944b?style=flat-square&color=33944b) | `#33944b` |
| `--color-green-800` | ![#317d44](https://img.shields.io/badge/-%23317d44?style=flat-square&color=317d44) | `#317d44` |
| `--color-green-900` | ![#2d673c](https://img.shields.io/badge/-%232d673c?style=flat-square&color=2d673c) | `#2d673c` |

### Blue Colors
| Variable | Preview | Hex |
|----------|---------|-----|
| `--color-blue-100` | ![#66afff](https://img.shields.io/badge/-%2366afff?style=flat-square&color=66afff) | `#66afff` |
| `--color-blue-200` | ![#4da2ff](https://img.shields.io/badge/-%234da2ff?style=flat-square&color=4da2ff) | `#4da2ff` |
| `--color-blue-300` | ![#3395ff](https://img.shields.io/badge/-%233395ff?style=flat-square&color=3395ff) | `#3395ff` |
| `--color-blue-400` | ![#1a87ff](https://img.shields.io/badge/-%231a87ff?style=flat-square&color=1a87ff) | `#1a87ff` |
| `--color-blue-500` | ![#007aff](https://img.shields.io/badge/-%23007aff?style=flat-square&color=007aff) | `#007aff` |
| `--color-blue-600` | ![#066ee0](https://img.shields.io/badge/-%23066ee0?style=flat-square&color=066ee0) | `#066ee0` |
| `--color-blue-700` | ![#1462b8](https://img.shields.io/badge/-%231462b8?style=flat-square&color=1462b8) | `#1462b8` |
| `--color-blue-800` | ![#16569c](https://img.shields.io/badge/-%2316569c?style=flat-square&color=16569c) | `#16569c` |
| `--color-blue-900` | ![#174a82](https://img.shields.io/badge/-%23174a82?style=flat-square&color=174a82) | `#174a82` |

### Indigo Colors
| Variable | Preview | Hex |
|----------|---------|-----|
| `--color-indigo-100` | ![#9f9ef5](https://img.shields.io/badge/-%239f9ef5?style=flat-square&color=9f9ef5) | `#9f9ef5` |
| `--color-indigo-200` | ![#8c8aef](https://img.shields.io/badge/-%238c8aef?style=flat-square&color=8c8aef) | `#8c8aef` |
| `--color-indigo-300` | ![#7a78e8](https://img.shields.io/badge/-%237a78e8?style=flat-square&color=7a78e8) | `#7a78e8` |
| `--color-indigo-400` | ![#6967e0](https://img.shields.io/badge/-%236967e0?style=flat-square&color=6967e0) | `#6967e0` |
| `--color-indigo-500` | ![#5856d6](https://img.shields.io/badge/-%235856d6?style=flat-square&color=5856d6) | `#5856d6` |
| `--color-indigo-600` | ![#4a48cb](https://img.shields.io/badge/-%234a48cb?style=flat-square&color=4a48cb) | `#4a48cb` |
| `--color-indigo-700` | ![#3f3dbd](https://img.shields.io/badge/-%233f3dbd?style=flat-square&color=3f3dbd) | `#3f3dbd` |
| `--color-indigo-800` | ![#3e3da4](https://img.shields.io/badge/-%233e3da4?style=flat-square&color=3e3da4) | `#3e3da4` |
| `--color-indigo-900` | ![#3c3b8c](https://img.shields.io/badge/-%233c3b8c?style=flat-square&color=3c3b8c) | `#3c3b8c` |

### Red Colors
| Variable | Preview | Hex |
|----------|---------|-----|
| `--color-red-100` | ![#ff9a94](https://img.shields.io/badge/-%23ff9a94?style=flat-square&color=ff9a94) | `#ff9a94` |
| `--color-red-200` | ![#ff817a](https://img.shields.io/badge/-%23ff817a?style=flat-square&color=ff817a) | `#ff817a` |
| `--color-red-300` | ![#ff6961](https://img.shields.io/badge/-%23ff6961?style=flat-square&color=ff6961) | `#ff6961` |
| `--color-red-400` | ![#ff5147](https://img.shields.io/badge/-%23ff5147?style=flat-square&color=ff5147) | `#ff5147` |
| `--color-red-500` | ![#ff3b30](https://img.shields.io/badge/-%23ff3b30?style=flat-square&color=ff3b30) | `#ff3b30` |
| `--color-red-600` | ![#f9261a](https://img.shields.io/badge/-%23f9261a?style=flat-square&color=f9261a) | `#f9261a` |
| `--color-red-700` | ![#ed190c](https://img.shields.io/badge/-%23ed190c?style=flat-square&color=ed190c) | `#ed190c` |
| `--color-red-800` | ![#d01b11](https://img.shields.io/badge/-%23d01b11?style=flat-square&color=d01b11) | `#d01b11` |
| `--color-red-900` | ![#b31c14](https://img.shields.io/badge/-%23b31c14?style=flat-square&color=b31c14) | `#b31c14` |

### Orange Colors
| Variable | Preview | Hex |
|----------|---------|-----|
| `--color-orange-100` | ![#ffbf66](https://img.shields.io/badge/-%23ffbf66?style=flat-square&color=ffbf66) | `#ffbf66` |
| `--color-orange-200` | ![#ffb54d](https://img.shields.io/badge/-%23ffb54d?style=flat-square&color=ffb54d) | `#ffb54d` |
| `--color-orange-300` | ![#ffaa33](https://img.shields.io/badge/-%23ffaa33?style=flat-square&color=ffaa33) | `#ffaa33` |
| `--color-orange-400` | ![#ffa01a](https://img.shields.io/badge/-%23ffa01a?style=flat-square&color=ffa01a) | `#ffa01a` |
| `--color-orange-500` | ![#ff9500](https://img.shields.io/badge/-%23ff9500?style=flat-square&color=ff9500) | `#ff9500` |
| `--color-orange-600` | ![#e08506](https://img.shields.io/badge/-%23e08506?style=flat-square&color=e08506) | `#e08506` |
| `--color-orange-700` | ![#c2750a](https://img.shields.io/badge/-%23c2750a?style=flat-square&color=c2750a) | `#c2750a` |
| `--color-orange-800` | ![#a5660d](https://img.shields.io/badge/-%23a5660d?style=flat-square&color=a5660d) | `#a5660d` |
| `--color-orange-900` | ![#8a570f](https://img.shields.io/badge/-%238a570f?style=flat-square&color=8a570f) | `#8a570f` |

### Data Visualization Colors
| Variable | Preview | Hex | Usage |
|----------|---------|-----|-------|
| `--color-data-01` | ![#464f69](https://img.shields.io/badge/-%23464f69?style=flat-square&color=464f69) | `#464f69` | 데이터 01 |
| `--color-data-02` | ![#af52de](https://img.shields.io/badge/-%23af52de?style=flat-square&color=af52de) | `#af52de` | 데이터 02 |
| `--color-data-03` | ![#5856d6](https://img.shields.io/badge/-%235856d6?style=flat-square&color=5856d6) | `#5856d6` | 데이터 03 |
| `--color-data-04` | ![#007aff](https://img.shields.io/badge/-%23007aff?style=flat-square&color=007aff) | `#007aff` | 데이터 04 |
| `--color-data-05` | ![#5ac8fa](https://img.shields.io/badge/-%235ac8fa?style=flat-square&color=5ac8fa) | `#5ac8fa` | 데이터 05 |
| `--color-data-06` | ![#34c759](https://img.shields.io/badge/-%2334c759?style=flat-square&color=34c759) | `#34c759` | 데이터 06 |
| `--color-data-07` | ![#8ad74e](https://img.shields.io/badge/-%238ad74e?style=flat-square&color=8ad74e) | `#8ad74e` | 데이터 07 |
| `--color-data-08` | ![#ffcc00](https://img.shields.io/badge/-%23ffcc00?style=flat-square&color=ffcc00) | `#ffcc00` | 데이터 08 |
| `--color-data-09` | ![#ff9500](https://img.shields.io/badge/-%23ff9500?style=flat-square&color=ff9500) | `#ff9500` | 데이터 09 |
| `--color-data-10` | ![#ff3b30](https://img.shields.io/badge/-%23ff3b30?style=flat-square&color=ff3b30) | `#ff3b30` | 데이터 10 |

### Plus Colors (증가/양수)
| Variable | Preview | Hex |
|----------|---------|-----|
| `--color-plus-100` | ![#ff9a94](https://img.shields.io/badge/-%23ff9a94?style=flat-square&color=ff9a94) | `#ff9a94` |
| `--color-plus-200` | ![#ff817a](https://img.shields.io/badge/-%23ff817a?style=flat-square&color=ff817a) | `#ff817a` |
| `--color-plus-300` | ![#ff6961](https://img.shields.io/badge/-%23ff6961?style=flat-square&color=ff6961) | `#ff6961` |
| `--color-plus-400` | ![#ff5147](https://img.shields.io/badge/-%23ff5147?style=flat-square&color=ff5147) | `#ff5147` |
| `--color-plus-500` | ![#ff3b30](https://img.shields.io/badge/-%23ff3b30?style=flat-square&color=ff3b30) | `#ff3b30` |
| `--color-plus-600` | ![#f9261a](https://img.shields.io/badge/-%23f9261a?style=flat-square&color=f9261a) | `#f9261a` |
| `--color-plus-700` | ![#ed190c](https://img.shields.io/badge/-%23ed190c?style=flat-square&color=ed190c) | `#ed190c` |
| `--color-plus-800` | ![#d01b11](https://img.shields.io/badge/-%23d01b11?style=flat-square&color=d01b11) | `#d01b11` |
| `--color-plus-900` | ![#b31c14](https://img.shields.io/badge/-%23b31c14?style=flat-square&color=b31c14) | `#b31c14` |

### Minus Colors (감소/음수)
| Variable | Preview | Hex |
|----------|---------|-----|
| `--color-minus-100` | ![#66afff](https://img.shields.io/badge/-%2366afff?style=flat-square&color=66afff) | `#66afff` |
| `--color-minus-200` | ![#4da2ff](https://img.shields.io/badge/-%234da2ff?style=flat-square&color=4da2ff) | `#4da2ff` |
| `--color-minus-300` | ![#3395ff](https://img.shields.io/badge/-%233395ff?style=flat-square&color=3395ff) | `#3395ff` |
| `--color-minus-400` | ![#1a87ff](https://img.shields.io/badge/-%231a87ff?style=flat-square&color=1a87ff) | `#1a87ff` |
| `--color-minus-500` | ![#007aff](https://img.shields.io/badge/-%23007aff?style=flat-square&color=007aff) | `#007aff` |
| `--color-minus-600` | ![#066ee0](https://img.shields.io/badge/-%23066ee0?style=flat-square&color=066ee0) | `#066ee0` |
| `--color-minus-700` | ![#1462b8](https://img.shields.io/badge/-%231462b8?style=flat-square&color=1462b8) | `#1462b8` |
| `--color-minus-800` | ![#16569c](https://img.shields.io/badge/-%2316569c?style=flat-square&color=16569c) | `#16569c` |
| `--color-minus-900` | ![#174a82](https://img.shields.io/badge/-%23174a82?style=flat-square&color=174a82) | `#174a82` |

### Shadow
| Variable | Value |
|----------|-------|
| `--shadow` | `0px 2px 8px 0px rgba(0, 0, 0, 0.15)` |




## 타이포그래피 시스템

### Font Weights
| Variable | Value | Description |
|----------|-------|-------------|
| `--font-black` | 900 | Black |
| `--font-bold` | 700 | Bold |
| `--font-semi-bold` | 600 | Semi Bold |
| `--font-medium` | 500 | Medium |
| `--font-regular` | 400 | Regular |

### Font Family
| Variable | Value |
|----------|-------|
| `--primary-font-family` | Pretendard |

---

### Display Styles

| Utility Class | Weight | Size | Line Height | Letter Spacing |
|---------------|--------|------|-------------|----------------|
| `display01BL` | Black (900) | 72px | 150% | -1.5px |
| `display01B` | Bold (700) | 72px | 150% | -1.5px |
| `display01M` | Medium (500) | 72px | 150% | -1.5px |
| `display02BL` | Black (900) | 64px | 150% | -1px |
| `display02B` | Bold (700) | 64px | 150% | -1px |
| `display02M` | Medium (500) | 64px | 150% | -1px |
| `display03BL` | Black (900) | 48px | 150% | -0.5px |
| `display03B` | Bold (700) | 48px | 150% | -1px |
| `display03M` | Medium (500) | 48px | 150% | -0.5px |

---

### Heading Styles

| Utility Class | Weight | Size | Line Height | Letter Spacing |
|---------------|--------|------|-------------|----------------|
| `heading01B` | Bold (700) | 40px | 150% | 0px |
| `heading01SB` | Semi Bold (600) | 40px | 150% | 0px |
| `heading01M` | Medium (500) | 40px | 150% | 0px |
| `heading01R` | Regular (400) | 40px | 150% | 0px |
| `heading02B` | Bold (700) | 32px | 150% | 0px |
| `heading02SB` | Semi Bold (600) | 32px | 150% | 0px |
| `heading02M` | Medium (500) | 32px | 150% | 0px |
| `heading02R` | Regular (400) | 32px | 150% | 0px |
| `heading03B` | Bold (700) | 24px | 150% | 0px |
| `heading03SB` | Semi Bold (600) | 24px | 150% | 0px |
| `heading03M` | Medium (500) | 24px | 150% | 0px |
| `heading03R` | Regular (400) | 24px | 150% | 0px |
| `heading04B` | Bold (700) | 20px | 150% | 0px |
| `heading04SB` | Semi Bold (600) | 20px | 150% | 0px |
| `heading04M` | Medium (500) | 20px | 150% | 0px |
| `heading04R` | Regular (400) | 20px | 150% | 0px |
| `heading05B` | Bold (700) | 18px | 150% | 0px |
| `heading05SB` | Semi Bold (600) | 18px | 150% | 0px |
| `heading05M` | Medium (500) | 18px | 150% | 0px |
| `heading05R` | Regular (400) | 18px | 150% | 0px |

---

### Body Styles

| Utility Class | Weight | Size | Line Height | Letter Spacing |
|---------------|--------|------|-------------|----------------|
| `body01B` | Bold (700) | 16px | 150% | 0px |
| `body01SB` | Semi Bold (600) | 16px | 150% | 0px |
| `body01M` | Medium (500) | 16px | 150% | 0px |
| `body01R` | Regular (400) | 16px | 150% | 0px |
| `body02B` | Bold (700) | 14px | 150% | 0px |
| `body02SB` | Semi Bold (600) | 14px | 150% | 0px |
| `body02M` | Medium (500) | 14px | 150% | 0px |
| `body02R` | Regular (400) | 14px | 150% | 0px |
| `body03B` | Bold (700) | 12px | 150% | 0px |
| `body03SB` | Semi Bold (600) | 12px | 150% | 0px |
| `body03M` | Medium (500) | 12px | 150% | 0px |
| `body03R` | Regular (400) | 12px | 150% | 0px |
| `body04B` | Bold (700) | 11px | 150% | 0px |
| `body04M` | Medium (500) | 11px | 150% | 0px |
| `body04R` | Regular (400) | 11px | 150% | 0px |
| `body05R` | Regular (400) | 10px | 150% | 0px |




## 💻 코드 사용 예시

### - 기본 예시
```javascript
import { Button } from "@hdc-ui/components/ui/button";

export default function Page() {
  return <Button className="body01B text-red-500">버튼</Button>;
}
```

### - headless 예시
```javascript
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@hdc-ui/components/ui/dialog";
import { Button } from "@hdc-ui/components/ui/button";

import { cn } from "@hdc-ui/utils";

export default function Page() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>버튼</Button>
      </DialogTrigger>
      <DialogContent className={cn("w-100")}>
        <DialogHeader>
          <DialogTitle>타이틀</DialogTitle>
        </DialogHeader>
        <DialogDescription>설명</DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
```



## 🔗 링크

- [GitHub](https://github.com) - 세계 최대의 코드 저장소
- [MDN Web Docs](https://developer.mozilla.org) - 웹 개발 문서
- [Stack Overflow](https://stackoverflow.com) - 개발자 Q&A

---
