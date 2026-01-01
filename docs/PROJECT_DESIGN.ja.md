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

## 3. 実装ロードマップ (Step-by-Step)

AIアシスタントには、以下のフェーズごとに指示を出し、完了を確認してから次へ進むこと。

### Phase 1: MVP移行 (Gatsby to Next.js)

**目的:** 既存の記事が表示されるだけの「素朴なNext.jsブログ」を作る。

1. `create-next-app` でプロジェクト新規作成。
2. `chiranoura-blog` (コンテンツRepo) をローカルに配置し、Next.jsからファイルシステムとして読み込むロジック (`fs`, `path`) を実装。
3. Markdown/MDXをHTMLに変換して表示する基本ページ (`app/[slug]/page.tsx`) の作成。
4. Gatsby時代のコンポーネント（画像やリンク）の置換。
5. `npm run build` (SSG output) が通ることを確認。

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

## 4. データ構造定義

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

## 5. AIアシスタントへのプロンプト例

各フェーズを開始する際に、以下のコマンドをClaude CodeやGeminiに入力してください。

### 【Phase 1 開始時】

```text
@Project_Design_Document を読み込んでください。
まずは Phase 1: MVP移行 を実施します。
Next.js (App Router, TypeScript) のプロジェクトを新規作成し、
ローカルにある Markdownファイルを読み込んで記事ページを表示する
最小構成の実装コードを提示してください。
スタイリングはTailwind CSSを使用します。
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

## 6. 開発ワークフロー

詳細な開発ワークフロー（ブランチング、コミット、PR）については以下を参照:
* `.claude/commands/workflow.md`

重要なポイント:
* 作業開始前にissueを作成
* ブランチ命名: `feature/issue-{NUMBER}_{description}`
* コミット形式: `#{NUMBER} Description`
* PR説明文には `Closes #{NUMBER}` を含めてissueを自動クローズ

---

## 注意事項

* コンテンツリポジトリ (`chiranoura-blog`) は別管理であり、この移行中に変更しないこと
* 既存機能を維持しつつ、新機能を段階的に追加することに注力
* すべての変更は既存コンテンツとの後方互換性を保つこと
* 移行を通じてパフォーマンスとSEOを優先すること
