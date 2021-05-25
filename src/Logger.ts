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