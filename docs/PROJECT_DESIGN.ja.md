# Project Design Document: Chiranoura Blog Renewal

## 1. プロジェクト概要

既存のGatsby製ブログ (`chirashi-js`) を Next.js (App Router) に移行し、技術的・機能的に刷新する。
**モノレポ構造**で実装し、別リポジトリ (`chiranoura-blog`) のコンテンツをモノレポの `packages/content/` にマージすることで、MDXとReactコンポーネントのシームレスな統合を実現する。

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
* **Monorepo:** pnpm workspaces, マルチパッケージ構造
* **Content:** MDX (`next-mdx-remote/rsc` or `contentlayer`), `gray-matter` for Frontmatter
* **Math:** `rehype-katex`, `remark-math`
* **Highlight:** `rehype-pretty-code` (Shiki based)
* **Diagram:** `rehype-mermaid` (optional)
* **Infra:** AWS S3, CloudFront, Route53, GitHub Actions
* **パッケージ構造:**
  * `apps/blog` - メインNext.jsアプリケーション
  * `packages/components` - 共有Reactコンポーネントライブラリ
  * `packages/content` - 記事コンテンツ（MDXファイル）

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

### Phase 0: 段階的セットアップ (サイドバイサイドデプロイ + モノレポ)

**目的:** モノレポ構造を構築し、既存サイトを壊さずにNext.jsをGatsbyと並行稼働させる。

1. **モノレポ初期化:**
   * pnpmインストール: `npm install -g pnpm`
   * `pnpm-workspace.yaml` をルートに作成
   * ディレクトリ構造を作成:
     - `apps/blog/` - Next.jsアプリケーション
     - `apps/legacy-gatsby/` - 現在のGatsbyを一時的に移動
     - `packages/components/` - 共有Reactコンポーネント
     - `packages/content/` - コンテンツ（移行予定）
   * ワークスペース初期化: `pnpm init`
   * 詳細は `docs/MONOREPO_MIGRATION.md` を参照

2. **コンテンツ移行:**
   * `git subtree` を使用して `chiranoura-blog` リポジトリを `packages/content/` にマージ
   * Gitヒストリを保持
   * または: 履歴不要の場合は手動コピー
   * Frontmatter検証スクリプトを作成

3. **コンポーネントパッケージセットアップ:**
   * `@chiranoura/components` パッケージを初期化
   * TypeScript + tsup でビルド設定
   * MDXコンポーネント構造を作成
   * `mdx` と `article` コンポーネントのエクスポート設定

4. **Next.jsアプリ作成:**
   * `apps/blog/` に TypeScript + Tailwind で Next.js を初期化
   * ワークスペース依存関係を設定 (`@chiranoura/components`, `@chiranoura/content`)
   * Contentlayer または MDX 設定
   * コンポーネントレジストリ用の `mdx-components.tsx` を作成

5. **AWSインフラ:**
   * Next.js用の新しいS3バケット作成 (`blog-next`)
   * 既存のGatsby S3バケットを維持 (`blog-gatsby`)
   * CloudFrontを2つのオリジンで構成:
     - オリジン1: Gatsby S3バケット (デフォルト/フォールバック)
     - オリジン2: Next.js S3バケット (新しいパス用)

6. **CloudFrontパスパターン:**
   * Next.jsパス用のキャッシュビヘイビアを作成 (順序重要 - 具体的なパスが先):
     - `/posts/*` → Next.jsオリジン
     - `/series/*` → Next.jsオリジン
     - `/tags/*` → Next.jsオリジン
     - `/en/*` → Next.jsオリジン
     - `/ja/*` → Next.jsオリジン
     - `/*` → Gatsbyオリジン (デフォルト)

7. **デュアルGitHub Actions:**
   * 既存のGatsbyワークフローを維持
   * モノレポビルド用の新しいNext.jsワークフローを追加:
     - pnpmをインストール
     - ワークスペース依存関係をインストール: `pnpm install --frozen-lockfile`
     - ブログをビルド: `pnpm --filter blog build`
     - 別のS3バケットにデプロイ
   * 両ワークフローが独立してデプロイ

8. **検証:**
   * ワークスペースインストールが動作: `pnpm install`
   * Gatsbyサイトがルートパスでアクセス可能
   * Next.jsアプリが起動: `pnpm --filter blog dev`
   * コンポーネントがブログアプリでインポート可能
   * packages/content/ からコンテンツにアクセス可能

### Phase 1: MVP移行 (MDX統合)

**目的:** モノレポのコンテンツとコンポーネントを使用してNext.jsブログページを動作させる。

**前提条件:** Phase 0完了（モノレポ設定、コンテンツ移行、コンポーネントパッケージ初期化完了）

1. **Content Layer セットアップ:**
   * Contentlayerをインストール: `pnpm add -D contentlayer next-contentlayer`
   * `apps/blog/` に `contentlayer.config.ts` を作成
   * コンテンツを指定: `contentDirPath: '../../packages/content/posts'`
   * Frontmatterスキーマで Post ドキュメントタイプを定義

2. **MDXコンポーネント統合:**
   * `apps/blog/` に `mdx-components.tsx` を作成
   * `@chiranoura/components/mdx` からコンポーネントをインポート
   * MDXファイルで使用するコンポーネントを登録

3. **記事ページ:**
   * `app/posts/[slug]/page.tsx` を作成
   * Contentlayerの生成された型を使用
   * `useMDXComponent` フックでMDXをレンダリング
   * Gatsbyコンポーネント（画像、リンク）のNext.js版を実装

4. **ビルドとデプロイ:**
   * SSG用に `next.config.js` を設定: `output: 'export'`
   * S3用に `next-image-export-optimizer` を設定
   * ビルド確認: `pnpm --filter blog build`
   * **Next.js S3バケットのみにデプロイ** - Gatsbyは変更なし

5. **テスト:**
   * MDXコンポーネントが正しくレンダリングされることを確認
   * MDXでのコンポーネントインポートが動作することをテスト
   * TypeScriptがコンポーネントpropsを検証することを確認
   * コンテンツ変更時のホットリロードを確認

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

### 【Phase 0 開始時】(段階的セットアップ + モノレポ)

```text
@docs/PROJECT_DESIGN.ja.md
@docs/MONOREPO_MIGRATION.md

これは段階的移行でモノレポ構造を採用します。
Phase 0: 段階的セットアップ + モノレポ を開始します。

以下の手順に従ってください:
1. pnpmワークスペースのセットアップ (apps/, packages/ 構造)
2. chiranoura-blogからpackages/content/へのコンテンツ移行 (Git履歴を保持)
3. TypeScript + tsupを使用した@chiranoura/componentsパッケージの作成
4. ワークスペース依存関係を持つapps/blog/でのNext.js初期化
5. 2つのS3バケットでAWSを構成 (Gatsby既存 + Next.js新規)
6. マルチオリジンとパスベースルーティングでCloudFrontをセットアップ
7. モノレポビルド用のデュアルGitHub Actionsを構成

ゴール: GatsbyとNext.jsを並行稼働させるモノレポ、影響はゼロ。
```

### 【Phase 1 開始時】(MDX統合)

```text
@docs/PROJECT_DESIGN.ja.md
@docs/MONOREPO_MIGRATION.md

Phase 0完了: モノレポがセットアップされ、コンテンツが移行され、コンポーネントパッケージの準備完了。
Phase 1: MVP移行 に進みます。

タスク:
1. apps/blog/にContentlayerをインストールして構成
2. ../../packages/content/postsを指すcontentlayer.config.tsを作成
3. @chiranoura/componentsを使用するmdx-components.tsxをセットアップ
4. MDXレンダリングを使用してapp/posts/[slug]/page.tsxを作成
5. SSGエクスポート用にnext.config.jsを構成
6. MDXコンポーネントが記事で動作することをテスト

注意: これはNext.js S3バケットのみにデプロイされます。Gatsbyは変更なし。
確認: MDXでのコンポーネントインポート、TypeScript検証、ホットリロード。
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

### コンテンツ管理 (モノレポ)

* コンテンツは `chiranoura-blog` リポジトリから `packages/content/` へ移行済み (Phase 0)
* Git履歴は `git subtree` マージで保持
* コンテンツはシームレスなMDXコンポーネント統合のためモノレポに配置
* Gatsby（一時的）とNext.jsの両方がモノレポのコンテンツから読み込む
* MDXファイルで `@chiranoura/components` から直接Reactコンポーネントをインポート可能
* TypeScriptがMDXファイルで使用されるコンポーネントpropsを検証
* 既存機能を維持しつつ、新機能を段階的に追加することに注力
* すべての変更は既存コンテンツとの後方互換性を保つこと

### モノレポ構造

* **ワークスペースツール:** pnpm workspaces (推奨) または yarn/npm workspaces
* **パッケージマネージャーのメリット:**
  * 共有依存関係によるディスク容量削減
  * シンボリックリンクされたパッケージによる高速インストール
  * パッケージ間の型安全性
  * 単一の `node_modules` ホイスティング
* **詳細な移行ガイド:** `docs/MONOREPO_MIGRATION.md` を参照:
  * ステップバイステップのモノレポセットアップ
  * Git履歴保持テクニック
  * ワークスペース設定例
  * コンポーネントパッケージ構造
  * コンテンツ移行戦略
  * モノレポビルド用のGitHub Actions

### 技術的考慮事項

* 移行を通じてパフォーマンスとSEOを優先すること
* CloudFrontメトリクスを監視してGatsby vs Next.jsのパフォーマンスを比較
* CloudFrontルーティングに追加する前に各Next.jsルートを徹底的にテスト
* Next.jsがすべてのルートを完全に置き換えるまでGatsbyビルドを維持
* 最速のインストールと最小のディスク使用量のためpnpmを使用
* ローカルパッケージ依存関係にはworkspaceプロトコル (`workspace:*`) を活用
