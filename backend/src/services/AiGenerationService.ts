class AiService {

    private apiKey: String;

    constructor(apiKey: string) {
        console.log("APIKEY==", apiKey);
        this.apiKey = apiKey;
    }

    // Summarize text
    public async summarizeText(content: string): Promise<string> {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: `Provide a concise summary of the following note the minimun possible, capturing the main points without unnecessary details: ${content}` }],
                max_tokens: 100,
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to summarize text: ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content.trim();
    }
}

export default AiService;