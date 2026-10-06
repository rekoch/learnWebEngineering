export type ArticlePreviewData = {
  id: string;
  category: string;
  title: string;
  author: string;
  image: {
    src: string;
    alt: string;
  };
};

export const cornerArticle: ArticlePreviewData = {
  id: "lieblingsplatz",
  category: "Ideen & Alltag",
  title: "So wird aus einer Ecke ein Lieblingsplatz",
  author: "Nora Linden",
  image: {
    src: "https://picsum.photos/seed/beispiel-6834/1200/800",
    alt: "Beispielbild zum Stadtgarten",
  },
};

export const eveningArticle: ArticlePreviewData = {
  id: "gruener-feierabend",
  category: "Beispielbeitrag",
  title: "Fünf Ideen für einen grünen Feierabend",
  author: "Nora Linden",
  image: {
    src: "https://picsum.photos/seed/beispiel-2727/1200/800",
    alt: "Beispielbild zum Stadtgarten",
  },
};

export const relatedArticles: ArticlePreviewData[] = [
  {
    id: "kleines-beet",
    category: "Beispielbeitrag",
    title: "Ein kleines Beet, viele Möglichkeiten",
    author: "Nora Linden",
    image: {
      src: "https://picsum.photos/seed/beispiel-6917/1200/800",
      alt: "Beispielbild zum Stadtgarten",
    },
  },
  {
    id: "stadtgarten",
    category: "Beispielbeitrag",
    title: "Ein kleiner Garten mitten in der Stadt",
    author: "Nora Linden",
    image: {
      src: "https://picsum.photos/seed/beispiel-8022/1200/800",
      alt: "Beispielbild zum Stadtgarten",
    },
  },
  {
    id: "sonnige-fenster",
    category: "Beispielbeitrag",
    title: "Pflanzen für sonnige Fenster",
    author: "Nora Linden",
    image: {
      src: "https://picsum.photos/seed/beispiel-6731/1200/800",
      alt: "Beispielbild zum Stadtgarten",
    },
  },
];