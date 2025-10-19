"use client"

interface SimplePageProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function SimplePage({ title, description, children }: SimplePageProps) {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header">
        <div className="breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <span>{title}</span>
        </div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      {/* Content */}
      <div className="content-grid">
        <div className="content-main">
          <div className="panel">
            <div className="panel-header">
              <h2 className="section-title">{title}</h2>
            </div>
            <div className="panel-content">
              {children || (
                <div className="space-y-4">
                  <p className="text-gray-300">This page is under construction.</p>
                  <p className="text-gray-400 text-sm">Content will be added soon.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
