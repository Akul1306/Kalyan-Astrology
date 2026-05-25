import mongoose from "mongoose";
import config from "./config.js";
import app from "./app.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import Blog from "./modules/blogs/blogModel.js";
import Paper from "./modules/papers/paperModel.js";
import Book from "./modules/books/bookModel.js";
import Product from "./modules/store/productModel.js";
import Test from "./modules/tests/testModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, ".env") });

const seedBlogs = async () => {
  try {
    const count = await Blog.countDocuments();
    if (count === 0) {
      console.log("No blogs found in database. Seeding sample blogs...");
      const sampleBlogs = [
        {
          title: "Stree Dosh",
          content: "Stree Dosh is a significant dosha in Vedic astrology that occurs due to past karmas and affects relationship harmony. To alleviate its effects, individuals can perform targeted remedies, seek planetary alignments, and engage in daily spiritual practices. It is said that understanding its cosmic triggers brings profound clarity and opens up pathways to deep emotional healing.",
          author: "Soham Vashist",
          tags: ["Stree Dosh", "Remedies", "Relationship"],
        },
        {
          title: "Pitra Dosh",
          content: "Pitra Dosh is an ancestral karmic affliction that influences family lineage, career progression, and general prosperity. Through dedicated ancestral rituals, charity, and self-reflection, the negative impacts can be neutralized, opening doors to ancestral blessings and restoring peaceful energies within the household.",
          author: "Soham Vashist",
          tags: ["Pitra Dosh", "Ancestral", "Karmic"],
        },
        {
          title: "Mangal Badh",
          content: "Mangal Badh is a condition related to Mars that brings challenges in marital bliss, temperament, and personal energy. Applying specific remedial practices, maintaining emotional discipline, and performing appropriate rituals can transform Mars's fierce energy into dynamic strength and focus.",
          author: "Soham Vashist",
          tags: ["Mangal Badh", "Mars", "Remedies"],
        }
      ];
      await Blog.insertMany(sampleBlogs);
      console.log("Database seeded successfully with sample blogs!");
    } else {
      console.log(`Database already contains ${count} blogs. Skipping seed.`);
    }
  } catch (err) {
    console.error("Failed to seed database blogs:", err);
  }
};

const seedPapers = async () => {
  try {
    const count = await Paper.countDocuments();
    if (count === 0) {
      console.log("No papers found in database. Seeding sample papers...");
      const samplePapers = [
        {
          title: "Planetary Influences on Human Psychology",
          author: "Dr. A.K. Sharma",
          date: "Aug 2024",
          description: "A deep study analyzing how planetary positions influence emotional states and behavioral tendencies, referencing classic Jyotish texts with modern psychology.",
          category: "Research",
          tags: ["Jupiter", "Psychology", "Vedic"],
          fileUrl: "https://res.cloudinary.com/demo/image/upload/multi_page_pdf.pdf",
        },
        {
          title: "Comparative Study of Nakshatras in Astrology",
          author: "Prof. Meena Rao",
          date: "Jan 2025",
          description: "This paper explores Nakshatras through empirical data and ancient sources, presenting their impact on personality and destiny.",
          category: "Research",
          tags: ["Moon", "Nakshatras", "Astrology"],
          fileUrl: "https://res.cloudinary.com/demo/image/upload/multi_page_pdf.pdf",
        },
        {
          title: "Astrology and Karma Theory: A Vedic Analysis",
          author: "Swami Devendra",
          date: "Oct 2024",
          description: "An in-depth exploration of the link between planetary karma and human fate, bridging philosophy, astrology, and spirituality.",
          category: "Research",
          tags: ["Saturn", "Karma", "Philosophy"],
          fileUrl: "https://res.cloudinary.com/demo/image/upload/multi_page_pdf.pdf",
        },
        {
          title: "Understanding Pitra Dosh and Its Remedies",
          author: "Dr. Priya Nair",
          date: "Nov 2024",
          description: "Comprehensive analysis of ancestral afflictions in Vedic astrology with effective remedial measures and case studies.",
          category: "Research",
          tags: ["Pitra Dosh", "Remedies", "Vedic"],
          fileUrl: "https://res.cloudinary.com/demo/image/upload/multi_page_pdf.pdf",
        },
        {
          title: "Vastu Principles for Modern Architecture",
          author: "Ar. Rajesh Kumar",
          date: "Sep 2024",
          description: "Modern interpretation of Vastu Shastra principles applied to contemporary architectural design and space planning.",
          category: "Research",
          tags: ["Vastu", "Architecture", "Design"],
          fileUrl: "https://res.cloudinary.com/demo/image/upload/multi_page_pdf.pdf",
        },
        {
          title: "Kalsarp Dosh: Myth or Reality?",
          author: "Dr. Suresh Pandey",
          date: "Dec 2024",
          description: "Critical examination of Kalsarp Dosh through statistical analysis and comparative studies of affected individuals.",
          category: "Research",
          tags: ["Kalsarp Dosh", "Myth", "Astrology"],
          fileUrl: "https://res.cloudinary.com/demo/image/upload/multi_page_pdf.pdf",
        },
        {
          title: "Solar Influence on Career and Leadership",
          author: "Prof. Amitabh Singh",
          date: "Aug 2024",
          description: "Research on Sun's role in shaping professional success, leadership qualities, and authority in individual horoscopes.",
          category: "Research",
          tags: ["Sun", "Career", "Leadership"],
          fileUrl: "https://res.cloudinary.com/demo/image/upload/multi_page_pdf.pdf",
        },
        {
          title: "Rahu and Ketu: Shadow Planets Unveiled",
          author: "Dr. Radha Menon",
          date: "Oct 2024",
          description: "Deep dive into Rahu and Ketu's influence on material desires, spirituality, and karmic patterns in human life.",
          category: "Research",
          tags: ["Rahu", "Ketu", "Karmic"],
          fileUrl: "https://res.cloudinary.com/demo/image/upload/multi_page_pdf.pdf",
        },
        {
          title: "Mercury's Impact on Communication and Intelligence",
          author: "Dr. Kavita Desai",
          date: "Jan 2025",
          description: "Study of Mercury's role in cognitive abilities, communication skills, and intellectual pursuits in astrology.",
          category: "Research",
          tags: ["Mercury", "Communication", "Intelligence"],
          fileUrl: "https://res.cloudinary.com/demo/image/upload/multi_page_pdf.pdf",
        },
        {
          title: "Venus and Relationship Compatibility",
          author: "Dr. Rohan Verma",
          date: "Sep 2024",
          description: "Comprehensive analysis of Venus's influence on relationships, love, and marital harmony through case studies.",
          category: "Research",
          tags: ["Venus", "Compatibility", "Love"],
          fileUrl: "https://res.cloudinary.com/demo/image/upload/multi_page_pdf.pdf",
        },
        {
          title: "Mars and Mangal Dosha: Combatting the Myth",
          author: "Prof. Vikram Chaturvedi",
          date: "Nov 2024",
          description: "Critical analysis of Mars dosha in marriage compatibility with empirical evidence and practical solutions.",
          category: "Research",
          tags: ["Mangal Badh", "Mars", "Astrology"],
          fileUrl: "https://res.cloudinary.com/demo/image/upload/multi_page_pdf.pdf",
        },
        {
          title: "Stree Dosh and Women's Empowerment in Astrology",
          author: "Dr. Anjali Sharma",
          date: "Dec 2024",
          description: "Modern perspective on traditional concepts of Stree Dosh with emphasis on empowerment and practical solutions.",
          category: "Research",
          tags: ["Stree Shrap", "Empowerment", "Astrology"],
          fileUrl: "https://res.cloudinary.com/demo/image/upload/multi_page_pdf.pdf",
        }
      ];
      await Paper.insertMany(samplePapers);
      console.log("Database seeded successfully with sample papers!");
    } else {
      console.log(`Database already contains ${count} papers. Skipping seed.`);
    }
  } catch (err) {
    console.error("Failed to seed database papers:", err);
  }
};

const seedBooks = async () => {
  try {
    const count = await Book.countDocuments();
    if (count === 0) {
      console.log("No books found in database. Seeding sample books...");
      const sampleBooks = [
        {
          title: "Ancient Science of Vastu",
          author: "Siddharth Borad & Dr. Jayshree Om",
          description: "Explore the foundational principles of Vastu Shastra and its impact on energy balance in architecture.",
          category: "Vastu Shastra",
          tags: ["Vastu", "Architecture", "Energy", "Home Design", "Ancient Science", "Spiritual Harmony"],
          image: "/books/Ancient-Science-of-Vastu.webp",
          fileUrl: "https://res.cloudinary.com/demo/image/upload/multi_page_pdf.pdf",
          isRagSupported: true,
        },
        {
          title: "Elements Of Vedic Astrology",
          author: "Dr. K.S. Charak",
          description: "A detailed guide on the core elements, charts, and planetary influences in Vedic Astrology.",
          category: "Astrology",
          tags: ["Vedic Astrology", "Planets", "Horoscope", "Birth Chart", "Jyotish", "Education"],
          image: "/books/Elements-Of-Vedic-Astrology.webp",
          fileUrl: "https://res.cloudinary.com/demo/image/upload/multi_page_pdf.pdf",
          isRagSupported: true,
        },
        {
          title: "Encyclopedia of Vedic Astrology Remedies",
          author: "Dr.Shankar Adawal",
          description: "Comprehensive reference for astrological remedies, gemstones, mantras, and planetary healing.",
          category: "Remedial Astrology",
          tags: ["Astrology Remedies", "Gemstones", "Mantras", "Healing", "Planets", "Karma"],
          image: "/books/Encyclopedia-Vedic-Astrology-Remedies.webp",
          fileUrl: "https://res.cloudinary.com/demo/image/upload/multi_page_pdf.pdf",
          isRagSupported: true,
        },
        {
          title: "Numerology: A Complete Guide to Understanding",
          author: "Hans Decoz",
          description: "Decode the hidden meanings of numbers and their influence on personality, destiny, and relationships.",
          category: "Numerology",
          tags: ["Numerology", "Numbers", "Destiny", "Spiritual Science", "Self Discovery", "Vibration"],
          image: "/books/Numerology-Complete-Guide.webp",
          fileUrl: "https://res.cloudinary.com/demo/image/upload/multi_page_pdf.pdf",
          isRagSupported: true,
        },
        {
          title: "Past Life and Pending Karmas",
          author: "Jay Yadav",
          description: "Delve into past life connections and unresolved karmas shaping the present and future.",
          category: "Karma & Spirituality",
          tags: ["Karma", "Past Life", "Rebirth", "Soul Journey", "Spiritual Growth", "Astrology"],
          image: "/books/Past-Life-and-Pending-Karmas.webp",
          fileUrl: "https://res.cloudinary.com/demo/image/upload/multi_page_pdf.pdf",
          isRagSupported: true,
        },
        {
          title: "Practical Vedic Astrology",
          author: "G.S. Agarwal",
          description: "A comprehensive and easy-to-understand self-learning guide on Vedic Astrology, covering charts, houses, and planetary interpretations in depth.",
          category: "Astrology",
          tags: ["Vedic Astrology", "Self Learning", "Horoscope", "Planets", "Houses", "Jyotish", "Prediction", "Beginner Guide", "Sagar Publications"],
          image: "/books/Practical-Vedic-Astrology.webp",
          fileUrl: "https://res.cloudinary.com/demo/image/upload/multi_page_pdf.pdf",
          isRagSupported: true,
        },
        {
          title: "The Complete Book of Numerology",
          author: "David Phillips",
          description: "A profound study on numerology revealing the hidden blueprint of your soul and destiny.",
          category: "Numerology",
          tags: ["Numerology", "Destiny", "Life Path", "Self Discovery", "Numbers", "Spiritual Science"],
          image: "/books/Complete-Book-of-Numerology.webp",
          fileUrl: "https://res.cloudinary.com/demo/image/upload/multi_page_pdf.pdf",
          isRagSupported: true,
        },
        {
          title: "Unfolding the Veil of Mystery: Vaastu",
          author: "Dr. B. Niranjan Babu",
          description: "Unravel the mystical aspects of Vaastu, blending scientific reasoning with ancient spiritual wisdom.",
          category: "Vastu Shastra",
          tags: ["Vaastu", "Architecture", "Energy", "Mysticism", "Harmony", "Sacred Geometry"],
          image: "/books/Unfolding-the-Veil-of-Mystery-Vaastu.webp",
          fileUrl: "https://res.cloudinary.com/demo/image/upload/multi_page_pdf.pdf",
          isRagSupported: true,
        },
        {
          title: "Vedic Astrology: A Guide to the Fundamentals of Jyotish",
          author: "Ronnie Gale Dreyer",
          description: "An excellent beginner’s guide to the fundamentals of Jyotish and planetary influences.",
          category: "Astrology",
          tags: ["Jyotish", "Vedic Astrology", "Planets", "Zodiac", "Horoscope", "Education"],
          image: "/books/Vedic-Astrology-Fundamentals-of-Jyotish.webp",
          fileUrl: "https://res.cloudinary.com/demo/image/upload/multi_page_pdf.pdf",
          isRagSupported: true,
        },
        {
          title: "Vedic Astrology Textbook by Narsimha Rao",
          author: "Narsimha Rao",
          description: "Structured textbook on predictive astrology with modern interpretations and classical foundations.",
          category: "Academic Astrology",
          tags: ["Vedic Astrology", "Textbook", "Learning", "Charts", "Karma", "Jyotish"],
          image: "/books/Vedic-Astrology-Textbook-Narsimha-Rao.webp",
          fileUrl: "https://res.cloudinary.com/demo/image/upload/multi_page_pdf.pdf",
          isRagSupported: true,
        }
      ];
      await Book.insertMany(sampleBooks);
      console.log("Database seeded successfully with sample books!");
    } else {
      console.log(`Database already contains ${count} books. Skipping seed.`);
    }
  } catch (err) {
    console.error("Failed to seed database books:", err);
  }
};

const seedProducts = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log("No products found in database. Seeding sample products...");
      const sampleProducts = [
        {
          name: "Suryavanshi Elixir",
          description: "A divine fragrance blending golden saffron, warm amber, and sacred sandalwood, formulated to boost confidence and solar energy.",
          category: "Perfume",
          price: 1499,
          stock: 25,
          thumbnail: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80",
          deliveryEstimate: "3-5 days",
        },
        {
          name: "Chandra Dew",
          description: "A cool, calming mist of white jasmine, lotus, and soothing vetiver to calm the mind and harmonize lunar rhythms.",
          category: "Perfume",
          price: 1299,
          stock: 18,
          thumbnail: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80",
          deliveryEstimate: "3-5 days",
        },
        {
          name: "Vedic Blue Sapphire (Neelam)",
          description: "Certified 4.2 Carat natural Blue Sapphire. Brings extreme mental clarity, protection, and professional breakthroughs.",
          category: "Gemstone",
          price: 18500,
          stock: 5,
          thumbnail: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=600&q=80",
          deliveryEstimate: "5-7 days",
        },
        {
          name: "Premium Yellow Sapphire (Pukhraj)",
          description: "Vibrant golden 3.8 Carat Yellow Sapphire with ultimate brilliance, symbolizing wisdom, wealth, and spiritual growth.",
          category: "Gemstone",
          price: 22000,
          stock: 4,
          thumbnail: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
          deliveryEstimate: "5-7 days",
        },
        {
          name: "Golden Cosmic Mandala Poster",
          description: "Premium archival metallic gold poster featuring a sacred geometry mandala, perfect for meditation and altar alignment.",
          category: "Poster",
          price: 499,
          stock: 100,
          thumbnail: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=600&q=80",
          deliveryEstimate: "2-4 days",
        },
        {
          name: "Astrological Planetary Alignment Map",
          description: "Highly detailed astronomical chart displaying planetary positions and constellations in traditional Vedic style.",
          category: "Poster",
          price: 399,
          stock: 85,
          thumbnail: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=600&q=80",
          deliveryEstimate: "2-4 days",
        },
        {
          name: "Certified Karungali Mala (108 Beads)",
          description: "Original black ebony wood beads, fully certified. Known to ward off negativity and attract divine vibrations.",
          category: "Accessory",
          price: 899,
          stock: 50,
          thumbnail: "https://images.unsplash.com/photo-1605281317010-fe5ffe79815b?auto=format&fit=crop&w=600&q=80",
          deliveryEstimate: "3-5 days",
        },
        {
          name: "Brass Meditating Ganesha Idol",
          description: "Handcrafted brass Ganesha idol with antique finish, representing success, new beginnings, and visual peace.",
          category: "Accessory",
          price: 1800,
          stock: 12,
          thumbnail: "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?auto=format&fit=crop&w=600&q=80",
          deliveryEstimate: "3-5 days",
        }
      ];
      await Product.insertMany(sampleProducts);
      console.log("Database seeded successfully with sample products!");
    } else {
      console.log(`Database already contains ${count} products. Skipping seed.`);
    }
  } catch (err) {
    console.error("Failed to seed database products:", err);
  }
};

const seedTests = async () => {
  try {
    const count = await Test.countDocuments();
    if (count === 0) {
      console.log("No tests found in database. Seeding sample Vedic Astrology Quiz...");
      const sampleTest = {
        title: "Vedic Astrology Quiz",
        focus: "Jyotish fundamentals",
        duration: 15,
        questions: [
          {
            questionText: "What is Vedic Astrology primarily based on?",
            options: [
              "Solar Zodiac",
              "Sidereal Zodiac",
              "Western Elements",
              "Chinese Calendar"
            ],
            correctAnswer: "Sidereal Zodiac"
          },
          {
            questionText: "Which chart is the main chart in Vedic Astrology?",
            options: [
              "Navamsa Chart",
              "Moon Chart",
              "Lagna (D1) Chart",
              "Hora Chart"
            ],
            correctAnswer: "Lagna (D1) Chart"
          },
          {
            questionText: "How many Rashis (Zodiac Signs) are there?",
            options: [
              "9",
              "10",
              "12",
              "27"
            ],
            correctAnswer: "12"
          },
          {
            questionText: "Which planet signifies karma and discipline?",
            options: [
              "Jupiter",
              "Saturn",
              "Mars",
              "Venus"
            ],
            correctAnswer: "Saturn"
          },
          {
            questionText: "What does the 10th house represent?",
            options: [
              "Marriage",
              "Career & Status",
              "Health",
              "Education"
            ],
            correctAnswer: "Career & Status"
          },
          {
            questionText: "Which Dasha system is most commonly used?",
            options: [
              "Yogini",
              "Kalachakra",
              "Vimshottari",
              "Ashtottari"
            ],
            correctAnswer: "Vimshottari"
          },
          {
            questionText: "How many Nakshatras are there?",
            options: [
              "12",
              "24",
              "27",
              "36"
            ],
            correctAnswer: "27"
          },
          {
            questionText: "Rahu and Ketu are known as?",
            options: [
              "Outer planets",
              "Shadow planets",
              "Benefic planets",
              "Natural malefics"
            ],
            correctAnswer: "Shadow planets"
          },
          {
            questionText: "Navamsa chart is mainly used for?",
            options: [
              "Career",
              "Health",
              "Marriage & Dharma",
              "Wealth"
            ],
            correctAnswer: "Marriage & Dharma"
          },
          {
            questionText: "Which planet represents wisdom and expansion?",
            options: [
              "Mercury",
              "Jupiter",
              "Sun",
              "Moon"
            ],
            correctAnswer: "Jupiter"
          }
        ]
      };
      await Test.create(sampleTest);
      console.log("Database seeded successfully with Vedic Astrology Quiz!");
    } else {
      console.log(`Database already contains ${count} tests. Skipping seed.`);
    }
  } catch (err) {
    console.error("Failed to seed database tests:", err);
  }
};

mongoose
  .connect(process.env.MongoDBURL)
  .then(async () => {
    console.log("App is connected to database");
    await seedBlogs();
    await seedPapers();
    await seedProducts();
    await seedBooks();
    await seedTests();
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
