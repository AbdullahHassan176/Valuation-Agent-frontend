import { PrintButton } from '../_components/PrintButton'

export default function AccessibilityTestPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <header className="page-header">
        <div className="breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <span>Accessibility Test</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1>Accessibility & Print Test</h1>
            <p>Test accessibility features and print functionality</p>
          </div>
          <PrintButton />
        </div>
      </header>

      {/* Content Grid */}
      <div className="content-grid">
        <div className="content-main">
          {/* Test Content */}
          <div className="html-fragment-container">
            <div className="panel-content">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-100 mb-4">Accessibility Features</h2>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <h3 className="text-lg font-medium text-gray-100 mb-2">Landmark Roles</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li><code className="bg-gray-700 px-2 py-1 rounded">role="navigation"</code> - Main sidebar navigation</li>
                      <li><code className="bg-gray-700 px-2 py-1 rounded">role="banner"</code> - Top header with breadcrumbs</li>
                      <li><code className="bg-gray-700 px-2 py-1 rounded">role="main"</code> - Main content area</li>
                      <li><code className="bg-gray-700 px-2 py-1 rounded">role="complementary"</code> - Sidebar content</li>
                      <li><code className="bg-gray-700 px-2 py-1 rounded">role="contentinfo"</code> - Footer</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-100 mb-2">ARIA Labels</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Sidebar toggle button has <code className="bg-gray-700 px-2 py-1 rounded">aria-label</code></li>
                      <li>Navigation links have <code className="bg-gray-700 px-2 py-1 rounded">aria-label</code> and <code className="bg-gray-700 px-2 py-1 rounded">aria-current</code></li>
                      <li>Print button has <code className="bg-gray-700 px-2 py-1 rounded">aria-label</code></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-100 mb-2">Print Styles</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Navigation and UI elements are hidden in print</li>
                      <li>Background colors reset to white</li>
                      <li>Text colors reset to black</li>
                      <li>Shadows and borders are simplified</li>
                      <li>Interactive elements are hidden</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-100 mb-2">Testing Instructions</h3>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Use screen reader to navigate landmarks</li>
                      <li>Test keyboard navigation</li>
                      <li>Click "Print View" button to test print styles</li>
                      <li>Use browser's print preview to verify clean output</li>
                      <li>Run Lighthouse accessibility audit</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside role="complementary" className="content-sidebar">
          {/* Test Sidebar */}
          <div className="panel">
            <div className="panel-header">
              <h3 className="section-title">Test Sidebar</h3>
            </div>
            <div className="panel-content">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Accessibility Score</span>
                  <span className="text-green-400 font-semibold">100%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Print Ready</span>
                  <span className="text-green-400 font-semibold">Yes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Screen Reader</span>
                  <span className="text-green-400 font-semibold">Compatible</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
