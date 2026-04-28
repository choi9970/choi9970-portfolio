import { useEffect, useState } from "react";

const topStats = [
  ["19대", "운영 서버 규모 경험"],
  ["하루 단위", "반복 수작업 자동화"],
  ["3년+", "일본 고객 기술지원"],
];

const targetRoles = ["풀스택 개발", "백엔드 중심 개발", "운영 개발", "자동화 개발"];

const heroHighlights = [
  "운영 이슈를 재현하고, API와 SQL, 데이터 흐름을 따라가며 원인과 영향 범위를 좁히는 방식으로 일해 왔습니다.",
  "반복 수작업은 자동화와 문서화로 전환해 더 중요한 고객 대응과 서비스 개선에 집중할 수 있게 만드는 데 강점이 있습니다.",
  "운영 경험을 바탕으로 화면 기능, API 연동, 세션 처리, 챗봇, 배포 구조까지 연결하는 서비스 구현 경험을 확장해 왔습니다.",
];

const profileDetails = [
  ["지향 포지션", "백엔드 강점의 풀스택 개발자"],
  ["핵심 강점", "문제 재현, 원인 추적, 반복 업무 자동화"],
  ["실무 기반", "운영 유지보수, 기술지원, 데이터 처리, AWS 운영 경험"],
  ["확장 역량", "서비스 개선, 배포 연동, 세션 처리, 컨테이너 통신 문제 해결"],
];

const flagshipProject = {
  label: "대표 프로젝트",
  title: "LearnIT",
  productStatement: "온라인 강의, 실습, 추천을 한 화면에 묶은 학습 플랫폼",
  subtitle: "학원 팀 프로젝트 · 1개월 · 5인 팀",
  quickFacts: [
    ["서비스 형태", "온라인 강의 학습 플랫폼"],
    ["내 역할", "챗봇 구현 · 배포 · CI/CD"],
    ["기술 구조", "Spring Boot · FastAPI · MySQL"],
    ["배포 환경", "ECR · EC2 · Docker Compose"],
  ],
  summary:
    "정적인 학습 구조의 한계를 줄이기 위해 강의 시청, 실습, 질문, 추천을 하나의 흐름으로 연결한 학습 플랫폼 프로젝트입니다. 강의 목록, Q&A, 강의평, 비로그인 장바구니, 관리자 권한, 챗봇, 배포 구조까지 서비스 단위로 경험했습니다.",
  background:
    "강의와 IDE가 분리되어 있어 학습 흐름이 자주 끊기고, 학습 성취도를 확인하기 어렵다는 점을 문제로 봤습니다. 강의 추천과 GitHub 연동 기반 성장 관리까지 포함해 더 능동적인 학습 환경을 만드는 것을 목표로 했습니다.",
  serviceFeatures: [
    "강의 목록, 강의 상세, Q&A, 강의평 기능을 한 흐름으로 제공",
    "챕터별 퀴즈와 실습 기반 학습 흐름 지원",
    "GitHub 연동 기반 역량 확인과 성장 지표 제공",
    "AI 챗봇을 통한 강의 추천과 문의 기능 제공",
  ],
  responsibilities: [
    "강의 목록 페이지 기능 구현",
    "Q&A 및 강의평 기능 구현",
    "비로그인 장바구니 기능 구현",
    "관리자 유저 권한 기능 구현",
    "강의 및 문의 챗봇 기능 구현",
    "Git 작업 구조와 역할 분배 정리",
    "CI/CD 및 배포 환경 구성",
  ],
  results: [
    "강의, 질문, 추천, 배포 흐름을 하나의 서비스로 연결",
    "비로그인 장바구니와 관리자 권한 등 사용자 기능 구현",
    "sessionId 기반 후속 질문이 가능한 챗봇 흐름 구현",
    "Spring Boot, FastAPI, MySQL, Nginx, Docker Compose 기반 구조 경험",
  ],
  featureSummary: [
    "강의 목록·상세와 Q&A",
    "비로그인 장바구니와 관리자 권한",
    "챗봇 기반 강의 추천과 문의",
  ],
  roleSummary: [
    "강의 목록과 사용자 기능 구현",
    "챗봇 세션 흐름 및 문의 기능 연결",
    "GitHub Actions, ECR, EC2 기반 배포 구성",
  ],
  deploymentLine: "release 브랜치, GitHub Actions, ECR, EC2, Docker Compose, Nginx를 연결해 배포했습니다.",
  chatbotSummary:
    "강의 찾기와 문의를 대화형 UI로 시작하고, 입력 내용을 바탕으로 관련 강의를 추천한 뒤 특정 강의를 이어서 물을 수 있는 후속 질문 흐름을 구현했습니다.",
  chatbotPoints: [
    "Browser · Spring · Python chat-agent 역할을 분리한 구조",
    "sessionId와 last_courses 기반 상태 관리 적용",
    "chat-agent는 직접 DB를 조회하지 않고 Spring API만 호출",
    "추천 이후 특정 강의를 이어서 묻는 UX 구현",
  ],
  chatbotVisuals: [
    {
      src: "/learnit-chatbot-ui.png",
      alt: "LearnIT 챗봇 시작 화면",
      caption: "강의 찾기와 문의를 대화형으로 시작하는 챗봇 UI",
    },
    {
      src: "/learnit-chatbot-recommendation.png",
      alt: "LearnIT 챗봇 추천 화면",
      caption: "입력 내용을 바탕으로 관련 강의를 추천하는 흐름",
    },
    {
      src: "/learnit-chatbot-followup.png",
      alt: "LearnIT 챗봇 후속 질문 화면",
      caption: "추천 이후 특정 강의를 이어서 물을 수 있는 후속 질문 흐름",
    },
    {
      src: "/learnit-chatbot-architecture.svg",
      alt: "LearnIT 챗봇 아키텍처",
      caption: "Browser, Spring, Python agent로 분리한 챗봇 아키텍처",
    },
  ],
  deployment:
    "배포는 release 브랜치를 기준으로 자동화했습니다. GitHub Actions에서 이미지를 빌드해 Amazon ECR로 푸시하고, 운영 서버에서는 Docker Compose로 컨테이너를 실행했습니다. 외부 공개는 Nginx와 SSL 구간으로 한정하고, 애플리케이션 포트는 내부 네트워크에서만 사용하도록 구성했습니다.",
  deploymentPoints: [
    "release 브랜치 반영 시 GitHub Actions가 배포 파이프라인을 실행하도록 구성했습니다.",
    "AWS 인증은 OIDC 기반 Role Assume 방식을 사용해 고정 액세스 키 없이 처리했습니다.",
    "운영 서버에서는 ECR 이미지를 가져온 뒤 Docker Compose로 애플리케이션을 실행했습니다.",
    "외부 공개는 Nginx와 SSL 구간으로 한정하고, 애플리케이션 포트는 내부 네트워크에서만 사용하도록 분리했습니다.",
  ],
  deploymentVisuals: [
    {
      title: "배포 전체 구조",
      description:
        "개발 환경, GitHub 저장소, Amazon ECR, EC2 운영 서버가 어떤 흐름으로 연결되는지 정리한 구조도입니다. Spring Boot, Chat Agent, MySQL, Nginx가 한 배포 단위로 연결됩니다.",
      src: "/learnit-deployment-structure-reference.png",
      alt: "LearnIT 배포 전체 구조",
    },
    {
      title: "CI/CD 흐름",
      description:
        "release 브랜치 반영 시 GitHub Actions가 동작하고, 빌드된 이미지를 ECR로 푸시한 뒤 EC2에서 Docker Compose로 배포하는 흐름입니다.",
      src: "/learnit-cicd-flow.png",
      alt: "LearnIT CI CD 흐름",
    },
  ],
  diagramSrc: "/learnit-deployment-structure-reference.png",
  diagramAlt: "LearnIT 배포 전체 구조",
  flowSrc: "/learnit-cicd-flow.png",
  flowAlt: "LearnIT CI CD 흐름",
  tech: ["Java", "Spring Boot", "Python", "FastAPI", "MySQL", "Docker", "AWS ECR", "GitHub Actions", "Nginx"],
  repo: "https://github.com/choi9970/Acorn_Project_LearnIT",
  links: [
    {
      label: "메인 서비스 저장소",
      href: "https://github.com/choi9970/Acorn_Project_LearnIT",
    },
    {
      label: "Chat Agent 저장소",
      href: "https://github.com/choi9970/learnit-chat-agent",
    },
    {
      label: "Deploy 저장소",
      href: "https://github.com/choi9970/learnit-deploy",
    },
  ],
};

const libraryFlow = ["도서 검색", "상세 조회", "로그인", "예약 및 연장", "대출 현황 확인"];

const evidenceCards = [
  {
    label: "챗봇 구현",
    title: "세션 기반 후속 질문 챗봇 구현",
    detail: "sessionId와 상태 관리 구조 적용",
    body:
      "Browser, Spring Boot, Python chat-agent 역할을 분리하고, sessionId와 last_courses 기반 상태 관리를 적용해 추천 이후 후속 질문이 가능한 챗봇 흐름을 구현했습니다.",
  },
  {
    label: "배포 구조",
    title: "CI/CD 및 컨테이너 배포 구조 구성",
    detail: "release 브랜치 기준 ECR · EC2 배포",
    body:
      "release 브랜치 반영을 기준으로 GitHub Actions를 연결하고, OIDC 기반 Role Assume 방식으로 ECR에 이미지를 푸시한 뒤 EC2에서 Docker Compose와 Nginx Reverse Proxy로 배포 구조를 구성했습니다.",
  },
  {
    label: "PHP 구현",
    title: "도서관 웹 기능 PHP 파트 구현",
    detail: "검색 · 예약 · 연장 · 대출조회 기능 구현",
    body:
      "팀 프로젝트에서 PHP 웹 파트를 맡아 사용자용 기능 흐름을 구현했습니다. 도서 검색, 상세 조회, 예약, 연장, 대출 현황 확인까지 웹에서 이어지도록 구성했습니다.",
  },
  {
    label: "운영 문제",
    title: "정렬 오류 원인 추적 및 수정",
    detail: "SQL ORDER BY 누락 확인",
    body:
      "페이지 리스트 순서가 매번 달라지는 문제를 추적해 SQL의 ORDER BY 누락을 원인으로 확인했습니다. 영향 범위를 확인한 뒤 정렬 기준을 명시해 수정했습니다.",
  },
  {
    label: "자동화",
    title: "릴리스 점검 업무 자동화",
    detail: "하루 단위 수작업 제거",
    body:
      "릴리스 페이지 확인, 오류 번호 대조, 티켓 확인, Slack 보고까지 이어지던 반복 점검 업무를 자동화했습니다. 사람이 하루 종일 붙잡고 있던 작업을 줄여 더 중요한 대응에 집중할 수 있게 했습니다.",
  },
];

const caseStudies = [
  {
    label: "자동화 사례",
    title: "릴리스 점검 자동화 구축",
    problem:
      "릴리스 때마다 페이지에서 오류 번호를 확인하고, 엑셀과 티켓을 대조한 뒤 Slack으로 보고해야 했습니다.",
    action:
      "Alteryx를 활용해 페이지 데이터 수집, 엑셀 대조, 티켓 확인, Slack 안내까지 이어지는 흐름을 자동화했습니다.",
    result:
      "사람이 하루 동안 반복 확인하던 점검 업무를 줄였고, 더 가치 있는 티켓 대응과 서비스 개선에 시간을 쓸 수 있게 했습니다.",
  },
  {
    label: "운영 개선 사례",
    title: "페이지 정렬 SQL 오류 수정",
    problem:
      "매거진 목록과 페이징 목록의 정렬이 접속할 때마다 달라 보여 사용자 입장에서 순서가 랜덤처럼 보였습니다.",
    action:
      "조회 흐름과 영향 범위를 확인한 뒤 SQL에 ORDER BY가 빠져 있다는 원인을 찾고, 정렬 기준을 명시하도록 수정했습니다.",
    result:
      "created_at 기준으로 일관된 정렬이 적용되어 사용자가 기대하는 순서대로 목록이 표시되도록 개선했습니다.",
  },
];

const experiences = [

  {
    period: "2021.07 - 2024.01",
    company: "일본계 클라우드·데이터 솔루션 기업",
    role: "IT 기술지원",
    meta: "클라우드·데이터 솔루션 환경 · 라이선스 총판 기반 기술지원 · 일본 고객 대응",
    summary:
      "일본 고객을 대상으로 Alteryx와 Tableau 관련 기술 문의를 대응했습니다. 문제를 재현해 설명하고, 반복 문의는 매뉴얼과 기술 블로그로 정리했으며, 반복 점검 업무는 자동화로 전환했습니다.",
    details: [
      "Alteryx 및 Tableau 관련 기술 문의 대응",
      "워크플로우 작성·수정 지원과 성능 개선 제안",
      "매뉴얼 작성 및 반복 문의용 기술 블로그 정리",
      "릴리스 점검 수작업 자동화로 대응 시간 절감",
    ],
    links: [
      "https://dev.classmethod.jp/articles/alteryx_automation_add_on_err-2/",
      "https://dev.classmethod.jp/articles/alteryx_col_turn_row/",
      "https://dev.classmethod.jp/articles/perform_simple_aggregation_gt_in_alteryx_designer/",
    ],
    visuals: [
      {
        src: "/alteryx-visual.png",
        alt: "Alteryx Designer 화면",
        caption: "기술지원과 자동화 흐름 설계에 활용한 Alteryx",
      },
      {
        src: "/tableau-visual.png",
        alt: "Tableau 대시보드 화면",
        caption: "문의 대응과 분석 지원 경험이 있는 Tableau",
      },
    ],
    stack: ["Alteryx", "Tableau", "Python", "AWS", "기술 문서화"],
  },
  {
    period: "2017.04 - 2019.06",
    company: "일본 SI 기업",
    role: "시스템 엔지니어",
    meta: "수탁개발 / SI · 운영 유지보수 · 데이터 처리 · AWS 운영",
    summary:
      "중고차 플랫폼 유지보수, 온라인 학습 서비스 운영 지원, 유통사 마케팅 데이터 분석 집계 업무를 담당했습니다. 운영 서버 환경에서 유지보수와 기능 개선, 데이터 추출 자동화, AWS 운영을 함께 경험했습니다.",
    details: [
      "PHP 기반 중고차 플랫폼 유지보수 및 기능 개선",
      "검색 기능, 레이아웃 수정, 긴급 오류 대응",
      "VBA 도구 보수, Python/bash 기반 데이터 추출 및 가공",
      "AWS IAM, EC2, S3, Lambda, CloudWatch Events 운영 지원",
      "ID-POS 데이터 분석 집계 업무 수행",
    ],
    subprojects: [
      "중고차 플랫폼 유지보수 (PHP, Smarty, JS, PostgreSQL, Oracle)",
      "온라인 학습 서비스 운영 지원 (VBA, Python, bash, MySQL, MongoDB, AWS)",
      "유통사 마케팅 데이터 분석 집계 (SPSS)",
    ],
    visuals: [
      {
        src: "/goonet-visual.png",
        alt: "중고차 플랫폼 서비스 화면",
        caption: "유지보수와 개보수를 담당한 중고차 플랫폼",
      },
      {
        src: "/gacco-visual.png",
        alt: "온라인 학습 서비스 화면",
        caption: "운영 지원 및 데이터 처리 업무를 담당한 온라인 학습 서비스",
      },
      {
        src: "/aeon.png",
        alt: "유통사 마케팅 조직 로고",
        caption: "ID-POS 분석 집계 업무를 수행한 유통사 마케팅 조직",
      },
    ],
    stack: ["PHP", "HTML/CSS/JS", "PostgreSQL", "Oracle", "Python", "Bash", "AWS"],
  },
  {
    period: "2016.03 - 2017.03",
    company: "일본 SI 기업",
    role: "프로그래머",
    meta: "SI · 운영 중심 개발 및 유지보수",
    summary:
      "중고차 플랫폼 관련 개발과 유지보수를 담당했습니다. 판매점 전화 기능 시간 제어, 상세 페이지 기능 추가, 긴급 오류 대응을 통해 운영형 개발의 기본기를 쌓았습니다.",
    details: [
      "판매점 전화 기능과 견적 버튼 시간대 제어 구현",
      "상세 페이지 기능 추가",
      "레이아웃 수정 및 긴급 오류 메일 대응",
      "원인 조사와 유지보수 대응 수행",
    ],
    stack: ["PHP", "Smarty", "JavaScript", "Bash", "PostgreSQL"],
  },
];

const projects = [
  {
    title: "LearnIT",
    subtitle: "학원 팀 프로젝트 · 3개 저장소 구성",
    role: "역할: 작업 구조 정리, 챗봇 구현, 배포 연동",
    result: "결과: 학습 서비스 흐름 구현과 배포 구조 경험",
    description:
      "화면 기능, API 연동, 세션 처리, 챗봇, 배포 구조까지 하나의 서비스 안에서 연결해 본 학습 프로젝트입니다. 메인 서비스, 챗봇, 배포 저장소를 분리해 구성했습니다.",
    tech: ["Java", "Spring Boot", "Python", "Docker", "AWS ECR", "GitHub Actions"],
    links: [
      {
        label: "메인 서비스 저장소",
        href: "https://github.com/choi9970/Acorn_Project_LearnIT",
      },
      {
        label: "Chat Agent 저장소",
        href: "https://github.com/choi9970/learnit-chat-agent",
      },
      {
        label: "Deploy 저장소",
        href: "https://github.com/choi9970/learnit-deploy",
      },
    ],
  },
  {
    title: "LibrarySystem",
    subtitle: "팀 프로젝트 · PHP 웹 파트 담당",
    role: "역할: 사용자용 PHP 웹 시스템 전반 구현",
    result: "결과: 검색, 예약, 연장, 대출조회 등 기능 구현",
    description:
      "학교 도서관 업무 개선을 위해 만든 도서 관리 시스템 프로젝트입니다. 팀으로 진행했지만 사용자용 웹 화면과 기능 흐름은 PHP 파트에서 전반적으로 구현했습니다. 사용자가 도서관에 직접 가지 않아도 웹에서 검색, 예약, 연장, 대출 현황 확인을 할 수 있도록 구성했습니다.",
    tech: ["PHP", "MySQL", "CRUD", "Web Application"],
    link: "https://github.com/choi2812/LibraySystem",
    highlights: [
      "PHP 기준 20개 이상 파일로 웹 기능 구성",
      "도서 검색, 상세, 예약, 연장, 대출조회 등 사용자 기능 담당",
      "bookDetail.php, LOGIN.PHP, detailsSearch.php, borrowList.php 등 주요 화면 구현",
      "db_connect.php와 DB 구조를 기준으로 데이터 조회 흐름 구성",
    ],
  },
];

const education = [
  {
    title: "에이콘 아카데미",
    detail: "자바 Spring Boot 웹 개발자 양성과정 수료, 960시간",
    period: "2025.07 - 2026.01",
  },
  {
    title: "에이콘 아카데미",
    detail: "우수상 및 팀 우수상 수상",
    period: "2026.01",
  },
  {
    title: "동그라미재단 AI Academy",
    detail: "AI 프롬프트 엔지니어링 중급반 수료",
    period: "2026.01 - 2026.02",
  },
];

const skills = [
  "Java",
  "Spring Boot",
  "Python",
  "PHP",
  "JavaScript",
  "React",
  "AWS",
  "Docker",
  "PostgreSQL",
  "Oracle",
  "MongoDB",
  "Alteryx",
  "Tableau",
  "GitHub Actions",
];

function contributionLevelClass(level) {
  const classes = {
    NONE: "level-0",
    FIRST_QUARTILE: "level-1",
    SECOND_QUARTILE: "level-2",
    THIRD_QUARTILE: "level-3",
    FOURTH_QUARTILE: "level-4",
  };

  return classes[level] || "level-0";
}

function formatNumber(value) {
  return new Intl.NumberFormat("ko-KR").format(value || 0);
}

export default function App() {
  const [githubStats, setGithubStats] = useState(null);
  const [githubError, setGithubError] = useState("");
  const [githubLoading, setGithubLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadGithubStats() {
      try {
        const response = await fetch("/api/github/stats");
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.message || "GitHub 통계를 불러오지 못했습니다.");
        }

        if (!cancelled) {
          setGithubStats(payload);
          setGithubError("");
        }
      } catch (error) {
        if (!cancelled) {
          setGithubError(error.message);
        }
      } finally {
        if (!cancelled) {
          setGithubLoading(false);
        }
      }
    }

    loadGithubStats();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="portfolio-shell">
      <a className="skip-link" href="#main-content">
        본문으로 바로가기
      </a>

      <header className="hero">
        <nav className="topbar" aria-label="주요 메뉴">
          <a className="brand" href="#hero">
            <span className="brand-mark" aria-hidden="true">
              AD
            </span>
            <div>
              <strong>Automation-minded developer</strong>
              <p>Backend-leaning Fullstack · Operations · Automation</p>
            </div>
          </a>

          <div className="nav-links">
            <a href="#flagship">대표 프로젝트</a>
            <a href="#projects">공개 프로젝트</a>
            <a href="#evidence">핵심 근거</a>
            <a href="#experience">경력</a>
            <a href="#contact">프로필</a>
          </div>
        </nav>

        <section className="hero-grid" id="hero">
          <div className="hero-copy">
            <p className="eyebrow">FULLSTACK · BACKEND · AUTOMATION</p>
            <h1>사용자 기능 구현과 운영 문제 해결 경험을 함께 쌓아온 백엔드 강점의 풀스택 개발자입니다.</h1>
            <p className="hero-text">
              운영과 유지보수 환경에서 문제를 재현하고 원인을 좁혀 온 경험을 바탕으로, 화면 기능과 API, 세션 처리, 챗봇, 배포 구조까지 연결하는 서비스 개발 경험을 확장해 왔습니다. 반복 업무는 자동화로 줄이고, 실제 운영 문제는 코드와 데이터 흐름으로 해결하는 방식에 강점이 있습니다.
            </p>

            <div className="role-strip" aria-label="지원 포지션">
              <span>지원 포지션</span>
              <ul className="role-list">
                {targetRoles.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
            </div>

            <div className="intro-card" aria-label="핵심 소개">
              {heroHighlights.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>

            <div className="hero-actions">
              <a className="ghost-btn" href="#flagship">
                대표 프로젝트 보기
              </a>
              <a className="ghost-btn" href="#experience">
                실무 경험 보기
              </a>
              <a className="ghost-btn" href="https://github.com/choi9970" target="_blank" rel="noreferrer">
                GitHub 보기
              </a>
            </div>

            <div className="top-stat-grid" aria-label="핵심 수치">
              {topStats.map(([value, label]) => (
                <article className="top-stat-card" key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </article>
              ))}
            </div>
          </div>

          <aside className="hero-panel">
            <div className="panel-label">PROFILE SUMMARY</div>
            <div className="hero-panel-intro">
              <strong>운영과 유지보수 경험을 바탕으로 서비스 구현과 개선 경험을 쌓아왔습니다.</strong>
              <p>기술지원과 자동화, 문제 해결 경험을 바탕으로 서비스 구현과 개선 범위를 꾸준히 확장해 왔습니다.</p>
            </div>
            <dl className="snapshot-list">
              {profileDetails.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </section>
      </header>

      <main id="main-content">
        <section className="section" id="flagship">
          <div className="section-heading">
            <p>FLAGSHIP PROJECT</p>
            <h2>대표 프로젝트</h2>
          </div>

          <article className="case-study-card">
            <div className="case-study-head">
              <div>
                <p>{flagshipProject.label}</p>
                <h3>{flagshipProject.title}</h3>
              </div>
              <a className="ghost-btn" href={flagshipProject.repo} target="_blank" rel="noreferrer">
                대표 저장소 보기
              </a>
            </div>

            <p className="project-role">{flagshipProject.subtitle}</p>
            <div className="flagship-facts">
              {flagshipProject.quickFacts.map(([label, value]) => (
                <article className="flagship-fact" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </article>
              ))}
            </div>

            <section className="case-block standalone-case-block">
              <span>프로젝트 개요</span>
              <p>{flagshipProject.productStatement}</p>
            </section>

            <div className="case-study-grid">
              <section className="case-block">
                <span>대표 기능 3개</span>
                <ul className="case-inline-list">
                  {flagshipProject.featureSummary.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
              <section className="case-block">
                <span>내가 한 일 3개</span>
                <ul className="case-inline-list">
                  {flagshipProject.roleSummary.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
              <section className="case-block">
                <span>배포 1줄</span>
                <p>{flagshipProject.deploymentLine}</p>
              </section>
            </div>

            <section className="case-block standalone-case-block">
              <span>챗봇 구현</span>
              <p>{flagshipProject.chatbotSummary}</p>
              <ul className="case-inline-list deployment-points">
                {flagshipProject.chatbotPoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="feature-media-grid">
                {flagshipProject.chatbotVisuals.slice(0, 3).map((visual) => (
                  <figure className="experience-visual" key={visual.src}>
                    <img src={visual.src} alt={visual.alt} />
                    <figcaption>{visual.caption}</figcaption>
                  </figure>
                ))}
              </div>
              <figure className="feature-diagram">
                <img src={flagshipProject.chatbotVisuals[3].src} alt={flagshipProject.chatbotVisuals[3].alt} />
                <figcaption>{flagshipProject.chatbotVisuals[3].caption}</figcaption>
              </figure>
            </section>

            <section className="case-block standalone-case-block">
              <span>배포 구조</span>
              <ul className="case-inline-list deployment-points">
                {flagshipProject.deploymentPoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {flagshipProject.deploymentVisuals.map((visual) => (
                <figure className="deployment-figure" key={visual.src}>
                  <figcaption className="deployment-caption">
                    <strong>{visual.title}</strong>
                    <p>{visual.description}</p>
                  </figcaption>
                  <img src={visual.src} alt={visual.alt} />
                </figure>
              ))}
              <ul className="tag-list compact-tags" aria-label="LearnIT 기술">
                {flagshipProject.tech.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </section>

            <div className="project-link-group case-link-group">
              {flagshipProject.links.map((link) => (
                <a href={link.href} key={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </article>
        </section>

        <section className="section" id="projects">
          <div className="section-heading">
            <p>PUBLIC PROJECTS</p>
            <h2>공개 프로젝트</h2>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <div className="project-head">
                  <p>{project.subtitle}</p>
                  <h3>{project.title}</h3>
                </div>
                <p className="project-role">{project.role}</p>
                <p className="project-role">{project.result}</p>
                {project.title === "LibrarySystem" ? (
                  <div className="library-flow">
                    <span>기능 흐름</span>
                    <div className="library-flow-steps">
                      {libraryFlow.map((step) => (
                        <div className="library-flow-step" key={step}>
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
                <p className="project-description">{project.description}</p>
                {project.highlights ? (
                  <ul className="case-inline-list">
                    {project.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                <ul className="tag-list" aria-label={`${project.title} 기술`}>
                  {project.tech.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
                {project.links ? (
                  <div className="project-link-group">
                    {project.links.map((link) => (
                      <a href={link.href} key={link.href} target="_blank" rel="noreferrer">
                        {link.label}
                      </a>
                    ))}
                  </div>
                ) : (
                  <a href={project.link} target="_blank" rel="noreferrer">
                    GitHub 저장소 보기
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="evidence">
          <div className="section-heading">
            <p>EVIDENCE</p>
            <h2>핵심 근거</h2>
          </div>

          <div className="project-grid">
            {evidenceCards.map((item) => (
              <article className="project-card" key={item.title}>
                <div className="project-head">
                  <p>{item.label}</p>
                  <h3>{item.title}</h3>
                </div>
                <p className="project-role">{item.detail}</p>
                <p className="project-description">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="case-study">
          <div className="section-heading">
            <p>CASE STUDY</p>
            <h2>주요 사례</h2>
          </div>

          <div className="case-study-stack">
            {caseStudies.map((item) => (
              <article className="case-study-card" key={item.title}>
                <div className="case-study-head">
                  <div>
                    <p>{item.label}</p>
                    <h3>{item.title}</h3>
                  </div>
                </div>

                <div className="case-study-grid">
                  <section className="case-block">
                    <span>문제</span>
                    <p>{item.problem}</p>
                  </section>
                  <section className="case-block">
                    <span>해결</span>
                    <p>{item.action}</p>
                  </section>
                  <section className="case-block">
                    <span>결과</span>
                    <p>{item.result}</p>
                  </section>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="experience">
          <div className="section-heading">
            <p>EXPERIENCE</p>
            <h2>경력</h2>
          </div>

          <div className="timeline">
            {experiences.map((item) => (
              <article className="timeline-card" key={`${item.company}-${item.period}`}>
                <div className="timeline-meta">
                  <span>{item.period}</span>
                  <strong>{item.company}</strong>
                  <p>{item.role}</p>
                  {item.meta ? <small className="timeline-caption">{item.meta}</small> : null}
                </div>
                <div className="timeline-body">
                  <p>{item.summary}</p>
                  {item.details ? (
                    <ul className="detail-list" aria-label={`${item.company} 담당 업무`}>
                      {item.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  ) : null}
                  {item.subprojects ? (
                    <div className="subproject-box">
                      <strong>주요 수행 영역</strong>
                      <ul className="detail-list" aria-label={`${item.company} 수행 영역`}>
                        {item.subprojects.map((project) => (
                          <li key={project}>{project}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {item.visuals ? (
                    <div className="experience-visual-grid">
                      {item.visuals.map((visual) => (
                        <figure className="experience-visual" key={visual.src}>
                          <img src={visual.src} alt={visual.alt} />
                          <figcaption>{visual.caption}</figcaption>
                        </figure>
                      ))}
                    </div>
                  ) : null}
                  {item.links ? (
                    <div className="subproject-box">
                      <strong>기술 블로그</strong>
                      <div className="experience-links">
                        {item.links.map((link) => (
                          <a href={link} key={link} target="_blank" rel="noreferrer">
                            {link}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  <ul className="tag-list" aria-label={`${item.company} 기술 스택`}>
                    {item.stack.map((stack) => (
                      <li key={stack}>{stack}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>


        <section className="section" id="github">
          <div className="section-heading">
            <p>GITHUB</p>
            <h2>GitHub</h2>
          </div>

          {githubLoading ? <div className="status-card">GitHub 통계를 불러오는 중입니다.</div> : null}
          {!githubLoading && githubError ? <div className="status-card error">{githubError}</div> : null}

          {!githubLoading && !githubError && githubStats ? (
            <div className="github-section">
              <div className="github-stat-grid">
                <article className="github-stat-card">
                  <span>올해 총 기여</span>
                  <strong>{formatNumber(githubStats.summary.totalContributions)}</strong>
                </article>
                <article className="github-stat-card">
                  <span>올해 커밋</span>
                  <strong>{formatNumber(githubStats.summary.totalCommitContributions)}</strong>
                </article>
                <article className="github-stat-card">
                  <span>공개 저장소</span>
                  <strong>{formatNumber(githubStats.summary.publicRepositories)}</strong>
                </article>
                <article className="github-stat-card">
                  <span>팔로워</span>
                  <strong>{formatNumber(githubStats.summary.followers)}</strong>
                </article>
              </div>

              <div className="github-activity-card">
                <div className="github-activity-head">
                  <div>
                    <p className="activity-label">{githubStats.summary.yearLabel}</p>
                    <h3>공개 가능한 개발 기록도 함께 확인할 수 있습니다</h3>
                  </div>
                  <p className="activity-description">
                    GitHub 통계는 활동량 자체보다도 학습과 구현이 지속적으로 이어진 흐름을 보여주는 보조 지표로 활용하고 있습니다.
                  </p>
                </div>

                <div className="contribution-grid" aria-label="GitHub contribution heatmap">
                  {githubStats.calendar.weeks.map((week, weekIndex) => (
                    <div className="week-column" key={`${week.firstDay}-${weekIndex}`}>
                      {week.contributionDays.map((day) => (
                        <div
                          className={`contribution-cell ${contributionLevelClass(day.contributionLevel)}`}
                          key={day.date}
                          title={`${day.date}: ${day.contributionCount}건`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </section>

        <section className="section dual-section">
          <div className="column-card">
            <div className="section-heading align-left">
              <p>EDUCATION</p>
              <h2>교육</h2>
            </div>

            <div className="stack-list">
              {education.map((item) => (
                <article key={`${item.title}-${item.period}`}>
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                  <span>{item.period}</span>
                </article>
              ))}
            </div>
          </div>

          <div className="column-card">
            <div className="section-heading align-left">
              <p>SKILLS</p>
              <h2>기술</h2>
            </div>

            <ul className="skill-cloud">
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="contact-card">
            <div className="section-heading align-left">
              <p>PROFILE</p>
              <h2>프로필</h2>
            </div>

            <p className="contact-copy">
              경력과 프로젝트, 구현 이력은 GitHub 프로필과 저장소를 통해 확인할 수 있습니다.
            </p>

            <div className="contact-links">
              <a href="https://github.com/choi9970" target="_blank" rel="noreferrer">
                GitHub 프로필 보기
              </a>
              <a href="https://github.com/choi2812" target="_blank" rel="noreferrer">
                보조 GitHub 보기
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
