import meow from 'meow'
import open from 'open'
import chalk from 'chalk'
import { startSnakeGame } from './game.js'

const GITHUB_URL = 'https://github.com/leo-xee'
const BLOG_URL = 'https://leo-xee.dev'

const message = `
안녕하세요! 프론트엔드 엔지니어 이장민입니다. 🌿\n
복잡한 데이터를 다양한 차트와 인터렉션으로 시각화하고,
BFF 구성과 GitHub Actions를 활용한 테스트/배포 자동화 경험이 있습니다.
UI 개발에서 나아가 서비스의 전반적인 프로세스에 관심이 많습니다.
명확한 책임 분리와 이해하기 쉬운 코드 구조를 지향합니다.
좋은 사용자 경험은 개발자 경험의 지속적인 향상에서 비롯된다고 믿으며,
이를 위해 작은 개선을 꾸준히 쌓아가는 방식을 선호합니다.
`

const cli = meow(
    `
    📦 Usage
      $ jangmin [options]

    🧩 Options
      -V, --version   Show CLI version
      -H, --help      Show this help message
      -G, --github    Open my GitHub profile
      -B, --blog      Open my blog
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
