import { Category } from './types';

export const mockCategories: Category[] = [
  {
    id: 1,
    name: '設計契約・実施引継',
    tasks: [
      {
        id: 101,
        name: 'アーキテクトへの引き継ぎMTG実施日の決定',
        status: 'completed',
        checkedBy: [
          { name: '山田太郎', timestamp: '2023年11月1日 09:00' },
          { name: '佐藤次郎', timestamp: '2023年11月1日 10:30' }
        ],
        lastUpdated: '2023年11月1日 10:30',
        memo: {
          text: '11/15 14:00にMTGを設定。図面一式の準備が必要。',
          author: '山田太郎',
          timestamp: '2023年11月1日 09:00'
        },
        attachments: []
      },
      {
        id: 102,
        name: '引き継ぎMTGの準備（図面・書類等）',
        status: 'in-progress',
        checkedBy: [
          { name: '山田太郎', timestamp: '2023年11月2日 11:00' }
        ],
        lastUpdated: '2023年11月2日 11:00',
        memo: {
          text: '構造図の最新版が未着。至急確認必要。',
          author: '山田太郎',
          timestamp: '2023年11月2日 11:00'
        },
        attachments: []
      }
    ]
  },
  {
    id: 2,
    name: '基本情報確認',
    tasks: [
      {
        id: 201,
        name: '引渡希望日の確認と理由の明確化',
        status: 'completed',
        checkedBy: [
          { name: '鈴木花子', timestamp: '2023年11月1日 13:00' }
        ],
        lastUpdated: '2023年11月1日 13:00',
        memo: {
          text: '2024年9月末までに引渡し希望。子供の転校のタイミングに合わせたい要望あり。',
          author: '鈴木花子',
          timestamp: '2023年11月1日 13:00'
        },
        attachments: []
      },
      {
        id: 202,
        name: '施主の現在の住まいの明確化',
        status: 'completed',
        checkedBy: [
          { name: '鈴木花子', timestamp: '2023年11月1日 13:15' }
        ],
        lastUpdated: '2023年11月1日 13:15',
        memo: null,
        attachments: []
      }
    ]
  },
  {
    id: 3,
    name: '実施設計準備',
    tasks: [
      {
        id: 301,
        name: 'ボリュームの決定',
        status: 'in-progress',
        checkedBy: [],
        lastUpdated: '2023年11月3日 15:00',
        memo: {
          text: '建ぺい率の再確認中。角地緩和の適用可能性について検討必要。',
          author: '田中一郎',
          timestamp: '2023年11月3日 15:00'
        },
        attachments: []
      },
      {
        id: 302,
        name: '家チェキの依頼',
        status: 'not-started',
        checkedBy: [],
        lastUpdated: '2023年11月3日 15:00',
        memo: null,
        attachments: []
      }
    ]
  },
  {
    id: 4,
    name: '実施1回目打合せ',
    tasks: [
      {
        id: 401,
        name: 'プランの調整・再確認',
        status: 'not-started',
        checkedBy: [],
        lastUpdated: '2023年11月3日 15:00',
        memo: {
          text: 'キッチンの向きについて要検討。LDKの採光を重視したプラン変更の可能性あり。',
          author: '佐藤次郎',
          timestamp: '2023年11月3日 15:00'
        },
        attachments: []
      },
      {
        id: 402,
        name: 'サンプル提示',
        status: 'not-started',
        checkedBy: [],
        lastUpdated: '2023年11月3日 15:00',
        memo: null,
        attachments: []
      }
    ]
  },
  {
    id: 5,
    name: '実施2回目打合せ準備',
    tasks: [
      {
        id: 501,
        name: '照明計画ヒアリング準備',
        status: 'not-started',
        checkedBy: [],
        lastUpdated: '2023年11月3日 15:00',
        memo: {
          text: 'リビング・ダイニングのペンダントライトのカタログを準備。調光システムの資料も必要。',
          author: '山田太郎',
          timestamp: '2023年11月3日 15:00'
        },
        attachments: []
      },
      {
        id: 502,
        name: '設備計画ヒアリング準備',
        status: 'not-started',
        checkedBy: [],
        lastUpdated: '2023年11月3日 15:00',
        memo: null,
        attachments: []
      }
    ]
  }
];

