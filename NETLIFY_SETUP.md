# Netlify Production Setup

## 🔐 Secure API Key Configuration

### Step 1: Set Environment Variable in Netlify

1. Go to your Netlify Dashboard
2. Select your site
3. Go to **Site Settings** → **Environment Variables**
4. Add a new variable:
   - **Key**: `OPENAI_API_KEY`
   - **Value**: `your-actual-openai-api-key`
5. Save the changes

### Step 2: Deploy the Site

The repository is already configured with:
- `/netlify/functions/generate-review.js` - Serverless function to handle API calls
- `api-client.js` - Client-side code to call the function
- `netlify.toml` - Configuration file

Just push to GitHub and Netlify will:
1. Install the function
2. Set up the endpoint at `/.netlify/functions/generate-review`
3. Keep your API key secure on the server

### Step 3: Update HTML to Use Secure API

In your HTML files, replace the direct OpenAI call with:

```javascript
// Instead of calling OpenAI directly
const client = new ReviewAPIClient();
const review = await client.generateReview(prompt);
```

## 🧪 Testing Locally

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Create .env file locally
echo "OPENAI_API_KEY=your-key-here" > .env

# Run Netlify dev server
netlify dev

# Your site will be available at http://localhost:8888
# Functions will work locally just like in production
```

## 📝 How It Works

1. **Browser** → Makes request to `/.netlify/functions/generate-review`
2. **Netlify Function** → Receives request (API key hidden)
3. **Function** → Calls OpenAI API with secure key
4. **Function** → Returns review to browser
5. **Browser** → Displays review to user

## ✅ Benefits

- ✅ API key never exposed to browser
- ✅ No API key in source code
- ✅ Works with free Netlify plan
- ✅ Automatic HTTPS
- ✅ Built-in CORS handling
- ✅ Serverless scaling

## 🚨 Important Notes

- Never commit API keys to Git
- Always use environment variables
- The function has a 10-second timeout (Netlify limit)
- Free tier includes 125,000 function requests/month