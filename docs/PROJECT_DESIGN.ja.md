# Project Design Document: Chiranoura Blog Renewal

## 1. プロジェクト概要

既存のGatsby製ブログ (`chirashi-js`) を Next.js (App Router) に移行し、技術的・機能的に刷新する。
コンテンツ（Markdownファイル）は別リポジトリ (`chiranoura-blog`) で管理されており、これをGit Submoduleまたはビルド時のFetchで取得して利用する。

**最終ゴール:**

* **Tech:** Next.js (SSG) + Tailwind CSS + AWS (S3/CloudFront)
* **UX:** 日英対応 (i18n), 高速なページ遷移, スマホ完全対応
* **Features:**
  * MDXによるインタラクティブな記事（Reactコンポーネント動作）
  * アルゴリズム可視化・低レイヤ解説用のリッチな表示
  * 学習用機能（Ankiエクスポート、GitHub連携）
  * シリーズ機能、タグ/カテゴリ管理

---

## 2. 技術スタック要件

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Content:** MDX (`next-mdx-remote/rsc` or `@next/mdx`), `gray-matter` for Frontmatter
* **Math:** `rehype-katex`, `remark-math`
* **Highlight:** `rehype-pretty-code` (Shiki based)
* **Diagram:** `rehype-mermaid` (optional)
* **Infra:** AWS S3, CloudFront, Route53, GitHub Actions

---

## 3. 移行戦略: 段階的アプローチ

**⚠️ 重要:** これは一気に書き換えるものではありません。GatsbyとNext.jsを並行稼働させながら移行します。

### なぜ段階的移行なのか？

* **リスクゼロ:** 既存のGatsbyサイトはそのまま稼働し続ける
* **段階的な価値提供:** 100%完了を待たずに新機能をすぐに公開できる
* **ユーザー継続性:** 既存の読者に影響を与えない
* **簡単なロールバック:** 個別の機能を問題があれば即座に戻せる
* **パフォーマンステスト:** 完全移行前にNext.jsのパフォーマンスをA/Bテストできる

### アーキテクチャ: パスベースルーティング

CloudFrontを使って異なるURLパスを異なるS3オリジンにルーティング:

```
CloudFront Distribution (blog.chiranoura.com)
├── /posts/*        → Next.js (S3 bucket: next-app)
├── /series/*       → Next.js (S3 bucket: next-app)
├── /tags/*         → Next.js (S3 bucket: next-app)
├── /en/*           → Next.js (S3 bucket: next-app) [新しいi18nルート]
├── /ja/*           → Next.js (S3 bucket: next-app) [新しいi18nルート]
└── /*              → Gatsby (S3 bucket: gatsby-app) [既存、フォールバック]
```

**移行フロー:**
1. Next.jsを別のS3バケットにデプロイ
2. CloudFrontを複数オリジンで構成
3. 新機能をNext.jsにルーティングするパスパターンを追加
4. Next.jsのカバレッジを段階的に拡大
5. 準備ができたらGatsbyを非推奨化

---

## 4. 実装ロードマップ (Step-by-Step)

AIアシスタントには、以下のフェーズごとに指示を出し、完了を確認してから次へ進むこと。

### Phase 0: 段階的セットアップ (サイドバイサイドデプロイ)

**目的:** 既存サイトを壊さずにNext.jsをGatsbyと並行稼働させる。

1. **Next.jsプロジェクト作成:**
   * 新しいディレクトリ: `nextjs-app/` (Gatsbyとは別)
   * `create-next-app` + TypeScript + Tailwindで初期化

2. **AWSインフラ:**
   * Next.js用の新しいS3バケット作成 (`blog-next`)
   * 既存のGatsby S3バケットを維持 (`blog-gatsby`)
   * CloudFrontを2つのオリジンで構成:
     - オリジン1: Gatsby S3バケット (デフォルト/フォールバック)
     - オリジン2: Next.js S3バケット (新しいパス用)

3. **CloudFrontパスパターン:**
   * Next.jsパス用のキャッシュビヘイビアを作成 (順序重要 - 具体的なパスが先):
     - `/posts/*` → Next.jsオリジン
     - `/series/*` → Next.jsオリジン
     - `/tags/*` → Next.jsオリジン
     - `/en/*` → Next.jsオリジン
     - `/ja/*` → Next.jsオリジン
     - `/*` → Gatsbyオリジン (デフォルト)

4. **デュアルGitHub Actions:**
   * 既存のGatsbyワークフローを維持
   * 別のバケットにデプロイする新しいNext.jsワークフローを追加
   * 両方が独立してデプロイ可能

5. **検証:**
   * Gatsbyサイトがルートパスでアクセス可能
   * Next.jsが新しいパスを提供する準備ができている

### Phase 1: MVP移行 (Next.jsの最初のルート)

**目的:** 新しいルートのみ(例: `/posts/*`)でNext.jsブログを動作させる。

1. `create-next-app` でプロジェクト新規作成 (`nextjs-app/` ディレクトリ内)。
2. `chiranoura-blog` (コンテンツRepo) をローカルに配置し、Next.jsからファイルシステムとして読み込むロジック (`fs`, `path`) を実装。
3. Markdown/MDXをHTMLに変換して表示する基本ページ (`app/posts/[slug]/page.tsx`) の作成。
4. Gatsbyコンポーネント（画像やリンク）のNext.js版を実装。
5. `npm run build` (SSG output) が通ることを確認。
6. **Next.js S3バケットのみにデプロイ** - Gatsbyは変更なし

### Phase 2: URL設計と構造化 (Routing & Data)

**目的:** 多言語対応とナビゲーション構造の確立。

1. **ディレクトリ構成の変更:**
   * `app/[lang]/posts/[slug]/page.tsx`
   * `app/[lang]/tags/[tag]/page.tsx`
   * `app/[lang]/series/[series]/page.tsx`

2. **Frontmatter解析の強化:**
   * `lang`, `series`, `seriesOrder` プロパティの型定義と読み込み処理の実装。

3. **ミドルウェア/リダイレクト:**
   * ルート (`/`) アクセス時にブラウザ言語またはデフォルト(`ja`)へリダイレクト。

### Phase 3: インフラ構築 (AWS & CI/CD)

**目的:** GitHubへのPushで自動デプロイされる環境を作る。

1. **AWS設定:**
   * S3バケット作成（静的ホスティング設定またはOAC）。
   * CloudFrontディストリビューション作成。

2. **GitHub Actions:**
   * Next.jsのビルド (`output: export`)。
   * S3へのSync (`aws s3 sync`)。
   * CloudFrontのキャッシュ削除 (`aws cloudfront create-invalidation`)。

3. **画像最適化:** `next-image-export-optimizer` の導入（S3配置のため）。

### Phase 4: 機能強化 (Feature Implementation)

**目的:** ブログとしての付加価値を実装する。

1. **Visual Components:**
   * シンタックスハイライト、数式表示 (KaTeX) の適用。
   * `History`, `Blame`, `Issue` リンクコンポーネントの実装。

2. **Interactive:**
   * Anki CSVエクスポート機能の実装。
   * アルゴリズム可視化用のPlaygroundコンポーネント基盤作成。

---

## 5. データ構造定義

### Frontmatter Schema

記事Markdown (`.md` / `.mdx`) のヘッダー定義。

```typescript
type Frontmatter = {
  title: string;       // 記事タイトル
  date: string;        // YYYY-MM-DD
  lang: 'ja' | 'en';   // 言語
  slug: string;        // 日英共通のURLスラッグ
  category: string;    // 1つのみ (例: Tech, Diary)
  tags: string[];      // 複数可 (例: React, AWS)
  series?: string;     // シリーズID (任意)
  seriesOrder?: number;// シリーズ内の順番
  published: boolean;  // 公開フラグ
};
```

### URL Structure

* `/[lang]/` : Top Page
* `/[lang]/posts/[slug]` : Article Detail
* `/[lang]/category/[category]` : Category Archive
* `/[lang]/tags/[tag]` : Tag Archive
* `/[lang]/series/[series]` : Series Archive

---

## 6. AIアシスタントへのプロンプト例

各フェーズを開始する際に、以下のコマンドをClaude CodeやGeminiに入力してください。

### 【Phase 0 開始時】(段階的セットアップ)

```text
@docs/PROJECT_DESIGN.ja.md を読み込んでください。
これは一気に書き換える移行ではなく、段階的移行です。
まずは Phase 0: 段階的セットアップ を実施します。

以下の計画を作成してください:
1. 新しいNext.jsプロジェクトを別ディレクトリ(nextjs-app/)にセットアップ
2. AWSで2つのS3バケット構成 (Gatsby既存 + Next.js新規)
3. CloudFrontのマルチオリジン設定とパスベースルーティング
4. 独立デプロイのためのデュアルGitHub Actionsワークフロー

ゴールは、GatsbyとNext.jsを並行稼働させ、ユーザーに影響を与えないことです。
```

### 【Phase 1 開始時】(Next.js最初のルート)

```text
@docs/PROJECT_DESIGN.ja.md
Phase 0 インフラが整いました。Phase 1: MVP移行 に進みます。

nextjs-app/ ディレクトリに Next.js (App Router, TypeScript) プロジェクトを作成してください。
最初は /posts/* ルートのみ実装します - それ以外はGatsbyが処理します。
chiranoura-blogからMarkdownファイルを読み込み、記事ページを表示してください。
スタイリングはTailwind CSSを使用します。

重要: これはNext.js S3バケットのみにデプロイされます。Gatsbyは変更しません。
```

### 【Phase 2 構造化】

```text
Phase 1が完了しました。次は Phase 2: URL設計と構造化 に進みます。
i18n対応のために `app/[lang]/...` のディレクトリ構成に変更し、
Frontmatterの `lang` プロパティに基づいて記事を振り分けるロジックを実装してください。
また、シリーズ機能 (`series`) の一覧ページの作成もお願いします。
```

### 【Phase 3 AWS】

```text
Phase 3: インフラ構築 を行います。
Next.js のSSGビルド (output: export) 設定と、
それを GitHub Actions 経由で AWS S3 + CloudFront にデプロイするための
YAMLファイルと、必要なAWS CLIコマンドの手順を作成してください。
画像最適化には `next-image-export-optimizer` を使用します。
```

### 【Phase 4 機能実装】

```text
Phase 4: 機能強化 です。以下の2つのReactコンポーネントを作成してください。
1. 記事内の特定の要素を収集して Anki 用のCSVをダウンロードするボタン。
2. 記事のファイルパスから GitHub の History / Blame / Issue へのリンクを生成するフッターパーツ。
```

---

## 7. 開発ワークフロー

詳細な開発ワークフロー（ブランチング、コミット、PR）については以下を参照:
* `.claude/commands/workflow.md`

重要なポイント:
* 作業開始前にissueを作成
* ブランチ命名: `feature/issue-{NUMBER}_{description}`
* コミット形式: `#{NUMBER} Description`
* PR説明文には `Closes #{NUMBER}` を含めてissueを自動クローズ

---

## 8. 注意事項

### 段階的移行の原則

* **ビッグバンなし:** サイト全体を一度に置き換えない
* **フィーチャーフラグ:** CloudFrontのパスルーティングを「フィーチャーフラグ」メカニズムとして使用
* **独立デプロイ:** GatsbyとNext.jsは互いに干渉せずに独立してデプロイ
* **ロールバック可能:** 問題があればCloudFrontからNext.jsパスを即座に削除可能
* **ユーザー体験最優先:** 読者は移行が行われていることに気づかないようにする

### コンテンツ管理

* コンテンツリポジトリ (`chiranoura-blog`) は別管理であり、この移行中に変更しないこと
* GatsbyとNext.jsの両方が同じコンテンツソースから読み込む
* 既存機能を維持しつつ、新機能を段階的に追加することに注力
* すべての変更は既存コンテンツとの後方互換性を保つこと

### 技術的考慮事項

* 移行を通じてパフォーマンスとSEOを優先すること
* CloudFrontメトリクスを監視してGatsby vs Next.jsのパフォーマンスを比較
* CloudFrontルーティングに追加する前に各Next.jsルートを徹底的にテスト
* Next.jsがすべてのルートを完全に置き換えるまでGatsbyビルドを維持
