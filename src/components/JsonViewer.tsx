import React from "react";
import { Copy } from "lucide-react";
import { Button } from "./ui/button";

interface JsonViewerProps {
  data: any;
  title?: string;
}

const JsonViewer: React.FC<JsonViewerProps> = ({
  data = {},
  title = "Response Data",
}) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-50 rounded-md border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between bg-gray-100 px-4 py-2 border-b border-gray-200">
        <h3 className="font-medium text-gray-700">{title}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-8 px-2 text-gray-500 hover:text-gray-700"
        >
          <Copy className="h-4 w-4 mr-1" />
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
      <pre className="p-4 overflow-auto max-h-[400px] text-sm bg-white rounded-b-md">
        <code className="text-gray-800 font-mono">
          {JSON.stringify(data, null, 2)}
        </code>
      </pre>
    </div>
  );
};

export default JsonViewer;
