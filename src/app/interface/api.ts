export interface API {
    id: number;
    name: string;
    language: string;
    genres: string;
    status: string;
    image?: {
        medium: string;
        original: string;
    };
}

