/**
 *  _   _      _
 * | \ | |    | |
 * |  \| | ___| |_ _ __ _____  __
 * | . ` |/ _ \ __| '__/ _ \ \/ /
 * | |\  |  __/ |_| | |  __/>  <
 * |_| \_|\___|\__|_|  \___/_/\_\
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * @author Netrex Team
 * @link https://github.com/NetrexMC
 *
 * © Netrex 2020 - 2021
 */
import { colorify, colorLog } from "./Color.ts";
import { Logger } from "./Logger.ts";

export class GenericLogger extends Logger {
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
		colorLog(`${this.name} ${pre}&r: ` +  msg, ...formatting);
	}
}