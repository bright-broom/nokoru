/**
 * テキスト（表示文言/aria/エラー/SEOなど）を1箇所で中央管理します。
 *
 * ルール:
 * - 画面やメール/レスポンスで人が読む文言は基本ここへ
 * - id / key / ルーティング等の「機械向け文字列」は対象外
 */

export const text = {
  site: {
    name: 'NOKORU',
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
        detailedDescription:
          'お二人の思い出の場所や、憧れのロケーションで撮影を行います。海辺、森、街並み、神社仏閣など、シーンに合わせた最適な時間帯と光を選び、自然体の表情を引き出します。',
        features: [
          '撮影時間 2〜6時間（プランにより異なります）',
          'ロケーション選定のご相談',
          '撮影許可申請のサポート',
          '当日の進行・ディレクション',
          'データ納品（編集済み）',
        ],
      },
      openingMovie: {
        title: 'オープニングムービー',
        description:
          '結婚式で上映できる1分のショートムービー。\nシネマティックな映像美でお届けします。',
        detailedDescription:
          '前撮りの映像素材を使用して、結婚式のオープニングで上映できるショートムービーを制作します。シネマティックなカラーグレーディングと音楽で、ゲストの心に残る映像に仕上げます。',
        features: [
          '尺：約1分のショートムービー',
          'シネマティックなカラーグレーディング',
          'BGM選定・編集',
          'テロップ・タイトルデザイン',
          '結婚式場での上映形式に対応',
        ],
      },
    },
    plans: {
      light: {
        name: 'Light',
        price: '128,000',
        priceNote: '税込',
        features: [
          'ロケーション1箇所',
          '撮影時間 2時間',
          'ショートムービー または 写真100枚',
        ],
        bestFor: '衣装をお持ちの方・シンプルに残したい方',
        includes: ['撮影', 'データ納品'],
        notIncludes: ['衣装', 'ヘアメイク'],
      },
      signature: {
        name: 'Signature',
        price: '198,000',
        priceNote: '税込',
        features: [
          'ロケーション1箇所',
          '撮影時間 3時間',
          'ムービー ＋ 写真100枚',
          'ヘアメイク込み',
        ],
        bestFor: '迷ったらこれ。映像も写真も両方残せる',
        includes: ['撮影', 'データ納品', 'ヘアメイク'],
        notIncludes: ['衣装'],
      },
      complete: {
        name: 'Complete',
        price: '298,000',
        priceNote: '税込',
        features: [
          'ロケーション2箇所',
          '撮影時間 5時間',
          'ムービー ＋ 写真 ＋ ドローン',
          '衣装ペアレンタル込み',
          'ヘアメイク込み',
        ],
        bestFor: '準備から当日まで全てお任せしたい方',
        includes: ['撮影', 'データ納品', 'ヘアメイク', '衣装（2着）'],
        notIncludes: [],
      },
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
        coupleCliff: '夕景の崖に立つ新郎新婦',
        coupleSeaSmile: '夕景の岩場で微笑み合う新郎新婦',
        bouquetNew: '夕景の海辺で持つブーケ',
        coupleSeaRocks: '夕景の海辺の岩場に立つ新郎新婦',
        bridePortrait: '自然光の中で撮影した花嫁の横顔',
        couplePlayground: '自然体のふたりを切り取ったカップルフォト',
        coupleSea: '海辺の風景の中で佇む新郎新婦のシルエット',
        coupleSunflower: 'ひまわり畑で撮影した抱き合うふたりの後ろ姿',
        bouquet: 'ドライフラワーのブーケのクローズアップ',
      },
      descriptions: {
        coupleCliff:
          '壮大な夕景を背景に、崖の上に立つお二人をドラマチックに捉えました。',
        coupleSeaSmile:
          '夕暮れの海辺の岩場で、自然な笑顔を見せるお二人のクローズアップです。',
        bouquetNew:
          '美しいマジックアワーの光の中で撮影した、こだわりのブーケのカットです。',
        coupleSeaRocks:
          '波打つ岩場で佇むお二人。美しいサンセットの光と影が印象的な一枚です。',
        coupleSea:
          '夕暮れ時の海辺で撮影。オレンジとブルーが混ざり合う空の下、波の音をBGMにお二人のシルエットを切り取りました。',
        bridePortrait:
          'ロケーション撮影の合間、自然光が差し込む瞬間を捉えた一枚。飾らない表情が印象的なポートレートです。',
        couplePlayground:
          '公園でのカジュアルな撮影。遊具で遊ぶ姿や、ベンチでくつろぐ自然な表情を撮影しました。',
        coupleSunflower:
          '夏のひまわり畑での撮影。黄色い花に囲まれて、明るく幸せな雰囲気を映像に残しました。',
        bouquet:
          'ドライフラワーで作られたオリジナルブーケ。アンティークな色合いが、全体の雰囲気を引き立てています。',
      },
    },
    links: {
      instagramAkiLabel: '@aki.h_eastprojects',
      litlinkLabel: 'lit.link/Akimitsu',
      instagramFooter: 'https://www.instagram.com/nokoru/',
    },
  },

  nav: {
    skipToMain: 'メインコンテンツへスキップ',
    ariaMainNav: 'メインナビゲーション',
    ariaMobileNav: 'モバイルナビゲーション',
    homeAriaSuffix: 'ホームへ戻る',
    mobileMenuOpen: 'メニューを開く',
    mobileMenuClose: 'メニューを閉じる',
    ctaButton: '無料相談',
    labels: {
      works: 'Works',
      services: 'Services',
      plans: 'Plans',
      about: 'About',
      booking: 'Booking',
      contact: 'Contact',
      videos: 'Videos',
      blog: 'Blog',
      faq: 'FAQ',
    },
    aria: {
      works: '作品ギャラリーへ移動',
      services: 'サービス紹介へ移動',
      plans: '料金プランへ移動',
      about: 'スタッフ紹介へ移動',
      booking: '無料相談予約へ移動',
      contact: 'お問い合わせへ移動',
      videos: '動画ギャラリーへ移動',
      blog: 'ブログへ移動',
      faq: 'よくある質問へ移動',
    },
  },

  sections: {
    hero: {
      cta: '予約相談する',
      ctaAria: '予約相談・お問い合わせセクションへ移動',
      seoHiddenHeading: 'NOKORU - 大阪・関西のロケーション前撮り・ウェディングムービー制作',
      videoTitle: 'NOKORU - ロケーション前撮り映像',
      trustIndicators: [
        { value: '200', suffix: '組+', label: '撮影実績' },
        { value: '98', suffix: '%', label: '満足度' },
        { value: '5', suffix: '年', label: '実績' },
      ],
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
      cta: 'サービスについて相談する',
      ctaAria: 'お問い合わせページへ移動',
    },
    plans: {
      title: 'Plans',
      subtitle: '料金プラン',
      listAria: '料金プラン一覧',
      recommendedBadge: '一番人気',
      cta: 'プランについて相談する',
      ctaAria: 'お問い合わせページへ移動',
      allInclusiveNote: '全プラン、撮影許可申請・データ納品・カラーグレーディング込み',
      optionsTitle: '追加オプション',
      options: [
        { name: 'ドローン撮影', price: '30,000', description: '空撮映像で特別な演出' },
        { name: '追加ロケーション', price: '20,000', description: '2箇所目以降の撮影' },
        { name: '撮影時間延長', price: '15,000/h', description: '1時間単位で延長' },
        { name: '特急仕上げ', price: '20,000', description: '2週間以内の納品' },
        { name: 'アルバム制作', price: '50,000', description: '高品質フォトアルバム' },
      ],
      earlyBirdTitle: '早期予約特典',
      earlyBirdNote: '3ヶ月前のご予約で全プラン10%OFF',
    },
    about: {
      title: 'About',
      subtitle: 'スタッフ紹介',
      listAria: 'スタッフ一覧',
      profileAltSuffix: 'のプロフィール画像',
      profileAltMissingSuffix: 'のプロフィール画像（未設定）',
      cta: 'お気軽にご相談ください',
      ctaAria: 'お問い合わせページへ移動',
    },
    booking: {
      title: 'Book a Consultation',
      subtitle: '無料オンライン相談のご予約',
      freeBadge: '無料',
      loadingCalendar: 'カレンダーを読み込み中...',
      description: 'ご希望の日時を選択して、オンライン相談をご予約ください。',
      subDescription: '予約完了後、Google Meetの参加URLをメールでお送りします。',
      consultationCards: [
        {
          title: 'ロケーション前撮り',
          duration: '60分',
          description: '撮影場所・衣装・スケジュールのご相談',
          icon: 'camera',
        },
        {
          title: 'ムービー制作',
          duration: '45分',
          description: 'オープニングムービーの構成・演出相談',
          icon: 'film',
        },
        {
          title: '総合プラン',
          duration: '90分',
          description: '前撮り＋ムービーのトータルプラン相談',
          icon: 'package',
        },
      ],
      processSteps: [
        { step: '1', title: '相談内容を選択', description: '上記から選択' },
        { step: '2', title: '日時を選択', description: 'カレンダーから' },
        { step: '3', title: '予約確定', description: 'メールで通知' },
      ],
      calendarHeading: 'ご希望の日時を選択',
      notes: [
        '予約確定後、確認メールをお送りします',
        'キャンセル・変更は24時間前まで可能',
      ],
    },
    testimonials: {
      title: 'Voice',
      subtitle: 'お客様の声',
      listAria: 'お客様の声一覧',
      cta: 'あなたも撮影を相談する',
      ctaAria: 'お問い合わせページへ移動',
    },
    flow: {
      title: 'Flow',
      subtitle: '撮影までの流れ',
      steps: [
        {
          step: '01',
          title: '無料相談',
          description: 'オンラインまたは対面でご希望をヒアリング。プランやロケーションをご提案します。',
          duration: '約60分',
        },
        {
          step: '02',
          title: 'お打ち合わせ',
          description: '撮影日時・ロケーション・衣装などの詳細を決定。イメージを共有します。',
          duration: '約30分',
        },
        {
          step: '03',
          title: '撮影当日',
          description: '現地集合でリラックスした雰囲気で撮影。自然な表情を引き出します。',
          duration: '2〜6時間',
        },
        {
          step: '04',
          title: '編集・納品',
          description: 'シネマティックな色彩で仕上げ。約3〜4週間でデータ納品いたします。',
          duration: '3〜4週間',
        },
      ],
      note: '初回相談は完全無料。お気軽にご相談ください。',
    },
    contact: {
      title: 'Contact',
      subtitle: '撮影のご相談・お見積りはお気軽にどうぞ',
      responseTime: '通常3営業日以内に返信',
      formHeading: 'お問い合わせフォーム',
      formDescription: '撮影のご相談・お見積りなど、お気軽にお問い合わせください。',
      otherHeading: 'SNS・その他',
      otherDescription: 'DMでのお問い合わせも歓迎です。',
      linksAria: '連絡先リンク',
      info: {
        businessHoursLabel: '営業時間',
        businessHoursValue: '10:00〜19:00',
        holidaysLabel: '定休日',
        holidaysValue: '不定休',
        areaLabel: '対応エリア',
        areaValue: '関西エリア（全国出張可）',
        externalSuffix: '（外部サイト、新しいタブで開きます）',
      },
    },
  },

  pages: {
    faq: {
      backToTop: 'トップへ戻る',
      metaTitle: 'よくある質問',
      metaDescription: 'ロケーション前撮り・ウェディングムービー制作に関するよくある質問と回答。撮影エリア、料金、予約方法などをご確認いただけます。',
      title: 'FAQ',
      subtitle: 'よくある質問',
      categories: {
        shooting: '撮影について',
        pricing: '料金・プランについて',
        movie: 'ムービー制作について',
        booking: 'ご予約・お支払いについて',
      },
      items: [
        {
          category: 'shooting',
          question: 'ロケーション前撮りの撮影エリアはどこですか？',
          answer: '大阪・兵庫・京都・奈良・滋賀を中心に、全国出張対応しております。海外ロケーションも応相談です。',
        },
        {
          category: 'shooting',
          question: '雨天の場合はどうなりますか？',
          answer: '撮影日前日までに天候を確認し、雨天予報の場合は日程変更または室内ロケーションへの変更をご提案いたします。日程変更の追加料金はかかりません。',
        },
        {
          category: 'shooting',
          question: '衣装・ヘアメイクはお願いできますか？',
          answer: '提携の衣装店・ヘアメイクアーティストをご紹介可能です。お持ち込みの衣装での撮影も歓迎です。',
        },
        {
          category: 'shooting',
          question: '撮影時間はどのくらいですか？',
          answer: 'プランにより2〜6時間となります。Lightプランは2時間、Signatureプランは4時間、Completeプランは6時間です。',
        },
        {
          category: 'pricing',
          question: '料金プランの違いを教えてください',
          answer: 'Light（¥100,000）は撮影のみ、Signature（¥158,000）は撮影＋1分ムービー、Complete（¥248,000）は撮影＋フルムービー＋写真100枚のセットです。',
        },
        {
          category: 'pricing',
          question: '追加オプションはありますか？',
          answer: '追加ロケーション（+¥20,000）、撮影時間延長（+¥15,000/h）、ドローン撮影（+¥30,000）などをご用意しております。',
        },
        {
          category: 'movie',
          question: 'オープニングムービーとは何ですか？',
          answer: '結婚式で上映できる約1分のショートムービーです。前撮りの映像をシネマティックに編集し、BGMとタイトルを加えてお二人だけの特別な映像に仕上げます。',
        },
        {
          category: 'movie',
          question: '納品形式を教えてください',
          answer: '動画はMP4形式（フルHD/4K）、写真はJPEG形式で納品いたします。結婚式場での上映に対応した形式にも変換可能です。',
        },
        {
          category: 'movie',
          question: '納品までの期間はどのくらいですか？',
          answer: '撮影後、約3〜4週間で納品いたします。お急ぎの場合は特急仕上げ（+¥20,000）で2週間納品も可能です。',
        },
        {
          category: 'booking',
          question: '予約はどのように行えますか？',
          answer: 'Webサイトの無料相談予約から、またはお問い合わせフォームからご連絡ください。オンライン（Zoom）または対面でご相談いただけます。',
        },
        {
          category: 'booking',
          question: 'キャンセル料はかかりますか？',
          answer: '撮影日の30日前までは無料、14日前まで50%、7日前以降は100%のキャンセル料がかかります。日程変更は撮影日の14日前まで無料です。',
        },
        {
          category: 'booking',
          question: 'お支払い方法を教えてください',
          answer: '銀行振込またはクレジットカード決済が可能です。撮影の2週間前までに着手金50%、納品後に残金をお支払いいただきます。',
        },
      ],
      cta: 'お気軽にご相談ください',
      ctaDescription: 'その他ご不明な点がございましたら、お問い合わせフォームまたは無料相談をご利用ください。',
    },
    testimonials: {
      backToTop: 'トップへ戻る',
      metaTitle: 'お客様の声',
      metaDescription: 'NOKORUでロケーション前撮り・ウェディングムービー制作をご利用いただいたお客様の声をご紹介します。',
      title: 'Testimonials',
      subtitle: 'お客様の声',
    },
    videos: {
      backToTop: 'トップへ戻る',
      metaTitle: 'ビデオギャラリー',
      metaDescription: 'NOKORUが制作したウェディングムービー・前撮り動画のギャラリー。シネマティックな映像をご覧ください。',
      title: 'Video Gallery',
      subtitle: 'ムービー作品集',
      playButton: '再生する',
      categories: {
        all: 'すべて',
        openingMovie: 'オープニングムービー',
        locationShooting: 'ロケーション撮影',
        digest: 'ダイジェスト',
      },
    },
    blog: {
      backToTop: 'トップへ戻る',
      backToBlog: '記事一覧へ',
      metaTitle: 'ブログ・お知らせ',
      metaDescription: 'ロケーション前撮り・ウェディングムービー制作のお知らせ、撮影レポート、制作の裏側をお届けします。',
      title: 'Blog',
      subtitle: 'お知らせ・撮影レポート',
      readMore: '続きを読む',
      notFound: '記事が見つかりませんでした',
      categories: {
        news: 'お知らせ',
        report: '撮影レポート',
        tips: '撮影のコツ',
      },
      publishedAt: '公開日',
      updatedAt: '更新日',
      relatedPosts: '関連記事',
    },
    staff: {
      backToTop: 'トップへ戻る',
      backToAbout: 'スタッフ一覧へ',
      notFound: 'スタッフが見つかりませんでした',
      metaTitleSuffix: 'スタッフ紹介',
    },
    plans: {
      backToTop: 'トップへ戻る',
      backToPlans: 'プラン一覧へ',
      notFound: 'プランが見つかりませんでした',
      metaTitleSuffix: '料金プラン',
      featuresHeading: 'プラン内容',
      ctaButton: 'このプランで相談する',
    },
    services: {
      backToTop: 'トップへ戻る',
      backToServices: 'サービス一覧へ',
      notFound: 'サービスが見つかりませんでした',
      metaTitleSuffix: 'サービス紹介',
      featuresHeading: 'サービス内容',
      ctaButton: 'このサービスについて相談する',
    },
    works: {
      backToTop: 'トップへ戻る',
      backToWorks: '作品一覧へ',
      notFound: '作品が見つかりませんでした',
      metaTitleSuffix: '作品ギャラリー',
      locationLabel: 'Location',
      ctaButton: '撮影について相談する',
      navigation: {
        prevLabel: '前の作品',
        nextLabel: '次の作品',
        counterSeparator: '/',
        keyboardHint: '← → キーでも操作できます',
      },
    },
    contact: {
      backToTop: 'トップへ戻る',
      metaTitle: 'お問い合わせ',
      metaDescription: '撮影のご相談・お見積りはお気軽にどうぞ。通常3営業日以内にご返信いたします。',
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
      timeout: '送信がタイムアウトしました。時間をおいて再度お試しください。',
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
    baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    category: 'wedding',
    titleDefaultSuffix: '大阪・関西のロケーション前撮り・ウェディングムービー制作',
    socialImageAlt: 'NOKORU - 大阪・関西のロケーション前撮り・ウェディングムービー制作',
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
        'https://www.instagram.com/nokoru/',
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
