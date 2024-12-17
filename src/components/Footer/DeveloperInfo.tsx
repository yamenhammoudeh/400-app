import React from 'react';
import { Mail, Github, Linkedin, Coffee } from 'lucide-react';

interface DeveloperInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeveloperInfoModal({ isOpen, onClose }: DeveloperInfoModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all">
        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">About the Developer</h2>
          
          <div className="space-y-4 text-gray-600">
            <p>Hi! I'm Yamen Hammoudeh, a passionate software developer who loves creating fun and engaging experiences.</p>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700">Fun Facts:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>I've been coding since I was 2 years old</li>
                <li>I love playing card games with family and friends</li>
                <li>I can solve any problem in under 2 minutes</li>
                <li>I'm fluent in 13 programming paradigms and 4 human languages</li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <a 
                href="mailto:mr.yamen@gmail.com"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </a>
              <a 
                href="https://github.com/yamenhammoudeh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a 
                href="https://linkedin.com/in/yamenhammoudeh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-6 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}