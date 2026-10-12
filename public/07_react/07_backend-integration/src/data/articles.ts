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
  id: "weinrebe-balkon",
  category: "Obst im Stadtgarten",
  title: "Eine Weinrebe für den Balkon",
  author: "Nora Linden",
  image: {
    src: "https://picsum.photos/id/75/1200/800",
    alt: "Eine Weinrebe trägt rote Trauben.",
  },
};

export const eveningArticle: ArticlePreviewData = {
  id: "traubenernte",
  category: "Ernte im Stadtgarten",
  title: "Trauben ernten und teilen",
  author: "Nora Linden",
  image: {
    src: "https://picsum.photos/id/674/1200/800",
    alt: "Frisch geerntete Trauben in zwei Händen.",
  },
};

export const relatedArticles: ArticlePreviewData[] = [
  {
    id: "kleines-beet",
    category: "Ernte im Stadtgarten",
    title: "Frische Bohnen aus dem eigenen Beet",
    author: "Nora Linden",
    image: {
      src: "https://picsum.photos/id/627/1200/800",
      alt: "Frisch gepflückte Bohnen.",
    },
  },
  {
    id: "stadtgarten",
    category: "Saison im Stadtgarten",
    title: "Ein Balkon durch die Jahreszeiten",
    author: "Nora Linden",
    image: {
      src: "https://picsum.photos/id/995/1200/800",
      alt: "Bunt gefärbte Blätter liegen auf dem Boden.",
    },
  },
  {
    id: "sonnige-fenster",
    category: "Blüten im Stadtgarten",
    title: "Violette Blüten am Fenster",
    author: "Nora Linden",
    image: {
      src: "https://picsum.photos/id/152/1200/800",
      alt: "Violette Blumen.",
    },
  },
];