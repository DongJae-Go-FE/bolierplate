import { generateMockDate, randomItem, randomNumber } from '../utils';

export interface Item {
  id: number;
  header: string;
  type: string;
  status: string;
  target: string;
  limit: string;
  reviewer: string;
  createdAt?: string;
  updatedAt?: string;
}

const types = ['Narrative', 'Technical content', 'Research'];
const statuses = ['Done', 'In Process'];
const reviewers = [
  'Eddie Lake',
  'Jamik Tashpulatov',
  'Maya Johnson',
  'Carlos Rodriguez',
  'Raj Patel',
  'Thomas Wilson',
  'Sophia Martinez',
  'Alex Thompson',
  'Nina Patel',
  'David Kim',
  'Maria Garcia',
  'James Wilson',
  'Priya Singh',
  'Michael Chen',
  'Lisa Wong',
  'Daniel Park',
  'Assign reviewer',
];

const headers = [
  'Executive summary',
  'Technical approach',
  'Design',
  'Capabilities',
  'Integration with existing systems',
  'Innovation and Advantages',
  'Overview of EMR\'s Innovative Solutions',
  'Advanced Algorithms and Machine Learning',
  'Adaptive Communication Protocols',
  'Advantages Over Current Technologies',
  'Past Performance',
  'Customer Feedback and Satisfaction Levels',
  'Implementation Challenges and Solutions',
  'Security Measures and Data Protection Policies',
  'Scalability and Future Proofing',
  'User Training and Onboarding Experience',
  'Future Development Roadmap',
  'System Architecture Overview',
  'Risk Management Plan',
  'API Documentation',
  'Database Schema',
  'Testing Methodology',
  'Deployment Strategy',
  'Market Analysis',
  'Competitor Comparison',
  'Maintenance Plan',
  'User Personas',
  'Performance Metrics',
  'Disaster Recovery Plan',
  'Third-party Integrations',
  'User Feedback Summary',
  'Localization Strategy',
  'Mobile Compatibility',
  'Data Migration Plan',
  'Quality Assurance Protocols',
  'Stakeholder Analysis',
  'Environmental Impact Assessment',
  'Customer Support Framework',
  'Version Control Strategy',
  'Continuous Integration Pipeline',
  'User Authentication System',
  'Data Analytics Framework',
  'Cloud Infrastructure',
  'Network Security Measures',
  'Internationalization Support',
  'Backup and Recovery Procedures',
  'Monitoring and Alerting System',
  'Code Review Guidelines',
  'Documentation Standards',
  'Technical Debt Assessment',
];

// 초기 목 데이터 생성
export const initialItems: Item[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  header: randomItem(headers),
  type: randomItem(types),
  status: randomItem(statuses),
  target: String(randomNumber(1, 30)),
  limit: String(randomNumber(0, 40)),
  reviewer: randomItem(reviewers),
  createdAt: generateMockDate(randomNumber(1, 90)),
  updatedAt: generateMockDate(randomNumber(0, 7)),
}));

// 실제 핸들러에서 사용할 메모리 DB
let mockDatabase: Item[] = [...initialItems];

// ID 카운터 (새 항목 생성 시 사용)
let nextId = mockDatabase.length + 1;

// DB 헬퍼 함수들
export const db = {
  // 전체 목록 조회
  getAll: () => [...mockDatabase],

  // ID로 단일 항목 조회
  getById: (id: number) => mockDatabase.find((item) => item.id === id),

  // 페이지네이션 조회
  getPaginated: (page: number, pageSize: number) => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return {
      items: mockDatabase.slice(start, end),
      total: mockDatabase.length,
    };
  },

  // 검색
  search: (query: string) => {
    const lowerQuery = query.toLowerCase();
    return mockDatabase.filter(
      (item) =>
        item.header.toLowerCase().includes(lowerQuery) ||
        item.type.toLowerCase().includes(lowerQuery) ||
        item.status.toLowerCase().includes(lowerQuery) ||
        item.reviewer.toLowerCase().includes(lowerQuery)
    );
  },

  // 필터링
  filter: (filters: Partial<Item>) => {
    return mockDatabase.filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === undefined || value === null || value === '') return true;
        return item[key as keyof Item] === value;
      });
    });
  },

  // 생성
  create: (data: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newItem: Item = {
      ...data,
      id: nextId++,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockDatabase.push(newItem);
    return newItem;
  },

  // 수정
  update: (id: number, data: Partial<Item>) => {
    const index = mockDatabase.findIndex((item) => item.id === id);
    if (index === -1) return null;

    mockDatabase[index] = {
      ...mockDatabase[index],
      ...data,
      id, // ID는 변경 불가
      updatedAt: new Date().toISOString(),
    };
    return mockDatabase[index];
  },

  // 삭제
  delete: (id: number) => {
    const index = mockDatabase.findIndex((item) => item.id === id);
    if (index === -1) return false;

    mockDatabase.splice(index, 1);
    return true;
  },

  // 다중 삭제
  deleteMany: (ids: number[]) => {
    const deletedCount = ids.filter((id) => {
      const index = mockDatabase.findIndex((item) => item.id === id);
      if (index === -1) return false;
      mockDatabase.splice(index, 1);
      return true;
    }).length;
    return deletedCount;
  },

  // DB 초기화 (테스트용)
  reset: () => {
    mockDatabase = [...initialItems];
    nextId = mockDatabase.length + 1;
  },
};
