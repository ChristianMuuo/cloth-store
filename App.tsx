import React, { useState, useCallback } from 'react';
import { ProgressStep, DocumentationResult } from './types';
import { generateDocumentation } from './services/codebaseGeniusService';
import { GitHubIcon, SpinnerIcon, DownloadIcon, ErrorIcon, RocketIcon } from './components/Icons';
import { MarkdownRenderer } from './components/MarkdownRenderer';

const App: React.FC = () => {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState<ProgressStep[]>([]);
    const [result, setResult] = useState<DocumentationResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = useCallback(async () => {
        if (!url || isLoading) return;

        setIsLoading(true);
        setProgress([]);
        setResult(null);
        setError(null);

        try {
            const documentationStream = generateDocumentation(url);
            for await (const update of documentationStream) {
                if ('markdown' in update) {
                    setResult(update);
                } else {
                    setProgress(prev => [...prev, update]);
                }
            }
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError('An unknown error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    }, [url, isLoading]);
    
    const handleDownload = () => {
        if (!result) return;
        const blob = new Blob([result.markdown], { type: 'text/markdown;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        const repoName = url.split('/').pop() || 'documentation';
        link.download = `${repoName}.md`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col items-center p-4 sm:p-8">
            <main className="w-full max-w-4xl">
                <header className="text-center mb-10">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 flex items-center justify-center gap-3">
                        <RocketIcon className="w-10 h-10" />
                        Codebase Genius
                    </h1>
                    <p className="text-lg text-gray-400">An Agentic Code-Documentation System</p>
                </header>

                <section className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-2xl mb-8">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="relative w-full">
                            <GitHubIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                                placeholder="https://github.com/user/repository"
                                className="w-full bg-gray-900 border border-gray-600 rounded-md py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                disabled={isLoading}
                            />
                        </div>
                        <button
                            onClick={handleGenerate}
                            disabled={isLoading || !url}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-indigo-700 disabled:bg-indigo-900 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            {isLoading ? <><SpinnerIcon className="w-5 h-5 animate-spin" /> Generating...</> : 'Generate Docs'}
                        </button>
                    </div>
                </section>

                {isLoading && progress.length > 0 && (
                    <section className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg animate-fade-in-up">
                        <h2 className="text-xl font-semibold text-white mb-4">Generation Progress...</h2>
                        <div className="font-mono text-sm text-gray-300 space-y-2 max-h-60 overflow-y-auto">
                            {progress.map((step, index) => (
                                <div key={index} className="flex items-start">
                                    <span className="text-indigo-400 mr-3 font-bold">{`[${step.agent}]`}</span>
                                    <p className="flex-1">{step.message}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {error && (
                    <section className="bg-red-900/50 border border-red-700 text-red-300 rounded-lg p-6 shadow-lg flex items-center gap-4 animate-fade-in-up">
                        <ErrorIcon className="w-8 h-8"/>
                        <div>
                           <h3 className="font-bold">An Error Occurred</h3>
                           <p>{error}</p>
                        </div>
                    </section>
                )}

                {result && (
                    <section className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg animate-fade-in-up mt-8">
                        <header className="p-4 border-b border-gray-700 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-white">Generated Documentation</h2>
                            <button
                                onClick={handleDownload}
                                className="flex items-center gap-2 bg-gray-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                            >
                                <DownloadIcon className="w-5 h-5" />
                                Download .md
                            </button>
                        </header>
                        <div className="p-6 prose prose-invert prose-pre:bg-gray-900 max-w-none max-h-[60vh] overflow-y-auto">
                            <MarkdownRenderer markdown={result.markdown} />
                        </div>
                    </section>
                )}
            </main>

            <footer className="mt-12 text-center text-gray-500 text-sm">
                <p>Built as a frontend for the "Build Codebase Genius" Assignment.</p>
                <p>Backend agents powered by JacLang and LLMs like Gemini.</p>
            </footer>
        </div>
    );
};

export default App;
