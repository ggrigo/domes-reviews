/**
 * API Client for secure OpenAI integration via Netlify Functions
 */

class ReviewAPIClient {
    constructor() {
        // In development, use local Netlify dev server
        // In production, uses /.netlify/functions automatically
        this.endpoint = '/.netlify/functions/generate-review';
    }

    /**
     * Generate a review using the secure backend function
     */
    async generateReview(prompt) {
        try {
            const response = await fetch(this.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt })
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.statusText}`);
            }

            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }

            return data.review;
        } catch (error) {
            console.error('Error calling review API:', error);
            throw error;
        }
    }

    /**
     * Check if the API is available
     */
    async healthCheck() {
        try {
            // Try a simple test request
            const response = await fetch(this.endpoint, {
                method: 'OPTIONS'
            });
            return response.ok;
        } catch (error) {
            return false;
        }
    }
}

// Export for use in HTML
window.ReviewAPIClient = ReviewAPIClient;