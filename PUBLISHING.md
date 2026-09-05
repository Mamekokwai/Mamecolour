# Marketplace 发布说明

## 一次性准备

1. 在 Visual Studio Marketplace 创建发布者（Publisher），记下 Publisher ID。
2. 在 Azure DevOps 创建 Personal Access Token（PAT）。权限至少需要 Marketplace 的发布权限。
3. 修改 `package.json`：

```json
{
  "publisher": "Nywerya",
  "repository": {
    "type": "git",
    "url": "https://github.com/Mamekokwai/Mamecolour"
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

## Release 管理

版本号遵循 SemVer：修复问题使用 patch，增加兼容功能使用 minor，破坏性变更使用 major。

```powershell
# 例如发布 Bug 修复版：0.1.1 -> 0.1.2
npm run release:patch

# 或者使用 release:minor / release:major
# 然后在 CHANGELOG.md 顶部补充本次变更
npm run release:verify
```

版本脚本会同步修改 `package.json` 和 `package-lock.json`，不会自动修改 CHANGELOG、提交 Git 或推送远程仓库。验证通过后，提交代码并创建同版本标签，例如：

```powershell
git add package.json package-lock.json CHANGELOG.md extension.js README.md public .vscodeignore
git commit -m "release: v0.1.2"
git tag v0.1.2
git push origin main --tags
```

如果暂时没有 PAT，可以将 `npm run release:verify` 生成的 `.vsix` 手动上传到 Marketplace Publisher 管理页；有 PAT 后再使用 `vsce publish`。

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
