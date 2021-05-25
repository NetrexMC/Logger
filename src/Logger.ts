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
export abstract class Logger {
	/**
	 * Logger name
	 */
	public abstract readonly name: string;

	/**
	 * Informative message
	 */
	public abstract info(msg: string): any;

	/**
	 * Warning message
	 */
	public abstract warn(msg: string): any;

	/**
	 * Notice message
	 */
	public abstract notice(msg: string): any;

	/**
	 * Critical Message
	 */
	public abstract critical(msg: string): any;

	/**
	 * Debug message
	 */
	public abstract debug(msg: string): any;

	/**
	 * Error message
	 */
	public abstract error(msg: string): any;
}