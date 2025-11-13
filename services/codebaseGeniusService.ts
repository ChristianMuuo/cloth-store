import { ProgressStep, DocumentationResult } from '../types';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const MOCK_MARKDOWN = `
# Codebase Genius Documentation

## Project Overview

This is a sample documentation generated for the repository. Codebase Genius is an AI-powered, multi-agent system that automatically generates high-quality documentation for any software repository.

## Installation

To get started with this project, follow these steps:

1.  Clone the repository: \`git clone https://github.com/user/repository.git\`
2.  Navigate to the project directory: \`cd repository\`
3.  Install dependencies: \`npm install\`

## Usage

To run the application, use the following command:

\`\`\`bash
npm start
\`\`\`

## Key Modules

### main.jac

This is the primary entry point for the application. It orchestrates the main workflow.

- **Function:** \`main()\` - Initializes and starts the server.
- **Dependencies:** \`utils.jac\`, \`api.jac\`

### utils.jac

A collection of utility functions used across the application.

- **Function:** \`formatData(data)\` - Formats the incoming data.

## API Reference

The following endpoints are available:

- \`POST /api/generate\` - Generates documentation for a given repository URL.

`;

/**
 * Simulates a real backend API call to the multi-agent system.
 * It yields progress updates and finally returns the full documentation result.
 * @param url The GitHub repository URL.
 * @returns An async generator yielding ProgressStep updates and a final DocumentationResult.
 */
// FIX: Changed generator signature to yield both ProgressStep and DocumentationResult.
export async function* generateDocumentation(url: string): AsyncGenerator<ProgressStep | DocumentationResult, void, void> {
    
    if (!url.startsWith('https://github.com/')) {
        await sleep(500);
        throw new Error('Invalid URL. Please provide a valid public GitHub repository URL.');
    }

    const steps: ProgressStep[] = [
        { agent: 'Supervisor', message: 'Workflow started. Validating repository URL...' },
        { agent: 'Repo Mapper', message: 'Cloning repository...' },
        { agent: 'Repo Mapper', message: 'Generating file tree and ignoring .gitignore files.' },
        { agent: 'Repo Mapper', message: 'Summarizing README.md to understand project goals.' },
        { agent: 'Supervisor', message: 'High-level planning complete. Instructing Code Analyzer.' },
        { agent: 'Code Analyzer', message: 'Parsing entry-point files (e.g., main.py, app.js)...' },
        { agent: 'Code Analyzer', message: 'Constructing Code Context Graph (CCG) to map relationships.' },
        { agent: 'Code Analyzer', message: 'Iteratively analyzing utility modules...' },
        { agent: 'DocGenie', message: 'Synthesizing final documentation from structured data.' },
        { agent: 'DocGenie', message: 'Generating Project Overview and Installation sections.' },
        { agent: 'DocGenie', message: 'Generating API Reference from code analysis.' },
        { agent: 'Supervisor', message: 'Aggregating results. Finalizing documentation.' },
    ];

    for (const step of steps) {
        await sleep(700 + Math.random() * 500);
        yield step;
    }

    await sleep(1000);
    // FIX: Changed from `return` to `yield` to stream the final result, matching consumer's expectation.
    yield { markdown: MOCK_MARKDOWN.trim() };
}