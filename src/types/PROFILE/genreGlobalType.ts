export interface GenreGroupeItemType {
 color: string;
 id: string;
 name: string;
}

export interface GenreGlobalType {
 id: string;
 name: string;
 color: string;
 subGenres: GenreGroupeItemType[];
}
