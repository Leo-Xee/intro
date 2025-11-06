import meow from 'meow'
import open from 'open'
import chalk from 'chalk'
import { startSnakeGame } from './game.js'

const GITHUB_URL = 'https://github.com/leo-xee'
const BLOG_URL = 'https://leo-xee.dev'

const message = `
👋 안녕하세요! 프론트엔드 엔지니어 이장민입니다.\n
문제를 기술과 비즈니스 관점에서 균형 있게 바라보려 합니다.
마주한 기술적 문제를 해결하며 얻은 배움에 즐거움을 느낍니다.
유려한 사용자 경험은 개발자 경험을 향한 투자에서 나온다고 생각합니다.
명확한 책임 분리와 이해하기 쉬운 코드 구조를 지향합니다.
작은 루틴의 꾸준함이 자연스럽게 성장으로 이어진다고 믿습니다.
`

const cli = meow(
    `
    📦 Usage
      $ jangmin [options]

    🧩 Options
      -V, --version   Show CLI version
      -H, --help      Show this help message
      -G, --github    Open your GitHub profile
      -B, --blog      Open your blog
      -S, --snake     Play the snake game 🐍

    💡 Examples
      $ jangmin --github
      $ jangmin --snake
  `,
    {
        importMeta: import.meta,
        flags: {
            version: {
                type: 'boolean',
                shortFlag: 'V',
            },
            help: {
                type: 'boolean',
                shortFlag: 'H',
            },
            github: {
                type: 'boolean',
                shortFlag: 'G',
            },
            blog: {
                type: 'boolean',
                shortFlag: 'B',
            },
            snake: {
                type: 'boolean',
                shortFlag: 'S',
            },
        },
    },
)

export async function init() {
    const { flags } = cli

    if (flags.github) {
        console.log(chalk.blue(`🌐 Opening GitHub profile: ${GITHUB_URL}`))
        await open(GITHUB_URL)
        return
    }

    if (flags.blog) {
        console.log(chalk.blue(`📝 Opening blog: ${BLOG_URL}`))
        await open(BLOG_URL)
        return
    }

    if (flags.snake) {
        console.log(chalk.green('🐍 Starting Snake Game...\n'))
        startSnakeGame()
        return
    }

    if (!flags.version && !flags.help) {
        console.log(message)
    }
}
