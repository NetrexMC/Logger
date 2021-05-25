import { colorLog } from "./Color.ts";
import { GenericLogger } from "./GenericLogger.ts";
import { Logger } from "./Logger.ts";

export class TimedLogger extends Logger {
	public readonly name: string;

	public constructor(name: string) {
		super();
		this.name = name;
	}

	public info(msg: string) {
		this.log(`&lInfo!`, msg);
	}

	public warn(msg: string) {
		this.log('&6&lWarn!', '&e' + msg);
	}

	public notice(msg: string) {
		this.log('&b&lNotice!', '&b' + msg);
	}

	public critical(msg: string) {
		this.log('&4&lCritical!', '&4' + msg);
	}

	public debug(msg: string) {
		this.log('&7&lDebug!', '&7' + msg);
	}

	public error(msg: string) {
		this.log('&c&lError!', '&c' + msg);
	}

	private log(pre: string, msg: string, ...formatting: string[]) {
		colorLog(`${this.time()} ${this.name} ${pre}&r: ` +  msg, ...formatting);
	}

	/**
	 * Time stamps
	 */
	private time(): string {
		let date: Date = new Date();
		let time: string = [
			date.getHours() >= 10 ? date.getHours() : '0' + date.getHours(),
			date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes(),
			date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()
		].join(':');
		return `[${time}]`;
	}
}