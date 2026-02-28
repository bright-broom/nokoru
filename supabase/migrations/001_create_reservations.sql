-- 予約ステータスのENUM型（存在しない場合のみ作成）
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'reservation_status') THEN
    CREATE TYPE reservation_status AS ENUM ('pending', 'contacted', 'confirmed', 'cancelled');
  END IF;
END
$$;

-- 予約テーブル（存在しない場合のみ作成）
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  inquiry_type TEXT,
  preferred_date DATE,
  message TEXT NOT NULL,
  status reservation_status DEFAULT 'pending' NOT NULL
);

-- インデックス（存在しない場合のみ作成）
CREATE INDEX IF NOT EXISTS idx_reservations_created_at ON reservations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);
CREATE INDEX IF NOT EXISTS idx_reservations_email ON reservations(email);

-- RLS (Row Level Security) を有効化
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- ポリシー: サービスロールのみ全操作可能（存在しない場合のみ作成）
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'reservations' AND policyname = 'Service role has full access'
  ) THEN
    CREATE POLICY "Service role has full access"
      ON reservations
      FOR ALL
      USING (auth.role() = 'service_role')
      WITH CHECK (auth.role() = 'service_role');
  END IF;
END
$$;

-- ポリシー: 匿名ユーザーは挿入のみ可能（存在しない場合のみ作成）
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'reservations' AND policyname = 'Anonymous users can insert'
  ) THEN
    CREATE POLICY "Anonymous users can insert"
      ON reservations
      FOR INSERT
      TO anon
      WITH CHECK (true);
  END IF;
END
$$;

-- コメント
COMMENT ON TABLE reservations IS '予約・お問い合わせ';
COMMENT ON COLUMN reservations.inquiry_type IS 'location, opening, both, other';
COMMENT ON COLUMN reservations.status IS 'pending: 未対応, contacted: 連絡済, confirmed: 確定, cancelled: キャンセル';
