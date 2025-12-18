/**
 * テキスト（表示文言/aria/エラー/SEOなど）を1箇所で中央管理します。
 *
 * ルール:
 * - 画面やメール/レスポンスで人が読む文言は基本ここへ
 * - id / key / ルーティング等の「機械向け文字列」は対象外
 */

export const text = {
  site: {
    name: 'Silver Lace Weddings',
    descriptionShort:
      '大阪・関西発、ロケーション前撮りに特化したウェディングムービー。美しい映像に。2026年撮影受付中。',
    tagline: 'ロケーション前撮りを、\n美しい映像に。',
    subTagline: 'Location Wedding Film',
    areas: '大阪・兵庫・京都・奈良・滋賀を中心に、全国出張対応。',
    year: '2026年撮影受付中。',
    copyrightSuffix: 'All rights reserved.',
  },

  content: {
    services: {
      locationShooting: {
        title: 'ロケーション撮影',
        description: '2〜6時間のロケーション撮影。\nお二人らしい自然な表情を引き出します。',
      },
      openingMovie: {
        title: 'オープニングムービー',
        description:
          '結婚式で上映できる1分のショートムービー。\nシネマティックな映像美でお届けします。',
      },
    },
    plans: {
      standard: {
        name: 'Standard',
        price: '¥100,000',
        priceNote: '〜',
        features: ['ロケーション1ヶ所', '撮影時間 2時間', 'ショートムービー or 写真100枚'],
      },
      premium: {
        name: 'Premium',
        price: '¥158,000',
        priceNote: '〜',
        features: ['ロケーション1ヶ所', '撮影時間 3時間', 'ムービー × 1本', '写真100枚'],
      },
      comingSoon: {
        name: 'Coming Soon',
        price: '要相談',
        description:
          'マルチロケーションプランを準備中です。\n複数ヶ所での撮影をご希望の方はお問い合わせください。',
      },
    },
    options: {
      dressRental: 'ドレスレンタル',
      tuxedoRental: 'タキシードレンタル',
      hairMakeup: 'ヘアメイク（1パターン）',
      dressRentalPrice: '¥44,000',
      tuxedoRentalPrice: '¥33,000',
      hairMakeupPrice: '¥22,000',
    },
    staff: {
      akiRole: 'Videographer / Colorist',
      akiBio:
        '大阪出身。企業PRやイベント映像を経て、ロケーションウェディングにフォーカス。\n静かなトーンの色と光で、その日の空気ごと残すことを意識しています。',
      hiyoriRole: 'Photo / Support',
      hiyoriBio:
        'フィルムライクなフォトと、撮影当日のサポートを担当。\n自然な笑顔が出る空気づくりが得意です。',
    },
    works: {
      tags: {
        location: 'Location',
        couple: 'Couple',
        seaside: 'Seaside',
        sunflower: 'Sunflower',
        detail: 'Detail',
      },
      alts: {
        bridePortrait: '自然光の中で撮影した花嫁の横顔',
        couplePlayground: '自然体のふたりを切り取ったカップルフォト',
        coupleSea: '海辺の風景の中で佇む新郎新婦のシルエット',
        coupleSunflower: 'ひまわり畑で撮影した抱き合うふたりの後ろ姿',
        bouquet: 'ドライフラワーのブーケのクローズアップ',
      },
    },
    links: {
      instagramAkiLabel: '@aki.h_eastprojects',
      litlinkLabel: 'lit.link/Akimitsu',
      instagramFooter: 'https://www.instagram.com/silver_lace_weddings/',
    },
  },

  nav: {
    skipToMain: 'メインコンテンツへスキップ',
    ariaMainNav: 'メインナビゲーション',
    ariaMobileNav: 'モバイルナビゲーション',
    homeAriaSuffix: 'ホームへ戻る',
    mobileMenuOpen: 'メニューを開く',
    mobileMenuClose: 'メニューを閉じる',
    labels: {
      works: 'Works',
      services: 'Services',
      plans: 'Plans',
      options: 'Options',
      about: 'About',
      booking: 'Booking',
      contact: 'Contact',
    },
    aria: {
      works: '作品ギャラリーへ移動',
      services: 'サービス紹介へ移動',
      plans: '料金プランへ移動',
      about: 'スタッフ紹介へ移動',
      booking: '無料相談予約へ移動',
      contact: 'お問い合わせへ移動',
    },
  },

  sections: {
    hero: {
      cta: '予約相談する',
      ctaAria: '予約相談・お問い合わせセクションへ移動',
      seoHiddenHeading:
        'Silver Lace Weddings - 大阪・関西のロケーション前撮り・ウェディングムービー制作',
      videoTitle: 'Silver Lace Weddings - ロケーション前撮り映像',
    },
    works: {
      title: 'Works',
      subtitle: '作品ギャラリー',
      cta: '撮影の相談をする',
      ctaAria: 'お問い合わせへ移動',
    },
    services: {
      title: 'Services',
      subtitle: 'ロケーション前撮り映像制作',
      listAria: 'サービス一覧',
    },
    plans: {
      title: 'Plans',
      subtitle: '料金プラン',
      listAria: '料金プラン一覧',
      recommendedBadge: 'おすすめ',
    },
    options: {
      title: 'Options',
      subtitle: 'オプション',
      listAria: 'オプション一覧',
    },
    about: {
      title: 'About',
      subtitle: 'スタッフ紹介',
      listAria: 'スタッフ一覧',
      profileAltSuffix: 'のプロフィール画像',
      profileAltMissingSuffix: 'のプロフィール画像（未設定）',
    },
    booking: {
      title: 'Book a Consultation',
      subtitle: '無料オンライン相談のご予約',
      loadingCalendar: 'カレンダーを読み込み中...',
      description: 'ご希望の日時を選択して、オンライン相談をご予約ください。\n予約完了後、Google Meetの参加URLをメールでお送りします。',
      consultationCards: [
        {
          title: 'ロケーション前撮り',
          duration: '60分',
          description: '撮影場所・衣装・スケジュールのご相談',
        },
        {
          title: 'ムービー制作',
          duration: '45分',
          description: 'オープニングムービーの構成・演出相談',
        },
        {
          title: '総合プラン',
          duration: '90分',
          description: '前撮り＋ムービーのトータルプラン相談',
        },
      ],
      notes: [
        '※ 予約確定後、確認メールをお送りします。届かない場合は迷惑メールフォルダをご確認ください。',
        '※ キャンセル・日程変更は、メール内のリンクから24時間前まで可能です。',
      ],
    },
    contact: {
      title: 'Contact',
      subtitle: '撮影のご相談・お見積りはお気軽にどうぞ',
      formHeading: '予約相談・お問い合わせフォーム',
      otherHeading: 'その他のお問い合わせ方法',
      otherDescription: 'フォーム以外でのお問い合わせは、\n以下のリンクからお気軽にどうぞ。',
      linksAria: '連絡先リンク',
      info: {
        businessHoursLabel: '営業時間:',
        businessHoursValue: '10:00〜19:00',
        holidaysLabel: '定休日:',
        holidaysValue: '不定休',
        areaLabel: '対応エリア:',
        areaValue: '大阪・関西エリア',
        externalSuffix: '（外部サイト、新しいタブで開きます）',
      },
    },
  },

  footer: {
    decorativeMark: '✦',
    instagramFollowAria: 'Instagramをフォロー',
  },

  ui: {
    loadingAria: '読み込み中',
    loadingSrOnly: '読み込み中...',
  },

  form: {
    inquiryTypes: [
      { value: '', label: '選択してください' },
      { value: 'location', label: 'ロケーション前撮り' },
      { value: 'opening', label: 'オープニングムービー' },
      { value: 'both', label: '前撮り＋ムービー' },
      { value: 'other', label: 'その他' },
    ],
    success: {
      title: '送信完了',
      message: '予約のご相談ありがとうございます。\n内容を確認の上、2〜3営業日以内にご連絡いたします。',
      newInquiry: '新しいお問い合わせ',
    },
    fields: {
      name: {
        label: 'お名前',
        placeholder: '山田 太郎',
        requiredMark: '*',
      },
      email: {
        label: 'メールアドレス',
        placeholder: 'example@email.com',
        requiredMark: '*',
      },
      phone: {
        label: '電話番号',
        placeholder: '090-1234-5678',
      },
      inquiryType: {
        label: 'お問い合わせ種別',
        ariaLabel: 'お問い合わせ種別',
      },
      preferredDate: {
        label: '撮影希望日',
      },
      message: {
        label: 'お問い合わせ内容',
        placeholder: 'ご希望のロケーション、撮影イメージなどをお聞かせください',
        requiredMark: '*',
      },
    },
    buttons: {
      submit: '送信する',
      submitting: '送信中...',
    },
    errors: {
      submitFailed: '送信に失敗しました。時間をおいて再度お試しください。',
      networkFailed: '通信に失敗しました。ネットワーク状況をご確認ください。',
      generic: '送信中にエラーが発生しました。時間をおいて再度お試しください。',
    },
    validationErrors: {
      nameRequired: 'お名前を入力してください',
      nameTooLong: 'お名前は100文字以内で入力してください',
      emailRequired: 'メールアドレスを入力してください',
      emailInvalid: '正しいメールアドレスを入力してください',
      phoneInvalid: '正しい電話番号を入力してください',
      preferredDateInvalid: '撮影希望日を正しく入力してください',
      preferredDateNotFuture: '撮影希望日は本日以降の日付を選択してください',
      messageRequired: 'お問い合わせ内容を入力してください',
      messageTooLong: 'お問い合わせ内容は2000文字以内で入力してください',
    },
    honeypot: {
      label: "Don't fill this out if you're human:",
    },
  },

  errors: {
    validation: '入力内容に問題があります。',
    unauthorized: '認証が必要です。',
    forbidden: 'この操作は許可されていません。',
    dbInsert: 'データの保存に失敗しました。時間をおいて再度お試しください。',
    dbSelect: 'データの取得に失敗しました。時間をおいて再度お試しください。',
    dbUpdate: 'データの更新に失敗しました。時間をおいて再度お試しください。',
    dbDelete: 'データの削除に失敗しました。時間をおいて再度お試しください。',
    network: '通信に失敗しました。ネットワーク状況をご確認ください。',
    unknown: 'エラーが発生しました。時間をおいて再度お試しください。',
    serverEnvOnly: 'getServerEnv はサーバーサイドでのみ使用可能です',
  },

  api: {
    reservations: {
      invalidJson: 'JSON形式で送信してください',
      invalidBody: '入力内容が不正です',
      invalidInput: '入力内容をご確認ください',
      unauthorized: 'Unauthorized',
    },
  },

  admin: {
    reservations: {
      title: '予約リクエスト一覧',
      backToSite: 'サイトへ戻る',
      totalLabel: '合計:',
      totalUnit: '件',
      empty: 'まだ予約リクエストはありません。',
      columns: {
        receivedAt: '受信日時',
        name: 'お名前',
        email: 'メール',
        phone: '電話',
        inquiryType: '種別',
        preferredDate: '希望日',
        message: 'メッセージ',
      },
    },
  },

  seo: {
    baseUrl: 'https://silverlacewedding.netlify.app',
    category: 'wedding',
    titleDefaultSuffix: '大阪・関西のロケーション前撮り・ウェディングムービー制作',
    socialImageAlt:
      'Silver Lace Weddings - 大阪・関西のロケーション前撮り・ウェディングムービー制作',
    descriptionLong:
      '大阪・関西発のロケーション前撮り専門。シネマティックなウェディングムービーと写真撮影で、おふたりの大切な瞬間を美しく残します。オープニングムービー制作、全国出張対応。2026年撮影受付中。',
    descriptionOg:
      '大阪・関西発のロケーション前撮り専門。シネマティックなウェディングムービーと写真撮影で、おふたりの大切な瞬間を美しく残します。',
    descriptionTwitter:
      '大阪・関西発のロケーション前撮り専門。シネマティックなウェディングムービーと写真撮影。',
    keywords: [
      'ロケーション前撮り',
      'ウェディングムービー',
      '前撮り 大阪',
      '前撮り 関西',
      '結婚式 ムービー',
      'オープニングムービー',
      'ウェディング 撮影',
      '前撮り 動画',
      '結婚式 動画制作',
      'ブライダル ムービー',
      '前撮り カメラマン 大阪',
      'ウェディングフォト 動画',
      'プロフィールムービー',
      '結婚式 映像',
      '前撮り 京都',
      '前撮り 神戸',
      '前撮り 奈良',
      'ロケーションフォト',
      'シネマティック ウェディング',
    ],
    jsonLd: {
      addressLocality: '大阪市',
      addressRegion: '大阪府',
      addressCountry: 'JP',
      geo: { latitude: 34.6937, longitude: 135.5023 },
      areaServedStates: ['大阪府', '兵庫県', '京都府', '奈良県', '滋賀県'],
      priceRange: '¥100,000〜',
      openingHours: {
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '09:00',
        closes: '21:00',
      },
      sameAs: [
        'https://www.instagram.com/silver_lace_weddings/',
        'https://www.instagram.com/aki.h_eastprojects',
        'https://lit.link/Akimitsu',
      ],
      service: {
        name: 'ロケーション前撮り映像制作',
        description:
          '大阪・関西を中心としたロケーション前撮り撮影とウェディングムービー制作サービス。結婚式のオープニングムービーやプロフィールムービーを制作します。',
        serviceType: 'ウェディング映像制作',
        areaServedCountry: '日本',
        offerCatalogName: '料金プラン',
        offers: [
          {
            name: 'Standard プラン',
            description: 'ロケーション1ヶ所、撮影時間2時間、ショートムービーまたは写真100枚',
            price: '100000',
            priceCurrency: 'JPY',
          },
          {
            name: 'Premium プラン',
            description: 'ロケーション1ヶ所、撮影時間3時間、ムービー1本、写真100枚',
            price: '158000',
            priceCurrency: 'JPY',
          },
        ],
      },
      breadcrumbHome: 'ホーム',
      faq: [
        {
          q: 'ロケーション前撮りの撮影エリアはどこですか？',
          a: '大阪・兵庫・京都・奈良・滋賀を中心に、全国出張対応しております。',
        },
        {
          q: '料金プランについて教えてください',
          a: 'Standardプラン（¥100,000〜）とPremiumプラン（¥158,000〜）をご用意しております。Standardはロケーション1ヶ所・撮影2時間、Premiumはロケーション1ヶ所・撮影3時間でムービーと写真100枚がセットになっています。',
        },
        {
          q: 'オープニングムービーとは何ですか？',
          a: '結婚式で上映できる1分のショートムービーです。前撮りの映像をシネマティックに編集し、お二人の大切な日を美しく演出します。',
        },
        {
          q: '予約はどのように行えますか？',
          a: 'Webサイトの予約フォームから無料相談を予約いただけます。日程調整の上、オンラインまたは対面でご相談いただけます。',
        },
      ],
    },
  },
} as const;
