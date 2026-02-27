export interface PokeAPIPaginatedResponse {
  count: number;
  next: string;
  previous: string;
  results: Result[];
}

export interface Result {
  name: string;
  url: string;
}

export interface PokeAPIPokemon {
  count:    number;
  next:     string;
  previous: string;
  results:  Result[];
}

export interface Result {
  name: string;
  url:  string;
}
