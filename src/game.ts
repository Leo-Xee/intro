import readline from 'readline'
import chalk from 'chalk'

type Position = { x: number; y: number }
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

const WIDTH = 50
const HEIGHT = 15
const SPEED = 120

class SnakeGame {
    private snake: Position[]
    private direction: Direction
    private food: Position
    private score: number
    private gameOver: boolean

    constructor() {
        this.snake = [{ x: 5, y: 5 }]
        this.direction = 'RIGHT'
        this.food = this.generateFood()
        this.score = 0
        this.gameOver = false
    }

    private generateFood(): Position {
        let newFood: Position
        do {
            newFood = {
                x: Math.floor(Math.random() * WIDTH),
                y: Math.floor(Math.random() * HEIGHT),
            }
        } while (this.snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y))
        return newFood
    }

    private isCollision(pos: Position): boolean {
        return (
            pos.x < 0 ||
            pos.x >= WIDTH ||
            pos.y < 0 ||
            pos.y >= HEIGHT ||
            this.snake.some((segment) => segment.x === pos.x && segment.y === pos.y)
        )
    }

    public setDirection(newDir: Direction): void {
        const opposites: Record<Direction, Direction> = {
            UP: 'DOWN',
            DOWN: 'UP',
            LEFT: 'RIGHT',
            RIGHT: 'LEFT',
        }
        if (opposites[this.direction] !== newDir) {
            this.direction = newDir
        }
    }

    public update(): void {
        if (this.gameOver) return

        const head = { ...this.snake[0] }

        switch (this.direction) {
            case 'UP':
                head.y--
                break
            case 'DOWN':
                head.y++
                break
            case 'LEFT':
                head.x--
                break
            case 'RIGHT':
                head.x++
                break
        }

        if (this.isCollision(head)) {
            this.gameOver = true
            return
        }

        this.snake.unshift(head)

        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10
            this.food = this.generateFood()
        } else {
            this.snake.pop()
        }
    }

    public render(): void {
        console.clear()

        const border = chalk.white('═'.repeat(WIDTH))
        console.log(chalk.white('╔') + border + chalk.white('╗'))

        for (let y = 0; y < HEIGHT; y++) {
            let row = chalk.white('║')
            for (let x = 0; x < WIDTH; x++) {
                const isSnakeHead = this.snake[0].x === x && this.snake[0].y === y
                const isSnakeBody = this.snake.slice(1).some((s) => s.x === x && s.y === y)
                const isFood = this.food.x === x && this.food.y === y

                if (isSnakeHead) {
                    row += chalk.green('●')
                } else if (isSnakeBody) {
                    row += chalk.green('○')
                } else if (isFood) {
                    row += chalk.red('◆')
                } else {
                    row += ' '
                }
            }
            row += chalk.white('║')
            console.log(row)
        }

        console.log(chalk.white('╚') + border + chalk.white('╝'))
        console.log(chalk.magenta(`점수: ${this.score}  |  조작: ↑ ↓ ← →  |  종료: Q`))

        if (this.gameOver) {
            console.log(chalk.red.bold('\n게임 오버! 최종 점수: ' + this.score))
            process.exit(0)
        }
    }
}

export function startSnakeGame(): void {
    const game = new SnakeGame()

    readline.emitKeypressEvents(process.stdin)
    if (process.stdin.isTTY) {
        process.stdin.setRawMode(true)
    }

    process.stdin.on('keypress', (_, key) => {
        if (key.name === 'q' || (key.ctrl && key.name === 'c')) {
            process.exit(0)
        }

        switch (key.name) {
            case 'up':
                game.setDirection('UP')
                break
            case 'down':
                game.setDirection('DOWN')
                break
            case 'left':
                game.setDirection('LEFT')
                break
            case 'right':
                game.setDirection('RIGHT')
                break
        }
    })

    setInterval(() => {
        game.update()
        game.render()
    }, SPEED)
}
