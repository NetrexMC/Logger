/// The log builder builds any logger from the given configuration.
/// The chosen logger can be one of the following:
/// - Timed Logger
/// - File Logger
/// - Prefixed Logger + Time Logger? + File Logger?
/// - Generic Logger + Time Logger? + File Logger?
///
/// To generated a `TimedLogger` with debug enabled use:
/// ```rust no_run
/// use netrex_logger::LogBuilder;
/// use netrex_logger::TimedLogger;
///
/// let logger = LogBuilder::new()
/// 	.timed()
/// 	.debug()
/// 	.with_name("Test")
/// 	.build();
/// logger.info("Hello World!".into()); // [00:00:00] [INFO] [Test]: Hello World!
/// ```
///
/// A common logger, with prefix, file log, and time log is:
/// ```rust
/// use netrex_logger::LogBuilder;
///
/// let logger = LogBuilder::new()
/// 	.timed()
/// 	.file("log.txt")
/// 	.name("MyLogger")
/// 	.with_label("SubLogger")
/// 	.build();
/// logger.notice("Hello World!".into()); // [00:00:00] [INFO] [MyLogger] [SubLogger]: Hello World!
/// ```
#[derive(Debug, Clone)]
pub struct LogBuilder {
	pub(crate) debug: bool,
	pub(crate) quiet: bool,
	pub(crate) color: bool,
	pub(crate) name: Option<String>,
	pub(crate) labels: Vec<String>,
	pub(crate) file: Option<String>,
}

impl LogBuilder {
	pub fn new() -> LogBuilder {
		Self {
			debug: false,
			quiet: false,
			color: true,
			name: None,
			labels: Vec::new(),
			file: None,
		}
	}

	/// Enables debug mode.
	/// Debug mode will allow usage of `Logger::debug(msg)`.
	///
	/// If you do not want to use debug mode, and only want Errors and Notices, you can use `LogBuilder::quiet()` instead.
	pub fn debug(mut self) -> Self {
		self.debug = true;
		self
	}

	/// Enables quiet mode.
	/// Quiet mode only allows usage of `Logger::error(msg)` and `Logger::notice(msg)` to pass through.
	pub fn quiet(mut self) -> Self {
		self.quiet = true;
		self
	}

	/// Allows messages to be formatted with ANSI colors in the terminal.
	/// If this is disabled, labels will still be printed with colors however,
	/// the message will not be colored.
	pub fn color(mut self) -> Self {
		self.color = true;
		self
	}

	/// Sets the file to log to.
	/// The given file must be a file path relative to the current working directory.
	/// If the file does not exist, it will be created, otherwise it will be appended to.
	pub fn file<N: Into<String>>(mut self, file: N) -> Self {
		self.file = Some(file.into());
		self
	}

	/// Sets the name of the logger.
	/// This is used to prefix the log messages.
	///
	/// If this is not set, the name will be "Logger".
	/// For example, if the name is "MyLogger", the log messages will be prefixed with "\[MyLogger\]".
	pub fn with_name<N: Into<String>>(mut self, name: N) -> Self {
		self.name = Some(name.into());
		self
	}

	pub fn build(self) -> AnyLogger {
		
	}
}

pub struct AnyLogger {
	pub(crate) logger: Box<dyn Logger>,
}

impl Logger for AnyLogger {
	fn log(&self, msg: String) {
		self.logger.log(msg);
	}

	fn debug(&self, msg: String) {
		self.logger.debug(msg);
	}

	fn notice(&self, msg: String) {
		self.logger.notice(msg);
	}

	fn error(&self, msg: String) {
		self.logger.error(msg);
	}

	fn warn(&self, msg: String) {
		self.logger.warn(msg);
	}

	fn info(&self, msg: String) {
		self.logger.info(msg);
	}
}

pub trait Logger {
	fn log(&self, msg: String);

	fn debug(&self, msg: String);

	fn notice(&self, msg: String);

	fn error(&self, msg: String);

	fn warn(&self, msg: String);

	fn info(&self, msg: String);
}