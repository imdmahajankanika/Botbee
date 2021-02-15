const patternDict = [
		{
		pattern : '\\b(?<greeting>Hi|Hello|Hey|Bonjour|Salut)\\b',
		intent : 'Hello'
		},
		
		{
			pattern: '\\b(weather|temp.*)(\\s?like?)?\\sin\\s\\b(?<city>[A-Za-z]+\\s?[A-Za-z]+?)\\s\\b(?<time>.*\\safter\\stomorrow|tomorrow|today)',
			intent: 'get weather',
			entities : {
						city : 'Paris',
						time : 'tomorrow'
					   }
		},
				
		{
			pattern: '(?<weather>hot|cold|rain.*|sun.*|cloud.*)\\sin\\s(?<city>[A-Za-z]+\\s?[A-Za-z]*?)\\s(?<time>.*\\safter\\stomorrow|tomorrow|today)',
			intent: 'Weather Forecast'
		},
		{
			pattern: 'in\\s(?<city>[A-Za-z]+\\s?[A-Za-z]*?)\\s?\\??$', // use like "...in los angeles?" or "...in Berlin?"
			intent:'Current Weather'
		},
		{
		pattern :'\\b(bye|exit)\\b',
		intent : 'Exit'
		}
	];
module.exports = patternDict ;