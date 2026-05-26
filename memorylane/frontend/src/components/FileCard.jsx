import React from 'react'

export default function FileCard({ file }) {
  return (
    <div className="border rounded p-3 bg-white">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-gray-100 flex items-center justify-center text-sm text-gray-500">
          {file.fileType}
        </div>
        <div>
          <div className="font-medium">{file.fileName}</div>
          <div className="text-xs text-gray-500">{file.filePath}</div>
          <div className="mt-2 text-sm text-gray-700">{file.extractedText?.slice(0, 180)}</div>
        </div>
      </div>
    </div>
  )
}
