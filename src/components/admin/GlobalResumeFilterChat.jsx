import React, { useState } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const GlobalResumeFilterChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      text: 'Hi! I can help you find candidates across all your job postings. Just tell me what you\'re looking for:\n\n• "Java experience 5 years"\n• "JavaScript fresher"\n• "Python and React skills"\n• "Full stack developer 3 years"\n\nI\'ll search through all applications and show you matching candidates!' 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInput('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/filter-all-resumes`,
        { 
          requirement: userMessage 
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true
        }
      );

      if (res.data.success) {
        const count = res.data.filteredApplicants?.length || 0;
        const jobsCount = res.data.matchingJobs?.length || 0;
        
        if (count > 0) {
          const botResponse = `🎉 Found ${count} matching candidate${count !== 1 ? 's' : ''} across ${jobsCount} job${jobsCount !== 1 ? 's' : ''}!\n\nClick "View Results" below to see the filtered candidates.`;
          setMessages(prev => [...prev, { 
            type: 'bot', 
            text: botResponse,
            data: res.data 
          }]);
          toast.success(`Found ${count} matching candidates!`);
        } else {
          const botResponse = 'No candidates match your requirements. Try:\n• Adjusting the experience years\n• Using more general skills (e.g., "React" instead of "React Native")\n• Removing some requirements';
          setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
          toast.info('No matches found');
        }
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to filter resumes. Please try again.';
      setMessages(prev => [...prev, { type: 'bot', text: `❌ ${errorMsg}` }]);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleViewResults = (data) => {
    // Store the filtered results in localStorage for the results page to access
    localStorage.setItem('filteredResults', JSON.stringify(data));
    navigate('/admin/filtered-candidates');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-teal-600 hover:bg-teal-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 z-50 animate-pulse"
          aria-label="Open global resume filter chat"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            AI
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[550px] bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white px-4 py-3 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <div>
                <h3 className="font-semibold">AI Resume Finder</h3>
                <p className="text-xs text-teal-100">Search across all jobs</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-teal-700 rounded-full p-1 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index}>
                <div
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-4 py-2 ${
                      msg.type === 'user'
                        ? 'bg-teal-600 text-white'
                        : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{msg.text}</p>
                  </div>
                </div>
                {/* View Results Button */}
                {msg.type === 'bot' && msg.data && msg.data.filteredApplicants?.length > 0 && (
                  <div className="flex justify-start mt-2">
                    <Button
                      onClick={() => handleViewResults(msg.data)}
                      className="bg-teal-600 hover:bg-teal-700 text-white text-sm"
                      size="sm"
                    >
                      View Results →
                    </Button>
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-teal-600" />
                  <p className="text-sm">Searching all applications...</p>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="E.g., React developer 3 years..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
                rows="2"
                disabled={loading}
              />
              <Button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-teal-600 hover:bg-teal-700 text-white self-end"
                size="icon"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Press Enter to send • Shift+Enter for new line
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default GlobalResumeFilterChat;

