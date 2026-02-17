import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface CDXResponse {
    results: Array<[string, string, string, string, number, string, string]>;
}

interface SearchResult {
    url: string;
    timestamp: string;
    statusCode: number;
}

export async function POST(request: NextRequest) {
    try {
        const { username, keywords } = await request.json();
        if (!username) {
            return NextResponse.json(
                { error: 'Username is required' },
                { status: 400 }
            );
        }

        const allResults: SearchResult[] = [];
        const seenUrls = new Set<string>();

        // Try multiple search patterns WITHOUT wildcards
        const patterns = [
            `${username}.com/*`,          // auronplay.com/*
            `*.${username}.com/*`,        // *.auronplay.com/*
            `${username}.tv/*`,           // auronplay.tv/*
            `${username}.net/*`,          // auronplay.net/*
            `${username}.org/*`,          // auronplay.org/*
            `${username}.es/*`,           // auronplay.es/*
        ];

        for (const pattern of patterns) {
            try {
                const response = await axios.get(
                    'https://web.archive.org/cdx/search/cdx',
                    {
                        params: {
                            url: pattern,
                            output: 'json',
                            filter: 'statuscode:200',
                            collapse: 'urlkey',
                            pageSize: 100,
                        },
                        timeout: 10000,
                    }
                );

                if (response.data && Array.isArray(response.data)) {
                    const results = response.data as CDXResponse['results'];
                    // Check if results[0] is an array (header row)
                    if (results.length > 1 && Array.isArray(results[0])) {
                        for (let i = 1; i < results.length; i++) {
                            const [url, timestamp, , , statusCode] = results[i];
                            if (statusCode && url && timestamp && !seenUrls.has(url)) {
                                seenUrls.add(url);
                                allResults.push({
                                    url,
                                    timestamp,
                                    statusCode: parseInt(statusCode.toString()),
                                });
                            }
                        }
                    }
                }
            } catch (error) {
                // Silently continue with next pattern
                console.log(`Pattern ${pattern} returned no results or error`);
            }
        }

        // Filter by keywords if provided
        let filteredResults = allResults;
        if (keywords) {
            const keywordArray = keywords
                .split(',')
                .map((k) => k.trim().toLowerCase())
                .filter((k) => k);
            
            filteredResults = allResults.filter((result) =>
                keywordArray.some((keyword) =>
                    result.url.toLowerCase().includes(keyword)
                )
            );
        }

        // Sort by newest first
        filteredResults.sort(
            (a, b) => parseInt(b.timestamp) - parseInt(a.timestamp)
        );

        return NextResponse.json({ 
            results: filteredResults, 
            count: filteredResults.length,
        });
    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json(
            { error: 'Internal server error', results: [] },
            { status: 500 }
        );
    }
}
