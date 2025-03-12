import React from "react";
import QuestionForm from "./QuestionForm";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Multilingual Question Submission
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Submit your questions in any language. Select the appropriate
            question type and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="flex justify-center">
          <QuestionForm webhookUrl="https://n8n.republicofengineers.com/webhook-test/recv_words" />
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Need help? Contact our support team at support@example.com</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
