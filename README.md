# JulesSample

## インタラクティブ数学シミュレーター

スマホのタッチ操作でパラメータを動かし、図形や物理挙動を視覚化するWebアプリケーションです。

### 機能

- **弾道計算**: 初速度、角度、重力を調整して弾道を観察
- **波形**: 周波数、振幅、位相を変更して波の動きを可視化
- **図形**: 正多角形の辺の数、半径、回転を調整
- **振り子**: 長さ、初期角度、減衰率を変更して振り子の動きをシミュレート
- **数式**: 10種類の数学関数のグラフを可視化
  - 二次関数: y = ax² + bx + c
  - 三次関数: y = ax³ + bx² + c
  - 正弦関数: y = a·sin(bx) + c
  - 余弦関数: y = a·cos(bx) + c
  - 正接関数: y = a·tan(bx) + c
  - 指数関数: y = a·e^(bx) + c
  - 対数関数: y = a·ln(bx) + c
  - 絶対値: y = a·|bx| + c
  - 反比例: y = a/x + c
  - 平方根: y = a·√(bx) + c

### 特徴

- スマホ・タブレット対応
- リアルタイムパラメータ調整
- Canvas APIを使用した滑らかなアニメーション
- レスポンシブデザイン

### GitHub Pagesでの公開方法

1. GitHubリポジトリの「Settings」タブに移動
2. 左メニューから「Pages」を選択
3. 「Source」で「Deploy from a branch」を選択
4. ブランチを `claude/math-simulator-canvas-dPU8j` に設定
5. フォルダは「/ (root)」を選択
6. 「Save」をクリック

数分後、`https://<ユーザー名>.github.io/<リポジトリ名>/` でアクセス可能になります。

### ローカルでの実行

```bash
# シンプルなHTTPサーバーを起動
python3 -m http.server 8000
# または
npx serve
```

ブラウザで `http://localhost:8000` にアクセスしてください。

### 技術スタック

- HTML5 Canvas
- Vanilla JavaScript
- CSS3 (レスポンシブデザイン)