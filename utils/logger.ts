import fs from 'fs';
import path from 'path';
 
type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
 
const LEVELS: Record<LogLevel, number> = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 };
const ICONS: Record<LogLevel, string> = { DEBUG: '🐞', INFO: '✅', WARN: '⚠️', ERROR: '❌' };
 
export class Logger {
    private static minLevel: LogLevel = (process.env.LOG_LEVEL as LogLevel) || 'INFO';
    static readonly logFile = path.resolve(
        process.cwd(),
        'logs',
        `test-worker-${process.env.TEST_WORKER_INDEX ?? '0'}.log`
    );
 
    constructor(private readonly context: string) {
        try {
            fs.mkdirSync(path.dirname(Logger.logFile), { recursive: true });
        } catch {
            /* не критично */
        }
    }
 
    private write(level: LogLevel, message: string) {
        if (LEVELS[level] < LEVELS[Logger.minLevel]) return;
 
        const line = `${new Date().toISOString()} [${level}] [${this.context}] ${message}`;
        const consoleLine = `${ICONS[level]} ${message}`;
 
        if (level === 'ERROR') console.error(consoleLine);
        else if (level === 'WARN') console.warn(consoleLine);
        else console.log(consoleLine);
 
        try {
            fs.appendFileSync(Logger.logFile, line + '\n');
        } catch {
            /* логер ніколи не валить тест */
        }
    }
 
    debug(message: string) { this.write('DEBUG', message); }
    info(message: string)  { this.write('INFO', message); }
    warn(message: string)  { this.write('WARN', message); }
    error(message: string, error?: unknown) {
        const details = error instanceof Error ? `\n${error.message}` : '';
        this.write('ERROR', message + details);
    }
}