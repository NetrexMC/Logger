// file logger
pub struct FileLogger {
	pub printer: AnyLogger,
	pub file: File
}

impl Logger for FileLogger {
	fn log(&self, level: Level, msg: &str) {
		self.file.append()
		self.printer.log(level, msg);
	}
}