document.addEventListener('DOMContentLoaded', () => {
  const chatMessages = document.getElementById('chat-messages');
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');
  const citationPanel = document.getElementById('citation-panel');
  const closeCitations = document.getElementById('close-citations');
  const citationContent = document.getElementById('citation-content');

  // Knowledge Base - This is where we store our documents that can be cited
  const knowledgeBase = [
    {
      id: 'doc1',
      title: 'Introduction to AI',
      source: 'AI Research Journal',
      url: '#',
      content: 'Artificial Intelligence (AI) is the simulation of human intelligence processes by machines, especially computer systems. These processes include learning, reasoning, and self-correction.',
      thumbnail: 'assets/ai-thumbnail.png'
    },
    {
      id: 'doc2',
      title: 'Machine Learning Fundamentals',
      source: 'ML Handbook',
      url: '#',
      content: 'Machine learning is a subset of AI that provides systems the ability to automatically learn and improve from experience without being explicitly programmed.',
      thumbnail: 'assets/ml-thumbnail.png'
    },
    {
      id: 'doc3',
      title: 'Natural Language Processing',
      source: 'NLP Guide',
      url: '#',
      content: 'Natural Language Processing (NLP) is a field of AI that gives computers the ability to understand text and spoken words in much the same way human beings can.',
      thumbnail: 'assets/nlp-thumbnail.png'
    }
  ];

  // Initialize UI
  citationPanel.style.display = 'none';

  // Event Listeners
  sendButton.addEventListener('click', sendMessage);
  userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  closeCitations.addEventListener('click', () => {
    citationPanel.style.display = 'none';
  });

  // Send message function
  function sendMessage() {
    const messageText = userInput.value.trim();
    if (messageText === '') return;

    // Add user message
    addMessage(messageText, 'user');
    userInput.value = '';

    // Get AI response (with simulated delay)
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageText);
      addMessage(aiResponse.text, 'ai', aiResponse.citations);
      
      // Add resource cards
      if (aiResponse.resources.length > 0) {
        addResourceCards(aiResponse.resources);
      }
    }, 1000);
  }

  // Add message to chat
  function addMessage(text, sender, citations = []) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`);
    
    if (sender === 'ai' && citations.length > 0) {
      messageElement.innerHTML = parseCitations(text, citations);
      
      // Add "Show Citations" button if there are citations
      const citationButton = document.createElement('button');
      citationButton.classList.add('citation-button');
      citationButton.textContent = 'Show Citations';
      citationButton.addEventListener('click', () => {
        showCitationPanel(citations);
      });
      messageElement.appendChild(citationButton);
      
      // Initialize tooltips
      initializeTooltips();
    } else {
      messageElement.textContent = text;
    }
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Parse citations in AI response
  function parseCitations(text, citations) {
    let parsedText = text;
    
    // Replace citation markers with HTML
    citations.forEach(citation => {
      const regex = new RegExp(`\\[CITATION:${citation.id}\\]`, 'g');
      parsedText = parsedText.replace(regex, `<span class="cited-text" data-citation-id="${citation.id}">${citation.text}</span>`);
    });
    
    return parsedText;
  }

  // Initialize tooltips for cited text
  function initializeTooltips() {
    const citedTextElements = document.querySelectorAll('.cited-text');
    
    citedTextElements.forEach(element => {
      const citationId = element.getAttribute('data-citation-id');
      const resource = knowledgeBase.find(item => item.id === citationId);
      
      if (resource) {
        tippy(element, {
          content: createTooltipContent(resource),
          allowHTML: true,
          interactive: true,
          placement: 'top',
          theme: 'light'
        });
      }
    });
  }

  // Create tooltip content
  function createTooltipContent(resource) {
    const tooltipElement = document.createElement('div');
    
    const titleElement = document.createElement('div');
    titleElement.classList.add('tooltip-title');
    titleElement.textContent = resource.title;
    tooltipElement.appendChild(titleElement);
    
    const sourceElement = document.createElement('div');
    sourceElement.textContent = `Source: ${resource.source}`;
    tooltipElement.appendChild(sourceElement);
    
    const actionsElement = document.createElement('div');
    actionsElement.classList.add('tooltip-actions');
    
    const viewSourceButton = document.createElement('button');
    viewSourceButton.classList.add('tooltip-button');
    viewSourceButton.textContent = 'View Source';
    viewSourceButton.addEventListener('click', () => {
      alert(`Would navigate to: ${resource.url}`);
    });
    actionsElement.appendChild(viewSourceButton);
    
    const saveBookmarkButton = document.createElement('button');
    saveBookmarkButton.classList.add('tooltip-button');
    saveBookmarkButton.textContent = 'Save Bookmark';
    saveBookmarkButton.addEventListener('click', () => {
      saveBookmark(resource.id);
    });
    actionsElement.appendChild(saveBookmarkButton);
    
    tooltipElement.appendChild(actionsElement);
    
    return tooltipElement;
  }

  // Show citation panel
  function showCitationPanel(citations) {
    citationContent.innerHTML = '';
    
    citations.forEach(citation => {
      const resource = knowledgeBase.find(item => item.id === citation.id);
      if (!resource) return;
      
      const citationElement = document.createElement('div');
      citationElement.classList.add('citation-item');
      
      const titleElement = document.createElement('div');
      titleElement.classList.add('citation-title');
      titleElement.textContent = resource.title;
      citationElement.appendChild(titleElement);
      
      const sourceElement = document.createElement('div');
      sourceElement.classList.add('citation-source');
      sourceElement.textContent = `Source: ${resource.source}`;
      citationElement.appendChild(sourceElement);
      
      const contentElement = document.createElement('div');
      contentElement.innerHTML = `<p><strong>Quote:</strong> "${citation.text}"</p>
                                 <p><strong>AI's Interpretation:</strong> ${citation.interpretation}</p>`;
      citationElement.appendChild(contentElement);
      
      const actionsElement = document.createElement('div');
      actionsElement.classList.add('citation-actions');
      
      const viewSourceButton = document.createElement('button');
      viewSourceButton.classList.add('citation-button');
      viewSourceButton.textContent = 'View Source';
      viewSourceButton.addEventListener('click', () => {
        alert(`Would navigate to: ${resource.url}`);
      });
      actionsElement.appendChild(viewSourceButton);
      
      const saveBookmarkButton = document.createElement('button');
      saveBookmarkButton.classList.add('citation-button');
      saveBookmarkButton.textContent = 'Save Bookmark';
      saveBookmarkButton.addEventListener('click', () => {
        saveBookmark(resource.id);
      });
      actionsElement.appendChild(saveBookmarkButton);
      
      const reportIssueButton = document.createElement('button');
      reportIssueButton.classList.add('citation-button');
      reportIssueButton.textContent = 'Report Issue';
      reportIssueButton.addEventListener('click', () => {
        reportCitationIssue(citation.id);
      });
      actionsElement.appendChild(reportIssueButton);
      
      citationElement.appendChild(actionsElement);
      citationContent.appendChild(citationElement);
    });
    
    citationPanel.style.display = 'flex';
  }

  // Add resource cards
  function addResourceCards(resources) {
    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('resource-cards');
    
    resources.forEach(resourceId => {
      const resource = knowledgeBase.find(item => item.id === resourceId);
      if (!resource) return;
      
      const cardElement = document.createElement('div');
      cardElement.classList.add('resource-card');
      
      const imageElement = document.createElement('div');
      imageElement.classList.add('resource-image');
      imageElement.textContent = '📄';
      cardElement.appendChild(imageElement);
      
      const detailsElement = document.createElement('div');
      detailsElement.classList.add('resource-details');
      
      const titleElement = document.createElement('div');
      titleElement.classList.add('resource-title');
      titleElement.textContent = resource.title;
      detailsElement.appendChild(titleElement);
      
      const descriptionElement = document.createElement('div');
      descriptionElement.classList.add('resource-description');
      descriptionElement.textContent = `Source: ${resource.source}`;
      detailsElement.appendChild(descriptionElement);
      
      cardElement.appendChild(detailsElement);
      cardsContainer.appendChild(cardElement);
    });
    
    chatMessages.appendChild(cardsContainer);
  }

  // Save bookmark function
  function saveBookmark(resourceId) {
    // In a real app, this would send a request to the server
    alert(`Bookmark saved for resource: ${resourceId}`);
  }

  // Report citation issue
  function reportCitationIssue(citationId) {
    // In a real app, this would send a report to the server
    alert(`Issue reported for citation: ${citationId}`);
  }

  // Mock AI response generator
  function generateAIResponse(userMessage) {
    // This is a simplified mock of how the AI would respond with citations
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence')) {
      return {
        text: 'Artificial Intelligence (AI) is the simulation of human intelligence processes by machines [CITATION:doc1]. It encompasses various fields including machine learning and natural language processing.',
        citations: [
          {
            id: 'doc1',
            text: 'the simulation of human intelligence processes by machines',
            interpretation: 'The core definition of AI as used in modern technical contexts.'
          }
        ],
        resources: ['doc1']
      };
    }
    
    if (lowerMessage.includes('machine learning') || lowerMessage.includes('ml')) {
      return {
        text: 'Machine learning is a subset of AI that allows systems to learn and improve from experience [CITATION:doc2]. It forms the basis for many modern AI applications.',
        citations: [
          {
            id: 'doc2',
            text: 'a subset of AI that allows systems to learn and improve from experience',
            interpretation: 'The fundamental description of machine learning and its relationship to AI.'
          }
        ],
        resources: ['doc2']
      };
    }
    
    if (lowerMessage.includes('nlp') || lowerMessage.includes('natural language') || lowerMessage.includes('language processing')) {
      return {
        text: 'Natural Language Processing (NLP) is a field of AI that gives computers the ability to understand human language [CITATION:doc3]. It powers applications like chatbots, translation services, and voice assistants.',
        citations: [
          {
            id: 'doc3',
            text: 'a field of AI that gives computers the ability to understand human language',
            interpretation: 'The core definition of NLP and its purpose in AI systems.'
          }
        ],
        resources: ['doc3']
      };
    }
    
    // Default response with multiple citations
    return {
      text: 'I can provide information about various AI topics. For example, AI is the simulation of human intelligence by machines [CITATION:doc1], while machine learning is a subset that allows systems to learn from experience [CITATION:doc2]. NLP is specifically focused on understanding human language [CITATION:doc3].',
      citations: [
        {
          id: 'doc1',
          text: 'the simulation of human intelligence by machines',
          interpretation: 'Core definition of AI.'
        },
        {
          id: 'doc2',
          text: 'a subset that allows systems to learn from experience',
          interpretation: 'Basic description of machine learning.'
        },
        {
          id: 'doc3',
          text: 'specifically focused on understanding human language',
          interpretation: 'Main purpose of NLP.'
        }
      ],
      resources: ['doc1', 'doc2', 'doc3']
    };
  }

  // Add a welcome message
  addMessage('Welcome to Citation Chat! Ask me about AI, machine learning, or NLP.', 'ai');
}); 