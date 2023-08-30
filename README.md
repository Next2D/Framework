Next2D Framework
=============
<div align="center">
  <img src="https://next2d.app/assets/img/framework/logo.svg" width="250" alt="Next2D Framework">
</div>

[![UnitTest](https://github.com/Next2D/Framework/actions/workflows/integration.yml/badge.svg?branch=main)](https://github.com/Next2D/Framework/actions/workflows/integration.yml)
[![CodeQL](https://github.com/Next2D/Framework/actions/workflows/codeql-analysis.yml/badge.svg?branch=main)](https://github.com/Next2D/Framework/actions/workflows/codeql-analysis.yml)
[![Lint](https://github.com/Next2D/Framework/actions/workflows/lint.yml/badge.svg?branch=main)](https://github.com/Next2D/Framework/actions/workflows/lint.yml)

[![release](https://img.shields.io/github/v/release/Next2D/Framework)](https://github.com/Next2D/Framework/releases)
[![Github All Releases](https://img.shields.io/npm/dt/@next2d/framework)](https://github.com/Next2D/Framework/releases)
[![Discord](https://badgen.net/badge/icon/discord?icon=discord&label)](https://discord.gg/6c9rv5Uns5)
[![Twitter](https://img.shields.io/twitter/follow/Next2D?style=social)](https://twitter.com/Next2D)

[日本語]  
Next2D Frameworkは、クリーンアーキテクチャー、ドメイン駆動開発、テスト駆動開発、MVVMの原則に従って設計されおり、柔軟性、拡張性、保守性に重点を置いたアーキテクチャーとデザイン手法で各レイヤーを疎結合に保つ事が可能です。  
  
従来のCanvas/WebGLアプリケーションでは困難だったURLによるシーン管理（SPA）を可能にし、シーン毎のUI開発・画面確認が可能になりました。UI構築にはアトミックデザインを推奨しており、コンポーネントの細分化、再利用可能なモジュール設計など、効率的なUI構築と保守が可能となっています。  
  
また、テスト駆動開発を重視しているため、ユニットテスト、統合テスト、UIテストなど、さまざまなレベルでテストを行いながら、高品質なコードの開発をサポートします。  
  
[English]  
Next2D Framework is designed according to the principles of clean architecture, domain-driven development, test-driven development, and MVVM, with an emphasis on flexibility, scalability, and maintainability, and a design methodology that keeps each layer loosely coupled.  
  
It is designed according to the principles of MVVM, with an architecture and design methodology that focuses on flexibility, scalability, and maintainability, and keeps each layer loosely coupled. The UI can be efficiently built and maintained by subdividing components and designing modules that can be reused.  

In addition, the emphasis on test-driven development supports the development of high-quality code while testing at various levels, including unit tests, integration tests, and UI tests.  

[简体中文]  
Next2D框架是根据简洁架构、领域驱动开发、测试驱动开发和MVVM的原则设计的，其架构和设计方法注重灵活性、可扩展性和可维护性，使每一层都能保持松散耦合。  
  
它可以通过URL（SPA）实现场景管理，这在传统的Canvas/WebGL应用程序中是很难实现的，并且可以为每个场景进行UI开发和屏幕检查。 该系统能够实现高效的UI构建和维护。  
  
此外，对测试驱动开发的强调支持高质量代码的开发，同时在各个层面进行测试，包括单元测试、集成测试和UI测试。  
## Support

[日本語]  
最新ニュースや技術情報は、Twitterの[@Next2D](https://twitter.com/Next2D)や公式の[Website](https://next2d.app/ja/)で発信していきますので、チェックしてみてください。  
Next2Dがお役に立つようでしたら、プロジェクトをご支援いただければ幸いです。  
  
[English]  
Please check [@Next2D](https://twitter.com/Next2D) on Twitter and the [official website](https://next2d.app/en/) for the latest news and technical information.    
If Next2D is useful to you, we hope you will support our project.  
  
[简体中文]  
请在Twitter上查看[@Next2D](https://twitter.com/Next2D)和[官方网站](https://next2d.app/cn/)，了解最新的新闻和技术信息。  
如果Next2D对你有用，我们希望你能支持我们的项目。  
  
<div align="center">
  <a href="https://github.com/sponsors/Next2D" target="_blank">
    <img src="https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86" width=180 alt="GitHub Sponsor" />
  </a>
</div>

## Quick Start - JavaScript Development Environment

```sh
npx create-next2d-app sample-app --template @next2d/framework-template
cd app-name
npm start
```

## Quick Start - TypeScript Development Environment

```sh
npx create-next2d-app sample-app --template @next2d/framework-typescript-template
cd app-name
npm start
```

##  Flowchart
![Flowchart](./Framework_Flowchart.svg)

## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) - see the [LICENSE](LICENSE) file for details.
