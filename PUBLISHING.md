# Marketplace 发布说明

## 一次性准备

1. 在 Visual Studio Marketplace 创建发布者（Publisher），记下 Publisher ID。
2. 在 Azure DevOps 创建 Personal Access Token（PAT）。权限至少需要 Marketplace 的发布权限。
3. 修改 `package.json`：

```json
{
  "publisher": "你的Publisher ID",
  "repository": {
    "type": "git",
    "url": "你的公开仓库地址"
  }
}
```

## 本地检查和打包

```powershell
npm install
npm run check
npm run package
```

安装生成的 `.vsix`，在 Extension Development Host 中测试三个命令及 workspace/global 两种保存范围。

## 发布

```powershell
npm install --global @vscode/vsce
vsce login 你的PublisherID
vsce publish
```

也可以先发布预览版本：

```powershell
vsce publish --pre-release
```

每次发布必须递增 `package.json` 的 `version`。发布前应确认 README、许可证、仓库地址和扩展图标（如有）均已准备好。

## 安全提示

不要把 PAT 写入 `package.json`、源代码或 Git 仓库。推荐使用 `vsce login` 的凭据存储，发布完成后按需撤销或轮换 PAT。
