import React from 'react'
import { FileText, FolderOpen } from 'lucide-react'

export default function FileCard({ file }) {
  const tags = Array.isArray(file.tags) ? file.tags.slice(0, 4) : []

  return (
    <article className="file-card">
      <div className="file-top">
        <div className="file-badge">
          <FileText size={16} />
        </div>
        <div>
          <h3 className="file-name">{file.fileName}</h3>
          <p className="file-path">{file.filePath}</p>
        </div>
      </div>

      <p className="file-snippet">
        {file.extractedText?.slice(0, 180) || 'No extracted text yet. This file is indexed with metadata only.'}
      </p>

      {tags.length > 0 && (
        <div className="tag-row" aria-label="Detected tags">
          {tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}
    </article>
  )
}
