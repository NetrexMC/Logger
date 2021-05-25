interface ColorDescription {
	hex?: string,
	code?: string,
	special?: string;
}
export const MinecraftColors: {
	[key: string]: ColorDescription
} = {
	red: {
		hex: "#FF5555",
		code: "c"
	},
	darkred: {
		hex: "#AA0000",
		code: "4"
	},
	gold: {
		hex: "#FFAA00",
		code: "6"
	},
	yellow: {
		hex: "#FFFF55",
		code: "e"
	},
	green: {
		hex: "#55FF55",
		code: "a"
	},
	darkgreen: {
		hex: "#00AA00",
		code: "2"
	},
	aqua: {
		hex: "#55FFFF",
		code: "b"
	},
	darkaqua: {
		hex: "#00AAAA",
		code: "3"
	},
	blue: {
		hex: "#5555FF",
		code: "9"
	},
	darkblue: {
		hex: "#0000AA",
		code: "1"
	},
	purple: {
		hex: "#AA00AA",
		code: "5"
	},
	lightpurple: {
		hex: "#FF55FF",
		code: "d"
	},
	white: {
		hex: "#FFFFFF",
		code: "f"
	},
	gray: {
		hex: "#AAAAAA",
		code: "7"
	},
	darkgray: {
		hex: "#555555",
		code: "8"
	},
	black: {
		hex: "#000000",
		code: "0"
	},
	bold: {
		special: "font-weight: bold",
		code: "l"
	},
	strike: {
		special: "text-decoration: line-through",
		code: "m"
	},
	underline: {
		special: "text-decoration: underline",
		code: "n"
	},
	reset: {
		special: "text-decoration: none;font-weight: none;color: initial",
		code: "r"
	}
};

export interface ColorInstruction {
	css: string;
	value: string;
	parsed: [string, string];
}

export function getColorDescription(code: string): ColorDescription | undefined {
	let idx = (Object.keys(MinecraftColors)).find((name: string) => MinecraftColors[name].code === code);
	if (!idx) return undefined;
	return MinecraftColors[idx];
}

export function colorify(input: string): ColorInstruction[] {
	let tokens = input.split('');
	let curr = 0;
	let instructions: ColorInstruction[] = [];
	let stack: string = '';
	let currentInstruction: ColorInstruction = {
		css: 'color: initial;',
		value: '',
		parsed: ['', '']
	};

	function pushBufAndReset() {
		if (currentInstruction.css.length > 0) {
			currentInstruction.parsed = [
				currentInstruction.css,
				currentInstruction.value
			];
			instructions.push(currentInstruction as ColorInstruction);
		}
		rsi();
	}

	function pushBuf() {
		if (currentInstruction.css.length > 0) {
			currentInstruction.parsed = [
				currentInstruction.css,
				currentInstruction.value
			];

			if (/\b(\w+)\s+\1\b/.test(currentInstruction.css)) {
				currentInstruction.css += currentInstruction.css.replace(/\b(\w+)\s+\1\b/g, '');
			}
			instructions.push(currentInstruction as ColorInstruction);
			currentInstruction.css = stack;
		}
		rsi();
	}

	function rsi() {
		currentInstruction = {
			css: '',
			value: '',
			parsed: ['', '']
		};
	}

	while (curr < tokens.length) {
		let v = tokens[curr];

		// applies color if exists
		if ((v === "&" || v === "§") && (/[a-z]|[0-9]/).test(tokens[curr + 1])) {
			const currentColor = getColorDescription(tokens[++curr]);
			pushBuf();
			if (currentColor) {
				if (currentColor.code === 'r') {
					pushBufAndReset();
					stack = "";
				} else {
					currentInstruction.css = stack;
					pushBuf();
				}

				currentInstruction.css += currentColor.special
					? currentColor.special + ';' : currentColor.hex
					? "color: " + currentColor.hex + ';' : "";
			} else {
				currentInstruction.css = "";
			}

			stack += currentInstruction.css;
			curr++
			continue;
		}

		currentInstruction.value += v;
		curr++;
	}

	// ended so push it
	pushBufAndReset();
	return instructions;
}

export function colorLog(msg: string, ...consoleArgs: string[]): void {
	// get the colors from the buffer;
	let colors = colorify(msg);
	let final: string = "";

	for (let color of colors) {
		final += '%c' + color.value;
		consoleArgs.push(color.css);
	}

	console.log(final, ...consoleArgs);
}