# AI 股票研究助理

AI 股票研究助理是一個給股票新手使用的 **AI Stock Research Coach** 前端原型。

它不是傳統看盤 App，也不是叫使用者買股票的工具。產品目標是每天幫新手回答：

- 今天市場發生什麼？
- 哪些題材值得研究？
- 哪些股票值得花時間研究？
- 為什麼值得研究？
- 如果要開始觀察，價格區間應該怎麼看？
- 今天可以學到什麼？

> 本系統提供的是研究輔助與資訊整理。研究優先度代表值得花時間研究，不代表買賣建議。AI 研究區間代表值得開始觀察的價格範圍，不是建議買進價格。

## 功能介紹

- 題材中心 Dashboard
- AI 今日任務
- 今日市場摘要
- 今日熱門題材
- 題材排行榜
- 今日值得研究股票
- 題材詳情頁
- 股票研究頁
- 研究優先度
- 五大研究指標
- AI 研究區間
- 股價與近期走勢
- Mini Price Chart
- 合理估值與安全邊際
- 新手白話翻譯
- Learning Mode
- Watch Zone 本機收藏提醒
- PWA，可加入手機主畫面

## 技術架構

```txt
React
Vite
Tailwind CSS
Recharts
Lucide React
vite-plugin-pwa
Mock Data / Optional API
```

目前正式公開版是純前端部署版本，不需要 Backend。

資料來源流程：

```txt
mockData
  ↓
React UI
  ↓
若未來設定 VITE_API_URL
  ↓
可切換呼叫外部 API
```

## 安裝方式

```bash
npm install
```

## 啟動方式

```bash
npm run dev
```

開啟：

```txt
http://127.0.0.1:5173/
```

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

開啟：

```txt
http://127.0.0.1:4173/
```

## Environment Variables

建立 `.env`：

```env
VITE_API_URL=
```

目前可留空。留空時會使用前端 mock data，不會呼叫後端。

未來如果有正式 API，可以設定：

```env
VITE_API_URL=https://your-api.example.com
```

## Deploy

### Vercel

Vercel 設定：

```txt
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

Environment Variables：

```env
VITE_API_URL=
```

`vercel.json` 已包含 SPA rewrite，重新整理頁面不會 404。

## GitHub 上傳流程

```bash
git init
git add .
git commit -m "first release"
git branch -M main
git remote add origin https://github.com/你的帳號/你的-repo.git
git push -u origin main
```

## 更新網站

修改後執行：

```bash
git add .
git commit -m "update"
git push
```

Vercel 會自動重新部署。

## Roadmap

- 串接正式股價 API
- 串接 TWSE 法人與月營收
- 串接新聞與法說會來源
- 建立每日 08:30 AI 研究任務摘要
- Watch Zone 跨裝置同步
- 加入自訂研究清單
- 加入更完整的學習模式
- 加入使用者自己的研究筆記

## License

MIT
