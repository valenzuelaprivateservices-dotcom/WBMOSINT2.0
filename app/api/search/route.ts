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

        const patterns = [
            `*${username}*`,
            `*@${username}*`,
        ];

        if (keywords) {
            const keywordArray = keywords
                .split(',')
                .map((k) => k.trim())
                .filter((k) => k);
            patterns.push(...keywordArray.map((k) => `*${k}*`));
        }

        const allResults: SearchResult[] = [];
        const seenUrls = new Set<string>();

        for (const pattern of patterns) {
            try {
                const response = await axios.get(
                    'https://web.archive.org/cdx/search/cdx',
                    {
                        params: {
                            q: pattern,
                            output: 'json',
                            filter: 'statuscode:200',
                            collapse: 'urlkey',
                            matchType: 'contains',
                            pageSize: 100,
                        },
                        timeout: 10000,
                    }
                );

                if (response.data && Array.isArray(response.data)) {
                    const results = response.data as CDXResponse['results'];
                    if (Array.isArray(results[0])) {
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
                console.error(`Error searching pattern ${pattern}:`, error);
            }
        }

        allResults.sort(
            (a, b) => parseInt(b.timestamp) - parseInt(a.timestamp)
        );

        return NextResponse.json({ results: allResults, count: allResults.length, });
    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json(
            { error: 'Internal server error', results: [] },
            { status: 500 }
        );
    }
}