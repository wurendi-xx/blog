---
title: hexo多端发布
date: 2020-7-28 15:36:37
tags: hexo
---
## 前言

之前写hexo博客只在自己的电脑上，现在工作了，想在公司的电脑上同时发布博客。所以在这里记录一下步骤。思路是在仓库中建立两个分支，一个用来存放hexo生产网站的原始文件，另一个用来存放静态网页。平时写博客时更新原始文件的分支hexo，静态网页的分支master只负责显示。

## 原有的备份

我在自己电脑的hexo已经搭好了，现在需要将其与hexo源文件相关的上传到一个新的分支。步骤如下：

1. 修改`.gitignore`文件,在末尾添加两行内容用来忽略与静态网页相关的内容

   ```bash
   /.deploy_git
   /public
   ```

   （Ps：检查一下主题文件夹下有没有gitignore文件，如果有的话说明当时是利用git下载的，需要将其删除，不然之后无法在另一个电脑上恢复主题）

2. 在当前目录打开Git Bash执行如下命令：

   ```bash
   git init  # 初始化 git 仓库
   git remote add origin ${your github repository} # 添加 Github 远程仓库，
   git rm -r --cached . #清除缓存，使.gitignore文件生效
   git add . # 将变更添加到 git 暂存区
   git commit -m "${comment}" # 提交本次更改
   git push origin master:hexo # 将本地 master 分支的提交发布到远程仓库的 hexo 分支
   ```

   （Ps：`git rm -r --cached .`为了让git重新对比文件变化，生成变更）

   现在已经得到了存储源文件的hexo分支。

## 恢复备份

   现在需要在另一个电脑上恢复刚才生成的备份。

   1. 安装好**Git，Node，npm**。

   2. 将hexo分支恢复到本地目录下，打开Git Bash。

      ```bash
      git clone -b hexo ${your github repository}  # 克隆远程仓库的 hexo 分支到本地
      npm install hexo-cli -g # 安装 hexo
      npm install # 安装各种插件
      npm install hexo-deployer-git # hexo git 部署插件
      ```

   3. 依次执行`hexo g`、`hexo s`测试效果。

   （Ps：我在当前安装hexo的主题next时用的是`git clone`指令，其中包含ignore文件，导致在恢复时忽略了next主题，打开页面一片空白，显示无法加载布局`No layout: index.html`。）

## 多端同步

1. 在任意一个终端更新博客前执行`git pull origin hexo`拉去服务器最新版本

2. 在任意一个终端更新博客前依次执行

   ```bash
   git add .
   git commit -m "${comment}"
   git push origin hexo
   ```

   

## 参考

[1] [使用 hexo，如果换了电脑怎么更新博客？—— CrazyMilk](https://www.zhihu.com/question/21193762)

