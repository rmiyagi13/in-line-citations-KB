# Citation Chat

A chat application that demonstrates how to implement in-line citations, tooltips, resource cards, and a citation panel in AI-assisted conversations.

## Features

- Chat interface with an AI assistant that provides cited responses
- Inline citation highlighting for referenced information
- Tooltips showing citation sources on hover
- Resource cards displaying top sources for the answer
- Citation panel with detailed source information and interpretations
- Bookmark functionality for saving useful resources
- Issue reporting for potentially incorrect citations

## Project Structure

```
citation-chat/
├── index.html     # Main HTML file
├── css/
│   └── styles.css # CSS styles
├── js/
│   └── app.js     # JavaScript code
└── assets/        # Images and other assets
```

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/rmiyagi13/in-line-citations-KB.git
   ```

2. Open the `index.html` file in your web browser.

## How to Use

1. Type a query in the input box and press "Send"
2. The AI will respond with information, highlighting cited text
3. Hover over highlighted text to see tooltip information about the source
4. Click "Show Citations" to open the full citation panel
5. Review source information and AI's interpretation in the citation panel

## Sample Queries

Try asking about:
- "What is artificial intelligence?"
- "Tell me about machine learning"
- "How does NLP work?"

## Customizing the Knowledge Base

To customize the knowledge base, edit the `knowledgeBase` array in `app.js`. 
Each entry should include:
- `id`: A unique identifier
- `title`: The document title
- `source`: Where the document is from
- `url`: Link to the original source (if applicable)
- `content`: The document content
- `thumbnail`: Path to a thumbnail image (if applicable)

## Deployment

This is a static website and can be deployed to any web hosting service:

1. GitHub Pages: Push to a `gh-pages` branch
2. Netlify/Vercel: Connect your repository
3. Traditional hosting: Upload files to your hosting provider

## Future Improvements

- Connect to a real AI model with API integration
- Implement user authentication
- Add user document uploading
- Create a backend for storing and retrieving bookmarks
- Improve the citation matching algorithm

## License

MIT 