// Constants for elements
const quoteTypeSelect = document.getElementById('quote-type');
const quoteText = document.getElementById('quote-text');
const generateBtn = document.getElementById('generate-btn');

// Function to generate quote using Gemini API
async function generateQuote() {
    const quoteType = quoteTypeSelect.value;
    const prompt = `Generate a short quote. Topic: ${quoteType}`;

    // Disable button and show loading state
    generateBtn.disabled = true;
    quoteText.style.opacity = 0.5;
    quoteText.textContent = "Generating quote...";

    try {
        // Call the Gemini API to generate a quote
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${secrets.GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.9,
                    maxOutputTokens: 50,
                    topK: 40,
                    topP: 0.95
                }
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            throw new Error('Invalid response format');
        }

        // Extract the generated text from the response
        const generatedQuote = data.candidates[0].content.parts[0].text;

        // Clean up the quote (remove quotes if present and trim)
        const cleanQuote = generatedQuote.replace(/["'"]/g, '').trim();

        // Update the UI with the new quote
        quoteText.textContent = `"${cleanQuote}"`;

    } catch (error) {
        console.error('Error generating quote:', error);
        quoteText.textContent = "Failed to generate quote. Please try again.";
    } finally {
        // Re-enable button and restore opacity
        generateBtn.disabled = false;
        quoteText.style.opacity = 1;
    }
}

// Event Listeners
generateBtn.addEventListener('click', generateQuote);
