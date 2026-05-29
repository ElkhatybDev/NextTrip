export const initialExperiencePosts = [
  {
    id: 1,
    user: "Salma El Alaoui",
    verified: true,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    location: "Santorini, Greece",
    tripTitle: "Santorini Sunset Dream",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
    text: "One of the best trips I ever had. The sunset view from the hotel was amazing and the whole experience felt peaceful and luxurious.",
    likes: 124,
    liked: false,
    comments: [
      {
        id: 11,
        user: "Yassine Idrissi",
        verified: true,
        text: "The view looks incredible.",
      },
      {
        id: 12,
        user: "Imane Zahra",
        verified: false,
        text: "I want to book this one too!",
      },
    ],
  },
  {
    id: 2,
    user: "Yassine Idrissi",
    verified: true,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    location: "Kyoto, Japan",
    tripTitle: "Kyoto Heritage Journey",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    text: "Kyoto was calm, elegant, and full of culture. The temples, streets, and traditional atmosphere made the trip unforgettable.",
    likes: 89,
    liked: true,
    comments: [
      {
        id: 21,
        user: "Nora Bennis",
        verified: true,
        text: "This post makes me want to visit Japan.",
      },
    ],
  },
  {
    id: 3,
    user: "Nora Bennis",
    verified: true,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
    location: "Swiss Alps, Switzerland",
    tripTitle: "Swiss Alpine Escape",
    image:
      "https://images.unsplash.com/photo-1531218150217-54595bc2b934?auto=format&fit=crop&w=1200&q=80",
    text: "Everything felt premium, from the train ride to the mountain lodge. The scenery was unreal and the air was so fresh.",
    likes: 156,
    liked: false,
    comments: [
      {
        id: 31,
        user: "Salma El Alaoui",
        verified: true,
        text: "The mountains here are beautiful.",
      },
      {
        id: 32,
        user: "Ayoub Chraibi",
        verified: false,
        text: "This looks like a dream trip.",
      },
    ],
  },
];

export function getExperiencePostById(id) {
  return initialExperiencePosts.find((post) => String(post.id) === String(id));
}
